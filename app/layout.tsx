import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import AppContainer from "@/components/shared/containers/app-container";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | AlgoViz",
    default: "Learning tool to visualize popular algorithms",
  },
  description:
    "Learning tool where you can visualize, simulate and learn popular algorithms",
  icons: {
    icon: "./icon.png",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <AppContainer>
          <Navbar />
          {children}
          <Footer />
        </AppContainer>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
