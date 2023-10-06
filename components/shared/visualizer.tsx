import Loader from "../loader";

interface VisualizerProps {
  width: number;
  height: number;
  loading: boolean;
  children: React.ReactNode;
}

const Visualizer: React.FC<VisualizerProps> = ({
  width,
  height,
  loading,
  children,
}) => {
  const styles = { width: `${width}px`, height: `${height}px` };

  return (
    <div
      style={styles}
      className={`flex justify-center gap-x-px bg-neutral-50 rounded-xl border-neutral-100 border shadow-md px-px
      ${loading ? "items-center" : "items-end"}`}
    >
      {loading ? <Loader /> : children}
    </div>
  );
};

export default Visualizer;
