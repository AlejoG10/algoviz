import Bar from "./bar";

interface ContainerProps {
  width: number;
  height: number;
  array: number[];
  maxValue: number;
  showValues: boolean;
}

const Container: React.FC<ContainerProps> = ({
  width,
  height,
  array,
  maxValue,
  showValues,
}) => {
  const styles = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div style={styles} className="flex items-end gap-x-px bg-neutral-100">
      {array.map((value, i) => (
        <Bar
          key={i}
          numElements={array.length}
          maxWidth={width}
          maxHeight={height}
          value={value}
          maxValue={maxValue}
          showValue={showValues}
        />
      ))}
    </div>
  );
};

export default Container;
