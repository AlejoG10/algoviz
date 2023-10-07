"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import Button from "./form/button";

interface BarInfoProps {
  label: string;
  className: string;
}

const BarInfo: React.FC<BarInfoProps> = ({ label, className }) => (
  <div className="flex items-center gap-x-5">
    <div
      className={`ring-2 ring-offset-4 rounded-full aspect-square w-[18px] ${className}`}
    />
    <p className="text-neutral-800 font-medium">{label}</p>
  </div>
);

const BarsInfo = () => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <div className="bg-neutral-50 border-neutral-100 border shadow-md rounded-xl p-4 w-full">
      <div className="relative flex flex-col gap-y-4 w-full h-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Color Meaning</h2>
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
            <BarInfo
              label="Current maximum"
              className="bg-orange-500 ring-orange-500"
            />
            <BarInfo
              label="Comparison element"
              className="bg-rose-500 ring-rose-500"
            />
            <BarInfo
              label="Correct position (sorted)"
              className="bg-green-500 ring-green-500"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BarsInfo;
