import { capitalize } from "@/lib/utils";

interface IParams {
  params: {
    algoCategory: AlgoCategory;
    algoId: AlgoId;
  };
}

export async function generateMetadata({ params }: IParams) {
  const algoName = params.algoId.replace("-", " ");
  const title = `${capitalize(algoName)} Visualization - ${
    process.env.BRAND_NAME
  }`;

  return {
    title,
  };
}

interface AlgorithmsLayoutProps {
  children: React.ReactNode;
}

const AlgorithmsLayout: React.FC<AlgorithmsLayoutProps> = ({ children }) => {
  return <div className="flex flex-col w-full">{children}</div>;
};

export default AlgorithmsLayout;
