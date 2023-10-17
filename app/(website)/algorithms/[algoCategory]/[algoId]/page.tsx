"use client";

import { useFilters } from "@/hooks/useFilters";
import Filters from "@/components/shared/filters";
import SortingController from "@/components/algorithms/sorting-algorithms/sorting-controller";
import BubbleSortInfo from "@/components/algorithms/sorting-algorithms/bubble-sort/bubble-sort-info";
import SelectionSortInfo from "@/components/algorithms/sorting-algorithms/selection-sort/selection-sort-info";
import InsertionSortInfo from "@/components/algorithms/sorting-algorithms/insertion-sort/insertion-sort-info";
import MergeSortInfo from "@/components/algorithms/sorting-algorithms/merge-sort/merge-sort-info";

interface IParams {
  params: {
    algoCategory: AlgoCategory;
    algoId: AlgoId;
  };
}

const AlgorithmPage: React.FC<IParams> = ({ params }) => {
  const filters = useFilters();

  let controller;
  switch (params.algoCategory) {
    case "sorting":
      controller = (
        <SortingController sortingAlgo={params.algoId as SortingAlgo} />
      );
      break;

    case "searching":
      break;

    default:
      controller = null;
  }

  let info;
  switch (params.algoId) {
    case "bubble-sort":
      info = <BubbleSortInfo />;
      break;

    case "selection-sort":
      info = <SelectionSortInfo />;
      break;

    case "insertion-sort":
      info = <InsertionSortInfo />;
      break;

    case "merge-sort":
      info = <MergeSortInfo />;
      break;

    default:
      info = null;
  }

  return (
    <>
      <Filters />
      <div
        className={`flex flex-col gap-y-12 mt-6 lg:mt-10 ${
          filters.isOpen && "pt-filters"
        }`}
      >
        {controller}
        <hr />
        {info}
      </div>
    </>
  );
};

export default AlgorithmPage;
