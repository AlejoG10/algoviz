import { Metadata } from "next";

import Filters from "@/components/shared/filters";

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
    <main className="flex justify-center items-center px-4 sm:px-8 pb-4 sm:pb-8">
      <div className="flex flex-col w-full">
        <Filters />
        <div className="pt-filters mt-6 lg:mt-10">{children}</div>
      </div>
    </main>
  );
}
