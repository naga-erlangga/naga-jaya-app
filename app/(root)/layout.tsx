import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import Header from "@/app/(root)/components/header";
import {Toaster} from "react-hot-toast";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '800']
});

export const metadata: Metadata = {
  title: "Naga Jaya Web App",
  description: "Naga Jaya App for Products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
      <Toaster />
      <div className={"flex flex-col"}>
        <Header />
        {children}
      </div>
      </body>
    </html>
  );
}
