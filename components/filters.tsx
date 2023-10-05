"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Droplets, GitMerge, PictureInPicture2, Pin } from "lucide-react";

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
  ];

  const handleClick = (id: string) => {
    setActive(id);
  };

  useEffect(() => {
    router.push(`?algo=${active}`);
  }, [active]);

  return (
    <div className="flex items-center bg-white border-y border-neutral-200 px-4 sm:px-8">
      <div className="flex items-center gap-x-8 overflow-x-scroll no-scrollbar">
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
              onClick={() => handleClick(filter.id)}
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
