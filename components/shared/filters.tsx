"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Binary,
  Droplets,
  GitMerge,
  LucideIcon,
  MousePointer,
  PictureInPicture2,
  Pin,
} from "lucide-react";

type Filter = {
  id: string;
  route: string;
  name: string;
  icon: LucideIcon;
};

const Filters = () => {
  const pathname = usePathname();
  const router = useRouter();

  const filters: Filter[] = [
    {
      id: "bubble-sort",
      route: "/algorithms/sorting/bubble-sort",
      name: "Bubble Sort",
      icon: Droplets,
    },
    {
      id: "selection-sort",
      route: "/algorithms/sorting/selection-sort",
      name: "Selection Sort",
      icon: MousePointer,
    },
    {
      id: "insertion-sort",
      route: "/algorithms/sorting/insertion-sort",
      name: "Insertion Sort",
      icon: PictureInPicture2,
    },
    {
      id: "merge-sort",
      route: "/algorithms/sorting/merge-sort",
      name: "Merge Sort",
      icon: GitMerge,
    },
    {
      id: "quick-sort",
      route: "/algorithms/sorting/quick-sort",
      name: "Quick Sort",
      icon: Pin,
    },
    {
      id: "binary-search",
      route: "/algorithms/searching/binary-search",
      name: "Binary Search",
      icon: Binary,
    },
  ];

  return (
    <div className="fixed left-0 flex justify-center items-center bg-white border-y border-neutral-200 shadow-sm px-8 sm:px-14 w-screen h-filters z-50">
      <div className="flex items-center gap-x-4 lg:gap-x-6 xl:gap-x-8 2xl:gap-x-10 overflow-x-scroll no-scrollbar">
        {filters.map((filter) => {
          const Icon = filter.icon;

          return (
            <button
              key={filter.id}
              className={`flex flex-col items-center gap-y-3 border-neutral-800 py-[10px] w-28 min-w-[112px] h-full focus:outline-none ${
                filter.route === pathname
                  ? "text-neutral-800 border-b-2"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
              onClick={() => router.push(`${filter.route}`)}
            >
              <Icon size={26} strokeWidth={1.5} />
              <p className="text-sm font-medium">{filter.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
