import { swap } from "./utils";
import Algorithm from "./Algorithm";

class SelectionSort extends Algorithm {
    constructor() {
        super([[0, 0, 1]]);
    }

    resetAttributes(): void {
        this.sortingSteps = [];
        this.colorSortingSteps = [];
        this.comparisons = [[0, 0, 1]];
        this.numSwaps = [];
        this.sortedIdxs = [];
    }

    sort(array: number[]): void {
        this.comparisons = [];
        const N = array.length;
        let swapped = false;
        let numSwapsCounter = 0;
        this.numSwaps.push(numSwapsCounter);

        let i, j, minIdx;
        for (i = 0; i < N - 1; i++) {
            minIdx = i;
            for (j = i + 1; j < N; j++) {
                !swapped && this.sortingSteps.push([...array]);
                this.comparisons.push([i, minIdx, j]);
                if (j !== N - 1) {
                    this.numSwaps.push(numSwapsCounter);
                    this.sortedIdxs.push(-1);
                }

                if (array[j] < array[minIdx]) {
                    minIdx = j;
                }
                swapped = false;
            }
            if (minIdx !== i) {
                swap(array, i, minIdx);
                swapped = true;
                this.sortingSteps.push([...array]);
            }
            this.numSwaps.push(++numSwapsCounter);
            this.sortedIdxs.push(i);
        }
        !swapped && this.sortingSteps.push([...array]);
        this.comparisons.push([-1, N - 1, -1]);
    }

    sortColors(array: ColorValue[]): void {
        this.comparisons = [];
        const N = array.length;
        let swapped = false;
        let numSwapsCounter = 0;
        this.numSwaps.push(numSwapsCounter);

        let i, j, minIdx;
        for (i = 0; i < N - 1; i++) {
            minIdx = i;
            for (j = i + 1; j < N; j++) {
                !swapped && this.colorSortingSteps.push([...array]);
                this.comparisons.push([i, minIdx, j]);
                if (j !== N - 1) {
                    this.numSwaps.push(numSwapsCounter);
                    this.sortedIdxs.push(-1);
                }

                if (array[j][1] < array[minIdx][1]) {
                    minIdx = j;
                }
                swapped = false;
            }
            if (minIdx !== i) {
                swap(array, i, minIdx);
                swapped = true;
                this.colorSortingSteps.push([...array]);
            }
            this.numSwaps.push(++numSwapsCounter);
            this.sortedIdxs.push(i);
        }
        !swapped && this.colorSortingSteps.push([...array]);
        this.comparisons.push([-1, N - 1, -1]);
    }

    isSky(idx: number, stepIdx: number): boolean {
        return stepIdx < this.comparisons.length && this.comparisons[stepIdx][0] === idx && !this.isOrange(idx, stepIdx);
    }

    isOrange(idx: number, stepIdx: number): boolean {
        return stepIdx < this.comparisons.length && this.comparisons[stepIdx][1] === idx;
    }

    isRose(idx: number, stepIdx: number): boolean {
        return stepIdx < this.comparisons.length && this.comparisons[stepIdx][2] === idx;
    }

    isSorted(idx: number, stepIdx: number): boolean {
        return this.sortedIdxs.slice(0, stepIdx).includes(idx) || this.allSorted(stepIdx) && !this.isOrange(idx, stepIdx);
    }

    allSorted(stepIdx: number): boolean {
        return stepIdx !== 0 && stepIdx >= this.sortedIdxs.length
    }
}

export default SelectionSort;
