import React from "react";
import Headerbox from "@/components/headerbox";
import TotalBalance from "@/components/totalbalance";
import RightSideBar from "@/components/rightsidebar";
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";

const Home = async ({searchParams: {id, page}}: SearchParamProps) => {

    const loggedInUser = await getLoggedInUser();
    const accounts = await getAccounts({userId: loggedInUser?.$id});

    console.log(`Fetching accounts ${accounts}`);
    const accountsData = accounts?.data;

    if(!accounts)
    {
        return;
    }

    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
    const account = await getAccount({appwriteItemId});

    console.log({
        accountsData,
        account
    })

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <Headerbox
                        type="greeting"
                        title="What's good"
                        suffix="?"
                        user={loggedInUser?.firstName || "Homie"}
                        subtext="Securely track your financial wonders!"
                    />

                    <TotalBalance
                        accounts={accounts?.data}
                        totalBanks={accounts?.totalBanks}
                        totalCurrentBalance={accounts?.totalCurrentBalance}
                    />
                </header>

                RECENT TRANSACTIONS

            </div>

            <RightSideBar
                user={loggedInUser} 
                transactions={accounts?.transactions}
                banks={accounts?.data.slice(0,2)}
            />

        </section>
    )
}

export default Home