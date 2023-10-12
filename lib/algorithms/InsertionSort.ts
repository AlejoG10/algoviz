import { swap } from "./utils";
import Algorithm from "./Algorithm";

class InsertionSort extends Algorithm {
    constructor() {
        super([1]);
    }

    resetAttributes(): void {
        this.sortingSteps = [];
        this.colorSortingSteps = [];
        this.comparisons = [1];
        this.numSwaps = [];
        this.sortedIdxs = [];
    }

    sort(array: number[]): void {
        this.comparisons = [];
        const N = array.length;
        let swapped = false;
        let numSwapsCounter = 0;
        this.numSwaps.push(numSwapsCounter);

        let i, j;
        for (i = 1; i < N; i++) {
            j = i;

            this.sortingSteps.push([...array]);
            this.comparisons.push(i);

            swapped = false;
            while (j > 0 && array[j] < array[j - 1]) {
                swap(array, j, j - 1);
                swapped = true;
                this.sortingSteps.push([...array]);
                this.comparisons.push(j - 1);
                this.numSwaps.push(++numSwapsCounter);
                this.sortedIdxs.push(j);
                j--;
            }
            this.numSwaps.push(numSwapsCounter);
            this.sortedIdxs.push(i);
        }
        this.comparisons.push(j!);
        this.numSwaps.push(numSwapsCounter);
    }

    sortColors(array: ColorValue[]): void {
        this.comparisons = [];
        const N = array.length;
        let swapped = false;
        let numSwapsCounter = 0;
        this.numSwaps.push(numSwapsCounter);

        let i, j;
        for (i = 1; i < N; i++) {
            j = i;

            this.colorSortingSteps.push([...array]);
            this.comparisons.push(i);

            swapped = false;
            while (j > 0 && array[j][1] < array[j - 1][1]) {
                swap(array, j, j - 1);
                swapped = true;
                this.colorSortingSteps.push([...array]);
                this.comparisons.push(j - 1);
                this.numSwaps.push(++numSwapsCounter);
                this.sortedIdxs.push(j);
                j--;
            }
            this.numSwaps.push(numSwapsCounter);
            this.sortedIdxs.push(i);
        }
        this.comparisons.push(j!);
        this.numSwaps.push(numSwapsCounter);
    }

    isSky(): boolean { return false }

    isOrange(idx: number, stepIdx: number): boolean {
        return this.comparisons[stepIdx] === idx && !this.allSorted(stepIdx);
    }

    isRose(): boolean { return false }

    isSorted(idx: number, stepIdx: number): boolean {
        return idx === 0 || this.sortedIdxs.slice(0, stepIdx).includes(idx)
    }

    allSorted(stepIdx: number): boolean {
        return stepIdx !== 0 && stepIdx >= this.sortedIdxs.length
    }
}

export default InsertionSort;
