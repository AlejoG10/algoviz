"use client";

import { useEffect, useReducer } from "react";

import { SortingData } from "@/types/sorting";
import sortingReducer, { getInitialState } from "@/reducers/sortingReducer";
import { genArray, genColorArray } from "@/lib/utils";
import { BubbleSort, InsertionSort, SelectionSort } from "@/lib/algorithms";
import ControllerContainer from "@/components/shared/containers/controller-container";
import SidebarContainer from "@/components/shared/containers/sidebar-container";
import PlaygroundContainer from "@/components/shared/containers/playground-container";
import ColorIndex from "@/components/shared/color-index";
import Console from "@/components/shared/console";
import Controls from "@/components/shared/controls";
import SortingConfig from "./sorting-config";
import SortingVisualizer from "./sorting-visualizer";

interface SortingControllerProps {
  sortingAlgo: SortingAlgo;
}

const SortingController: React.FC<SortingControllerProps> = ({
  sortingAlgo,
}) => {
  const [state, dispatch] = useReducer(
    sortingReducer,
    getInitialState(sortingAlgo)
  );

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

  const executeBubbleSort = (): SortingData => {
    const bubbleSort = new BubbleSort();
    return state.styleMode === "default"
      ? bubbleSort.sort([...state.array])
      : bubbleSort.sort([...state.colorArray], true);
  };

  const executeSelectionSort = (): SortingData => {
    const selectionSort = new SelectionSort();
    return state.styleMode === "default"
      ? selectionSort.sort([...state.array])
      : selectionSort.sort([...state.colorArray], true);
  };

  const executeInsertionSort = (): SortingData => {
    const insertionSort = new InsertionSort();
    return state.styleMode === "default"
      ? insertionSort.sort([...state.array])
      : insertionSort.sort([...state.colorArray], true);
  };

  const executeAlgorithm = (): SortingData => {
    let data: SortingData;

    switch (state.sortingAlgo) {
      case "bubble-sort":
        data = executeBubbleSort();
        break;

      case "selection-sort":
        data = executeSelectionSort();
        break;

      case "insertion-sort":
        data = executeInsertionSort();
    }

    return data;
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
    if (state.sortingStatus === "idle") {
      const sortingData = executeAlgorithm();
      dispatch({
        type: "SET_SORT_DATA",
        payload: { ...sortingData },
      });
    }

    // second case: sort from debug
    else if (state.sortingStatus === "debug") {
      increaseSteps();
    }

    dispatch({ type: "SET_SORTING_STATE", payload: "running" });
  };

  const handlePause = () => {
    dispatch({ type: "SET_SORTING_STATE", payload: "debug" });
  };

  const handleNextStep = () => {
    // case: nextStep from beginning
    if (state.sortingStatus === "idle") {
      const sortingData = executeAlgorithm();
      dispatch({
        type: "SET_SORT_DATA",
        payload: { ...sortingData },
      });
    }

    state.sortingStatus !== "debug" &&
      dispatch({ type: "SET_SORTING_STATE", payload: "debug" });
    dispatch({ type: "NEXT_STEP_IDX" });
  };

  const handlePrevStep = () => {
    state.sortingStatus !== "debug" &&
      dispatch({ type: "SET_SORTING_STATE", payload: "debug" });
    dispatch({ type: "PREVIOUS_STEP_IDX" });
  };

  const handleReset = () => {
    dispatch({ type: "RESET_STATE", payload: state.sortingAlgo });
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
    if (state.sortingStatus !== "running") {
      clearInterval(state.sortingTimeout);
      dispatch({ type: "SET_SORTING_TIMEOUT", payload: undefined });
    }
  }, [state.sortingStatus]);

  // calls increaseSteps()
  useEffect(() => {
    if (state.sortingStatus === "running") {
      increaseSteps();
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
  }, [state.stepIdx]);

  return (
    <ControllerContainer>
      <SidebarContainer>
        <ColorIndex algo={state.sortingAlgo} isLoading={state.isArrayLoading} />
        <SortingConfig
          sortingStatus={state.sortingStatus}
          arraySize={state.arraySize}
          maxValue={state.maxValue}
          delay={state.delay}
          sortingOrder={state.sortingOrder}
          colorSystem={state.colorSystem}
          styleMode={state.styleMode}
          showValues={state.showValues}
          isLoading={state.isArrayLoading}
          handleArraySizeChange={handleArraySizeChange}
          handleMaxValueChange={handleMaxValueChange}
          handleDelayChange={handleDelayChange}
          handleSortingOrderChange={handleSortingOrderChange}
          handleColorSystemChange={handleColorSystemChange}
          toggleShowValues={toggleShowValues}
          handleStyleModeChange={handleStyleModeChange}
        />
      </SidebarContainer>
      <PlaygroundContainer>
        {state.styleMode === "default" ? (
          <SortingVisualizer
            sortingAlgo={state.sortingAlgo}
            array={state.array}
            stepIdx={state.stepIdx}
            stepsLength={state.sortingSteps.length}
            comparisons={state.comparisons}
            sortedIdxs={state.sortedIdxs}
            maxValue={state.maxValue}
            showValues={state.showValues}
            isLoading={state.isArrayLoading}
          />
        ) : (
          <SortingVisualizer
            sortingAlgo={state.sortingAlgo}
            array={state.colorArray}
            colorSystem={state.colorSystem}
            stepIdx={state.stepIdx}
            stepsLength={state.sortingSteps.length}
            comparisons={state.comparisons}
            sortedIdxs={state.sortedIdxs}
            showValues={state.showValues}
            isLoading={state.isArrayLoading}
          />
        )}

        <Console
          comparisons={state.stepIdx}
          swaps={state.numSwaps[state.stepIdx]}
          isLoading={state.isArrayLoading}
        />

        <Controls
          sortingStatus={state.sortingStatus}
          stepIdx={state.stepIdx}
          stepsLength={
            state.styleMode === "default"
              ? state.sortingSteps.length
              : state.colorSortingSteps.length
          }
          isLoading={state.isArrayLoading}
          handleSort={handleSort}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
          handlePause={handlePause}
          handleReset={handleReset}
        />
      </PlaygroundContainer>
    </ControllerContainer>
  );
};

export default SortingController;
