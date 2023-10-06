import Settings from "@/components/shared/settings";
import Item from "@/components/shared/item";

interface BubbleSortSettingsProps {
  arraySize: number;
  handleArraySizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  maxValue: number;
  handleMaxValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  delay: number;
  handleDelayChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  sortedArray: boolean;
  handleSortedArrayChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  reversedArray: boolean;
  handleReversedArrayChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  showValues: boolean;
  handleShowValuesChange: () => void;

  colorMode: boolean;
  handleColorModeChange: () => void;
}

const BubbleSortSettings: React.FC<BubbleSortSettingsProps> = ({
  arraySize,
  handleArraySizeChange,

  maxValue,
  handleMaxValueChange,

  delay,
  handleDelayChange,

  sortedArray,
  handleSortedArrayChange,

  reversedArray,
  handleReversedArrayChange,

  showValues,
  handleShowValuesChange,

  colorMode,
  handleColorModeChange,
}) => {
  const MIN_ARRAY_SIZE = 5;
  const MAX_ARRAY_SIZE = 400;
  const MIN_MAX_VALUE = 2;
  const MAX_MAX_VALUE = 1000;
  const MIN_DELAY = 0;
  const MAX_DELAY = 1000;

  return (
    <Settings>
      <Item
        name="arraySize"
        label="Array size:"
        type="range"
        min={MIN_ARRAY_SIZE}
        max={MAX_ARRAY_SIZE}
        value={arraySize}
        showValue
        onChange={handleArraySizeChange}
        className="flex-1"
      />

      <Item
        name="maxValue"
        label="Max value:"
        type="range"
        min={MIN_MAX_VALUE}
        max={MAX_MAX_VALUE}
        value={maxValue}
        showValue
        onChange={handleMaxValueChange}
        disabled={colorMode}
        className="flex-1"
      />

      <Item
        name="delay"
        label="Delay:"
        type="range"
        step={100}
        min={MIN_DELAY}
        max={MAX_DELAY}
        value={delay}
        showValue
        onChange={handleDelayChange}
        className="flex-1"
      />

      <Item
        name="sorted"
        label="Sorted:"
        type="checkbox"
        checked={sortedArray}
        onChange={handleSortedArrayChange}
        className="w-4 h-4"
      />

      <Item
        name="reversed"
        label="Reversed:"
        type="checkbox"
        checked={reversedArray}
        onChange={handleReversedArrayChange}
        className="w-4 h-4"
      />

      <Item
        name="showValues"
        label="Show values:"
        type="checkbox"
        checked={showValues}
        onChange={handleShowValuesChange}
        className="w-4 h-4"
        disabled={arraySize > 100}
      />

      <Item
        name="colorMode"
        label="Color mode:"
        multicolorLabel
        type="checkbox"
        checked={colorMode}
        onChange={handleColorModeChange}
        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 w-4 h-4"
      />
    </Settings>
  );
};

export default BubbleSortSettings;
