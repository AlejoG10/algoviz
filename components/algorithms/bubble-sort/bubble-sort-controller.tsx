"use client";

import { useEffect, useReducer } from "react";

import { genArray, genColorArray } from "@/lib/utils";
import bubbleSort, { BubbleSortData } from "@/lib/algorithms/bubble-sort";
import BarsInfo from "@/components/shared/bars-info";
import Console from "@/components/shared/console";
import Controls from "@/components/shared/controls";
import BubbleSortConfig from "./bubble-sort-config";
import BubbleSortVisualizer from "./bubble-sort-visualizer";

type State = {
  array: number[];
  colorArray: ColorValue[];
  stepIdx: number;
  sortingSteps: number[][];
  colorSortingSteps: ColorValue[][];
  comparisons: number[];
  numSwaps: number[];
  sortedIdxs: number[];
  arraySize: number;
  maxValue: number;
  delay: number;
  sortingOrder: SortingOrder;
  colorSystem: ColorSystem;
  showValues: boolean;
  styleMode: StyleMode;
  sortingState: SortingState;
  sortingTimeout: NodeJS.Timeout | undefined;
  isArrayLoading: boolean;
};

type Action =
  | { type: "SET_ARRAY"; payload: number[] }
  | { type: "SET_COLOR_ARRAY"; payload: ColorValue[] }
  | { type: "SET_ARRAY_SIZE"; payload: number }
  | { type: "NEXT_STEP_IDX" }
  | { type: "PREVIOUS_STEP_IDX" }
  | { type: "SET_SORTING_STEPS"; payload: number[][] }
  | { type: "SET_COLOR_SORTING_STEPS"; payload: ColorValue[][] }
  | { type: "SET_MAX_VALUE"; payload: number }
  | { type: "SET_DELAY"; payload: number }
  | { type: "SET_SORTING_ORDER"; payload: SortingOrder }
  | { type: "SET_COLOR_SYSTEM"; payload: ColorSystem }
  | { type: "TOGGLE_SHOW_VALUES" }
  | { type: "SET_STYLE_MODE"; payload: StyleMode }
  | { type: "SET_SORTING_STATE"; payload: SortingState }
  | { type: "SET_SORTING_TIMEOUT"; payload: NodeJS.Timeout | undefined }
  | { type: "SET_IS_ARRAY_LOADING"; payload: boolean }
  | {
      type: "SET_SORT_DATA";
      payload: {
        sortingSteps: number[][];
        colorSortingSteps: ColorValue[][];
        comparisons: number[];
        numSwaps: number[];
        sortedIdxs: number[];
      };
    }
  | { type: "RESET_STATE" };

const getInitialState = (): State => {
  // re-usable constants
  const arraySize = 25;
  const maxValue = 400;
  const colorSystem: ColorSystem = "HEX";
  const array = genArray(arraySize, maxValue);
  const colorArray = genColorArray(arraySize, colorSystem);

  return {
    array,
    colorArray,
    stepIdx: 0,
    sortingSteps: [[...array]],
    colorSortingSteps: [[...colorArray]],
    comparisons: [0],
    numSwaps: [0],
    sortedIdxs: [],
    arraySize,
    maxValue,
    delay: 0,
    sortingOrder: "shuffled",
    colorSystem,
    showValues: false,
    styleMode: "default",
    sortingState: "idle",
    sortingTimeout: undefined,
    isArrayLoading: true,
  };
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_ARRAY":
      return { ...state, array: action.payload };

    case "SET_COLOR_ARRAY":
      return { ...state, colorArray: action.payload };

    case "NEXT_STEP_IDX":
      return { ...state, stepIdx: state.stepIdx + 1 };

    case "PREVIOUS_STEP_IDX":
      return { ...state, stepIdx: state.stepIdx - 1 };

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

    case "SET_STYLE_MODE":
      return { ...state, styleMode: action.payload };

    case "SET_SORTING_STATE":
      return { ...state, sortingState: action.payload };

    case "SET_SORTING_TIMEOUT":
      return { ...state, sortingTimeout: action.payload };

    case "SET_IS_ARRAY_LOADING":
      return { ...state, isArrayLoading: action.payload };

    case "SET_SORT_DATA":
      return {
        ...state,
        isArrayLoading: false,
        stepIdx: 0,
        sortingSteps: action.payload.sortingSteps,
        colorSortingSteps: action.payload.colorSortingSteps,
        comparisons: action.payload.comparisons,
        numSwaps: action.payload.numSwaps,
        sortedIdxs: action.payload.sortedIdxs,
      };

    case "RESET_STATE":
      return getInitialState();

    default:
      throw new Error();
  }
};

