import MobileNav from "@/components/mobilenav";
import LeftSidebar from "@/components/leftsidebar";
import Image from "next/image";
import {redirect} from 'next/navigation'
import { getLoggedInUser } from "@/lib/actions/user.actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; 
}>) {
  {/*What is this children variable doing? */}

  const loggedIn = await getLoggedInUser();

  if(!loggedIn)
  {
    redirect('./sign_in')
  }

  return (
    <main className="flex h-screen w-full font-inter">
        <LeftSidebar
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
