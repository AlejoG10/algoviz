import { SortingData } from "@/types/sorting";

interface Algorithm {
    sort(array: number[] | ColorValue[], colorMode?: boolean): SortingData
    isSky(...args: any[]): boolean
    isOrange(...args: any[]): boolean
    isRose(...args: any[]): boolean
    isSorted(...args: any[]): boolean
}

export default Algorithm;
