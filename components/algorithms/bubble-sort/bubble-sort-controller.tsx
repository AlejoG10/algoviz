"use client";

import { useEffect, useState } from "react";

import { genArray, genColorModeArray } from "@/lib/utils";
import bubbleSort, { BubbleSortData } from "@/lib/algorithms/bubble-sort";
import BubbleSortSettings from "./bubble-sort-settings";
import BubbleSortVisualizer from "./bubble-sort-visualizer";
import Controls from "@/components/shared/controls";

const BubbleSortController = () => {
  const VISUALIZER_WIDTH = 800;
  const VISUALIZER_HEIGHT = 400;

  const [loadingArray, setLoadingArray] = useState(true);
  const [sorting, setSorting] = useState(false);
  const [arraySize, setArraySize] = useState<number>(50);
  const [maxValue, setMaxValue] = useState<number>(400);
  const [delay, setDelay] = useState<number>(0);
  const [array, setArray] = useState<number[]>(genArray(arraySize, maxValue));
  const [colorArray, setColorArray] = useState<Color[]>(
    genColorModeArray(arraySize)
  );
  const [sortedArray, setSortedArray] = useState<boolean>(false);
  const [reversedArray, setReversedArray] = useState<boolean>(false);
  const [showValues, setShowValues] = useState<boolean>(false);
  const [colorMode, setColorMode] = useState<boolean>(false);
  const [steps, setSteps] = useState<BubbleSortData["steps"]>([]);
  const [step, setStep] = useState(0);
  const [colorSteps, setColorSteps] = useState<BubbleSortData["colorSteps"]>(
    []
  );
  const [colorStep, setColorStep] = useState(0);
  const [comparisons, setComparisons] = useState<BubbleSortData["comparisons"]>(
    []
  );
  const [sortedIdxs, setSortedIdxs] = useState<BubbleSortData["sortedIdxs"]>(
    []
  );

  const handleReset = () => {
    setLoadingArray(true);
    setLoadingArray(false);
    setArraySize(50);
    setMaxValue(400);
    setDelay(0);
    setArray(genArray(50, 400));
    setColorArray(genColorModeArray(50));
    setSortedArray(false);
    setReversedArray(false);
    setShowValues(false);
    setColorMode(false);
    setSteps([]);
    setStep(0);
    setColorSteps([]);
    setColorStep(0);
    setComparisons([]);
    setSortedIdxs([]);
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

  const handleSortedArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setReversedArray(false);
      setSortedArray(true);
      colorMode
        ? setColorArray((prev) => [...prev].sort((a, b) => a[1] - b[1]))
        : setArray((prev) => [...prev].sort((a, b) => a - b));
    } else {
      setSortedArray(false);
      colorMode
        ? setColorArray(genColorModeArray(arraySize))
        : setArray(genArray(arraySize, maxValue));
    }
  };

  const handleReversedArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setSortedArray(false);
      setReversedArray(true);
      colorMode
        ? setColorArray((prev) => [...prev].sort((a, b) => b[1] - a[1]))
        : setArray((prev) => [...prev].sort((a, b) => b - a));
    } else {
      setReversedArray(false);
      colorMode
        ? setColorArray(genColorModeArray(arraySize))
        : setArray(genArray(arraySize, maxValue));
    }
  };

  const visualizeSort = (data: BubbleSortData) => {
    const { steps, colorSteps, comparisons, sortedIdxs } = data;

    setSteps(steps);
    setStep(0);

    setColorSteps(colorSteps);
    setColorStep(0);

    setComparisons(comparisons);
    setSortedIdxs(sortedIdxs);

    const intervalId = setInterval(() => {
      if (colorMode) {
        setColorStep((prev) => {
          if (prev + 1 >= colorSteps.length) {
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
  };

  const handleSort = () => {
    setSorting(true);
    const data: BubbleSortData = colorMode
      ? bubbleSort(colorArray, true)
      : bubbleSort(array);
    visualizeSort(data);
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
    setLoadingArray(false);
  }, []);

  return (
    <div className="flex flex-col xl:flex-row justify-center items-center xl:items-start gap-10 w-full">
      <div className="flex flex-col gap-y-8">
        {colorMode ? (
          <BubbleSortVisualizer
            width={VISUALIZER_WIDTH}
            height={VISUALIZER_HEIGHT}
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
            width={VISUALIZER_WIDTH}
            height={VISUALIZER_HEIGHT}
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

        <Controls
          sorting={sorting}
          step={colorMode ? colorStep : step}
          steps={colorMode ? colorSteps.length : steps.length}
          handleSort={handleSort}
          handleReset={handleReset}
        />
      </div>
      <BubbleSortSettings
        sorting={sorting}
        arraySize={arraySize}
        handleArraySizeChange={handleArraySizeChange}
        maxValue={maxValue}
        handleMaxValueChange={handleMaxValueChange}
        delay={delay}
        handleDelayChange={handleDelayChange}
        showValues={showValues}
        handleShowValuesChange={handleShowValuesChange}
        sortedArray={sortedArray}
        handleSortedArrayChange={handleSortedArrayChange}
        reversedArray={reversedArray}
        handleReversedArrayChange={handleReversedArrayChange}
        colorMode={colorMode}
        handleColorModeChange={handleColorModeChange}
      />
    </div>
  );
};

export default BubbleSortController;
