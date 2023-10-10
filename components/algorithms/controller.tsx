"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import SortingController from "./sorting-algorithms/sorting-controller";

const Controller = () => {
  const searchParams = useSearchParams();

  const algo = useMemo(() => searchParams.get("algo"), [searchParams]);

  switch (algo) {
    case "bubble-sort":
      return <SortingController />;

    case "selection-sort":
      return <SortingController />;
  }
};

export default Controller;
