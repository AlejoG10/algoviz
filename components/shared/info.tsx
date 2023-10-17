import WindowSimulator from "../window-simulator/window-simulator";

interface InfoProps {
  heading: string;
  pseudocode: React.ReactNode;
  codePY: React.ReactNode;
  codeJS: React.ReactNode;
  codeTS: React.ReactNode;
}

const Info: React.FC<InfoProps> = ({
  heading,
  pseudocode,
  codePY,
  codeJS,
  codeTS,
}) => {
  return (
    <section className="flex flex-col gap-y-4">
      {/* header */}
      <h1 className="relative bottom-4 text-4xl font-black">{heading}</h1>
      {/* TODO: description */}

      {/* (pseudo)code */}
      <div className="flex flex-col gap-y-4 lg:flex-row lg:justify-between w-full">
        <WindowSimulator
          heading="Code"
          codePY={codePY}
          codeJS={codeJS}
          codeTS={codeTS}
        />
        <WindowSimulator heading="Pseudocode" pseudocode={pseudocode} />
      </div>

      {/* TODO: facts */}
    </section>
  );
};

export default Info;
