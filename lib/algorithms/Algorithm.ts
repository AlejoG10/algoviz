interface Algorithm {
    sortingSteps: SortingData["sortingSteps"];
    colorSortingSteps: SortingData["colorSortingSteps"];
    comparisons: SortingData["comparisons"];
    numSwaps: SortingData["numSwaps"];
    sortedIdxs: SortingData["sortedIdxs"];

    resetAttributes(): void
    sort(array: number[]): void
    sortColors(array: ColorValue[]): void
    isSky(...args: any[]): boolean
    isOrange(...args: any[]): boolean
    isRose(...args: any[]): boolean
    isSorted(...args: any[]): boolean
    
    // getters
    getStepAtIdx(idx: number): number[]
    getColorStepAtIdx(idx: number): ColorValue[]
    getStepsLength(color: boolean): number
    getNumSwapsAtIdx(idx: number): number
}

export default Algorithm;
