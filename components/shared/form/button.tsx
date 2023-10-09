interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  circle?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  bgColor,
  circle,
  className,
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      type={type}
      className={`flex justify-center items-center text-white p-2 disabled:opacity-50
        ${
          bgColor === "green" &&
          "bg-green-500 hover:bg-green-600 focus:bg-green-600 focus:outline-none"
        }
        ${
          bgColor === "red" &&
          "bg-rose-500 hover:bg-rose-600 focus:bg-rose-600 focus:outline-none"
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
