"use client";

import { useEffect, useRef, useState } from "react";

import { SortingData } from "@/types/sorting";
import { BubbleSort, InsertionSort, SelectionSort } from "@/lib/algorithms";
import VisualizerContainer from "@/components/shared/containers/visualizer-container";
import Bar from "@/components/shared/bar";

interface BaseProps {
  sortingAlgo: SortingAlgo;
  stepIdx: number;
  stepsLength: number;
  comparisons: SortingData["comparisons"];
  sortedIdxs: number[];
  showValues: boolean;
  isLoading: boolean;
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
  isLoading,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(true);

  const HEIGHT = 400;

  // -------
  // HELPERS
  // -------

  const isSky = (idx: number) => {
    switch (sortingAlgo) {
      case "selection-sort":
        const selectionSort = new SelectionSort();
        return selectionSort.isSky(
          idx,
          stepIdx,
          comparisons as [number, number, number][]
        );

      default:
        return false;
    }
  };

  const isOrange = (idx: number) => {
    switch (sortingAlgo) {
      case "bubble-sort":
        const bubbleSort = new BubbleSort();
        return bubbleSort.isOrange(idx, stepIdx, comparisons as number[]);

      case "selection-sort":
        const selectionSort = new SelectionSort();
        return selectionSort.isOrange(
          idx,
          stepIdx,
          comparisons as [number, number, number][]
        );

      case "insertion-sort":
        const insertionSort = new InsertionSort();
        return insertionSort.isOrange(idx, stepIdx, comparisons as number[]);

      default:
        return false;
    }
  };

  const isRose = (idx: number) => {
    switch (sortingAlgo) {
      case "bubble-sort":
        const bubbleSort = new BubbleSort();
        return bubbleSort.isRose(idx, stepIdx, comparisons as number[]);

      case "selection-sort":
        const selectionSort = new SelectionSort();
        return selectionSort.isRose(
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

      case "insertion-sort":
        const insertionSort = new InsertionSort();
        return insertionSort.isSorted(idx, stepIdx, sortedIdxs);

      default:
        return false;
    }
  };

  // --------
  // HANDLERS
  // --------

  const checkVisibility = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      setVisible(containerWidth / array.length >= 2.5);
    }
  };

  // -----------
  // USE EFFECTS
  // -----------

  useEffect(() => {
    checkVisibility();

    window.addEventListener("resize", checkVisibility);
    return () => window.removeEventListener("resize", checkVisibility);
  }, [containerRef.current, array.length]);

  return (
    <VisualizerContainer
      ref={containerRef}
      height={HEIGHT}
      visible={visible}
      loading={isLoading}
    >
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
                isSky={!isSorted(i) && !isOrange(i) && isSky(i)}
                isOrange={isOrange(i)}
                isRose={isRose(i)}
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
                isSky={!isSorted(i) && !isOrange(i) && isSky(i)}
                isOrange={isOrange(i)}
                isRose={isRose(i)}
                isSorted={isSorted(i)}
              />
            );
          })}
    </VisualizerContainer>
  );
};

export default SortingVisualizer;
