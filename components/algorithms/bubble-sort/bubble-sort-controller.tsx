"use client";

import { useEffect, useState, useReducer } from "react";

import { genArray, genColorArray } from "@/lib/utils";
import bubbleSort, { BubbleSortData } from "@/lib/algorithms/bubble-sort";
import BubbleSortConfig from "./bubble-sort-config";
import BubbleSortVisualizer from "./bubble-sort-visualizer";
import Console from "@/components/shared/console";
import Controls from "@/components/shared/controls";
import BarsInfo from "@/components/shared/bars-info";

type State = {
  isArrayLoading: boolean;
  array: number[];
  colorArray: ColorValue[];
  arraySize: number;
  maxValue: number;
  delay: number;
  sortingOrder: SortingOrder;
  colorSystem: ColorSystem;
  showValues: boolean;
  styleMode: StyleMode;
};

type Action =
  | { type: "SET_IS_ARRAY_LOADING"; payload: boolean }
  | { type: "SET_ARRAY"; payload: number[] }
  | { type: "SET_COLOR_ARRAY"; payload: ColorValue[] }
  | { type: "SET_ARRAY_SIZE"; payload: number }
  | { type: "SET_MAX_VALUE"; payload: number }
  | { type: "SET_DELAY"; payload: number }
  | { type: "SET_SORTING_ORDER"; payload: SortingOrder }
  | { type: "SET_COLOR_SYSTEM"; payload: ColorSystem }
  | { type: "TOGGLE_SHOW_VALUES" }
  | { type: "HIDE_VALUES" }
  | { type: "SET_STYLE_MODE"; payload: StyleMode }
  | { type: "RESET_STATE" };

const initialState: State = {
  isArrayLoading: true,
  array: genArray(25, 400),
  colorArray: genColorArray(25, "HEX"),
  arraySize: 25,
  maxValue: 400,
  delay: 0,
  sortingOrder: "shuffled",
  colorSystem: "HEX",
  showValues: false,
  styleMode: "default",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_IS_ARRAY_LOADING":
      return { ...state, isArrayLoading: action.payload };

    case "SET_ARRAY":
      return { ...state, array: action.payload };

    case "SET_COLOR_ARRAY":
      return { ...state, colorArray: action.payload };

    case "SET_ARRAY_SIZE":
      return { ...state, arraySize: action.payload };

    case "SET_MAX_VALUE":
      return { ...state, maxValue: action.payload };

    case "SET_DELAY":
      return { ...state, delay: action.payload };

    case "SET_SORTING_ORDER":
      return { ...state, sortingOrder: action.payload };

    case "SET_COLOR_SYSTEM":
      return { ...state, colorSystem: action.payload };

    case "TOGGLE_SHOW_VALUES":
      return { ...state, showValues: !state.showValues };

    case "HIDE_VALUES":
      return { ...state, showValues: false };

    case "SET_STYLE_MODE":
      return { ...state, style: action.payload };

    case "RESET_STATE":
      return initialState;

    default:
      throw new Error();
  }
};

