import { useState } from "react";
import Image from "next/image";

interface BtnSimulatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const BtnSimulator: React.FC<BtnSimulatorProps> = ({ className }) => {
  return (
    <div
      className={`absolute top-2 rounded-full aspect-square w-3 ${className}`}
    />
  );
};

interface TabSimulatorProps {
  active: boolean;
  imgUrl?: string;
  name: string;
  onClick?: () => void;
}

const TabSimulator: React.FC<TabSimulatorProps> = ({
  active,
  imgUrl,
  name,
  onClick,
}) => {
  return (
    <div
      className={`flex justify-center items-center gap-x-2 bg-[rgb(40,42,55)] hover:brightness-110 rounded-t-md border-x border-x-neutral-900 p-2 w-1/3 min-w-[200px] cursor-pointer ${
        active && "border-t border-t-fuchsia-700"
      }`}
      onClick={onClick}
    >
      {imgUrl && <Image src={imgUrl} alt="lang" width={16} height={16} />}
      <p className="text-sky-300 text-center">{name}</p>
    </div>
  );
};

interface WindowSimulatorProps {
  heading: string;
  pseudocode?: React.ReactNode;
  codeTS?: React.ReactNode;
  codeJS?: React.ReactNode;
  codePY?: React.ReactNode;
}

const WindowSimulator: React.FC<WindowSimulatorProps> = ({
  heading,
  pseudocode,
  codePY,
  codeJS,
  codeTS,
}) => {
  const [active, setActive] = useState("py");

  const handleTabClick = (name: string) => {
    if (active !== name) {
      setActive(name);
    }
  };

  return (
    <div className="bg-[rgb(40,42,55)] rounded-lg w-full lg:w-[49%] h-fit">
      <div className="flex flex-col">
        {/* header */}
        <div className="relative flex flex-col justify-between items-center bg-[rgb(33,34,45)] rounded-t-lg h-24">
          <BtnSimulator className="bg-rose-500 left-2" />
          <BtnSimulator className="bg-yellow-400 left-6" />
          <BtnSimulator className="bg-green-500 left-10" />
          <h3 className="text-lg text-white font-medium my-auto">{heading}</h3>

          {/* tabs */}
          <div className="flex items-center w-full overflow-x-scroll no-scrollbar">
            {pseudocode && <TabSimulator active name="pseudocode" />}
            {!pseudocode && (
              <>
                <TabSimulator
                  active={active === "py"}
                  imgUrl="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                  name="python.py"
                  onClick={() => handleTabClick("py")}
                />
                <TabSimulator
                  active={active === "js"}
                  imgUrl="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                  name="java-script.js"
                  onClick={() => handleTabClick("js")}
                />
                <TabSimulator
                  active={active === "ts"}
                  imgUrl="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                  name="type-script.ts"
                  onClick={() => handleTabClick("ts")}
                />
              </>
            )}
          </div>
        </div>

        {/* body */}
        <div className="rounded-b-lg w-full h-fit overflow-x-scroll no-scrollbar">
          {pseudocode}
          {active === "ts" && codeTS}
          {active === "js" && codeJS}
          {active === "py" && codePY}
        </div>
      </div>
    </div>
  );
};

export default WindowSimulator;
