"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { ColorIndexRowSkeleton, HeadingSkeleton } from "./skeletons";
import Button from "./form/button";

interface ColorIndexRow {
  label: string;
  className: string;
}

const ColorIndexRow: React.FC<ColorIndexRow> = ({ label, className }) => (
  <div className="flex items-center gap-x-5">
    <div
      className={`ring-2 ring-offset-4 rounded-full aspect-square w-[18px] ${className}`}
    />
    <p className="text-neutral-800">{label}</p>
  </div>
);

interface ColorIndexProps {
  algo: SortingAlgo;
  isLoading: boolean;
}

const ColorIndex: React.FC<ColorIndexProps> = ({ algo, isLoading }) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const algoColorIndexMap: Record<SortingAlgo, ColorIndexRow[]> = {
    "bubble-sort": [
      {
        label: "Current max",
        className: "bg-orange-500 ring-orange-500",
      },
      {
        label: "Possible new max",
        className: "bg-rose-500 ring-rose-500",
      },
      {
        label: "Sorted",
        className: "bg-green-500 ring-green-500",
      },
    ],
    "selection-sort": [
      {
        label: "Swapping item",
        className: "bg-sky-500 ring-sky-500",
      },
      {
        label: "Current min",
        className: "bg-orange-500 ring-orange-500",
      },
      {
        label: "Possible new min",
        className: "bg-rose-500 ring-rose-500",
      },
      {
        label: "Sorted",
        className: "bg-green-500 ring-green-500",
      },
    ],
    "insertion-sort": [
      {
        label: "Insertion item",
        className: "bg-orange-500 ring-orange-500",
      },
      {
        label: "Sorted partition",
        className: "bg-green-500 ring-green-500",
      },
    ],
    "merge-sort": [
      {
        label: "Left array",
        className: "bg-orange-500 ring-orange-500",
      },
      {
        label: "Right array",
        className: "bg-rose-500 ring-rose-500",
      },
      {
        label: "Sorted partition",
        className: "bg-green-500 ring-green-500",
      },
    ],
    "quick-sort": [
      {
        label: "TO-DO",
        className: "bg-orange-500 ring-orange-500",
      },
      {
        label: "TO-DO",
        className: "bg-green-500 ring-green-500",
      },
    ],
  };

  const index: ColorIndexRow[] = useMemo(() => algoColorIndexMap[algo], [algo]);

  return (
    <div className="bg-white border-neutral-50 border shadow-sm rounded-lg p-4 w-full h-fit">
      <div className="relative flex flex-col gap-y-5 w-full h-full">
        <div className="flex justify-between items-center">
          {isLoading ? (
            <HeadingSkeleton />
          ) : (
            <h2 className="text-xl font-semibold">Color Index</h2>
          )}
          {!isLoading && (
            <Button
              circle
              className="!p-0"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? (
                <ChevronUp className="text-neutral-800" />
              ) : (
                <ChevronDown className="text-neutral-800" />
              )}
            </Button>
          )}
        </div>
        {expanded && (
          <>
            <hr />
            {index.map((colorIndex) =>
              isLoading ? (
                <ColorIndexRowSkeleton key={colorIndex.label} />
              ) : (
                <ColorIndexRow key={colorIndex.label} {...colorIndex} />
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ColorIndex;
