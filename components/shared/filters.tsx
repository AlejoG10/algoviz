"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Binary,
  Droplets,
  GitMerge,
  ListPlus,
  LucideIcon,
  MousePointer,
  PictureInPicture2,
  Pin,
} from "lucide-react";

import { useFilters } from "@/hooks/useFilters";

type Filter = {
  id: AlgoId | string;
  route: string;
  name: string;
  icon: LucideIcon;
};

export const filtersArr: Filter[] = [
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
    id: "soon",
    route: "",
    name: "More Soon!",
    icon: ListPlus,
  },
  // {
  //   id: "quick-sort",
  //   route: "/algorithms/sorting/quick-sort",
  //   name: "Quick Sort",
  //   icon: Pin,
  // },
  // {
  //   id: "binary-search",
  //   route: "/algorithms/searching/binary-search",
  //   name: "Binary Search",
  //   icon: Binary,
  // },
];

const Filters = () => {
  const router = useRouter();
  const pathname = usePathname();

  const filters = useFilters();

  const handleClick = (name: string, route: string) => {
    if (route !== "") {
      filters.setActive(name);
      router.push(route);

      if (window.innerWidth < 1024) {
        filters.onClose();
      }
    }
  };

  // -----------
  // USE EFFECTS
  // -----------

  useEffect(() => {
    const handleFiltersVisibility = () => {
      if (window.innerWidth < 1024) {
        filters.onClose();
      } else if (window.innerWidth >= 1024) {
        filters.onOpen();
      }
    };

    handleFiltersVisibility();

    window.addEventListener("resize", handleFiltersVisibility);
    return () => window.removeEventListener("resize", handleFiltersVisibility);
  }, []);

  useEffect(() => {
    const filterId = pathname.split("/").at(3);
    const filterName =
      filtersArr.find((filter) => filter.id === filterId)?.name || "";
    filters.setActive(filterName);
  }, [pathname]);

  return (
    filters.isOpen && (
      <div className="fixed left-0 flex justify-center items-center bg-white border-y border-neutral-200 shadow-sm px-8 sm:px-14 w-screen h-filters z-50">
        <div className="flex items-center gap-x-4 lg:gap-x-6 xl:gap-x-8 2xl:gap-x-10 overflow-x-scroll no-scrollbar">
          {filtersArr.map((filter) => {
            const Icon = filter.icon;

            return (
              <button
                key={filter.id}
                className={`flex flex-col items-center gap-y-3 border-neutral-800 py-[10px] w-28 min-w-[112px] h-full focus:outline-none 
                ${
                  filter.name === filters.active
                    ? "text-neutral-800 border-b-2"
                    : `text-neutral-500 ${
                        filter.id !== "soon" && "hover:text-neutral-800"
                      }`
                }
                ${filter.id === "soon" && "cursor-default"}`}
                onClick={() => handleClick(filter.name, filter.route)}
              >
                <Icon size={26} strokeWidth={1.5} />
                <p className="text-sm font-medium">{filter.name}</p>
              </button>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Filters;
