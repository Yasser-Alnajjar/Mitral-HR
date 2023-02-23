import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Status({ length, icon, title }) {
  const { theme } = useSelector((state) => state);

  return (
    <Card className={`p-3 text-center  shadow ${theme.mode}`}>
      <Card.Body>{icon}</Card.Body>
      <Card.Title>{length}</Card.Title>
      <Card.Text>{title}</Card.Text>
    </Card>
  );
}
