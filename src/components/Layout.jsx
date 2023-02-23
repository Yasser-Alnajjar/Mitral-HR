import Sidebar from "./Shared/Sidebar";
import NavbarFC from "./Shared/NavbarFC";
import { useSelector } from "react-redux";
import Loading from "./Shared/Loading";
import { Toaster } from "react-hot-toast";
import { AiOutlineArrowUp } from "react-icons/ai";
import { Button, IconButton } from "rsuite";

export default function Layout({ children }) {
  const { theme, branches, departs, employees, tasks } = useSelector(
    (state) => state
  );
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className={`w-100 mvh-100 ${theme.mode}`}>
        {/* {departs.loading && <Loading />}

        {tasks.loading && <Loading />} */}
        <div className={" d-flex"}>
          <Sidebar />
          <div className="w-100">
            <NavbarFC />
            <Toaster
              toastOptions={{
                duration: 4000,
                position: "right-top",
                style: {},
                className: `${
                  theme.mode === "dark"
                    ? "bg-gray-alt text-white"
                    : "bg-white text-dark"
                } shadow`,
              }}
            />
            <div>{children}</div>
            <div
              className="position-fixed"
              style={{
                bottom: "30px",
                right: "30px",
              }}
            >
              <Button
                onClick={() => scrollTop()}
                appearance="primary"
                color="cyan"
                circle
              >
                <AiOutlineArrowUp />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
