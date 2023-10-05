import Item from "./form/item";
import Button from "./button";

interface OptionsProps {
  arraySize: number;
  handleArraySizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxValue: number;
  handleMaxValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showValues: boolean;
  handleShowValuesChange: () => void;
  sorted: boolean;
  handleSortedChange: () => void;
  reversed: boolean;
  handleReversedChange: () => void;
}

const Options: React.FC<OptionsProps> = ({
  arraySize,
  handleArraySizeChange,
  maxValue,
  handleMaxValueChange,
  showValues,
  handleShowValuesChange,
  sorted,
  handleSortedChange,
  reversed,
  handleReversedChange,
}) => {
  return (
    <div className="flex items-center gap-x-4 w-[600px] h-[400px]">
      <div className="bg-neutral-100 rounded-xl p-4 w-[500px] h-full">
        <div className="flex flex-col gap-y-4 h-full">
          <Item
            name="numElements"
            label="Number of elements:"
            type="range"
            min={5}
            max={400}
            value={arraySize}
            onChange={handleArraySizeChange}
            className="accent-indigo-500 flex-1"
          />

          <Item
            name="maxValue"
            label="Max value:"
            type="range"
            min={1}
            max={1000}
            value={maxValue}
            onChange={handleMaxValueChange}
            className="accent-indigo-500 flex-1"
          />

          <Item
            name="showValues"
            label="Show values:"
            type="checkbox"
            checked={showValues}
            onChange={handleShowValuesChange}
            className="accent-indigo-500 w-4 h-4"
            disabled={arraySize > 100}
          />

          <Item
            name="sorted"
            label="Sorted:"
            type="checkbox"
            checked={sorted}
            onChange={handleSortedChange}
            className="accent-indigo-500 w-4 h-4"
          />

          <Item
            name="reversed"
            label="Reversed:"
            type="checkbox"
            checked={reversed}
            onChange={handleReversedChange}
            className="accent-indigo-500 w-4 h-4"
          />

          <div className="flex justify-evenly items-center mt-auto">
            <Button label="New array" outline />
            <Button label="Restart settings" />
            <Button label="Sort array" />
          </div>
        </div>
      </div>

      <div className="bg-neutral-100 rounded-xl p-4 flex-1 h-full">
        <div className="flex flex-col items-center gap-y-4">
          <p>{arraySize}</p>
          <p>{maxValue}</p>
          <p>{showValues ? "Y" : "N"}</p>
        </div>
      </div>
    </div>
  );
};

export default Options;
