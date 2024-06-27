import React from "react";
import Headerbox from "@/components/headerbox";
import TotalBalance from "@/components/totalbalance";
import RightSideBar from "@/components/rightsidebar";

const Home = () => {

    const loggedInUser = {firstName: "Admeen", lastName: "Long", email: "throwaway244355@gmail.com"};

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header>">
                    <Headerbox
                        type="greeting"
                        title="What's good"
                        suffix="?"
                        user={loggedInUser.firstName || "Homie"}
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