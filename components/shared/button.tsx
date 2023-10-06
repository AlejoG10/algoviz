interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  outline?: boolean;
  circle?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  outline,
  circle,
  className,
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      type={type}
      className={`flex justify-center items-center p-2 
        ${
          outline
            ? "hover:bg-neutral-100 text-neutral-800 border border-neutral-800"
            : "bg-indigo-500 hover:bg-indigo-600 text-white"
        } 
        ${circle ? "rounded-full" : "rounded-md"}
        ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
