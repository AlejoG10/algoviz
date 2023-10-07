interface ConsoleProps {
  comparisons: number;
  swaps: number;
}

const Console: React.FC<ConsoleProps> = ({ comparisons = 0, swaps = 0 }) => {
  return (
    <div className="bg-neutral-800 shadow-md rounded-xl px-4 lg:px-6 py-4 w-full overflow-x-auto">
      <div className="flex items-center gap-x-6 text-neutral-300 whitespace-nowrap">
        <p>&gt;&gt;&gt;</p>
        <p>Comparisons: {comparisons}</p>
        <hr className="border-l border-neutral-400 h-5 w-px" />
        <p>Swaps: {swaps}</p>
      </div>
    </div>
  );
};

export default Console;
