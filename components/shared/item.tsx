interface ItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  multicolorLabel?: boolean;
  showValue?: boolean;
}

const Item: React.FC<ItemProps> = ({
  name,
  label,
  multicolorLabel,
  type,
  step,
  min,
  max,
  value,
  showValue,
  checked,
  onClick,
  onChange,
  className,
  disabled,
}) => {
  return (
    <div className="flex items-center gap-x-5">
      <label
        htmlFor={name}
        className={`font-medium w-28 ${
          multicolorLabel &&
          "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-rose-500"
        }`}
      >
        {label}
      </label>
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
        className={`accent-indigo-500 ${className}`}
        disabled={disabled}
      />
      {showValue && <span className="text-center w-12">{value}</span>}
    </div>
  );
};

export default Item;
