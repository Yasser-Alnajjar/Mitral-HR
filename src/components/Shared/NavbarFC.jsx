import { Container, Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import {
  setDarkTheme,
  setDefaultTheme,
  showSidbar,
} from "redux/slices/theme-slice";
import {
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import { logout } from "redux/slices/user-slice";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Dropdown } from "rsuite";
export default function NavbarFC() {
  const { theme, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleTheme = () => {
    if (theme.mode === "dark") {
      dispatch(setDefaultTheme());
    } else {
      dispatch(setDarkTheme());
    }
  };

  return (
    <Navbar className={theme.mode + " align-items-center border-bottom"}>
      <Container>
        <Nav className="me-auto me-2">
          <Nav.Item
            className={`cursor-p ${
              theme.mode === "dark" ? "text-light" : "text-dark"
            }`}
            onClick={() => dispatch(showSidbar(!theme.sidbar))}
          >
            <AiOutlineMenu />
          </Nav.Item>
        </Nav>
        <Nav className={`ms-auto ${theme.mode} pe-3`}>
          <Nav.Item className={`cursor-p ${theme.mode}`} onClick={handleTheme}>
            {theme.mode === "dark" ? <FaRegSun /> : <FaRegMoon />}
          </Nav.Item>
        </Nav>
        <Dropdown
          appearance="subtle"
          noCaret
          title={<Avatar size="sm" circle src="/user.jpg" alt="@SevenOutman" />}
        >
          <Dropdown.Item
            as={Link}
            className="d-flex align-items-center gap-2"
            href={`/dashboard/profile`}
          >
            <AiOutlineUser size={20} />
            <span>Profile</span>
          </Dropdown.Item>
          <Dropdown.Item
            as={Link}
            href={`/dashboard/profile/editprofile/${user.user.id}`}
            className="d-flex align-items-center gap-2"
          >
            <AiOutlineUserSwitch size={20} />
            <span>Edit Profile</span>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              router.push("/");
              dispatch(logout());
            }}
            className="d-flex align-items-center gap-2"
          >
            <AiOutlineLogout size={20} />
            <span>Logout</span>
          </Dropdown.Item>
        </Dropdown>
      </Container>
    </Navbar>
  );
}
