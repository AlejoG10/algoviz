import { genArray, genColorArray } from "@/lib/utils";

export type SortingState = {
    sortingAlgo: SortingAlgo;
    array: number[];
    colorArray: ColorValue[];
    stepIdx: number;
    arraySize: number;
    maxValue: number;
    delay: number;
    sortingOrder: SortingOrder;
    colorSystem: ColorSystem;
    showValues: boolean;
    styleMode: StyleMode;
    sortingStatus: SortingStatus;
    sortingTimeout: NodeJS.Timeout | undefined;
}

export type SortingAction =
    | { type: "SET_ARRAY"; payload: number[] }
    | { type: "SET_COLOR_ARRAY"; payload: ColorValue[] }
    | { type: "SET_ARRAY_SIZE"; payload: number }
    | { type: "RESET_STEP_IDX" }
    | { type: "NEXT_STEP_IDX" }
    | { type: "PREVIOUS_STEP_IDX" }
    | { type: "SET_MAX_VALUE"; payload: number }
    | { type: "SET_DELAY"; payload: number }
    | { type: "SET_SORTING_ORDER"; payload: SortingOrder }
    | { type: "SET_COLOR_SYSTEM"; payload: ColorSystem }
    | { type: "TOGGLE_SHOW_VALUES" }
    | { type: "SET_STYLE_MODE"; payload: StyleMode }
    | { type: "SET_SORTING_STATE"; payload: SortingStatus }
    | { type: "SET_SORTING_TIMEOUT"; payload: NodeJS.Timeout | undefined }
    | { type: "RESET_STATE" };

export const getInitialState = (sortingAlgo: SortingAlgo): SortingState => {
    // re-usable constants
    const arraySize = 32;
    const maxValue = 400;
    const colorSystem: ColorSystem = "HEX";
    const array: number[] = genArray(arraySize, maxValue);
    const colorArray: ColorValue[] = genColorArray(arraySize, colorSystem);

    return {
        sortingAlgo,
        array,
        colorArray,
        stepIdx: 0,
        arraySize,
        maxValue,
        delay: 0,
        sortingOrder: "shuffled",
        colorSystem,
        showValues: false,
        styleMode: "default",
        sortingStatus: "idle",
        sortingTimeout: undefined,
    };
};

const reducer = (state: SortingState, action: SortingAction) => {
    switch (action.type) {
        case "SET_ARRAY":
            return { ...state, array: action.payload };

        case "SET_COLOR_ARRAY":
            return { ...state, colorArray: action.payload };

        case "RESET_STEP_IDX":
            return { ...state, stepIdx: 0 };

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
            return { ...state, sortingStatus: action.payload };

        case "SET_SORTING_TIMEOUT":
            return { ...state, sortingTimeout: action.payload };

        case "RESET_STATE":
            return getInitialState(state.sortingAlgo);

        default: throw new Error();
    }
};

export default reducer;
