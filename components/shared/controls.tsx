"use client";

import { useMemo } from "react";
import { Progress, Tooltip } from "@nextui-org/react";
import {
  ChevronsLeft,
  ChevronsRight,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";

import Button from "./form/button";
import MyTooltip from "./my-tooltip";

interface ControlsProps {
  sorting: boolean;
  sortingMode: SortingMode;
  step: number;
  steps: number;
  handleSort: (mode: SortingMode) => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handlePause: () => void;
  handleReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  sorting,
  sortingMode,
  step,
  steps,
  handleSort,
  handleNextStep,
  handlePrevStep,
  handlePause,
  handleReset,
}) => {
  const progress = useMemo(() => (step / steps) * 100, [step, steps]);
  const allSorted = step !== 0 && step === steps - 1;

  return (
    <div className="flex flex-col items-center gap-y-4 w-full">
      <Progress
        aria-label="progress"
        value={allSorted ? 100 : progress}
        color="success"
        className="bg-white"
      />

      <div className="bg-neutral-50 border-neutral-100 border shadow-md rounded-xl px-4 lg:px-6 py-4 w-full">
        <div className="relative flex justify-center items-center w-full">
          <div className="flex justify-center items-center gap-x-4 w-full">
            <MyTooltip
              placement="bottom"
              content="previous step"
              color="success"
              offset={15}
            >
              <Button
                circle
                bgColor="green"
                onClick={handlePrevStep}
                disabled={(sorting && sortingMode === "default") || step === 0}
              >
                <ChevronsLeft size={20} />
              </Button>
            </MyTooltip>
            {sorting && sortingMode === "default" ? (
              <MyTooltip
                placement="bottom"
                content="pause sorting"
                color="danger"
                offset={15}
              >
                <Button
                  circle
                  bgColor="red"
                  onClick={handlePause}
                  disabled={allSorted}
                >
                  <Pause size={20} />
                </Button>
              </MyTooltip>
            ) : (
              <MyTooltip
                placement="bottom"
                content="sort array"
                color="success"
                offset={15}
              >
                <Button
                  circle
                  bgColor="green"
                  onClick={() => handleSort("default")}
                  disabled={allSorted}
                >
                  <Play size={20} className="pl-px" />
                </Button>
              </MyTooltip>
            )}
            <MyTooltip
              placement="bottom"
              content="next step"
              color="success"
              offset={15}
            >
              <Button
                circle
                bgColor="green"
                onClick={handleNextStep}
                disabled={(sorting && sortingMode === "default") || allSorted}
              >
                <ChevronsRight size={20} />
              </Button>
            </MyTooltip>
          </div>
          <div className="absolute right-0">
            <MyTooltip
              placement="bottom"
              content="restart settings"
              color="danger"
              offset={15}
            >
              <Button circle bgColor="red" onClick={handleReset}>
                <RotateCcw size={20} />
              </Button>
            </MyTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
