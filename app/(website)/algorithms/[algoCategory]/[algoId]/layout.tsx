import { capitalize } from "@/lib/utils";

interface IParams {
  params: {
    algoCategory: AlgoCategory;
    algoId: AlgoId;
  };
}

export async function generateMetadata({ params }: IParams) {
  const algoName = capitalize(params.algoId.replace("-", " "));
  const title = `${algoName} Visualization - AlgoViz`;
  const description = `Visualize, learn and simulate the ${algoName} algorithm - AlgoViz`;

  return {
    title,
    description,
  };
}

interface AlgorithmsLayoutProps {
  children: React.ReactNode;
}

const AlgorithmsLayout: React.FC<AlgorithmsLayoutProps> = ({ children }) => {
  return <div className="flex flex-col pt-navbar mb-12 lg:mb-20 w-full">{children}</div>;
};

export default AlgorithmsLayout;
