import { Inter } from "next/font/google";
import "@styles/globals.css";
import { useAuth } from "@hooks/useAuth";
import { Alert } from "@common/alert";
import Header from "@components/header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth:any = useAuth()
  const { alert, setAlert, toggleAlert }:any = useAuth();
  return (
    <>
      <div lang="en">
          <Header user={auth?.user} logout={auth?.logout} />
        <main className={inter.className}>
          <Alert alert={alert} handleClose={toggleAlert} />
          <div className="mt-20">{children}</div>
        </main>
      </div>
    </>
  );
}
