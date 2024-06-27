import MobileNav from "@/components/mobilenav";
import Sidebar from "@/components/sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; 
}>) {
  {/*What is this children variable doing? */}

  const loggedIn = {firstName: "Admeen", lastName: "Long"};

  return (
    <main className="flex h-screen w-full font-inter">
        <Sidebar
          user={loggedIn}
        />

        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image 
              src="/icons/logo.svg"
              width={30}
              height={30}
              alt="Menu Icon"
              />
            <div>
              <MobileNav
                user={loggedIn}
              />
            </div>
          </div>
          {children} {/*I'm not really sure what this does due to above.*/}
        </div>

    </main>
  );
}
