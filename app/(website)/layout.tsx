import { Metadata } from "next";

// TODO: complete
export const metadata: Metadata = {
  title: "",
  description: "",
};

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return <div className="relative top-navbar flex-grow w-full max-w-[2560px]">{children}</div>;
};

export default HomeLayout;
