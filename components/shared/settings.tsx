interface SettingsProps {
  children: React.ReactNode;
}

const Settings: React.FC<SettingsProps> = ({ children }) => {
  return (
    <div className="bg-neutral-50 border-neutral-100 border shadow-md rounded-xl px-4 xl:px-6 py-4 xl:w-full h-full">
      <div className="flex flex-col gap-y-4">{children}</div>
    </div>
  );
};

export default Settings;
