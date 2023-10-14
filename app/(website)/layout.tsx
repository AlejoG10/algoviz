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
  return (
    <div className="relative flex justify-center items-center top-navbar flex-grow w-full">
      {children}
    </div>
  );
};

export default HomeLayout;
