export const swap = (array: number[] | ColorValue[], i: number, j: number): void => {
    const left = array[i];
    array[i] = array[j];
    array[j] = left;
}
