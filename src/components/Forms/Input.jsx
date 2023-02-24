import { FloatingLabel, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Input({
  type,
  register,
  label,
  typeInp,
  styleInp,
  min,
  max,
  count,
  error,
}) {
  const { theme } = useSelector((state) => state);
  return (
    <FloatingLabel
      controlId={`floatingInput${count}`}
      label={label}
      className={`mb-3 ${theme.mode}`}
    >
      <Form.Control
        {...register(type)}
        type={typeInp}
        className={`${styleInp} ${
          theme.mode === "dark" ? "dark" : "light-revers"
        } ${error && "border-danger"} `}
        name={type}
        min={min}
        max={max}
        placeholder={`Enter ${label}`}
      />
    </FloatingLabel>
  );
}
