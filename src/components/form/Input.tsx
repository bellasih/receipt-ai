import React from "react";

interface InjectedProps {
  label: JSX.Element | string;
  placeholder?: string;
  name: string;
  type: string;
  labelClassName?: string;
  inputClassName?: string;
  className?: string;
}

type InputProps = InjectedProps & React.HTMLProps<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  name,
  type,
  labelClassName,
  inputClassName,
  className,
  ...props
}) => (
  <div className={`flex flex-col my-2 ${className}`}>
    <label htmlFor={name} className={`font mb-1 ${labelClassName}`}>
      {label}
    </label>
    <input
      type={type}
      className={`mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-christi-500 ${inputClassName}`}
      name={name}
      placeholder={placeholder}
      {...props}
      required={props.required ? props.required : true}
    />
  </div>
);

export default Input;
