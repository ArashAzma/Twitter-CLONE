import Nav from "@/components/nav";
import "./globals.css";
import Provider from "@/components/provider";
import LoadingProvider  from "@/context/loadingProvider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "twitter",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <LoadingProvider>
            <Nav />
            {children}
          </LoadingProvider>
        </Provider>
      </body>
    </html>
  );
}
