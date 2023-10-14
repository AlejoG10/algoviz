import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import AppContainer from "@/components/shared/containers/app-container";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlgoViz",
  description: "Popular algorithms visualized!",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <AppContainer>
          <Navbar />
          {children}
          <Footer />
        </AppContainer>
      </body>
    </html>
  );
};

export default RootLayout;