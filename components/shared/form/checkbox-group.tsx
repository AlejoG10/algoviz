import Input from "./input";
import Label from "./label";

interface RangeGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  multicoloredLabel?: boolean;
}

const CheckboxGroup: React.FC<RangeGroupProps> = ({
  label,
  multicoloredLabel,
  name,
  value,
  checked,
  onChange,
  disabled,
}) => {
  return (
    <div className="flex items-center gap-x-5">
      <Label htmlFor={name} multicolor={multicoloredLabel} className="w-24">
        {label}
      </Label>
      <Input
        name={name}
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4"
        disabled={disabled}
      />
    </div>
  );
};

export default CheckboxGroup;
