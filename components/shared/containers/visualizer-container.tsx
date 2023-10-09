import Loader from "../loader";

interface VisualizerContainerProps {
  height: number;
  loading: boolean;
  children: React.ReactNode;
}

const VisualizerContainer: React.FC<VisualizerContainerProps> = ({
  height,
  loading,
  children,
}) => {
  const styles = { height: `${height}px` };

  return (
    <div className="relative flex visualizer-bp:justify-center bg-neutral-50 border-neutral-100 border shadow-md rounded-xl px-6 py-8">
      <div
        style={styles}
        className={`flex justify-center gap-x-px w-full overflow-hidden ${
          loading ? "items-center" : "items-end"
        }`}
      >
        {loading ? <Loader /> : children}
      </div>
    </div>
  );
};

export default VisualizerContainer;
