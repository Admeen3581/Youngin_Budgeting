'use server';

import { cookies } from "next/headers";
import { ID } from 'node-appwrite';
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { parseStringify } from "../utils";

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

      return parseStringify(session);
    }
    catch(error)
    {
      console.error('Error - signIn: ', error);
      throw error;
    }
}

export const signUp = async (userData: SignUpParams) =>
{
    try
    {
        //Accounts are created & managed with AppWrite. https://appwrite.io/
        const { account } = await createAdminClient();
        const newUserAccount = await account.create(ID.unique(), userData.email, userData.password, `${userData.firstName} ${userData.lastName}`);
        const session = await account.createEmailPasswordSession(userData.email, userData.password);
      
        cookies().set("youngin-session", session.secret, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          path: '/',
        });

        return parseStringify(newUserAccount);
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
    return await account.get();
  } 
  catch (error) 
  {
    console.error("Error - getLoggedInUser: ", error);
    throw error;
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