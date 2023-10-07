export declare global {
    type SortingOrder = "shuffled" | "sorted" | "reversed"
    type SortingMode = "default" | "debug"
    type StyleMode = "default" | "color"
    type ColorSystem = "HEX" | "HSL" | "RGB"
    type ColorValue = [string, number] // HSL, HEX, RGB
}