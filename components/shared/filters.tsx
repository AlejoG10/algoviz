"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  name: string;
  icon: LucideIcon;
};

const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [active, setActive] = useState(
    searchParams.get("algo") || "bubble-sort"
  );

  const filters: Filter[] = [
    {
      id: "bubble-sort",
      name: "Bubble Sort",
      icon: Droplets,
    },
    {
      id: "selection-sort",
      name: "Selection Sort",
      icon: MousePointer,
    },
    {
      id: "insertion-sort",
      name: "Insertion Sort",
      icon: PictureInPicture2,
    },
    {
      id: "merge-sort",
      name: "Merge Sort",
      icon: GitMerge,
    },
    {
      id: "quick-sort",
      name: "Quick Sort",
      icon: Pin,
    },
    {
      id: "binary-search",
      name: "Binary Search",
      icon: Binary,
    },
  ];

  useEffect(() => {
    router.push(`?algo=${active}`);
  }, [active]);

  return (
    <div className="flex justify-center items-center bg-white border-y border-neutral-200 px-4 sm:px-8 mb-10 w-full">
      <div className="flex items-center gap-x-4 lg:gap-x-6 xl:gap-x-8 2xl:gap-x-10 overflow-x-scroll no-scrollbar">
        {filters.map((filter) => {
          const Icon = filter.icon;

          return (
            <button
              key={filter.id}
              className={`flex flex-col items-center gap-y-4 border-neutral-800 py-5 w-28 min-w-[112px] h-full ${
                filter.id === active
                  ? "text-neutral-800 border-b-2"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
              onClick={() => setActive(filter.id)}
            >
              <Icon size={32} strokeWidth={1.5} />
              <h1 className="text-sm font-medium">{filter.name}</h1>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
