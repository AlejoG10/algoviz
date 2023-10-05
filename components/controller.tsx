"use client";

import { useEffect, useMemo, useState } from "react";

import { genArray } from "@/lib/utils";
import Filters from "./filters";
import Container from "./container";
import Options from "./options";

const Controller = () => {
  const [arraySize, setArraySize] = useState(50);
  const [maxValue, setMaxValue] = useState(400);
  const [showValues, setShowValues] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [reversed, setReversed] = useState(false);

  const array = useMemo(
    () => genArray(arraySize, maxValue),
    [arraySize, maxValue]
  );

  useEffect(() => {
    if (arraySize > 100) setShowValues(false);
  }, [arraySize]);

  const handleArraySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArraySize(Number(e.target.value));
  };

  const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxValue(Number(e.target.value));
  };

  const handleShowValuesChange = () => {
    setShowValues((prev) => !prev);
  };

  const handleSortedChange = () => {
    if (sorted) {
      setSorted(false);
      // TODO: shuffle
    } else {
      setSorted(true);
      array.sort((a, b) => a - b);
    }
  };

  const handleReversedChange = () => {
    if (reversed) {
      setReversed(false);
      // TODO: shuffle
    } else {
      setReversed(true);
      array.sort((a, b) => b - a);
    }
  };

  return (
    <div className="flex justify-center items-end gap-x-16">
      <div className="flex flex-col gap-y-6">
        <Filters />
        <Container
          width={800}
          height={400}
          array={array}
          maxValue={maxValue}
          showValues={showValues}
        />
      </div>
      <Options
        arraySize={arraySize}
        handleArraySizeChange={handleArraySizeChange}
        maxValue={maxValue}
        handleMaxValueChange={handleMaxValueChange}
        showValues={showValues}
        handleShowValuesChange={handleShowValuesChange}
        sorted={sorted}
        handleSortedChange={handleSortedChange}
        reversed={reversed}
        handleReversedChange={handleReversedChange}
      />
    </div>
  );
};

export default Controller;
