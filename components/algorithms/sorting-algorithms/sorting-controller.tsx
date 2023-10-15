"use client";

import { useEffect, useMemo, useReducer, useState } from "react";

import reducer, { getInitialState } from "@/reducers/sortingReducer";
import { genArray, genColorArray } from "@/lib/utils";
import Algorithm from "@/lib/algorithms/Algorithm";
import {
  BubbleSort,
  InsertionSort,
  MergeSort,
  QuickSort,
  SelectionSort,
} from "@/lib/algorithms";
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

// TODO: add toaster alerts
const SortingController: React.FC<SortingControllerProps> = ({
  sortingAlgo,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, getInitialState(sortingAlgo));

  const algoIdMap: Record<any, Algorithm> = {
    "bubble-sort": new BubbleSort(),
    "selection-sort": new SelectionSort(),
    "insertion-sort": new InsertionSort(),
    "merge-sort": new MergeSort(),
    "quick-sort": new QuickSort(),
  };

  const algorithm: Algorithm = useMemo(
    () => algoIdMap[state.sortingAlgo],
    [state.sortingAlgo]
  );

  // ---------
  // FUNCTIONS
  // ---------

  // -------
  // HELPERS
  // -------

  const increaseSteps = () => {
    const intervalId = setInterval(() => {
      dispatch({ type: "NEXT_STEP_IDX" });
    }, state.delay);

    dispatch({ type: "SET_SORTING_TIMEOUT", payload: intervalId });
  };

  const executeAlgorithm = () => {
    algorithm.resetAttributes();
    if (state.styleMode === "default") {
      let arrayCopy = [...state.array];

      if (state.sortingAlgo === "merge-sort") {
        arrayCopy = algorithm.sort(arrayCopy) as number[];
      } else {
        algorithm.sort(arrayCopy);
      }

      dispatch({ type: "SET_ARRAY", payload: algorithm.getStepAtIdx(0) });
    } else {
      let arrayCopy = [...state.colorArray];

      if (state.sortingAlgo === "merge-sort") {
        arrayCopy = algorithm.sortColors(arrayCopy) as ColorValue[];
      } else {
        algorithm.sortColors(arrayCopy);
      }
      dispatch({
        type: "SET_COLOR_ARRAY",
        payload: algorithm.getColorStepAtIdx(0),
      });
    }

    increaseSteps();
  };

  const handleConfigChange = () => {
    algorithm.resetAttributes();
    dispatch({ type: "RESET_STEP_IDX" });
  };

  // --------
  // HANDLERS
  // --------

  const handleArraySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_ARRAY_SIZE", payload: Number(e.target.value) });
  };

  const adjustPower2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    var value = parseInt(e.target.value, 10);
    var power = Math.round(Math.log2(value));
    var adjusted = Math.pow(2, power);
    dispatch({ type: "SET_ARRAY_SIZE", payload: Number(adjusted) });
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
      executeAlgorithm();
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
      executeAlgorithm();
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

  const handleNewArray = () => {
    handleConfigChange();
    if (state.styleMode === "default") {
      dispatch({
        type: "SET_ARRAY",
        payload: genArray(state.arraySize, state.maxValue, state.sortingOrder),
      });
    } else {
      dispatch({
        type: "SET_COLOR_ARRAY",
        payload: genColorArray(
          state.arraySize,
          state.colorSystem,
          state.sortingOrder
        ),
      });
    }
  };

  const handleReset = () => {
    setIsLoading(true);

    algorithm.resetAttributes();
    clearInterval(state.sortingTimeout);
    dispatch({ type: "RESET_STATE" });

    setIsLoading(false);
  };

  // -----------
  // USE EFFECTS
  // -----------

  // sets isLoading to false when component mounts
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // sets array (or colorArray) when sortingOrder changes
  useEffect(() => {
    handleConfigChange();
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
    handleConfigChange();
    if (state.arraySize > 100 && state.showValues) {
      dispatch({ type: "TOGGLE_SHOW_VALUES" });
    }
  }, [state.arraySize]);

  // sets array when arraySize or maxValue change
  useEffect(() => {
    handleConfigChange();
    if (state.styleMode === "default") {
      dispatch({
        type: "SET_ARRAY",
        payload: genArray(state.arraySize, state.maxValue, state.sortingOrder),
      });
    }
  }, [state.arraySize, state.maxValue]);

  // sets colorArray when arraySize or colorSystem change
  useEffect(() => {
    handleConfigChange();
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
    handleConfigChange();
    const payload = state.styleMode === "default" ? 400 : 0;
    dispatch({ type: "SET_MAX_VALUE", payload });
  }, [state.styleMode]);

  // generates a new array (or colorArray), based on the current configs, when styleMode changes
  useEffect(() => {
    handleConfigChange();
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

  // updates array (or colorArray) when stepIdx is updated
  useEffect(() => {
    const stepsLength = algorithm.getStepsLength(state.styleMode === "color");

    if (state.stepIdx < stepsLength) {
      if (state.styleMode === "default") {
        dispatch({
          type: "SET_ARRAY",
          payload: algorithm.getStepAtIdx(state.stepIdx),
        });
      } else {
        dispatch({
          type: "SET_COLOR_ARRAY",
          payload: algorithm.getColorStepAtIdx(state.stepIdx),
        });
      }
    } else {
      dispatch({ type: "SET_SORTING_STATE", payload: "idle" });
    }
  }, [state.stepIdx]);

  return (
    <ControllerContainer>
      <SidebarContainer>
        <ColorIndex algo={state.sortingAlgo} isLoading={isLoading} />
        <SortingConfig
          sortingAlgo={state.sortingAlgo}
          sortingStatus={state.sortingStatus}
          arraySize={state.arraySize}
          maxValue={state.maxValue}
          delay={state.delay}
          sortingOrder={state.sortingOrder}
          colorSystem={state.colorSystem}
          styleMode={state.styleMode}
          showValues={state.showValues}
          isLoading={isLoading}
          handleArraySizeChange={handleArraySizeChange}
          adjustPower2={adjustPower2}
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
            algorithm={algorithm}
            array={state.array}
            stepIdx={state.stepIdx}
            maxValue={state.maxValue}
            showValues={state.showValues}
            isLoading={isLoading}
          />
        ) : (
          <SortingVisualizer
            sortingAlgo={state.sortingAlgo}
            algorithm={algorithm}
            array={state.colorArray}
            colorSystem={state.colorSystem}
            stepIdx={state.stepIdx}
            showValues={state.showValues}
            isLoading={isLoading}
          />
        )}
        <Controls
          sortingStatus={state.sortingStatus}
          stepIdx={state.stepIdx}
          stepsLength={algorithm.getStepsLength(state.styleMode === "color")}
          isLoading={isLoading}
          handleSort={handleSort}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
          handlePause={handlePause}
          handleNewArray={handleNewArray}
          handleReset={handleReset}
        />
        <Console
          swaps={algorithm.getNumSwapsAtIdx(state.stepIdx)}
          isLoading={isLoading}
        />
      </PlaygroundContainer>
    </ControllerContainer>
  );
};

export default SortingController;
