interface InfoProps {
  heading: string;
}

const Info: React.FC<InfoProps> = ({ heading }) => {
  return (
    <section>
      <h1 className="text-5xl font-black">{heading}</h1>
    </section>
  );
};

export default Info;
