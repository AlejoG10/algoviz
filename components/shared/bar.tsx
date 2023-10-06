interface BarPropsBase {
  maxWidth: number;
  maxHeight: number;
  numElements: number;
  value: number;
  maxValue: number;
  showValue: boolean;
  leftComparison: boolean;
  rightComparison: boolean;
  isSorted: boolean;
}

interface ColorModeBarProps extends BarPropsBase {
  color: string;
}

interface BaseModeBarProps extends BarPropsBase {
  color?: never;
}

type BarProps = ColorModeBarProps | BaseModeBarProps;

const Bar: React.FC<BarProps> = ({
  maxWidth,
  maxHeight,
  numElements,
  value,
  color,
  maxValue,
  showValue,
  leftComparison,
  rightComparison,
  isSorted,
}) => {
  const width = maxWidth / numElements - 1;
  const height = Math.floor((value / maxValue!) * maxHeight);

  let styles: any = { width: `${width}px`, height: `${height}px` };
  if (color) styles = { ...styles, backgroundColor: `${color}` };

  return (
    <div
      style={styles}
      className={`flex justify-center items-center
        ${color && isSorted && "border-green-500 border"}
        ${color && leftComparison && "border-orange-400 border"} 
        ${color && rightComparison && "border-rose-500 border"} 
        ${!color && isSorted ? "bg-green-500" : "bg-neutral-800 "}
        ${!color && leftComparison && "bg-orange-400"} 
        ${!color && rightComparison && "bg-rose-500"} 
        `}
    >
      {showValue && (
        <span className="text-white text-[10px] transform -rotate-90 p-0 m-0">
          {Math.floor(value)}
        </span>
      )}
    </div>
  );
};

export default Bar;
