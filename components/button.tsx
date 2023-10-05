interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  label,
  outline,
  className,
  onClick,
  disabled,
}) => {
  return (
    <button
      type={type}
      className={`rounded-md p-2 ${
        outline
          ? "hover:bg-neutral-50 text-neutral-800 border border-neutral-800"
          : "bg-indigo-500 hover:bg-indigo-600 text-white"
      } 
        ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
