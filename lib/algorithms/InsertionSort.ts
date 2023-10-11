import { swap } from "./utils";
import Algorithm from "./Algorithm";

class InsertionSort implements Algorithm {
    sort(array: number[] | ColorValue[], colorMode?: boolean): SortingData {
        let sortingSteps: number[][] = [];
        let colorSortingSteps: ColorValue[][] = [];
        let comparisons: number[] = [1];
        let numSwapsCounter: number = 0;
        let numSwaps: number[] = [numSwapsCounter];
        let sortedIdxs: number[] = [0];
        let swapped = false;

        const colorArray = array as ColorValue[];
        for (let i = 1; i < array.length; i++) {
            let j = i;
            swapped = false;
            if (colorMode) {
                if (colorArray[j][1] < colorArray[j - 1][1]) {
                    while (j > 0 && colorArray[j][1] < colorArray[j - 1][1]) {
                        swap(colorArray, j, j - 1);
                        colorSortingSteps.push([...colorArray]);
                        comparisons.push(j);
                        sortedIdxs.push(-1);
                        j--;
                    }
                } else {
                    colorSortingSteps.push([...colorArray]);
                    sortedIdxs.push(j);
                }
            } else {
                while (j > 0 && array[j] < array[j - 1]) {
                    swap(array, j, j - 1);
                    swapped = true;
                    sortingSteps.push([...array as number[]]);
                    j--;
                }
            }

            if (!swapped) {
                sortingSteps.push([...array as number[]]);
            }
        }

        console.log(sortingSteps)

        return {
            sortingSteps,
            colorSortingSteps,
            comparisons,
            numSwaps,
            sortedIdxs
        };
    }

    isSky(): boolean { return false; }

    isOrange(idx: number, stepIdx: number, comparisons: number[]): boolean {
        // return idx === comparisons[stepIdx]
        return false;
    }

    isRose(): boolean { return false; }

    isSorted(idx: number, stepIdx: number, sortedIdxs: number[]): boolean {
        // return idx === 0 || sortedIdxs.slice(0, stepIdx).includes(idx);
        return false
    }
}

export default InsertionSort;
