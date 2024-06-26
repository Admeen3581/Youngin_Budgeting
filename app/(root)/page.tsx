import React from "react";
import Headerbox from "@/components/headerbox";
import TotalBalance from "@/components/totalbalance";

const Home = () => {

    const loggedInUser = {firstName: "Admeen", lastName: "Long"};

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

            </div>
        </section>
    )
}

export default Home