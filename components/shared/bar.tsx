interface BaseProps {
  maxHeight: number;
  value: number;
  maxValue: number;
  showValue: boolean;
  isSky: boolean;
  isOrange: boolean;
  isRose: boolean;
  isSorted: boolean;
  handleWidthChange?: ((width: number) => void) | undefined;
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
  isSky,
  isOrange,
  isRose,
  isSorted,
  handleWidthChange,
}) => {
  const height = Math.floor((value / maxValue) * maxHeight);
  let styles: any = { height: `${height}px` };
  if (color) styles = { ...styles, backgroundColor: `${color}` };

  return (
    <div
      style={styles}
      className={`flex justify-center items-center rounded-t-sm lg:rounded-t-md w-full
        ${!color && isSorted ? "bg-green-500" : "bg-neutral-800 "}
        ${!color && isRose && "bg-rose-500"} 
        ${!color && isSky && "bg-sky-500"} 
        ${!color && isOrange && "bg-orange-400"} 
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
            ${isRose && "bg-rose-500"}
            ${isSky && "bg-sky-500"}
            ${isOrange && "bg-orange-400"}
        `}
        />
      )}
    </div>
  );
};

export default Bar;
