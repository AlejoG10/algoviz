interface ItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Item: React.FC<ItemProps> = ({
  name,
  label,
  type,
  min,
  max,
  value,
  checked,
  onChange,
  className,
  disabled,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <label htmlFor={name} className="font-medium w-full">
        {label}
      </label>
      <input
        name={name}
        type={type}
        min={min}
        max={max}
        value={value}
        checked={checked}
        onChange={onChange}
        className={className}
        disabled={disabled}
      />
    </div>
  );
};

export default Item;
