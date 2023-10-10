export type SortingData = {
    sortingSteps: number[][],
    colorSortingSteps: ColorValue[][],
    comparisons: number[] | [number, number, number][];
    numSwaps: number[];
    sortedIdxs: number[];
}

export type SortingState = {
    sortingAlgo: SortingAlgo;
    array: number[];
    colorArray: ColorValue[];
    stepIdx: number;
    sortingSteps: number[][];
    colorSortingSteps: ColorValue[][];
    comparisons: number[] | [number, number, number][];
    numSwaps: number[];
    sortedIdxs: number[];
    arraySize: number;
    maxValue: number;
    delay: number;
    sortingOrder: SortingOrder;
    colorSystem: ColorSystem;
    showValues: boolean;
    styleMode: StyleMode;
    sortingStatus: SortingStatus;
    sortingTimeout: NodeJS.Timeout | undefined;
    isArrayLoading: boolean;
}

export type SortingAction =
    | { type: "SET_SORTING_ALGO"; payload: SortingAlgo }
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
    | { type: "SET_SORTING_STATE"; payload: SortingStatus }
    | { type: "SET_SORTING_TIMEOUT"; payload: NodeJS.Timeout | undefined }
    | { type: "SET_IS_ARRAY_LOADING"; payload: boolean }
    | {
        type: "SET_SORT_DATA";
        payload: {
            sortingSteps: number[][];
            colorSortingSteps: ColorValue[][];
            comparisons: number[] | [number, number, number][];
            numSwaps: number[];
            sortedIdxs: number[];
        };
    }
    | { type: "RESET_STATE", payload: SortingAlgo };
