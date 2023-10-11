import { SortingState, SortingAction, SortingData } from "@/types/sorting";
import { genArray, genColorArray } from "@/lib/utils";

export const getInitialState = (sortingAlgo: SortingAlgo): SortingState => {
    // re-usable constants
    const arraySize = 25;
    const maxValue = 400;
    const colorSystem: ColorSystem = "HEX";
    const array: number[] = genArray(arraySize, maxValue);
    const colorArray: ColorValue[] = genColorArray(arraySize, colorSystem);
    let comparisons: SortingData["comparisons"];
    switch (sortingAlgo) {
        case "bubble-sort":
            comparisons = [0]
            break;
        case "selection-sort":
            comparisons = [[0, 0, 1]]
            break;
        case "insertion-sort":
            comparisons = [1]
            break;
    }

    return {
        sortingAlgo,
        array,
        colorArray,
        stepIdx: 0,
        sortingSteps: [[...array]],
        colorSortingSteps: [[...colorArray]],
        comparisons,
        numSwaps: [0],
        sortedIdxs: [],
        arraySize,
        maxValue,
        delay: 0,
        sortingOrder: "shuffled",
        colorSystem,
        showValues: false,
        styleMode: "default",
        sortingStatus: "idle",
        sortingTimeout: undefined,
        isArrayLoading: true,
    };
};

const sortingReducer = (state: SortingState, action: SortingAction) => {
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
            return { ...state, sortingStatus: action.payload };

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
            return getInitialState(action.payload);

        default:
            throw new Error();
    }
};

export default sortingReducer;
