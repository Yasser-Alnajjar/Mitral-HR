import Link from "next/link";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function PageNotFound() {
  const { theme } = useSelector((state) => state);

  return (
    <div
      className={`${theme.mode} position-fixed top-0 start-0 w-100 h-100 z-index-999`}
    >
      <div>
        <div className="mvh-100 d-flex align-items-center justify-content-center flex-column">
          <h1>404</h1>
          <h1>Page Not Found</h1>
          <Button
            as={Link}
            className="d-block"
            href="/dashboard"
            variant={theme.mode === "dark" ? "light" : "dark"}
          >
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
