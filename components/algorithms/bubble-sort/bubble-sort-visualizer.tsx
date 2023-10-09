import { BubbleSortData } from "@/lib/algorithms/bubble-sort";
import Visualizer from "@/components/shared/visualizer";
import Bar from "@/components/shared/bar";

interface BubbleSortVisualizerPropsBase {
  stepIdx: number;
  comparisons: BubbleSortData["comparisons"];
  sortedIdxs: BubbleSortData["sortedIdxs"];
  showValues: boolean;
  loading: boolean;
}

interface BubbleSortColorModeVisualizerProps
  extends BubbleSortVisualizerPropsBase {
  array: ColorValue[];
  maxValue?: never;
  stepsLength: number;
  colorSystem: ColorSystem;
}

interface BubbleSortBaseModeVisualizerProps
  extends BubbleSortVisualizerPropsBase {
  array: number[];
  maxValue: number;
  stepsLength: number;
  colorSystem?: never;
}

type BubbleSortVisualizerProps =
  | BubbleSortColorModeVisualizerProps
  | BubbleSortBaseModeVisualizerProps;

const BubbleSortVisualizer: React.FC<BubbleSortVisualizerProps> = ({
  array,
  colorSystem,
  stepIdx,
  stepsLength,
  comparisons,
  sortedIdxs,
  maxValue,
  showValues,
  loading,
}) => {
  const HEIGHT = 400;

  const isLeftComparison = (i: number) => comparisons[stepIdx] === i;
  const isRightComparison = (i: number) => comparisons[stepIdx] === i - 1;
  const isSorted = (i: number) => i >= array.length - sortedIdxs[stepIdx];
  const allSorted = () => stepIdx !== 0 && stepIdx >= stepsLength;

  return (
    <Visualizer height={HEIGHT} loading={loading}>
      {colorSystem
        ? array.map((value: ColorValue, i) => {
            const maxValue =
              colorSystem === "HEX" ? 148 : colorSystem === "HSL" ? 360 : 255;
            return (
              <Bar
                key={i}
                maxHeight={HEIGHT}
                color={value[0]}
                value={value[1]}
                maxValue={maxValue}
                showValue={showValues}
                leftComparison={isLeftComparison(i)}
                rightComparison={isRightComparison(i)}
                isSorted={isSorted(i) || allSorted()}
              />
            );
          })
        : array.map((value: number, i) => {
            return (
              <Bar
                key={i}
                maxHeight={HEIGHT}
                value={value}
                maxValue={maxValue}
                showValue={showValues}
                leftComparison={isLeftComparison(i)}
                rightComparison={isRightComparison(i)}
                isSorted={isSorted(i) || allSorted()}
              />
            );
          })}
    </Visualizer>
  );
};

export default BubbleSortVisualizer;
