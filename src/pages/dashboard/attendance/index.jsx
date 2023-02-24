import Dorpmenu from "@/components/Shared/dropdwonCu";
import MainTitle from "@/components/Shared/MainTitle";
import MenuCard from "@/components/Shared/Menu-Card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import {
  AiOutlineBorderlessTable,
  AiOutlineMore,
  AiOutlineOrderedList,
} from "react-icons/ai";
import { useSelector } from "react-redux";

export default function Attendance() {
  const { theme, user } = useSelector((state) => state);
  const [attend, setAttend] = useState(false);
  const [day, setDay] = useState("All");
  const [list, setList] = useState(false);

  return (
    <div className={theme.mode + " py-4"}>
      <MainTitle title={"Attendance"} classes={"pb-2"} />
      <Container className="py-3">
        <div className="d-flex justify-content-between pe-5">
          <span>{day}</span>
          <div>
            <Form.Select
              onChange={(e) => setDay(e.target.value)}
              className={theme.mode}
              size="sm"
            >
              <option value="All">Filter</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
            </Form.Select>
          </div>
          <ButtonGroup>
            <Button
              as={Link}
              href="/dashboard/attendance/takeattend"
              variant="danger"
            >
              Take Attendance
            </Button>
            <Button onClick={() => setList(!list)} variant="warning">
              {!list ? <AiOutlineOrderedList /> : <AiOutlineBorderlessTable />}
            </Button>
          </ButtonGroup>
        </div>
      </Container>
      {list ? (
        <Container>
          <Table responsive className={`${theme.mode} text-center`} size="md">
            <thead>
              <tr>
                <th>ID</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Department</th>
                <th>Attendance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <Image
                    height={50}
                    width={50}
                    alt="avatar"
                    loader={() =>
                      " https://robohash.org/perferendisideveniet.png"
                    }
                    src="https://robohash.org/perferendisideveniet.png"
                  />
                </td>
                <td>Yasser</td>
                <td>Sfotware</td>
                <td>{attend ? "Attend" : "Leave"}</td>
                <td>
                  <Dorpmenu attend={attend} setAttend={setAttend} />
                </td>
              </tr>
            </tbody>
          </Table>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col lg="3" className="mb-4">
              <Card
                className={`${theme.mode} position-relative     text-center shadow`}
              >
                {/* <MenuCard attend={attend} setAttend={setAttend} /> */}
                <div className="position-absolute py-2 top-0 end-0">
                  <Dorpmenu
                    attend={attend}
                    translate={"translate(-100%,-50%)"}
                    setAttend={setAttend}
                  />
                </div>
                <div className=" d-flex justify-content-center py-3">
                  <div style={{ height: 100, width: 100 }}>
                    <Image
                      loader={() =>
                        " https://robohash.org/perferendisideveniet.png"
                      }
                      src="https://robohash.org/perferendisideveniet.png"
                      height={50}
                      alt={"avatar"}
                      width={50}
                      style={{ height: "100%", width: "100%" }}
                      className="d-block border rounded-circle "
                    />
                  </div>
                </div>
                <Card.Body>
                  {user.user.firstName} {user.user.lastName}
                </Card.Body>
                <div className="w-50 py-3 mx-auto">
                  <Button variant={attend ? "success" : "danger"}>
                    {attend ? "Attend" : "Leave"}
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
