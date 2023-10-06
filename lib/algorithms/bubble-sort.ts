import { swap } from "./utils";

export type BubbleSortData = {
    steps: number[][],
    colorSteps: Color[][],
    comparisons: number[];
    sortedIdxs: number[];
}

const bubbleSort = (array: number[] | Color[], colorMode?: boolean): BubbleSortData => {
    let steps: BubbleSortData["steps"] = [[...array as number[]]];
    let colorSteps: BubbleSortData["colorSteps"] = [[...array as Color[]]];
    const comparisons: BubbleSortData["comparisons"] = [];
    const sortedIdxs: BubbleSortData["sortedIdxs"] = [];

    for (let i = 0; i < array.length; i++) {
        for (let j = 1; j < array.length - i; j++) {
            if (colorMode) {
                const colorArray = array as Color[];
                if (colorArray[j - 1][1] > colorArray[j][1]) {
                    swap(array as Color[], j - 1, j)
                }
                colorSteps.push([...array as Color[]]);
            } else {
                if (array[j - 1] > array[j]) {
                    swap(array as number[], j - 1, j)
                }
                steps.push([...array as number[]]);
            }
            comparisons.push(j - 1);
            sortedIdxs.push(i)

        }
    }

    return { steps, colorSteps, comparisons, sortedIdxs };
}

export default bubbleSort;
