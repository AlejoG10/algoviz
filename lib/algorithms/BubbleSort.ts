import { swap } from "./utils";
import Algorithm from "./Algorithm";

class BubbleSort extends Algorithm {
    constructor() {
        super([0])
    }

    resetAttributes() {
        this.sortingSteps = [];
        this.colorSortingSteps = [];
        this.comparisons = [0];
        this.numSwaps = [];
        this.sortedIdxs = [];
    }

    sort(array: number[]) {
        this.comparisons = [];
        const N = array.length;
        let swapped = false;
        let numSwapsCounter = 0;
        this.numSwaps.push(numSwapsCounter);

        let i, j;
        for (i = 0; i < N - 1; i++) {
            for (j = 0; j < N - i - 1; j++) {
                !swapped && this.sortingSteps.push([...array]);

                swapped = false;
                if (array[j] > array[j + 1]) {
                    swap(array, j, j + 1);
                    swapped = true;
                    this.sortingSteps.push([...array]);
                    numSwapsCounter++;
                }

                if (j !== N - i - 2) this.sortedIdxs.push(-1);
                this.comparisons.push(j);
                this.numSwaps.push(numSwapsCounter);
            }
            this.sortedIdxs.push(j);
        }
    }

    sortColors(array: ColorValue[]) {
        this.comparisons = [];
        const N = array.length;
        let swapped = false;
        let numSwapsCounter = 0;
        this.numSwaps.push(numSwapsCounter);

        let i, j;
        for (i = 0; i < N - 1; i++) {
            for (j = 0; j < N - i - 1; j++) {
                !swapped && this.colorSortingSteps.push([...array]);

                swapped = false;
                if (array[j][1] > array[j + 1][1]) {
                    swap(array, j, j + 1);
                    swapped = true;
                    numSwapsCounter++;
                    this.colorSortingSteps.push([...array]);
                }

                if (j !== N - i - 2) this.sortedIdxs.push(-1);
                this.comparisons.push(j);
                this.numSwaps.push(numSwapsCounter);
            }
            this.sortedIdxs.push(j);
        }
    }

    isSky(): boolean { return false; }

    isOrange(idx: number, stepIdx: number): boolean {
        return this.comparisons[stepIdx] === idx;
    }

    isRose(idx: number, stepIdx: number): boolean {
        return this.comparisons[stepIdx] === idx - 1;
    }

    isSorted(idx: number, stepIdx: number): boolean {
        return this.sortedIdxs.slice(0, stepIdx).includes(idx) || this.allSorted(stepIdx);
    }

    allSorted(stepIdx: number): boolean {
        return stepIdx !== 0 && stepIdx >= this.sortedIdxs.length
    }
}

export default BubbleSort;
