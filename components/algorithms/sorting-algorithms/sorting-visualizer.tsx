import { BubbleSort, SelectionSort } from "@/lib/algorithms";
import VisualizerContainer from "@/components/shared/containers/visualizer-container";
import Bar from "@/components/shared/bar";

interface BaseProps {
  sortingAlgo: SortingAlgo;
  stepIdx: number;
  stepsLength: number;
  comparisons: number[] | [number, number, number][];
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

type SortingVisualizerProps =
  | DefaultModeVisualizerProps
  | ColorModeVisualizerProps;

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({
  sortingAlgo,
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

  // -------
  // HELPERS
  // -------

  const isCurrentMinOrMax = (idx: number) => {
    switch (sortingAlgo) {
      case "bubble-sort":
        const bubbleSort = new BubbleSort();
        return bubbleSort.isCurrentMax(idx, stepIdx, comparisons as number[]);

      case "selection-sort":
        const selectionSort = new SelectionSort();
        return selectionSort.isCurrentMin(
          idx,
          stepIdx,
          comparisons as [number, number, number][]
        );

      default:
        return false;
    }
  };

  const isSwappingItem = (idx: number) => {
    switch (sortingAlgo) {
      case "selection-sort":
        const selectionSort = new SelectionSort();
        return selectionSort.isSwappingItem(
          idx,
          stepIdx,
          comparisons as [number, number, number][]
        );

      default:
        return false;
    }
  };

  const isPossibleMinOrMax = (idx: number) => {
    switch (sortingAlgo) {
      case "bubble-sort":
        const bubbleSort = new BubbleSort();
        return bubbleSort.isPossibleMinOrMax(
          idx,
          stepIdx,
          comparisons as number[]
        );

      case "selection-sort":
        const selectionSort = new SelectionSort();
        return selectionSort.isPossibleMinOrMax(
          idx,
          stepIdx,
          comparisons as [number, number, number][]
        );

      default:
        return false;
    }
  };

  const isSorted = (idx: number) => {
    switch (sortingAlgo) {
      case "bubble-sort":
        const bubbleSort = new BubbleSort();
        return bubbleSort.isSorted(
          idx,
          array,
          stepIdx,
          stepsLength,
          sortedIdxs
        );

      case "selection-sort":
        const selectionSort = new SelectionSort();
        return selectionSort.isSorted(
          idx,
          stepIdx,
          comparisons as [number, number, number][]
        );

      default:
        return false;
    }
  };

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
                isSwappingItem={
                  !isSorted(i) && !isCurrentMinOrMax(i) && isSwappingItem(i)
                }
                isCurrentMinOrMax={isCurrentMinOrMax(i)}
                isPossibleMinOrMax={isPossibleMinOrMax(i)}
                isSorted={isSorted(i)}
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
                isSwappingItem={
                  !isSorted(i) && !isCurrentMinOrMax(i) && isSwappingItem(i)
                }
                isCurrentMinOrMax={isCurrentMinOrMax(i)}
                isPossibleMinOrMax={isPossibleMinOrMax(i)}
                isSorted={isSorted(i)}
              />
            );
          })}
    </VisualizerContainer>
  );
};

export default SortingVisualizer;
