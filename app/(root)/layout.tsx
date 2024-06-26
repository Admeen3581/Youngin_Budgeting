import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn = {firstName: "Admeen", lastName: "Long"};

  return (
    <main className="flex h-screen w-full font-inter">
        <Sidebar
          user={loggedIn}
        />

        {children}
    </main>
  );
}
