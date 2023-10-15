import Algorithm from "./Algorithm";

// TODO: reduce code, optimize
// FIXME: fix it - only works on 2^k array size
class MergeSort extends Algorithm {
    constructor() {
        super([[0, 1, 0]])
    }

    resetAttributes() {
        this.sortingSteps = [];
        this.colorSortingSteps = [];
        this.comparisons = [[0, 1, 0]];
        this.numSwaps = [];
        this.sortedIdxs = [];
    }

    pushAndShift(toPush: number[], toShift: number[]) {
        toPush.push(toShift[0]);
        toShift.shift();
    }

    merge(leftArray: number[], rightArray: number[], originalArray: number[], startIdx: number): number[] {
        const leftArrayLength = leftArray.length;
        let sortedArray: number[] = [];

        let numSwaps = this.numSwaps[this.numSwaps.length - 1];

        while (leftArray.length > 0 && rightArray.length > 0) {
            if (leftArray[0] < rightArray[0]) {
                this.pushAndShift(sortedArray, leftArray);
            } else {
                this.pushAndShift(sortedArray, rightArray);
                numSwaps++;
            }
        }

        while (leftArray.length > 0) {
            this.pushAndShift(sortedArray, leftArray);
        }

        while (rightArray.length > 0) {
            this.pushAndShift(sortedArray, rightArray);
        }

        const leftStepArray: number[] = this.sortingSteps.length === 1
            ? originalArray
            : this.sortingSteps[this.sortingSteps.length - 1]

        const stepArray = [
            ...leftStepArray.slice(0, startIdx),
            ...sortedArray,
            ...originalArray.slice(startIdx + sortedArray.length)
        ];

        this.sortingSteps.push(stepArray);
        this.comparisons.push([startIdx, startIdx + sortedArray.length - 1, leftArrayLength]);
        this.numSwaps.push(numSwaps);
        this.sortedIdxs.push(startIdx + sortedArray.length - 1);

        return sortedArray;
    }

    mergesort(array: number[], originalArray: number[], startIdx: number = 0): number[] {
        const N = array.length;
        const mid = N / 2;

        // base case
        if (N === 1) return array;

        let leftArray, rightArray;

        leftArray = array.slice(0, mid);
        rightArray = array.slice(mid, N);

        leftArray = this.mergesort(leftArray, originalArray, startIdx);
        rightArray = this.mergesort(rightArray, originalArray, startIdx + mid);

        return this.merge(leftArray, rightArray, originalArray, startIdx);
    }

    sort(array: number[]): number[] {
        this.sortingSteps.push([...array]);
        this.comparisons = [];
        this.numSwaps = [0];
        const sortedArray = this.mergesort(array, array);
        this.comparisons.push([0, array.length - 1, array.length - 1]);
        this.numSwaps.push(this.numSwaps[this.numSwaps.length - 1]);
        return sortedArray;
    }

    pushAndShiftColors(toPush: ColorValue[], toShift: ColorValue[]) {
        toPush.push(toShift[0]);
        toShift.shift();
    }

    mergeColors(leftArray: ColorValue[], rightArray: ColorValue[], originalArray: ColorValue[], startIdx: number): ColorValue[] {
        const leftArrayLength = leftArray.length;
        let sortedArray: ColorValue[] = [];

        let numSwaps = this.numSwaps[this.numSwaps.length - 1];

        while (leftArray.length > 0 && rightArray.length > 0) {
            if (leftArray[0][1] < rightArray[0][1]) {
                this.pushAndShiftColors(sortedArray, leftArray);
            } else {
                this.pushAndShiftColors(sortedArray, rightArray);
                numSwaps++;
            }
        }

        while (leftArray.length > 0) {
            this.pushAndShiftColors(sortedArray, leftArray);
        }

        while (rightArray.length > 0) {
            this.pushAndShiftColors(sortedArray, rightArray);
        }

        const leftStepArray: ColorValue[] = this.sortingSteps.length === 1
            ? originalArray
            : this.colorSortingSteps[this.colorSortingSteps.length - 1]

        const stepArray = [
            ...leftStepArray.slice(0, startIdx),
            ...sortedArray,
            ...originalArray.slice(startIdx + sortedArray.length)
        ];

        this.colorSortingSteps.push(stepArray);
        this.comparisons.push([startIdx, startIdx + sortedArray.length - 1, leftArrayLength]);
        this.numSwaps.push(numSwaps);
        this.sortedIdxs.push(startIdx + sortedArray.length - 1);

        return sortedArray;
    }

    mergesortColors(array: ColorValue[], originalArray: ColorValue[], startIdx: number = 0): ColorValue[] {
        const N = array.length;
        const mid = N / 2;

        // base case
        if (N === 1) return array;

        let leftArray, rightArray;

        leftArray = array.slice(0, mid);
        rightArray = array.slice(mid, N);

        leftArray = this.mergesortColors(leftArray, originalArray, startIdx);
        rightArray = this.mergesortColors(rightArray, originalArray, startIdx + mid);

        return this.mergeColors(leftArray, rightArray, originalArray, startIdx);
    }

    sortColors(array: ColorValue[]): ColorValue[] {
        this.colorSortingSteps.push([...array]);
        this.comparisons = [];
        this.numSwaps = [0];
        const sortedArray = this.mergesortColors(array, array);
        this.comparisons.push([0, array.length - 1, array.length - 1]);
        this.numSwaps.push(this.numSwaps[this.numSwaps.length - 1]);
        return sortedArray;
    }

    isSky(...args: any[]): boolean { return false }

    isOrange(idx: number, stepIdx: number): boolean {
        if (stepIdx >= this.comparisons.length) return false
        const [low, high, leftLength] = this.comparisons[stepIdx];
        return (idx === 0 && stepIdx === 0) || stepIdx + 1 === this.sortingSteps.length || stepIdx < this.comparisons.length
            && (idx >= low && idx <= high && idx < low + leftLength);
    }

    isRose(idx: number, stepIdx: number): boolean {
        if (stepIdx >= this.comparisons.length) return false
        const [low, high, leftLength] = this.comparisons[stepIdx];
        return (!this.isOrange(idx, stepIdx)) && stepIdx < this.comparisons.length
            && (idx >= low && idx <= high && idx >= low + leftLength)
    }

    isSorted(idx: number, stepIdx: number): boolean {
        return idx <= this.sortedIdxs[stepIdx] || this.allSorted(stepIdx);
    }

    allSorted(stepIdx: number): boolean {
        return stepIdx !== 0 && stepIdx >= this.sortedIdxs.length
    }
}

export default MergeSort;