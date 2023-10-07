interface BarPropsBase {
  maxHeight: number;
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
  maxHeight,
  value,
  color,
  maxValue,
  showValue,
  leftComparison,
  rightComparison,
  isSorted,
}) => {
  const height = Math.floor((value / maxValue!) * maxHeight);

  let styles: any = { height: `${height}px` };
  if (color) styles = { ...styles, backgroundColor: `${color}` };

  return (
    <div
      style={styles}
      className={`relative flex justify-center items-center rounded-t-sm md:rounded-t-md w-full
        ${!color && isSorted ? "bg-green-500" : "bg-neutral-800 "}
        ${!color && leftComparison && "bg-orange-400"} 
        ${!color && rightComparison && "bg-rose-500"} 
      `}
    >
      {showValue && (
        <span className="text-white text-[9px] transform -rotate-90 p-0 m-0">
          {Math.floor(value)}
        </span>
      )}

      {color && (
        <span
          className={`absolute -bottom-6 rounded-full w-3 h-3
            ${isSorted && "bg-green-500"}
            ${leftComparison && "bg-orange-400"}
            ${rightComparison && "bg-rose-400"}
        `}
        />
      )}
    </div>
  );
};

export default Bar;
