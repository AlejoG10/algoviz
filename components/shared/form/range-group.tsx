import Label from "./label";

interface RangeGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const RangeGroup: React.FC<RangeGroupProps> = ({
  label,
  name,
  min,
  max,
  step,
  value,
  className,
  onChange,
  disabled,
}) => {
  return (
    <div className="flex items-center gap-x-5 w-full">
      <Label htmlFor={name} className="w-24">
        {label}
      </Label>
      <input
        name={name}
        type="range"
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className={`accent-neutral-800 flex-1 ${className}`}
        disabled={disabled}
      />
      <span className="text-neutral-600 text-base text-center w-10">
        {value}
      </span>
    </div>
  );
};

export default RangeGroup;
