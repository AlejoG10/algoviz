import Label from "./label";

interface RangeGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const RangeGroup: React.FC<RangeGroupProps> = ({ label, ...props }) => {
  return (
    <div className="flex items-center gap-x-5 w-full">
      <Label htmlFor={props.name} className="w-24">
        {label}
      </Label>
      <input
        name={props.name}
        type="range"
        step={props.step}
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={props.onChange}
        className={`accent-neutral-800 flex-1 ${props.className}`}
        disabled={props.disabled}
      />
      <span className="text-neutral-600 text-base text-center w-10">
        {props.value}
      </span>
    </div>
  );
};

export default RangeGroup;
