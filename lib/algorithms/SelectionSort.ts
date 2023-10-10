import { SortingData } from "@/types/sorting";
import { swap } from "./utils";
import Algorithm from "./Algorithm";

class SelectionSort implements Algorithm {
    sort(array: number[] | ColorValue[], colorMode?: boolean): SortingData {
        let sortingSteps: number[][] = [];
        let colorSortingSteps: ColorValue[][] = [];
        const comparisons: [number, number, number][] = [];
        let numSwapsCounter: number = 0;
        const numSwaps: number[] = [numSwapsCounter];
        const sortedIdxs: number[] = [];

        for (let i = 0; i < array.length - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < array.length; j++) {
                comparisons.push([i, minIdx, j]);
                if (colorMode) {
                    const colorArray = array as ColorValue[];
                    if (colorArray[j][1] < colorArray[minIdx][1]) {
                        minIdx = j;
                    }
                } else {
                    const arr = array as number[];
                    if (arr[j] < arr[minIdx]) {
                        minIdx = j;
                    }
                }
                j === array.length - 1 && numSwapsCounter++;
                colorMode
                    ? colorSortingSteps.push([...array as ColorValue[]])
                    : sortingSteps.push([...array as number[]]);
                numSwaps.push(numSwapsCounter);
            }
            if (minIdx !== i) {
                swap(array, i, minIdx);
                if (i === array.length - 2) {
                    comparisons.push([i, minIdx, array.length - 1]);
                    colorMode
                        ? colorSortingSteps.push([...array as ColorValue[]])
                        : sortingSteps.push([...array as number[]]);
                }
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

    isSwappingItem(idx: number, stepIdx: number, comparisons: [number, number, number][]): boolean {
        return stepIdx < comparisons.length && comparisons[stepIdx][0] === idx;
    }

    isCurrentMin(idx: number, stepIdx: number, comparisons: [number, number, number][]): boolean {
        return stepIdx < comparisons.length && comparisons[stepIdx][1] === idx;
    }

    isCurrentMax(): boolean { return false; }

    isLocalMax(): boolean { return false; }

    isPossibleMinOrMax(idx: number, stepIdx: number, comparisons: [number, number, number][]): boolean {
        return stepIdx < comparisons.length && comparisons[stepIdx][2] === idx;
    }

    isSorted(idx: number, stepIdx: number, comparisons: [number, number, number][]): boolean {
        return (stepIdx !== 0 && stepIdx >= comparisons.length - 1) || idx + 1 <= comparisons[stepIdx][0];
    }
}

export default SelectionSort;
