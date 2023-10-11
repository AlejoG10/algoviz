export declare global {
    type AlgoCategory = "sorting" | "searching"
    type AlgoId = "bubble-sort" | "selection-sort" | "insertion-sort"
    type SortingAlgo = "bubble-sort" | "selection-sort" | "insertion-sort"

    type SortingStatus = "idle" | "running" | "debug"
    type SortingOrder = "shuffled" | "sorted" | "reversed"
    type StyleMode = "default" | "color"
    type ColorSystem = "HEX" | "HSL" | "RGB"
    type ColorValue = [string, number] // HSL, HEX, RGB

    type SortingData = {
        sortingSteps: number[][],
        colorSortingSteps: ColorValue[][],
        comparisons: number[] | [number, number, number][];
        numSwaps: number[];
        sortedIdxs: number[];
    }
}