export default function Input({
  label,
  register,
  required,
  defaultValue,
  pattern,
  error,
  type,
  format,
  value,
}) {
  return (
    <input
      className={`form-control ${error && "text-danger border-danger"}`}
      {...register(label, { required })}
      placeholder={label}
      type={type}
      defaultValue={defaultValue}
      pattern={pattern}
      format={format}
      value={value}
    />
  );
}
