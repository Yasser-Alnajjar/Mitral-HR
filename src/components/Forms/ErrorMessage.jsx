export default function ErrorMessage({ errors }) {
  return (
    <>
      {errors && (
        <span
          className={`text-capitalize error  d-block ${
            errors ? "text-danger" : "text-success"
          }`}
        >
          {errors.message}
        </span>
      )}
    </>
  );
}
