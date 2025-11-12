import React from "react";

interface InjectedProps {
  opened?: boolean;
  inverted?: boolean;
}

type NavBarItemProps = InjectedProps & React.HTMLAttributes<HTMLSpanElement>;

export const NavBarItem: React.FC<NavBarItemProps> = ({
  children,
  opened,
  inverted,
  className,
}) => (
  <span
    className={`cursor-pointer ${
      opened
        ? "text-green-light font-semibold"
        : `font-medium ${inverted && "text-white"}`
    } ${className}`}
  >
    {children}
  </span>
);
