import VisualizerContainer from "@/components/shared/containers/visualizer-container";
import Bar from "@/components/shared/bar";

interface BaseProps {
  stepIdx: number;
  stepsLength: number;
  comparisons: number[];
  sortedIdxs: number[];
  showValues: boolean;
  isArrayLoading: boolean;
}

interface DefaultModeVisualizerProps extends BaseProps {
  array: number[];
  maxValue: number;
  colorSystem?: never;
}

interface ColorModeVisualizerProps extends BaseProps {
  array: ColorValue[];
  maxValue?: never;
  colorSystem: ColorSystem;
}

type BubbleSortVisualizerProps =
  | DefaultModeVisualizerProps
  | ColorModeVisualizerProps;

const BubbleSortVisualizer: React.FC<BubbleSortVisualizerProps> = ({
  array,
  colorSystem,
  stepIdx,
  stepsLength,
  comparisons,
  sortedIdxs,
  maxValue,
  showValues,
  isArrayLoading,
}) => {
  const HEIGHT = 400;

  const isLeftComparison = (i: number) => comparisons[stepIdx] === i;
  const isRightComparison = (i: number) => comparisons[stepIdx] === i - 1;
  const isSorted = (i: number) => i >= array.length - sortedIdxs[stepIdx];
  const allSorted = () => stepIdx !== 0 && stepIdx >= stepsLength;

  return (
    <VisualizerContainer height={HEIGHT} loading={isArrayLoading}>
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
    </VisualizerContainer>
  );
};

export default BubbleSortVisualizer;
