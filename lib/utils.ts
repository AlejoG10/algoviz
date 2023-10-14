// -------
// GENERAL
// -------

export const capitalize = (text: string) => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
}


// -----
// ARRAY
// -----

const genRandNum = (min: number, max: number): number => {
    return Math.floor(Math.random() * max) + min
}

export const genArray = (arraySize: number, maxValue: number, sortingOrder?: SortingOrder): number[] => {
    const arr = Array.from({ length: arraySize }).map(_ => genRandNum(1, maxValue));
    if (sortingOrder && sortingOrder !== "shuffled") {
        arr.sort((a, b) => a - b)
        sortingOrder === "reversed" && arr.reverse()
    }
    return arr;
}

// -----
// COLOR
// -----

const slate = ["#64748b", "#475569", "#334155", "#1e293b", "#0f172a", "#020617"]; // 500-950
const neutral = ["#737373", "#525252", "#404040", "#262626", "#171717", "#0a0a0a"]; // 500-950
const red = ["#fca5a5", "#f87171", "#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d", "#450a0a"]; // 300-950
const orange = ["#fdba74", "#fb923c", "#f97316", "#ea580c", "#c2410c", "#9a3412", "#7c2d12", "#431407"]; // 300-950
const amber = ["#fcd34d", "#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e", "#78350f", "#451a03"]; // 300-950
const yellow = ["#fde047", "#facc15", "#eab308", "#ca8a04", "#a16207", "#854d0e", "#713f12", "#422006"]; // 300-950
const lime = ["#bef264", "#a3e635", "#84cc16", "#65a30d", "#4d7c0f", "#3f6212", "#365314", "#1a2e05"]; // 300-950
const green = ["#86efac", "#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534", "#14532d", "#052e16"]; // 300-950
const emerald = ["#6ee7b7", "#34d399", "#10b981", "#059669", "#047857", "#065f46", "#064e3b", "#022c22"]; // 300-950
const teal = ["#5eead4", "#2dd4bf", "#14b8a6", "#0d9488", "#0f766e", "#115e59", "#134e4a", "#042f2e"]; // 300-950
const cyan = ["#67e8f9", "#22d3ee", "#06b6d4", "#0891b2", "#0e7490", "#155e75", "#164e63", "#083344"]; // 300-950
const sky = ["#7dd3fc", "#38bdf8", "#0ea5e9", "#0284c7", "#0369a1", "#075985", "#0c4a6e", "#082f49"]; // 300-950
const blue = ["#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a", "#172554"]; // 300-950
const indigo = ["#a5b4fc", "#818cf8", "#6366f1", "#4f46e5", "#4338ca", "#3730a3", "#312e81", "#1e1b4b"]; // 300-950
const violet = ["#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95", "#2e1065"]; // 300-950
const purple = ["#d8b4fe", "#c084fc", "#a855f7", "#9333ea", "#7e22ce", "#6b21a8", "#581c87", "#3b0764"]; // 300-950
const fuchsia = ["#f0abfc", "#e879f9", "#d946ef", "#c026d3", "#a21caf", "#86198f", "#701a75", "#4a044e"]; // 300-950
const pink = ["#f9a8d4", "#f472b6", "#ec4899", "#db2777", "#be185d", "#9d174d", "#831843", "#500724"]; // 300-950
const rose = ["#fda4af", "#fb7185", "#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337", "#4c0519"]; // 300-950
const tailwindColors = [
    ...yellow, ...amber, ...orange,
    ...lime, ...green, ...emerald, ...teal,
    ...cyan, ...sky, ...blue, ...indigo,
    ...violet, ...purple, ...fuchsia,
    ...pink, ...rose, ...red,
    ...slate, ...neutral
]

const genHEXColor = (): ColorValue => {
    const idx = Math.floor(Math.random() * tailwindColors.length);
    return [tailwindColors[idx], idx]; // TODO: improve personal approach
}

const genHSLColor = (): ColorValue => {
    const H = Math.floor(Math.random() * 361);
    const S = Math.floor(Math.random() * 101);
    const L = Math.floor(Math.random() * 101);
    const HSL = `hsl(${H}, ${S}%, ${L}%)`;
    return [HSL, H]; // hue-based
}

const genRGBColor = (): ColorValue => {
    const R = Math.floor(Math.random() * 255);
    const G = Math.floor(Math.random() * 255);
    const B = Math.floor(Math.random() * 255);
    const RGB = `rgb(${R}, ${G}%, ${B}%)`;
    const value = (0.299 * R) + (0.587 * G) + (0.114 * B) // luminance-based
    return [RGB, value];
}

export const genColorArray = (size: number, colorSystem: ColorSystem, sortingOrder?: SortingOrder): ColorValue[] => {
    const arr: ColorValue[] = Array.from({ length: size }).map(_ => colorSystem === "HEX" ? genHEXColor() : colorSystem === "HSL" ? genHSLColor() : genRGBColor());
    if (sortingOrder && sortingOrder !== "shuffled") {
        arr.sort((a, b) => a[1] - b[1]);
        sortingOrder === "reversed" && arr.reverse();
    }
    return arr;
}