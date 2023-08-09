export default function Alert({ children, type }) {
  return (
    <div className="alert">
      <div className={`alert__content ${type}`}>{children}</div>
    </div>
  );
}
