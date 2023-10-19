import { capitalize } from "@/lib/utils";

interface IParams {
  params: {
    algoCategory: AlgoCategory;
    algoId: AlgoId;
  };
}

export async function generateMetadata({ params }: IParams) {
  const algoName = capitalize(params.algoId.replace("-", " "));
  const title = `${algoName} Visualization`;
  const description = `${algoName} algorithm visualization and simulation`;

  return { title, description };
}

const AlgorithmsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col pt-navbar mb-12 lg:mb-20 w-full">
      {children}
    </div>
  );
};

export default AlgorithmsLayout;
