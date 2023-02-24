import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Status({ length, icon, title }) {
  const { theme } = useSelector((state) => state);

  return (
    <div className="status">
      <Card
        className={`pt-3   shadow ${
          theme.mode === "dark" ? "dark-revers" : "light-revers"
        }`}
      >
        <div className="d-flex  justify-content-bettween">
          <div className="w-100">
            <Card.Body>{icon}</Card.Body>
          </div>
          <div className="w-100 text-center">
            <Card.Title>{length}</Card.Title>
            <Card.Text>{title}</Card.Text>
          </div>
        </div>
      </Card>
    </div>
  );
}
