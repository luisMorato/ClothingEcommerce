import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/app/Components/Layout/Header";
import Footer from "@/app/Components/Layout/Footer";
import LoginModal from "@/app/Components/Layout/(auth)/Modals/LoginModal";
import RegisterModal from "@/app/Components/Layout/(auth)/Modals/RegisterModal";

import { getCurrentUser } from "@/app/utils/GetUser";

import ToasterProvider from '@/app/Providers/ToasterProvider';
import { SearchContextProvider } from "@/app/Context/ContextSearch";

import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const currentUser = await getCurrentUser();
  
  return (
    <html lang="en" style={{scrollBehavior:'smooth'}}>
      <body className={inter.className}>
        <ToasterProvider />
        <SearchContextProvider>
          <Header 
            currentUser={currentUser}
          />
            <LoginModal />
            <RegisterModal />
            { children }
          <Footer />
        </SearchContextProvider>
      </body>
    </html>
  );
}
