import { Inter } from "next/font/google";
import "@styles/globals.css";
import { useAuth } from "@hooks/useAuth";
import { Alert } from "@common/alert";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { alert, setAlert, toggleAlert }:any = useAuth();
  return (
    <>
      <div lang="en">
        <main className={inter.className}>
          <Alert alert={alert} handleClose={toggleAlert} />
          <div>{children}</div>
        </main>
      </div>
    </>
  );
}
