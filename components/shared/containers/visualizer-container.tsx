import { ForwardedRef, forwardRef } from "react";

import { LeapFrog } from "@uiball/loaders";
import { Expand } from "lucide-react";

interface VisualizerContainerProps {
  height: number;
  visible: boolean;
  loading: boolean;
  children: React.ReactNode;
}

const VisualizerContainer = forwardRef(
  (
    { height, visible, loading, children }: VisualizerContainerProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const styles = { height: `${height}px` };

    let content;
    if (loading) {
      content = <LeapFrog size={100} speed={3} color="rgb(38 38 38)" />;
    } else if (!visible) {
      content = (
        <div className="flex flex-col justify-center items-center gap-y-12">
          <Expand size={100} />
          <h2 className="text-lg text-center">
            <span className="text-lg font-semibold">
              Whoops! For a better UX
            </span>
            <br />
            <span className="text-base">
              increase the window width or decrease the array size.
            </span>
          </h2>
        </div>
      );
    } else {
      content = children;
    }

    return (
      <div className="relative flex visualizer-bp:justify-center bg-neutral-50 border-neutral-100 border shadow-md rounded-xl p-6">
        <div
          ref={ref}
          style={styles}
          className={`flex justify-center gap-x-px w-full overflow-hidden ${
            loading || !visible ? "items-center" : "items-end"
          }`}
        >
          {content}
        </div>
      </div>
    );
  }
);

VisualizerContainer.displayName = 'VisualizerContainer';

export default VisualizerContainer;
