import clsx from "clsx";
import React, { ForwardedRef } from "react";
type ButtonColor = "primary" | "inverted" | "danger" | "ghost" | "plain";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColor;
}

const $Button = (
  { children, color, className, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const ButtonColorMapper = {
    primary: "border-2 border-green-light bg-green-light text-white",
    inverted: "border-2 border-green-light bg-white text-green-light",
    danger: "border-4 font-bold border-red-error text-red-error",
    ghost: "border-2 border-gray-500 bg-transparent text-gray-500",
    plain: "border-none bg-white text-black",
  };
  return (
    <button
      className={clsx(
        "rounded-lg text-sm lg:text-base font-semibold py-2 px-8 cursor-pointer",
        "hover:bg-opacity-75 focus:outline-none whitespace-nowrap",
        "inline-flex items-center",
        ButtonColorMapper[color],
        className
      )}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  );
};

export const Button = React.forwardRef($Button);

export default Button;
