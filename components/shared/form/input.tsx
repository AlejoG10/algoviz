interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// TODO: accept {...props}
const Input: React.FC<InputProps> = ({
  name,
  type,
  step,
  min,
  max,
  value,
  checked,
  className,
  onClick,
  onChange,
  disabled,
}) => {
  return (
    <input
      name={name}
      type={type}
      step={step}
      min={min}
      max={max}
      value={value}
      checked={checked}
      onClick={onClick}
      onChange={onChange}
      className={`accent-neutral-800 ${className}`}
      disabled={disabled}
    />
  );
};

export default Input;
