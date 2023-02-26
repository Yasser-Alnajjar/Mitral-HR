import Link from "next/link";
import { Card } from "react-bootstrap";
import { FaCodeBranch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
export default function BranchCard({
  cardStyle,
  handleDelete,
  title,
  subtitle,
  icon,
  id,
}) {
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  let iconStyle = {
    left: "50%",
    transform: " translateX(50%)",
    top: "4px",
    fontSize: "50px",
  };

  return (
    <Card
      className={` border-0 shadow  ${
        theme.mode === "dark" ? "bg-gray-alt " : "bg-white"
      }`}
      style={cardStyle}
    >
      <Card.Body className="d-flex justify-content-around">
        <div>
          <Card.Title className="py-2">{title}</Card.Title>
          <Card.Subtitle>{subtitle}</Card.Subtitle>
        </div>
        <Card.Text style={iconStyle}>
          <FaCodeBranch style={{ color: "rgba(0,0,0,.15)" }} />
        </Card.Text>
      </Card.Body>
      <div className="d-flex py-3 justify-content-center gap-2">
        <Link
          className="text-purple cursor-p"
          href={`/dashboard/branches/${id}`}
        >
          More info
        </Link>
        <span
          className=" text-danger cursor-p"
          onClick={() => handleDelete(id)}
        >
          Delete
        </span>
      </div>
    </Card>
  );
}
