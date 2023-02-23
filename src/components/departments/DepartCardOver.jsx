import { Card, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function DepartCardOver({ name, employee, manager }) {
  const { theme } = useSelector((state) => state);
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="tooltip-disabled">Department</Tooltip>}
      >
        <Card.Title
          className={`text-center rounded ${
            theme.mode === "dark" ? "bg-gray-alt-2 " : "bg-light"
          }`}
        >
          <span className="d-inline-block">
            <span>{name}</span>
          </span>
        </Card.Title>
      </OverlayTrigger>
      <OverlayTrigger overlay={<Tooltip id="tooltip-right">Manager</Tooltip>}>
        <Card.Title
          className={`text-center rounded ${
            theme.mode === "dark" ? "bg-gray-alt-2 " : "bg-light"
          }`}
        >
          <span className="d-inline-block">
            <span>{manager}</span>
          </span>
        </Card.Title>
      </OverlayTrigger>
      {/* <OverlayTrigger
        overlay={<Tooltip id="tooltip-disabled"> Total Employee</Tooltip>}
      >
        <Card.Title
          className={`text-center rounded ${
            theme.mode === "dark" ? "bg-gray-alt-2 " : "bg-light"
          }`}
        >
          <span className="d-inline-block">
            <span>{employee}</span>
          </span>
        </Card.Title>
      </OverlayTrigger> */}
    </>
  );
}
