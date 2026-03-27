import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserProvider } from "@/contexts/UserContext";
import StickyFooterBanner from "@/components/StickyFooterBanner";
import GoAdFreeLoader from "@/components/GoAdFreeLoader";
import DonationWidget from "@/components/DonationWidget";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], variable: "--font-wild" });

export const metadata: Metadata = {
  title: "Wordsmyth — Children's Dictionary & Word Explorer",
  description: "A free educational dictionary for children, students, and teachers. Explore WILD, Word Explorer, activities, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} flex flex-col min-h-screen`}>
        <UserProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyFooterBanner />
          <GoAdFreeLoader />
          <DonationWidget placement="sticky" />
        </UserProvider>
      </body>
    </html>
  );
}
