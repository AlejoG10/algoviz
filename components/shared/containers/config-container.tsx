interface ConfigContainerProps {
  heading?: string;
  children: React.ReactNode;
}

const ConfigContainer: React.FC<ConfigContainerProps> = ({
  heading,
  children,
}) => {
  return (
    <div className="bg-neutral-50 border-neutral-100 border shadow-md rounded-xl p-4 w-full h-fit">
      <div className="flex flex-col gap-y-4">
        <h2 className="text-xl font-semibold">
          {heading || "Sort Configuration"}
        </h2>
        <hr />
        {children}
      </div>
    </div>
  );
};

export default ConfigContainer;
