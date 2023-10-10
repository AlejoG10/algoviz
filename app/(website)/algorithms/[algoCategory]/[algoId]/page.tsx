import SortingController from "@/components/algorithms/sorting-algorithms/sorting-controller";

interface IParams {
  params: {
    algoCategory: AlgoCategory;
    algoId: AlgoId;
  };
}

const AlgorithmPage: React.FC<IParams> = ({ params }) => {
  switch (params.algoCategory) {
    case "sorting":
      return <SortingController sortingAlgo={params.algoId as SortingAlgo} />;

    case "searching":
      break;

    default:
      return null;
  }
};

export default AlgorithmPage;
