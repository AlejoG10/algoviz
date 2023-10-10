export declare global {
    type SortingAlgo = "bubble-sort" | "selection-sort"
    type SortingStatus = "idle" | "running" | "debug"
    type SortingOrder = "shuffled" | "sorted" | "reversed"
    type StyleMode = "default" | "color"
    type ColorSystem = "HEX" | "HSL" | "RGB"
    type ColorValue = [string, number] // HSL, HEX, RGB
}