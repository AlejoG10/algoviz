const genRandNum = (min: number, max: number): number => {
    return Math.floor(Math.random() * max) + min
}

export const genArray = (size: number, max: number, sorted?: boolean, reversed?: boolean): number[] => {
    const arr = Array.from({ length: size }).map(_ => genRandNum(1, max));
    if (sorted || reversed) {
        arr.sort((a, b) => a - b)
        if (reversed) arr.reverse()
    }
    return arr;
}

const genHSLColor = (): Color => {
    const H = Math.floor(Math.random() * 361);
    const S = Math.floor(Math.random() * 101);
    const L = Math.floor(Math.random() * 101);
    const HSL = `hsl(${H}, ${S}%, ${L}%)`;
    return [HSL, H, S, L];
}

export const genColorModeArray = (size: number, sorted?: boolean, reversed?: boolean): Color[] => {
    const arr: Color[] = Array.from({ length: size }).map(_ => genHSLColor());
    if (sorted || reversed) {
        arr.sort((a, b) => a[1] - b[1]);
        if (reversed) arr.reverse();
    }
    return arr;
}