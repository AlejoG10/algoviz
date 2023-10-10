import { SortingData } from "@/types/sorting";
import { swap } from "./utils";
import Algorithm from "./Algorithm";

class BubbleSort implements Algorithm {
    sort(array: number[] | ColorValue[], colorMode?: boolean): SortingData {
        let sortingSteps: number[][] = [];
        let colorSortingSteps: ColorValue[][] = [];
        let comparisons: number[] = [];
        let numSwapsCounter: number = 0;
        let numSwaps: number[] = [numSwapsCounter];
        let sortedIdxs: number[] = [];

        for (let i = 0; i < array.length; i++) {
            for (let j = 1; j < array.length - i; j++) {
                if (colorMode) {
                    colorSortingSteps.push([...array as ColorValue[]]);
                    const colorArray = array as ColorValue[];
                    if (colorArray[j - 1][1] > colorArray[j][1]) {
                        swap(array as ColorValue[], j - 1, j);
                        numSwapsCounter++;
                    }
                } else {
                    sortingSteps.push([...array as number[]]);
                    if (array[j - 1] > array[j]) {
                        swap(array as number[], j - 1, j);
                        numSwapsCounter++;
                    }
                }
                comparisons.push(j - 1);
                numSwaps.push(numSwapsCounter);
                sortedIdxs.push(i);
            }
        }
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

    isCurrentMax(idx: number, stepIdx: number, comparisons: number[]): boolean {
        return comparisons[stepIdx] === idx;
    }

    isPossibleMinOrMax(idx: number, stepIdx: number, comparisons: number[]): boolean {
        return comparisons[stepIdx] === idx - 1;
    }

    isSorted(idx: number, array: number[] | ColorValue[], stepIdx: number, stepsLength: number, sortedIdxs: number[]): boolean {
        return idx >= array.length - sortedIdxs[stepIdx] || (stepIdx !== 0 && stepIdx >= stepsLength);
    }
}

export default BubbleSort;
