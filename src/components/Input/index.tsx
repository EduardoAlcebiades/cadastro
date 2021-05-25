import React from "react";

import "./styles.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  invalid?: boolean;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

const Input: React.FC<InputProps> = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ label, invalid, containerProps, ...props }, ref) => {
  return (
    <div
      className={`inputContainer ${
        props.disabled || props.readOnly ? "disabled" : ""
      } ${containerProps?.className || ""}`}
      {...containerProps}
    >
      {label && (
        <label htmlFor={props.id}>
          {label} {props.required && <span>*</span>}
        </label>
      )}

      <input ref={ref} className={invalid ? "invalid" : ""} {...props} />
    </div>
  );
});

export default Input;
