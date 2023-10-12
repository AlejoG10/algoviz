"use client";

import { useEffect, useMemo } from "react";
import { Progress } from "@nextui-org/react";
import {
  ChevronsLeft,
  ChevronsRight,
  Pause,
  Play,
  RefreshCcw,
  RotateCcw,
} from "lucide-react";

import { CircleButtonSkeleton } from "./skeletons";
import MyTooltip from "./my-tooltip";
import Button from "./form/button";

interface ControlsProps {
  sortingStatus: SortingStatus;
  stepIdx: number;
  stepsLength: number;
  isLoading: boolean;
  handleSort: () => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handlePause: () => void;
  handleNewArray: () => void;
  handleReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  sortingStatus,
  stepIdx,
  stepsLength,
  isLoading,
  handleSort,
  handleNextStep,
  handlePrevStep,
  handlePause,
  handleNewArray,
  handleReset,
}) => {
  const progress = useMemo(
    () => (stepIdx / stepsLength) * 100,
    [stepIdx, stepsLength]
  );
  const allSorted = stepIdx !== 0 && stepIdx >= stepsLength;

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "Enter") {
        if (sortingStatus !== "running") {
          !allSorted && handleSort();
        } else {
          !allSorted && handlePause();
        }
      } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        sortingStatus !== "running" && stepIdx > 0 && handlePrevStep();
      } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        sortingStatus !== "running" && !allSorted && handleNextStep();
      } else if (event.key === "Backspace") {
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNextStep, handlePrevStep]);

  return (
    <div className="flex flex-col items-center gap-y-4 w-full">
      <Progress
        aria-label="progress"
        value={allSorted ? 100 : progress}
        color="success"
        className={`bg-white ${isLoading && "animate-pulse"}`}
      />

      <div className="bg-neutral-50 border-neutral-100 border shadow-md rounded-xl px-4 lg:px-6 py-4 w-full">
        <div className="relative flex justify-center items-center w-full">
          <div className="absolute left-0">
            <MyTooltip
              placement="bottom"
              content="generate new array"
              color="danger"
              offset={15}
            >
              {isLoading ? (
                <CircleButtonSkeleton />
              ) : (
                <Button
                  circle
                  bgColor="red"
                  onClick={handleNewArray}
                  disabled={sortingStatus !== "idle"}
                >
                  <RefreshCcw size={20} />
                </Button>
              )}
            </MyTooltip>
          </div>
          <div className="flex justify-center items-center gap-x-4 w-full">
            <MyTooltip
              placement="bottom"
              content="previous step"
              color="success"
              offset={15}
            >
              {isLoading ? (
                <CircleButtonSkeleton />
              ) : (
                <Button
                  circle
                  bgColor="green"
                  onClick={handlePrevStep}
                  disabled={sortingStatus === "running" || stepIdx === 0}
                >
                  <ChevronsLeft size={20} />
                </Button>
              )}
            </MyTooltip>
            {sortingStatus === "running" ? (
              <MyTooltip
                placement="bottom"
                content="pause sorting"
                color="danger"
                offset={15}
              >
                {isLoading ? (
                  <CircleButtonSkeleton />
                ) : (
                  <Button
                    circle
                    bgColor="red"
                    onClick={handlePause}
                    disabled={allSorted}
                  >
                    <Pause size={20} />
                  </Button>
                )}
              </MyTooltip>
            ) : (
              <MyTooltip
                placement="bottom"
                content="sort array"
                color="success"
                offset={15}
              >
                {isLoading ? (
                  <CircleButtonSkeleton />
                ) : (
                  <Button
                    circle
                    bgColor="green"
                    onClick={handleSort}
                    disabled={allSorted}
                  >
                    <Play size={20} className="pl-px" />
                  </Button>
                )}
              </MyTooltip>
            )}
            <MyTooltip
              placement="bottom"
              content="next step"
              color="success"
              offset={15}
            >
              {isLoading ? (
                <CircleButtonSkeleton />
              ) : (
                <Button
                  circle
                  bgColor="green"
                  onClick={handleNextStep}
                  disabled={sortingStatus === "running" || allSorted}
                >
                  <ChevronsRight size={20} />
                </Button>
              )}
            </MyTooltip>
          </div>
          <div className="absolute right-0">
            <MyTooltip
              placement="bottom"
              content="restart settings"
              color="danger"
              offset={15}
            >
              {isLoading ? (
                <CircleButtonSkeleton />
              ) : (
                <Button circle bgColor="red" onClick={handleReset}>
                  <RotateCcw size={20} />
                </Button>
              )}
            </MyTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
