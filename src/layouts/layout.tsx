import { Inter } from "next/font/google";
import "@styles/globals.css";
import { useAuth } from "@hooks/useAuth";
import { Alert } from "@common/alert";
import Header from "@components/header";
import AnimatedCursor from "react-animated-cursor";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth: any = useAuth();
  const { alert, setAlert, toggleAlert }: any = useAuth();
  return (
    <>
      <div lang="en">
        <Header user={auth?.user} logout={auth?.logout} />
        <AnimatedCursor
          innerSize={8}
          outerSize={8}
          color="193, 11, 111"
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={5}
          clickables={[
            "a",
            "input[type='text']",
            "button",
            ".link",
            // Add more clickable selectors as needed
          ]}
        />
        <main className={inter.className}>
          <Alert alert={alert} handleClose={toggleAlert} />
          <div className="mt-20">{children}</div>
        </main>
      </div>
    </>
  );
}
