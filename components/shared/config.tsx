interface ConfigProps {
  children: React.ReactNode;
}

const Config: React.FC<ConfigProps> = ({ children }) => {
  return (
    <div className="bg-neutral-50 border-neutral-100 border shadow-md rounded-xl p-4 w-full h-fit">
      <div className="flex flex-col gap-y-4">
        <h2 className="text-xl font-semibold">Sort Configuration</h2>
        {children}
      </div>
    </div>
  );
};

export default Config;
