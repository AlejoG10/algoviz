import Loader from "../loader";

interface VisualizerProps {
  height: number;
  loading: boolean;
  children: React.ReactNode;
}

const Visualizer: React.FC<VisualizerProps> = ({
  height,
  loading,
  children,
}) => {
  const styles = { height: `${height}px` };

  return (
    <div className="flex visualizer-bp:justify-center bg-neutral-50 border-neutral-100 border shadow-md rounded-xl px-6 py-8">
      <div
        style={styles}
        className={`flex justify-center gap-x-px w-full ${
          loading ? "items-center" : "items-end"
        }`}
      >
        {loading ? <Loader /> : children}
      </div>
    </div>
  );
};

export default Visualizer;
