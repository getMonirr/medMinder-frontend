import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "react-toastify/dist/ReactToastify.css";
import AllProvider from "@/provider/AllProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MedMinder App",
  description: "Reminder your medicine take",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <AllProvider>
          <Navbar />
          {children}
          <Footer />
        </AllProvider>
      </body>
    </html>
  );
}
