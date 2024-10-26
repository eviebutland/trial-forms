import { MouseEventHandler } from "react";
import Button from "react-bootstrap/Button";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
  disabled?: boolean;
  variant: "primary" | "secondary" | "success" | "danger" | "info";
}

// R prefix to represent 'Restuarant'
export const RButton = (props: ButtonProps) => {
  return (
    <Button
      disabled={props.disabled}
      onClick={props.onClick}
      variant={`outline-${props.variant}`}
    >
      {props.label}
    </Button>
  );
};

export default RButton;
