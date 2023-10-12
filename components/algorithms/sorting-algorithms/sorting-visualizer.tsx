"use client";

import { useEffect, useRef, useState } from "react";

import Algorithm from "@/lib/algorithms/Algorithm";
import VisualizerContainer from "@/components/shared/containers/visualizer-container";
import Bar from "@/components/shared/bar";

interface BaseProps {
  sortingAlgo: SortingAlgo;
  algorithm: Algorithm;
  stepIdx: number;
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
  algorithm,
  array,
  colorSystem,
  stepIdx,
  maxValue,
  showValues,
  isLoading,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(true);

  const HEIGHT = 375;

  // -------
  // HELPERS
  // -------

  const isSky = (idx: number) => {
    switch (sortingAlgo) {
      case "selection-sort":
        return algorithm.isSky(idx, stepIdx);

      default:
        return false;
    }
  };

  const isOrange = (idx: number) => {
    return algorithm.isOrange(idx, stepIdx);
  };

  const isRose = (idx: number) => {
    return algorithm.isRose(idx, stepIdx);
  };

  const isSorted = (idx: number) => {
    return algorithm.isSorted(idx, stepIdx);
  };

  // --------
  // HANDLERS
  // --------

  const checkVisibility = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      setVisible(containerWidth / array.length >= 2.5);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
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
                isSky={isSky(i)}
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
                isSky={isSky(i)}
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
