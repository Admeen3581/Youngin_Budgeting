//Appwrite, Dwolla, & Plaid


import React from "react";
import Headerbox from "@/components/headerbox";
import TotalBalance from "@/components/totalbalance";
import RightSideBar from "@/components/rightsidebar";
import { getLoggedInUser } from "@/lib/actions/userActions";

const Home = async () => {

    const loggedInUser = await getLoggedInUser();
    const namesList = loggedInUser.name.split(" ");

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header>">
                    <Headerbox
                        type="greeting"
                        title="What's good"
                        suffix="?"
                        user={namesList[0] || "Homie"}
                        subtext="Securely track your financial wonders!"
                    />

                    <TotalBalance
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1248803.69}
                    />
                </header>

                RECENT TRANSACTIONS

            </div>

            <RightSideBar
                user={loggedInUser} 
                transactions={[]}
                banks={[{currentBalance: 4532.34}, {currentBalance: 10392.30}]}
            />

        </section>
    )
}

export default Home
