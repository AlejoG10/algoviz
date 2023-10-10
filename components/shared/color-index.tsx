"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
}

const ColorIndex: React.FC<ColorIndexProps> = ({ algo }) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const index: ColorIndexRow[] = useMemo(() => {
    switch (algo) {
      case "bubble-sort":
        return [
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
        ];

      case "selection-sort":
        return [
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
        ];

      default:
        throw new Error("invalid algorithm");
    }
  }, [algo]);

  return (
    <div className="bg-neutral-50 border-neutral-100 border shadow-md rounded-xl p-4 w-full h-fit">
      <div className="relative flex flex-col gap-y-4 w-full h-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Color Index</h2>
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
        </div>
        {expanded && (
          <>
            <hr />
            {index.map((colorIndex) => (
              <ColorIndexRow key={colorIndex.label} {...colorIndex} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ColorIndex;
