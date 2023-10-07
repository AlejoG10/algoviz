import Label from "./label";
import Input from "./input";

export type Radio = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

interface RadioGroupProps {
  label: string;
  name: string;
  radioGroup: Radio[];
  disabled: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  radioGroup,
  disabled,
}) => {
  return (
    <div className="flex gap-x-5">
      <div className="flex gap-x-5">
        <Label htmlFor={name} className="w-24">
          {label}
        </Label>

        <div className="flex flex-col gap-y-4">
          {radioGroup.map((radio) => (
            <div key={radio.label} className="flex items-center gap-x-4">
              <Input
                type="radio"
                {...radio}
                className="w-4 h-4"
                disabled={disabled}
              />
              <label htmlFor={name}>{radio.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RadioGroup;
