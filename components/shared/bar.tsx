interface BaseProps {
  maxHeight: number;
  value: number;
  maxValue: number;
  showValue: boolean;
  isSwappingItem: boolean;
  isCurrentMinOrMax: boolean;
  isPossibleMinOrMax: boolean;
  isSorted: boolean;
}

interface DefaultModeBarProps extends BaseProps {
  color?: never;
}

interface ColorModeBarProps extends BaseProps {
  color: string;
}

type BarProps = DefaultModeBarProps | ColorModeBarProps;

const Bar: React.FC<BarProps> = ({
  maxHeight,
  value,
  color,
  maxValue,
  showValue,
  isSwappingItem,
  isCurrentMinOrMax,
  isPossibleMinOrMax,
  isSorted,
}) => {
  const height = Math.floor((value / maxValue) * maxHeight);

  let styles: any = { height: `${height}px` };
  if (color) styles = { ...styles, backgroundColor: `${color}` };

  return (
    <div
      style={styles}
      className={`flex justify-center items-center rounded-t-sm lg:rounded-t-md w-full
        ${!color && isSorted ? "bg-green-500" : "bg-neutral-800 "}
        ${!color && isPossibleMinOrMax && "bg-rose-500"} 
        ${!color && isSwappingItem && "bg-sky-500"} 
        ${!color && isCurrentMinOrMax && "bg-orange-400"} 
      `}
    >
      {showValue && (
        <span className="text-white text-[9px] transform -rotate-90 p-0 m-0">
          {Math.floor(value)}
        </span>
      )}

      {color && (
        <span
          className={`absolute bottom-2 rounded-full w-3 h-3
            ${isSorted && "bg-green-500"}
            ${isPossibleMinOrMax && "bg-rose-500"}
            ${isSwappingItem && "bg-sky-500"}
            ${isCurrentMinOrMax && "bg-orange-400"}
        `}
        />
      )}
    </div>
  );
};

export default Bar;
