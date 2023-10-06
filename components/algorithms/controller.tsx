"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import BubbleSortController from "./bubble-sort/bubble-sort-controller";

const Controller = () => {
  const searchParams = useSearchParams();

  const algo = useMemo(() => searchParams.get("algo"), [searchParams]);

  switch (algo) {
    case "bubble-sort":
      return <BubbleSortController />;
    default:
      return null;
  }
};

export default Controller;
