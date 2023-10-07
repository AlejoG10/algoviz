import { swap } from "./utils";

export type BubbleSortData = {
    steps: number[][],
    colorSteps: Color[][],
    comparisons: number[];
    sortedIdxs: number[];
    numSwaps: number[];
}

const bubbleSort = (array: number[] | Color[], colorMode?: boolean): BubbleSortData => {
    let steps: BubbleSortData["steps"] = [[...array as number[]]];
    let colorSteps: BubbleSortData["colorSteps"] = [[...array as Color[]]];
    const comparisons: BubbleSortData["comparisons"] = [];
    const sortedIdxs: BubbleSortData["sortedIdxs"] = [];
    let numSwapsCounter: number = 0;
    const numSwaps: BubbleSortData["numSwaps"] = [numSwapsCounter];

    for (let i = 0; i < array.length; i++) {
        for (let j = 1; j < array.length - i; j++) {
            if (colorMode) {
                const colorArray = array as Color[];
                if (colorArray[j - 1][1] > colorArray[j][1]) {
                    swap(array as Color[], j - 1, j)
                    numSwapsCounter++;
                }
                colorSteps.push([...array as Color[]]);
            } else {
                if (array[j - 1] > array[j]) {
                    swap(array as number[], j - 1, j)
                    numSwapsCounter++;
                }
                steps.push([...array as number[]]);
            }
            comparisons.push(j - 1);
            sortedIdxs.push(i)
            numSwaps.push(numSwapsCounter)
        }
    }

    return { steps, colorSteps, comparisons, sortedIdxs, numSwaps };
}

export default bubbleSort;
