interface BarProps {
  maxWidth: number;
  maxHeight: number;
  numElements: number;
  value: number;
  maxValue: number;
  showValue?: boolean;
}

const Bar: React.FC<BarProps> = ({
  maxWidth,
  maxHeight,
  numElements,
  value,
  maxValue,
  showValue,
}) => {
  const width = maxWidth / numElements - 1;
  const height = Math.floor((value / maxValue) * maxHeight);

  const styles = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div
      style={styles}
      className="bg-neutral-800 flex justify-center items-center"
    >
      {showValue && (
        <span className="text-white text-[10px] transform -rotate-90 p-0 m-0">
          {value}
        </span>
      )}
    </div>
  );
};

export default Bar;
