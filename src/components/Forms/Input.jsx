import { Form } from "react-bootstrap";
// import { useForm } from "react-hook-form";

export default function Input({
  type,
  register,
  label,
  typeInp,
  styleInp,
  min,
  max,
}) {
  return (
    <Form.Group className="mb-3" controlId="formBasic2">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...register(type)}
        type={typeInp}
        className={styleInp}
        name={type}
        min={min}
        max={max}
        placeholder={`Enter ${label}`}
      />
    </Form.Group>
  );
}
