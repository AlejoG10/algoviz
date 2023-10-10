import { SortingData } from "@/types/sorting";

interface Algorithm {
    sort(array: number[] | ColorValue[], colorMode?: boolean): SortingData
    isSwappingItem(...args: any[]): boolean
    isCurrentMin(...args: any[]): boolean
    isCurrentMax(...args: any[]): boolean
    isPossibleMinOrMax(...args: any[]): boolean
    isSorted(...args: any[]): boolean
}

export default Algorithm;
