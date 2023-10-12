export declare global {
    type AlgoCategory = "sorting" | "searching"
    type AlgoId = "bubble-sort" | "selection-sort" | "insertion-sort" | "merge-sort" | "quick-sort"
    type SortingAlgo = "bubble-sort" | "selection-sort" | "insertion-sort" | "merge-sort" | "quick-sort"

    type SortingStatus = "idle" | "running" | "debug"
    type SortingOrder = "shuffled" | "sorted" | "reversed"
    type StyleMode = "default" | "color"
    type ColorSystem = "HEX" | "HSL" | "RGB"
    type ColorValue = [string, number] // HSL, HEX, RGB
}