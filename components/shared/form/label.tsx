interface LabelProps extends React.LabelHTMLAttributes<HTMLInputElement> {
  multicolor?: boolean;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor, multicolor, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-medium w-28 ${
        multicolor &&
        "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-rose-500"
      }`}
    >
      {children}
    </label>
  );
};

export default Label;
