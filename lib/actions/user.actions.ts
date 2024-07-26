'use server';

import { cookies } from "next/headers";
import { ID, Query } from 'node-appwrite';
import { createAdminClient, createSessionClient } from "../appwrite";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "../plaid";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";
import { revalidatePath } from "next/cache";

export const getUserInfo = async ({userId}: getUserInfoProps) =>
{
  try
    {
      const {database} = await createAdminClient();
      const user = await database.listDocuments(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_USER_COLLECTION_ID!,
        [Query.equal('userId', [userId])],
      )
  
      return parseStringify(user.documents[0]);
    }
    catch(error)
    {
      console.error('Error - getUserInfo: ', error);
      return null;
    }
}

export const signIn = async ({email, password}: signInProps) =>
{
    try
    {
      const {account} = await createAdminClient();
      const session = await account.createEmailPasswordSession(email, password);

      cookies().set("youngin-session", session.secret, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        path: '/',
      });

      const userInfo = await getUserInfo({userId: session.userId});

      return parseStringify(userInfo);
    }
    catch(error)
    {
      console.error('Error - signIn: ', error);
      throw error;
    }
}

export const signUp = async ({password, ...userData}: SignUpParams) =>
{
    let newUserAccount;

    try
    {
        //Accounts are created & managed with AppWrite. https://appwrite.io/
        const { account, database } = await createAdminClient();
        newUserAccount = await account.create(ID.unique(), userData.email, password, `${userData.firstName} ${userData.lastName}`);

        if(!newUserAccount)
        {
          throw new Error('Error Creating User');
        }

        const userInfo : NewDwollaCustomerParams = 
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          type: "personal",
          address1: userData.address,
          city: userData.city,
          state: userData.state,
          postalCode: userData.code,
          dateOfBirth: userData.birthday,
          ssn: '0000',
        }

        const dwollaCustomerUrl = await createDwollaCustomer(
          {
            ...userInfo,
          }
        );

        if(!dwollaCustomerUrl)
        {
          throw new Error('Error Creating Dwolla Customer');
        }

        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);
        const newUser = await database.createDocument(
          process.env.APPWRITE_DATABASE_ID!,
          process.env.APPWRITE_USER_COLLECTION_ID!,
          ID.unique(),
          {
            ...userData,
            userId: newUserAccount.$id,
            dwollaCustomerId,
            dwollaCustomerUrl
          },
          );


        const session = await account.createEmailPasswordSession(userData.email, password);
      
        cookies().set("youngin-session", session.secret, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          path: '/',
        });

        return parseStringify(newUser);
    }
    catch(error)
    {
        console.error('Error - signUp: ', error);
    }
}

export async function getLoggedInUser() 
{
  try 
  {
    const { account } = await createSessionClient();
    const user = await getUserInfo({userId: (await account.get()).$id})
    return parseStringify(user)
  } 
  catch (error) 
  {
    console.error("Error - getLoggedInUser: ", error);
    return null;
  }
}

export async function logOutUser()
{
  try 
  {
    const { account } = await createSessionClient();

    cookies().delete('youngin-session');

    await account.deleteSession('current');
  } 
  catch (error) 
  {
    console.error('Error - logoutUser: ', error);
    return null;
  }
}

export const createLinkToken = async (user: User) =>
{
  try
  {
    const tokenParams = 
    {
      user:
      {
        client_user_id: user.$id
      }, 
      client_name: `${user.firstName} ${user.lastName}`,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    }

    const userResponse = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({linkToken: userResponse.data.link_token});
  }
  catch(error)
  {
    console.error('Error - createLinkToken: ', error);
    return null;
  }
}

export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  sharableId,
}: createBankAccountProps) =>
{
  try
  {
    const {database} = await createAdminClient();

    const bankAccount = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!, 
      process.env.APPWRITE_USER_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        sharableId,
      },
    )
    return parseStringify(bankAccount);
  }
  catch (error)
  {
    console.error("Error - createBankAccount: ", error);
  }
}

// This function exchanges a public token for an access token and item ID
export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Exchange public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    // Create a processor token for Dwolla using the access token and account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse =
      await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

    // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    // If the funding source URL is not created, throw an error
    if (!fundingSourceUrl) throw Error;

    // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and sharable ID
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      sharableId: encryptId(accountData.account_id),
    });

    // Revalidate the path to reflect the changes
    revalidatePath("/");

    // Return a success message
    return parseStringify({
      publicTokenExchange: "complete",
    });
  } 
  catch (error)
  {
    console.error("Error - exchangePublicToken: ", error);
    return null;
  }
};

export const getBanks = async ({userId}: getBanksProps) =>
{
  try
  {
    const {database} = await createAdminClient();
    const banks = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_BANK_COLLECTION_ID!,
      [Query.equal('userId', [userId])]//<-- Its trying to access the bank collection but there isn't anything there.
      //Nothing is being written to the bank collection? Why?
    )
    console.log(banks);

    return parseStringify(banks.documents);
  }
  catch(error)
  {
    console.error('Error - getBanks: ', error);
    return null;
  }
}

export const getBank = async ({documentId}: getBankProps) =>
  {
    try
    {
      const {database} = await createAdminClient();
      const bank = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_BANK_COLLECTION_ID!,
      [Query.equal('$id', [documentId])]
      );

      console.log(bank);

      return parseStringify(bank.documents[0]);
    }
    catch(error)
    {
      console.error('Error - getBank: ', error);
      return null;
    }
  }