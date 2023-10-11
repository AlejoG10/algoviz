interface ConsoleProps {
  steps: number;
  swaps: number;
  isLoading: boolean;
}

const Console: React.FC<ConsoleProps> = ({
  steps = 0,
  swaps = 0,
  isLoading,
}) => {
  return (
    <div
      className={`bg-neutral-800 shadow-md rounded-xl px-4 lg:px-6 py-4 w-full h-14 overflow-x-auto ${
        isLoading && "animate-pulse"
      }`}
    >
      {!isLoading && (
        <div className="flex items-center gap-x-6 text-neutral-300 whitespace-nowrap">
          <p>&gt;&gt;&gt;</p>
          <p>Steps: {steps}</p>
          <hr className="border-l border-neutral-400 h-5 w-px" />
          <p>Swaps: {swaps}</p>
        </div>
      )}
    </div>
  );
};

export default Console;
