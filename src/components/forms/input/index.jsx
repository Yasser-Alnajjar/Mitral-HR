import { useState } from "react";
export default function Input({
  label,
  register,
  required,
  defaultValue,
  pattern,
  error,
  type,
}) {
  let labelInput = label.replaceAll("_", " ");
  return (
    <div>
      <label className={`form-label `} htmlFor={label}>
        {labelInput}
      </label>
      <input
        className={`form-control  ${error ? "text-danger border-danger" : ""}`}
        id={label}
        {...register(label, { required })}
        type={type}
        defaultValue={defaultValue}
        pattern={pattern}
      />
    </div>
  );
}
