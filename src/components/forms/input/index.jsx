export default function Input({
  label,
  register,
  required,
  defaultValue,
  pattern,
  error,
  type,
}) {
  return (
    <input
      className={`form-control ${error && "text-danger border-danger"}`}
      {...register(label, { required })}
      placeholder={label}
      type={type}
      defaultValue={defaultValue}
      pattern={pattern}
    />
  );
}
