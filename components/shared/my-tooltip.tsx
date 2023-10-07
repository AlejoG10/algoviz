import { Tooltip, TooltipPlacement } from "@nextui-org/react";

interface MyTooltipProps {
  placement?: TooltipPlacement;
  content: string | React.ReactNode;
  color:
    | "default"
    | "foreground"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  offset: number;
  children: React.ReactNode;
}

const MyTooltip: React.FC<MyTooltipProps> = ({
  placement = "top",
  content,
  color,
  offset,
  children,
}) => {
  return (
    <Tooltip
      placement={placement}
      showArrow={true}
      content={content}
      color={color}
      offset={offset}
      className="text-white"
    >
      <div>{children}</div>
    </Tooltip>
  );
};

export default MyTooltip;
