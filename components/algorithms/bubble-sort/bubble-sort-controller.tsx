"use client";

import { useEffect, useState } from "react";

import { genArray, genColorModeArray } from "@/lib/utils";
import bubbleSort, { BubbleSortData } from "@/lib/algorithms/bubble-sort";
import BubbleSortConfig from "./bubble-sort-config";
import BubbleSortVisualizer from "./bubble-sort-visualizer";
import Console from "@/components/shared/console";
import Controls from "@/components/shared/controls";
import BarsInfo from "@/components/shared/bars-info";

const BubbleSortController = () => {
  const [loadingArray, setLoadingArray] = useState<boolean>(true);
  const [sorting, setSorting] = useState<boolean>(false);
  const [sortingMode, setSortingMode] = useState<SortingMode>("default");
  const [sortingTimeout, setSortingTimeout] = useState<
    NodeJS.Timeout | undefined
  >();

  const [arraySize, setArraySize] = useState<number>(25);
  const [maxValue, setMaxValue] = useState<number>(400);
  const [delay, setDelay] = useState<number>(0);
  const [array, setArray] = useState<number[]>(genArray(25, 400));
  const [colorArray, setColorArray] = useState<Color[]>(genColorModeArray(25));

  const [shuffledArray, setShuffledArray] = useState<boolean>(true);
  const [sortedArray, setSortedArray] = useState<boolean>(false);
  const [reversedArray, setReversedArray] = useState<boolean>(false);

  const [showValues, setShowValues] = useState<boolean>(false);
  const [colorMode, setColorMode] = useState<boolean>(false);
  const [steps, setSteps] = useState<BubbleSortData["steps"]>([[...array]]);
  const [step, setStep] = useState(0);
  const [colorSteps, setColorSteps] = useState<BubbleSortData["colorSteps"]>([
    [...colorArray],
  ]);
  const [colorStep, setColorStep] = useState(0);
  const [comparisons, setComparisons] = useState<BubbleSortData["comparisons"]>(
    [0]
  );
  const [sortedIdxs, setSortedIdxs] = useState<BubbleSortData["sortedIdxs"]>(
    []
  );

  const [numSwaps, setNumSwaps] = useState<number[]>([0]);

  const handleReset = () => {
    setLoadingArray(true);
    setSorting(false);
    setSortingMode("default");

    clearTimeout(sortingTimeout);
    setSortingTimeout(undefined);

    setArraySize(25);
    setMaxValue(400);
    setDelay(0);

    const newArray = genArray(25, 400);
    setArray(newArray);
    const newColorArray = genColorModeArray(25);
    setColorArray(newColorArray);

    setShuffledArray(true);
    setSortedArray(false);
    setReversedArray(false);

    setShowValues(false);
    setColorMode(false);
    setSteps([[...newArray]]);
    setStep(0);
    setColorSteps([[...newColorArray]]);
    setColorStep(0);
    setComparisons([0]);
    setSortedIdxs([]);

    setNumSwaps([0]);

    setLoadingArray(false);
  };

  const handleArraySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArraySize(Number(e.target.value));
  };

  const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxValue(Number(e.target.value));
  };

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(e.target.value));
  };

  const handleShowValuesChange = () => {
    setShowValues((prev) => !prev);
  };

  const handleColorModeChange = () => {
    setColorMode((prev) => !prev);
  };

  const handleShuffledArrayChange = () => {
    setShuffledArray(true);
    setSortedArray(false);
    setReversedArray(false);
    colorMode
      ? setColorArray(genColorModeArray(arraySize))
      : setArray(genArray(arraySize, maxValue));
  };

  const handleSortedArrayChange = () => {
    setSortedArray(true);
    setShuffledArray(false);
    setReversedArray(false);
    colorMode
      ? setColorArray((prev) => [...prev].sort((a, b) => a[1] - b[1]))
      : setArray((prev) => [...prev].sort((a, b) => a - b));
  };

  const handleReversedArrayChange = () => {
    setReversedArray(true);
    setShuffledArray(false);
    setSortedArray(false);
    colorMode
      ? setColorArray((prev) => [...prev].sort((a, b) => b[1] - a[1]))
      : setArray((prev) => [...prev].sort((a, b) => b - a));
  };

  const handleSort = (mode: SortingMode) => {
    setSorting(true);
    setSortingMode(mode);

    const data: BubbleSortData = colorMode
      ? bubbleSort(colorArray, true)
      : bubbleSort(array);

    const { steps, colorSteps, comparisons, sortedIdxs, numSwaps } = data;

    setSteps(steps);
    setStep(0);

    setColorSteps(colorSteps);
    setColorStep(0);

    setComparisons(comparisons);
    setSortedIdxs(sortedIdxs);

    setNumSwaps(numSwaps);
  };

  const handleNextStep = () => {
    (colorMode ? colorStep === 0 : step === 0) && handleSort("debug");
    colorMode ? setColorStep((prev) => prev + 1) : setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    colorMode ? setColorStep((prev) => prev - 1) : setStep((prev) => prev - 1);
  };

  const handlePause = () => {
    clearInterval(sortingTimeout);
    setSortingMode("debug");
  };

  useEffect(() => {
    if (arraySize > 100) setShowValues(false);
  }, [arraySize]);

  useEffect(() => {
    if (colorMode) setMaxValue(0);
    else setMaxValue(400);
  }, [colorMode]);

  useEffect(() => {
    colorMode
      ? setColorArray(genColorModeArray(arraySize, sortedArray, reversedArray))
      : setArray(genArray(arraySize, maxValue, sortedArray, reversedArray));
  }, [arraySize, maxValue]);

  useEffect(() => {
    if (step < steps.length) {
      setArray(steps[step]);
    }
  }, [steps, step]);

  useEffect(() => {
    if (colorStep < colorSteps.length) {
      setColorArray(colorSteps[colorStep]);
    }
  }, [colorSteps, colorStep]);

  useEffect(() => {
    if (sortingMode === "default") {
      const intervalId = setInterval(() => {
        if (colorMode) {
          setColorStep((prev) => {
            if (prev + 1 >= colorSteps.length) {
              setSorting(false);
              clearInterval(intervalId);
              return prev;
            } else {
              return prev + 1;
            }
          });
        } else {
          setStep((prev) => {
            if (prev + 1 >= steps.length) {
              setSorting(false);
              clearInterval(intervalId);
              return prev;
            } else {
              return prev + 1;
            }
          });
        }
      }, delay);

      setSortingTimeout(intervalId);
    }
  }, [steps, colorSteps]);

  useEffect(() => {
    setLoadingArray(false);
  }, []);

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center items-center lg:items-start gap-10 w-full">
      <div className="w-full lg:max-w-[400px] h-[685px]">
        <div className="flex flex-wrap lg:flex-nowrap lg:flex-col lg:items-center gap-8 bg-neutral-100 rounded-lg p-4 w-full h-full overflow-scroll">
          <BarsInfo />

          <BubbleSortConfig
            sorting={sorting}
            arraySize={arraySize}
            handleArraySizeChange={handleArraySizeChange}
            maxValue={maxValue}
            handleMaxValueChange={handleMaxValueChange}
            delay={delay}
            handleDelayChange={handleDelayChange}
            shuffledArray={shuffledArray}
            handleShuffledArrayChange={handleShuffledArrayChange}
            sortedArray={sortedArray}
            handleSortedArrayChange={handleSortedArrayChange}
            reversedArray={reversedArray}
            handleReversedArrayChange={handleReversedArrayChange}
            showValues={showValues}
            handleShowValuesChange={handleShowValuesChange}
            colorMode={colorMode}
            handleColorModeChange={handleColorModeChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-8 w-full">
        {colorMode ? (
          <BubbleSortVisualizer
            array={colorArray}
            colorMode
            steps={colorSteps}
            step={colorStep}
            comparisons={comparisons}
            sortedIdxs={sortedIdxs}
            showValues={showValues}
            loading={loadingArray}
          />
        ) : (
          <BubbleSortVisualizer
            array={array}
            steps={steps}
            step={step}
            comparisons={comparisons}
            sortedIdxs={sortedIdxs}
            maxValue={maxValue}
            showValues={showValues}
            loading={loadingArray}
          />
        )}

        <Console
          comparisons={colorMode ? colorStep : step}
          swaps={numSwaps[colorMode ? colorStep : step]}
        />

        <Controls
          sorting={sorting}
          sortingMode={sortingMode}
          step={colorMode ? colorStep : step}
          steps={colorMode ? colorSteps.length : steps.length}
          handleSort={handleSort}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
          handlePause={handlePause}
          handleReset={handleReset}
        />
      </div>
    </div>
  );
};

export default BubbleSortController;
