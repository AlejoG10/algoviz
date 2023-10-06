"use client";

import { useMemo } from "react";
import { Progress } from "@nextui-org/react";
import {
  ChevronsLeft,
  ChevronsRight,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";

import Button from "./button";

interface ControlsProps {
  sorting: boolean;
  step: number;
  steps: number;
  handleSort: () => void;
  handleReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  sorting,
  step,
  steps,
  handleSort,
  handleReset,
}) => {
  const progress = useMemo(() => (step / steps) * 100, [step, steps]);

  return (
    <div className="flex flex-col items-center gap-y-4 w-full">
      <Progress
        aria-label="progress"
        value={progress}
        color="success"
        className="bg-neutral-50"
      />

      <div className="bg-neutral-50 border-neutral-100 border shadow-md rounded-xl px-4 xl:px-6 py-4 w-full">
        <div className="relative flex justify-center items-center w-full">
          <div className="flex justify-center items-center gap-x-4 w-full">
            <Button circle bgColor="green" disabled={sorting || step === 0}>
              <ChevronsLeft size={20} />
            </Button>
            <Button
              circle
              bgColor={sorting ? "red" : "green"}
              onClick={handleSort}
            >
              {sorting ? (
                <Pause size={20} />
              ) : (
                <Play size={20} className="pl-px" />
              )}
            </Button>
            <Button
              circle
              bgColor="green"
              disabled={sorting || step > steps || progress >= 100}
            >
              <ChevronsRight size={20} />
            </Button>
          </div>

          <div className="absolute right-0">
            <Button circle bgColor="red" onClick={handleReset}>
              <RotateCcw size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
