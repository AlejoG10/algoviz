interface ControllerContainerProps {
  children: React.ReactNode;
}

const ControllerContainer: React.FC<ControllerContainerProps> = ({
  children,
}) => {
  return (
    <div className="flex flex-col-reverse lg:flex-row gap-10 w-full h-fit lg:h-[650px]">
      {children}
    </div>
  );
};

export default ControllerContainer;
