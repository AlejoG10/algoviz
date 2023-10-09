interface ControllerContainerProps {
  children: React.ReactNode;
}

const SidebarContainer: React.FC<ControllerContainerProps> = ({ children }) => {
  return (
    <div className="w-full lg:max-w-[400px] h-fit lg:h-full">
      <div className="flex flex-wrap lg:flex-nowrap lg:flex-col lg:items-center gap-6 bg-neutral-100 rounded-lg p-4 w-full h-full overflow-scroll">
        {children}
      </div>
    </div>
  );
};

export default SidebarContainer;
