import { BubbleSortData } from "@/lib/algorithms/bubble-sort";
import Visualizer from "@/components/shared/visualizer";
import Bar from "@/components/shared/bar";

interface BubbleSortVisualizerPropsBase {
  step: number;
  comparisons: BubbleSortData["comparisons"];
  sortedIdxs: BubbleSortData["sortedIdxs"];
  showValues: boolean;
  loading: boolean;
}

interface BubbleSortColorModeVisualizerProps
  extends BubbleSortVisualizerPropsBase {
  array: ColorValue[];
  maxValue?: never;
  steps: BubbleSortData["colorSteps"];
  colorMode: true;
}

interface BubbleSortBaseModeVisualizerProps
  extends BubbleSortVisualizerPropsBase {
  array: number[];
  maxValue: number;
  steps: BubbleSortData["steps"];
  colorMode?: never;
}

type BubbleSortVisualizerProps =
  | BubbleSortColorModeVisualizerProps
  | BubbleSortBaseModeVisualizerProps;

const BubbleSortVisualizer: React.FC<BubbleSortVisualizerProps> = ({
  array,
  colorMode,
  steps,
  step,
  comparisons,
  sortedIdxs,
  maxValue,
  showValues,
  loading,
}) => {
  const HEIGHT = 400;

  const isLeftComparison = (i: number) => comparisons[step] === i;
  const isRightComparison = (i: number) => comparisons[step] === i - 1;
  const isSorted = (i: number) => i >= array.length - sortedIdxs[step];
  const allSorted = () => step !== 0 && step === steps.length - 1;

  return (
    <Visualizer height={HEIGHT} loading={loading}>
      {colorMode
        ? array.map((value: ColorValue, i) => {
            return (
              <Bar
                key={i}
                maxHeight={HEIGHT}
                color={value[0]}
                value={value[1]}
                maxValue={360}
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
