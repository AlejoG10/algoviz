import { ChevronsLeft, ChevronsRight, Play, RotateCcw } from "lucide-react";
import Button from "./button";

interface ControlsProps {
  handleSort: () => void;
  handleReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({ handleSort, handleReset }) => {
  return (
    <div className="bg-neutral-50 border-neutral-100 border shadow-md rounded-xl px-4 xl:px-6 py-4">
      <div className="relative flex justify-center items-center w-full">
        <div className="flex justify-center items-center gap-x-4 w-full">
          <Button circle outline>
            <ChevronsLeft size={20} />
          </Button>
          <Button circle onClick={handleSort}>
            <Play size={20} className="pl-px" />
          </Button>
          <Button circle outline>
            <ChevronsRight size={20} />
          </Button>
        </div>

        <div className="absolute right-0">
          <Button circle onClick={handleReset}>
            <RotateCcw size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
