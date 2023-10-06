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
      className={`flex justify-center items-center text-white p-2 
        ${
          bgColor === "indigo" &&
          "bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-200"
        }
        ${
          bgColor === "green" &&
          "bg-green-500 hover:bg-green-600 disabled:bg-green-200"
        }
        ${
          bgColor === "red" &&
          "bg-rose-500 hover:bg-rose-600 disabled:bg-rose-200"
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
