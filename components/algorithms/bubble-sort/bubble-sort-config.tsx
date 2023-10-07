import Config from "@/components/shared/config";
import RangeGroup from "@/components/shared/form/range-group";
import RadioGroup, { Radio } from "@/components/shared/form/radio-group";
import CheckboxGroup from "@/components/shared/form/checkbox-group";
import Button from "@/components/shared/form/button";
import MyTooltip from "@/components/shared/my-tooltip";

interface BubbleSortConfigProps {
  sorting: boolean;

  arraySize: number;
  handleArraySizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  maxValue: number;
  handleMaxValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  delay: number;
  handleDelayChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  sortingOrder: SortingOrder;
  handleSortingOrderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  showValues: boolean;
  toggleShowValues: () => void;

  styleMode: StyleMode;
  handleStyleModeChange: (styleMode: StyleMode) => void;
}

const BubbleSortConfig: React.FC<BubbleSortConfigProps> = ({
  sorting,

  arraySize,
  handleArraySizeChange,

  maxValue,
  handleMaxValueChange,

  delay,
  handleDelayChange,

  sortingOrder,
  handleSortingOrderChange,

  showValues,
  toggleShowValues,

  styleMode,
  handleStyleModeChange,
}) => {
  const MIN_ARRAY_SIZE = 3;
  const MAX_ARRAY_SIZE = 500;
  const MIN_MAX_VALUE = 2;
  const MAX_MAX_VALUE = 1000;
  const MIN_DELAY = 0;
  const MAX_DELAY = 1000;
  const DELAY_STEP = 100;

  const colorStyle = styleMode === "color";

  const sortingOrderRadio: Radio[] = [
    {
      label: "Shuffled",
      value: "shuffled",
      checked: sortingOrder === "shuffled",
      onChange: () => handleSortingOrderChange,
    },
    {
      label: "Sorted",
      value: "sorted",
      checked: sortingOrder === "sorted",
      onChange: () => handleSortingOrderChange,
    },
    {
      label: "Reversed",
      value: "reversed",
      checked: sortingOrder === "reversed",
      onChange: () => handleSortingOrderChange,
    },
  ];

  const sortingStrategyRadio: Radio[] = [
    {
      label: "Shades",
      value: "HEX",
      checked: true,
      onChange: () => {},
    },
    {
      label: "Hue-based",
      value: "HSL",
      checked: false,
      onChange: () => {},
    },
    {
      label: "Luminance-based",
      value: "RGB",
      checked: false,
      onChange: () => {},
    },
  ];

  return (
    <Config>
      <hr />
      <RangeGroup
        label="Array size:"
        name="arraySize"
        min={MIN_ARRAY_SIZE}
        max={MAX_ARRAY_SIZE}
        value={arraySize}
        onChange={handleArraySizeChange}
        disabled={sorting}
      />
      {!colorStyle && (
        <RangeGroup
          label="Max value:"
          name="maxValue"
          min={MIN_MAX_VALUE}
          max={MAX_MAX_VALUE}
          value={maxValue}
          onChange={handleMaxValueChange}
          disabled={sorting || colorStyle}
        />
      )}
      <RangeGroup
        label="Delay:"
        name="maxVadelay"
        min={MIN_DELAY}
        max={MAX_DELAY}
        step={DELAY_STEP}
        value={delay}
        onChange={handleDelayChange}
        disabled={sorting}
      />
      <hr />
      <RadioGroup
        label="Starting order:"
        name="sortingOrderRadio"
        radioGroup={sortingOrderRadio}
        disabled={sorting}
      />
      {colorStyle && (
        <>
          <hr />
          <RadioGroup
            label="Sorting strategy:"
            name="sortingStrategyRadio"
            radioGroup={sortingStrategyRadio}
            disabled={sorting}
          />
        </>
      )}
      <hr />
      <CheckboxGroup
        label="Show values:"
        name="showValues"
        checked={showValues}
        onChange={toggleShowValues}
        disabled={sorting || arraySize > 100}
      />
      <hr />
      {colorStyle ? (
        <Button
          className="bg-neutral-800 hover:bg-neutral-900"
          onClick={() => handleStyleModeChange("default")}
          disabled={sorting}
        >
          Default mode
        </Button>
      ) : (
        <MyTooltip
          placement="bottom"
          content={
            <div className="px-1 py-2">
              <div className="text-center font-medium">
                Color sorting is extremely challenging
              </div>
              <div className="text-center text-sm">
                results are not visually perfect
              </div>
            </div>
          }
          color="secondary"
          offset={15}
        >
          <Button
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 w-full"
            onClick={() => handleStyleModeChange("color")}
            disabled={sorting}
          >
            Try color mode!
          </Button>
        </MyTooltip>
      )}
    </Config>
  );
};

export default BubbleSortConfig;
