import { Metadata } from "next";

import Navbar from "@/components/navbar/navbar";
import Filters from "@/components/shared/filters";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Algorithms",
  description: "All algorithms",
};

export default function AlgorithmsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center items-center px-8 sm:px-14">
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="pt-navbar">
          <Filters />
          {children}
        </div>
        <Footer />
      </div>
    </main>
  );
}
