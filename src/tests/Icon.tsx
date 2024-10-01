import React from "react";
import logo from "../logo.svg";

export const Icon: React.FC = () => {
  return <img src={logo} alt="Logo" data-testid="svg-icon" />;
};