const BubbleSortController = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [sorting, setSorting] = useState<boolean>(false);
  const [sortingMode, setSortingMode] = useState<SortingMode>("default");
  const [sortingTimeout, setSortingTimeout] = useState<
    NodeJS.Timeout | undefined
  >();

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
    setSorting(false);
    setSortingMode("default");

    clearTimeout(sortingTimeout);
    setSortingTimeout(undefined);

    setSteps([[...newArray]]);
    setStep(0);
    setColorSteps([[...newColorArray]]);
    setColorStep(0);
    setComparisons([0]);
    setSortedIdxs([]);

    setNumSwaps([0]);

    setLoadingArray(false);
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

  // ---------
  // FUNCTIONS
  // ---------

  const handleArraySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_ARRAY_SIZE", payload: Number(e.target.value) });
  };

  const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_MAX_VALUE", payload: Number(e.target.value) });
  };

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_DELAY", payload: Number(e.target.value) });
  };

  const handleSortingOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_SORTING_ORDER",
      payload: e.target.value as SortingOrder,
    });
  };

  const handleColorSystemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_COLOR_SYSTEM",
      payload: e.target.value as ColorSystem,
    });
  };

  const toggleShowValues = () => {
    dispatch({ type: "TOGGLE_SHOW_VALUES" });
  };

  const handleStyleModeChange = (styleMode: StyleMode) => {
    dispatch({ type: "SET_STYLE_MODE", payload: styleMode });
  };

  const handleReset = () => {
    dispatch({ type: "RESET_STATE" });
    dispatch({ type: "SET_IS_ARRAY_LOADING", payload: false });
  };

  // -----------
  // USE EFFECTS
  // -----------

  // sets isArrayLoading to false when component mounted
  useEffect(() => {
    dispatch({ type: "SET_IS_ARRAY_LOADING", payload: false });
  }, []);

  // sets array when sortingOrder changes
  useEffect(() => {
    let newArray: number[] = [...state.array];
    switch (state.sortingOrder) {
      case "shuffled":
        newArray = genArray(state.arraySize, state.maxValue);
        break;
      case "sorted":
        newArray.sort((a, b) => a - b);
        break;
      case "reversed":
        newArray.sort((a, b) => b - a);
        break;
    }

    dispatch({ type: "SET_ARRAY", payload: newArray });
  }, [state.sortingOrder]);

  // hides values (if necessary) when array size > 100
  useEffect(() => {
    if (state.arraySize > 100 && state.showValues) {
      dispatch({ type: "HIDE_VALUES" });
    }
  }, [state.arraySize]);

  // sets array when arraySize or maxValue change
  useEffect(() => {
    if (state.styleMode === "default") {
      dispatch({
        type: "SET_ARRAY",
        payload: genArray(state.arraySize, state.maxValue, state.sortingOrder),
      });
    }
  }, [state.arraySize, state.maxValue]);

  // sets colorArray when arraySize or colorSystem change
  useEffect(() => {
    if (state.styleMode === "color") {
      dispatch({
        type: "SET_COLOR_ARRAY",
        payload: genColorArray(state.arraySize, state.colorSystem),
      });
    }
  }, [state.arraySize, state.colorSystem]);

  // sets maxValue to 400 or 0 when styleMode changes to default or color respectively
  useEffect(() => {
    const payload = state.styleMode === "default" ? 400 : 0;
    dispatch({ type: "SET_MAX_VALUE", payload });
  }, [state.styleMode]);

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
      }, state.delay);

      setSortingTimeout(intervalId);
    }
  }, [steps, colorSteps]);

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center items-center lg:items-start gap-10 w-full">
      <div className="w-full lg:max-w-[400px] h-[685px]">
        <div className="flex flex-wrap lg:flex-nowrap lg:flex-col lg:items-center gap-8 bg-neutral-100 rounded-lg p-4 w-full h-full overflow-scroll">
          <BarsInfo />

          <BubbleSortConfig
            sorting={sorting}
            {...state}
            handleArraySizeChange={handleArraySizeChange}
            handleMaxValueChange={handleMaxValueChange}
            handleDelayChange={handleDelayChange}
            handleSortingOrderChange={handleSortingOrderChange}
            toggleShowValues={toggleShowValues}
            handleStyleModeChange={handleStyleModeChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-8 w-full">
        {state.styleMode === "default" ? (
          <BubbleSortVisualizer
            array={state.array}
            steps={steps}
            step={step}
            comparisons={comparisons}
            sortedIdxs={sortedIdxs}
            maxValue={state.maxValue}
            showValues={state.showValues}
            loading={state.isArrayLoading}
          />
        ) : (
          <BubbleSortVisualizer
            array={state.colorArray}
            colorMode
            steps={colorSteps}
            step={colorStep}
            comparisons={comparisons}
            sortedIdxs={sortedIdxs}
            showValues={state.showValues}
            loading={state.isArrayLoading}
          />
        )}

        <Console
          comparisons={state.styleMode === "default" ? step : colorStep}
          swaps={numSwaps[state.styleMode === "default" ? step : colorStep]}
        />

        <Controls
          sorting={sorting}
          sortingMode={sortingMode}
          step={state.styleMode === "default" ? step : colorStep}
          steps={
            state.styleMode === "default" ? steps.length : colorSteps.length
          }
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
