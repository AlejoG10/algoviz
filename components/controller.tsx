"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { genArray } from "@/lib/utils";
import bubbleSort from "@/lib/algorithms/bubble-sort";
import Filters from "./filters";
import Container from "./container";
import Options from "./options";

const Controller = () => {
  const searchParams = useSearchParams();

  const [loadingArray, setLoadingArray] = useState<boolean>(true);

  const [step, setStep] = useState<number>(0);
  const [steps, setSteps] = useState<number[][]>([]);

  const handleReset = () => {
    setLoadingArray(true);
    setArraySize(50);
    setMaxValue(400);
    setArray(genArray(arraySize, maxValue));
    setStep(0);
    setSteps([]);
    setShowValues(false);
    setSorted(false);
    setReversed(false);
    setLoadingArray(false);
  };


  useEffect(() => {
    if (step < steps.length) {
      setArray(steps[step]);
    }
  }, [step, steps]);

  const animateSort = (steps: number[][]) => {
    setSteps(steps);
    setStep(0);

    const intervalId = setInterval(() => {
      setStep((prev) => {
        if (prev + 1 >= steps.length) {
          clearInterval(intervalId);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleSort = () => {
    const algo = searchParams.get("algo");
    let steps: number[][] = [];

    switch (algo) {
      case "bubble-sort":
        steps = bubbleSort(array);
        break;
      default:
        alert("Error");
    }

    animateSort(steps);
  };

  return (
    <div className="flex justify-center items-end gap-x-16">
      <div className="flex flex-col gap-y-6">
        <Filters />
        <Container
          width={800}
          height={400}
          array={array}
          step={step}
          maxValue={maxValue}
          showValues={showValues}
          loading={loadingArray}
        />
      </div>
      <Options
        arraySize={arraySize}
        handleArraySizeChange={handleArraySizeChange}
        maxValue={maxValue}
        handleMaxValueChange={handleMaxValueChange}
        showValues={showValues}
        handleShowValuesChange={handleShowValuesChange}
        sorted={sorted}
        handleSortedChange={handleSortedChange}
        reversed={reversed}
        handleReversedChange={handleReversedChange}
        handleReset={handleReset}
        handleSort={handleSort}
      />
    </div>
  );
};

export default Controller;
