"use client"

import { useFilters } from "@/hooks/useFilters";
import SortingController from "@/components/algorithms/sorting-algorithms/sorting-controller";

interface IParams {
  params: {
    algoCategory: AlgoCategory;
    algoId: AlgoId;
  };
}

const AlgorithmPage: React.FC<IParams> = ({ params }) => {
  const filters = useFilters();

  let content;

  switch (params.algoCategory) {
    case "sorting":
      content = (
        <SortingController sortingAlgo={params.algoId as SortingAlgo} />
      );
      break;

    case "searching":
      break;

    default:
      content = null;
  }

  return (
    <div className={`mt-6 lg:mt-10 ${filters.isOpen && "pt-filters"}`}>
      {content}
    </div>
  );
};

export default AlgorithmPage;
