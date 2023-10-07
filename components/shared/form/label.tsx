interface LabelProps extends React.LabelHTMLAttributes<HTMLInputElement> {
  multicolor?: boolean;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({
  htmlFor,
  multicolor,
  className,
  children,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-neutral-800 font-medium ${
        multicolor &&
        "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-rose-500"
      } ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
