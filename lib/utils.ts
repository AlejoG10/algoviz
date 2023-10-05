export const genRandNum = (min: number, max: number) => {
    return Math.floor(Math.random() * max) + min
}

export const genArray = (size: number, max: number) => {
    return Array.from({ length: size }).map(_ => genRandNum(1, max))
}