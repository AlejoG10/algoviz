import { BubbleSortData } from "@/lib/algorithms/bubble-sort";
import Visualizer from "@/components/shared/visualizer";
import Bar from "@/components/shared/bar";

interface BubbleSortVisualizerPropsBase {
  width: number;
  height: number;
  step: number;
  comparisons: BubbleSortData["comparisons"];
  sortedIdxs: BubbleSortData["sortedIdxs"];
  showValues: boolean;
  loading: boolean;
}

interface BubbleSortColorModeVisualizerProps
  extends BubbleSortVisualizerPropsBase {
  array: Color[];
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
  width,
  height,
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
  return (
    <Visualizer width={width} height={height} loading={loading}>
      {colorMode
        ? array.map((value: Color, i) => {
            // comparisons
            const leftComparison = comparisons[step] === i;
            const rightComparison = comparisons[step] === i - 1;

            // isSorted
            const isSorted = i >= array.length - sortedIdxs[step];
            const allSorted = step !== 0 && step === steps.length - 1;

            return (
              <Bar
                key={i}
                numElements={array.length}
                maxWidth={width}
                maxHeight={height}
                color={value[0]}
                value={value[1]}
                maxValue={360}
                showValue={showValues}
                leftComparison={leftComparison}
                rightComparison={rightComparison}
                isSorted={isSorted || allSorted}
              />
            );
          })
        : array.map((value: number, i) => {
            // comparisons
            const leftComparison = comparisons[step] === i;
            const rightComparison = comparisons[step] === i - 1;

            // isSorted
            const isSorted = i >= array.length - sortedIdxs[step];
            const allSorted = step !== 0 && step === steps.length - 1;

            return (
              <Bar
                key={i}
                numElements={array.length}
                maxWidth={width}
                maxHeight={height}
                value={value}
                maxValue={maxValue}
                showValue={showValues}
                leftComparison={leftComparison}
                rightComparison={rightComparison}
                isSorted={isSorted || allSorted}
              />
            );
          })}
    </Visualizer>
  );
};

export default BubbleSortVisualizer;
