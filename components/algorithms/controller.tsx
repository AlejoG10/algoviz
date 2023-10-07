"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import BubbleSortController from "./bubble-sort/bubble-sort-controller";
import BubbleSortInfo from "./bubble-sort/bubble-sort-info";

const Controller = () => {
  const searchParams = useSearchParams();

  const algo = useMemo(() => searchParams.get("algo"), [searchParams]);

  switch (algo) {
    case "bubble-sort":
      return (
        <div className="flex flex-col gap-y-16 w-full">
          <BubbleSortController />
          <hr />
          <BubbleSortInfo />
        </div>
      );
    default:
      return null;
  }
};

export default Controller;