const BubbleSortController = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  // ---------
  // FUNCTIONS
  // ---------

  // -------
  // HELPERS
  // -------

  const handleConfigChange = () => {
    dispatch({
      type: "SET_SORT_DATA",
      payload: {
        sortingSteps: [[...state.array]],
        colorSortingSteps: [[...state.colorArray]],
        comparisons: [0],
        numSwaps: [0],
        sortedIdxs: [],
      },
    });
  };

  const increaseSteps = () => {
    const intervalId = setInterval(() => {
      dispatch({ type: "NEXT_STEP_IDX" });
    }, state.delay);

    dispatch({ type: "SET_SORTING_TIMEOUT", payload: intervalId });
  };

  const executeBubbleSort = (): BubbleSortData => {
    const bubbleSortData: BubbleSortData =
      state.styleMode === "default"
        ? bubbleSort([...state.array])
        : bubbleSort([...state.colorArray], true);

    return bubbleSortData;
  };

  // --------
  // HANDLERS
  // --------

  const handleArraySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_ARRAY_SIZE", payload: Number(e.target.value) });
  };

  const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_MAX_VALUE", payload: Number(e.target.value) });
  };

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_DELAY", payload: Number(e.target.value) });
  };

  const handleSortingOrderChange = (sortingOrder: SortingOrder) => {
    dispatch({ type: "SET_SORTING_ORDER", payload: sortingOrder });
  };

  const handleColorSystemChange = (colorSystem: ColorSystem) => {
    dispatch({ type: "SET_COLOR_SYSTEM", payload: colorSystem });
  };

  const toggleShowValues = () => {
    dispatch({ type: "TOGGLE_SHOW_VALUES" });
  };

  const handleStyleModeChange = (styleMode: StyleMode) => {
    dispatch({ type: "SET_STYLE_MODE", payload: styleMode });
  };

  const handleSort = () => {
    // first case: sort from beginning
    if (state.sortingState === "idle") {
      const bubbleSortData = executeBubbleSort();
      dispatch({
        type: "SET_SORT_DATA",
        payload: { ...bubbleSortData },
      });
    }

    // second case: sort from debug
    else if (state.sortingState === "debug") {
      increaseSteps();
    }

    dispatch({ type: "SET_SORTING_STATE", payload: "running" });
  };

  const handlePause = () => {
    dispatch({ type: "SET_SORTING_STATE", payload: "debug" });
  };

  const handleNextStep = () => {
    // case: nextStep from beginning
    if (state.sortingState === "idle") {
      const bubbleSortData = executeBubbleSort();
      dispatch({
        type: "SET_SORT_DATA",
        payload: { ...bubbleSortData },
      });
    }

    state.sortingState !== "debug" &&
      dispatch({ type: "SET_SORTING_STATE", payload: "debug" });
    dispatch({ type: "NEXT_STEP_IDX" });
  };

  const handlePrevStep = () => {
    state.sortingState !== "debug" &&
      dispatch({ type: "SET_SORTING_STATE", payload: "debug" });
    dispatch({ type: "PREVIOUS_STEP_IDX" });
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

  // sets array (or colorArray) when sortingOrder changes
  useEffect(() => {
    state.stepIdx > 0 && handleConfigChange();

    if (state.styleMode === "default") {
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
    } else {
      let newArray: ColorValue[] = [...state.colorArray];
      switch (state.sortingOrder) {
        case "shuffled":
          newArray = genColorArray(state.arraySize, state.colorSystem);
          break;
        case "sorted":
          newArray.sort((a, b) => a[1] - b[1]);
          break;
        case "reversed":
          newArray.sort((a, b) => b[1] - a[1]);
          break;
      }
      dispatch({ type: "SET_COLOR_ARRAY", payload: newArray });
    }
  }, [state.sortingOrder]);

  // hides values (if necessary) when array size > 100
  useEffect(() => {
    state.stepIdx > 0 && handleConfigChange();

    if (state.arraySize > 100 && state.showValues) {
      dispatch({ type: "TOGGLE_SHOW_VALUES" });
    }
  }, [state.arraySize]);

  // sets array when arraySize or maxValue change
  useEffect(() => {
    state.stepIdx > 0 && handleConfigChange();

    if (state.styleMode === "default") {
      dispatch({
        type: "SET_ARRAY",
        payload: genArray(state.arraySize, state.maxValue, state.sortingOrder),
      });
    }
  }, [state.arraySize, state.maxValue]);

  // sets colorArray when arraySize or colorSystem change
  useEffect(() => {
    state.stepIdx > 0 && handleConfigChange();

    if (state.styleMode === "color") {
      dispatch({
        type: "SET_COLOR_ARRAY",
        payload: genColorArray(
          state.arraySize,
          state.colorSystem,
          state.sortingOrder
        ),
      });
    }
  }, [state.arraySize, state.colorSystem]);

  // sets maxValue to 400 or 0 when styleMode changes to default or color respectively
  useEffect(() => {
    state.stepIdx > 0 && handleConfigChange();

    const payload = state.styleMode === "default" ? 400 : 0;
    dispatch({ type: "SET_MAX_VALUE", payload });
  }, [state.styleMode]);

  // generates a new array (or colorArray), based on the current configs, when styleMode changes
  useEffect(() => {
    if (state.styleMode === "default") {
      const array: number[] = genArray(
        state.arraySize,
        state.maxValue,
        state.sortingOrder
      );

      dispatch({ type: "SET_ARRAY", payload: array });
    } else {
      const array: ColorValue[] = genColorArray(
        state.arraySize,
        state.colorSystem,
        state.sortingOrder
      );
      dispatch({ type: "SET_COLOR_ARRAY", payload: array });
    }
  }, [state.styleMode]);

  // removes sortingTimeout interval when state !== running
  useEffect(() => {
    if (state.sortingState !== "running") {
      clearInterval(state.sortingTimeout);
      dispatch({ type: "SET_SORTING_TIMEOUT", payload: undefined });
    }
  }, [state.sortingState]);

  // calls increaseSteps()
  useEffect(() => {
    if (state.sortingState === "running") {
      increaseSteps();
      console.log(state.sortingSteps);
    }
  }, [state.sortingSteps, state.colorSortingSteps]);

  // updates array (or colorArray) when stepIdx is updated
  useEffect(() => {
    const stepsLength =
      state.styleMode === "default"
        ? state.sortingSteps.length
        : state.colorSortingSteps.length;

    if (state.stepIdx < stepsLength) {
      if (state.styleMode === "default") {
        dispatch({
          type: "SET_ARRAY",
          payload: state.sortingSteps[state.stepIdx],
        });
      } else {
        dispatch({
          type: "SET_COLOR_ARRAY",
          payload: state.colorSortingSteps[state.stepIdx],
        });
      }
    } else {
      dispatch({ type: "SET_SORTING_STATE", payload: "idle" });
    }

    console.log(state.stepIdx);
    console.log(state.sortingSteps);
  }, [state.stepIdx]);

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center items-center lg:items-start gap-10 w-full">
      <div className="w-full lg:max-w-[400px] h-[685px]">
        <div className="flex flex-wrap lg:flex-nowrap lg:flex-col lg:items-center gap-8 bg-neutral-100 rounded-lg p-4 w-full h-full overflow-scroll">
          <BarsInfo />

          <BubbleSortConfig
            isSorting={state.sortingState !== "idle"}
            arraySize={state.arraySize}
            handleArraySizeChange={handleArraySizeChange}
            maxValue={state.maxValue}
            handleMaxValueChange={handleMaxValueChange}
            delay={state.delay}
            handleDelayChange={handleDelayChange}
            sortingOrder={state.sortingOrder}
            handleSortingOrderChange={handleSortingOrderChange}
            colorSystem={state.colorSystem}
            handleColorSystemChange={handleColorSystemChange}
            showValues={state.showValues}
            toggleShowValues={toggleShowValues}
            styleMode={state.styleMode}
            handleStyleModeChange={handleStyleModeChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-8 w-full">
        {state.styleMode === "default" ? (
          <BubbleSortVisualizer
            array={state.array}
            stepIdx={state.stepIdx}
            stepsLength={state.sortingSteps.length}
            comparisons={state.comparisons}
            sortedIdxs={state.sortedIdxs}
            maxValue={state.maxValue}
            showValues={state.showValues}
            loading={state.isArrayLoading}
          />
        ) : (
          <BubbleSortVisualizer
            colorSystem={state.colorSystem}
            array={state.colorArray}
            stepIdx={state.stepIdx}
            stepsLength={state.colorSortingSteps.length}
            comparisons={state.comparisons}
            sortedIdxs={state.sortedIdxs}
            showValues={state.showValues}
            loading={state.isArrayLoading}
          />
        )}

        <Console
          comparisons={state.stepIdx}
          swaps={state.numSwaps[state.stepIdx]}
        />

        <Controls
          sortingState={state.sortingState}
          step={state.stepIdx}
          steps={
            state.styleMode === "default"
              ? state.sortingSteps.length
              : state.colorSortingSteps.length
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
