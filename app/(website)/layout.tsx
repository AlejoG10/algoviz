import { Metadata } from "next";

// TODO: complete
export const metadata: Metadata = {
  title: "AlgoViz",
  description: "Learning tool to visualize popular algorithms!",
};

interface LandingPageLayoutProps {
  children: React.ReactNode;
}

const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex justify-center items-center w-full flex-grow">
      {children}
    </div>
  );
};

export default LandingPageLayout;
