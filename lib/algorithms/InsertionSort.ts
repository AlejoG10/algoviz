import { SortingData } from "@/types/sorting";
import { swap } from "./utils";
import Algorithm from "./Algorithm";

class InsertionSort implements Algorithm {
    sort(array: number[] | ColorValue[], colorMode?: boolean): SortingData {
        let sortingSteps: number[][] = [];
        let colorSortingSteps: ColorValue[][] = [];
        let comparisons: number[] = [];
        let numSwapsCounter: number = 0;
        let numSwaps: number[] = [numSwapsCounter];
        let sortedIdxs: number[] = [];

        // TODO: implement algorithm

        return {
            sortingSteps,
            colorSortingSteps,
            comparisons,
            numSwaps,
            sortedIdxs
        };
    }

    isSwappingItem(): boolean { return false; }

    isCurrentMin(): boolean { return false; }

    isCurrentMax(): boolean { return false; }

    isPossibleMinOrMax(): boolean { return false; }

    isSorted(): boolean { return false; }
}

export default InsertionSort;
