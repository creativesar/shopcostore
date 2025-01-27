import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar/page";
import Footer from "@/components/layout/Footer/page";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Shopco",
  description: "NextGeneration E-Commerce Platform by Sarfraz Ahmad",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        data-new-gr-c-s-check-loaded="14.1147.0"
        data-gr-ext-installed=""
        className={satoshi.className}
      >
        <HolyLoader color="#868686" />
        <TopBanner />
        <Providers>
          <TopNavbar />
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}