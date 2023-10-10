import { HeadingSkeleton } from "../skeletons";

interface ConfigContainerProps {
  heading?: string;
  isLoading: boolean;
  children: React.ReactNode;
}

const ConfigContainer: React.FC<ConfigContainerProps> = ({
  heading,
  isLoading,
  children,
}) => {
  return (
    <div className="bg-white border-neutral-50 border shadow-sm rounded-lg p-4 w-full h-fit">
      <div className="flex flex-col gap-y-4">
        {isLoading ? (
          <HeadingSkeleton />
        ) : (
          <h2 className="text-xl font-semibold">
            {heading || "Sort Configuration"}
          </h2>
        )}
        <hr />
        {children}
      </div>
    </div>
  );
};

export default ConfigContainer;
