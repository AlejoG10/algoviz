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

import MyTooltip from "./my-tooltip";
import Button from "./form/button";

interface ControlsProps {
  sortingState: SortingState;
  step: number;
  steps: number;
  handleSort: () => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handlePause: () => void;
  handleReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  sortingState,
  step,
  steps,
  handleSort,
  handleNextStep,
  handlePrevStep,
  handlePause,
  handleReset,
}) => {
  const progress = useMemo(() => (step / steps) * 100, [step, steps]);
  const allSorted = step !== 0 && step >= steps;

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
                disabled={sortingState === "running" || step === 0}
              >
                <ChevronsLeft size={20} />
              </Button>
            </MyTooltip>
            {sortingState === "running" ? (
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
                  onClick={handleSort}
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
                disabled={sortingState === "running" || allSorted}
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
