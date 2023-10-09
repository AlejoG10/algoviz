interface PlaygroundContainerProps {
  children: React.ReactNode;
}

const PlaygroundContainer: React.FC<PlaygroundContainerProps> = ({
  children,
}) => {
  return (
    <div className="flex flex-col lg:justify-between gap-y-8 lg:gap-0 w-full">
      {children}
    </div>
  );
};

export default PlaygroundContainer;
