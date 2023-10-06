export const swap = (array: number[] | Color[], i: number, j: number): void => {
    const left = array[i];
    array[i] = array[j];
    array[j] = left;
}
