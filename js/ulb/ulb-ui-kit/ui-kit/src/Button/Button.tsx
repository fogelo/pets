import React, { FC, ReactNode } from "react";
import "./Button.css";

export interface ButtonProps {
  children: ReactNode;
  color?: string;
  big?: boolean;
}

const Button: FC<ButtonProps> = ({ children, color, big, ...props }) => {
  const classes = ["ulb-button"];
  if (big) {
    classes.push("ulb-button-big");
  }
  return (
    <button {...props} className={classes.join(" ")} style={{ color }}>
      {children}
    </button>
  );
};

export default Button;
