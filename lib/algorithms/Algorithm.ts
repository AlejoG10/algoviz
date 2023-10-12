abstract class Algorithm {
    sortingSteps: number[][];
    colorSortingSteps: ColorValue[][];
    comparisons: any;
    numSwaps: number[];
    sortedIdxs: number[];

    constructor(comparisons: any) {
        this.sortingSteps = [];
        this.colorSortingSteps = [];
        this.comparisons = comparisons;
        this.numSwaps = [];
        this.sortedIdxs = [];
    }

    getStepAtIdx(idx: number): number[] {
        return this.sortingSteps[idx];
    }

    getColorStepAtIdx(idx: number): ColorValue[] {
        return this.colorSortingSteps[idx];
    }

    getStepsLength(color: boolean): number {
        return !color ? this.sortingSteps.length : this.colorSortingSteps.length;
    }

    getNumSwapsAtIdx(idx: number): number {
        return this.numSwaps[idx];
    }

    abstract resetAttributes(): void
    abstract sort(array: number[]): number[] | void;
    abstract sortColors(array: ColorValue[]): ColorValue[] | void
    abstract isSky(...args: any[]): boolean
    abstract isOrange(...args: any[]): boolean
    abstract isRose(...args: any[]): boolean
    abstract isSorted(...args: any[]): boolean
}

export default Algorithm;
