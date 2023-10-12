import Algorithm from "./Algorithm";

class QuickSort extends Algorithm {
    constructor() {
        super([])
    }

    resetAttributes() {
        this.sortingSteps = [];
        this.colorSortingSteps = [];
        this.comparisons = [];
        this.numSwaps = [];
        this.sortedIdxs = [];
    }

    sort(array: number[]): void {

    }

    sortColors(array: ColorValue[]): void {

    }

    isSky(...args: any[]): boolean {
        return false
    }

    isOrange(...args: any[]): boolean {
        return false
    }

    isRose(...args: any[]): boolean {
        return false
    }

    isSorted(...args: any[]): boolean {
        return false
    }
}

export default QuickSort;