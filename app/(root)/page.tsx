import React from "react";
import Headerbox from "@/components/headerbox";

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
                </header>
            </div>
        </section>
    )
}

export default Home