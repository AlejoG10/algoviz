import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Algorithms",
  description: "All algorithms",
};

export default function AlgorithmsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col w-full">{children}</div>;
}
