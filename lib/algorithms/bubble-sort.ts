import { swap } from "./utils";

export type BubbleSortData = {
    sortingSteps: number[][],
    colorSortingSteps: ColorValue[][],
    comparisons: number[];
    numSwaps: number[];
    sortedIdxs: number[];
}

const bubbleSort = (array: number[] | ColorValue[], colorMode?: boolean): BubbleSortData => {
    let sortingSteps: number[][] = [];
    let colorSortingSteps: ColorValue[][] = [];
    const comparisons: number[] = [];
    const sortedIdxs: number[] = [];
    let numSwapsCounter: number = 0;
    const numSwaps: number[] = [numSwapsCounter];

    for (let i = 0; i < array.length; i++) {
        for (let j = 1; j < array.length - i; j++) {
            if (colorMode) {
                const colorArray = array as ColorValue[];
                if (colorArray[j - 1][1] > colorArray[j][1]) {
                    swap(array as ColorValue[], j - 1, j);
                    numSwapsCounter++;
                }
                colorSortingSteps.push([...array as ColorValue[]]);
            } else {
                if (array[j - 1] > array[j]) {
                    swap(array as number[], j - 1, j);
                    numSwapsCounter++;
                }
                sortingSteps.push([...array as number[]]);
            }
            comparisons.push(j - 1);
            numSwaps.push(numSwapsCounter);
            sortedIdxs.push(i);
        }
    }

    return { sortingSteps, colorSortingSteps, comparisons, numSwaps, sortedIdxs };
}

export default bubbleSort;
