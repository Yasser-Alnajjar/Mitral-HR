import AddDepartment from "@/components/departments/addDepartment";
import DepartCard from "@/components/departments/DepartCard";
import DepartCardOver from "@/components/departments/DepartCardOver";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "redux/slices/department-slice";

export default function Departments() {
  const { theme, departs } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  return (
    <div className={`py-4 mvh-100 ${theme.mode}`}>
      <Container>
        <AddDepartment setOpen={setOpen} open={open} />
        <div className="d-flex align-items-center justify-content-end">
          <Button
            variant={!open ? "warning" : "danger"}
            className="d-flex align-items-center gap-1"
            onClick={() => setOpen(!open)}
          >
            <AiOutlineFolderAdd size={22} />
          </Button>
        </div>
        <Row className="py-4">
          <Col lg="8">
            <Row>
              {departs?.departmentes?.map((depart) => {
                return (
                  <Col md="4" className="mb-4" key={depart.id}>
                    <DepartCard name={depart.name} id={depart.id} />
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col lg="4">
            <Card
              className={` border-0 shadow  ${
                theme.mode === "dark" ? "bg-gray-alt " : "bg-white"
              }`}
            >
              <Card.Title className="text-center m-0  pt-3">
                Over Veiw
              </Card.Title>
              <>
                <Card.Body>
                  <Row>
                    {departs?.departmentes?.map((depart) => {
                      return (
                        <Col key={depart.id} sm="12">
                          <Card
                            className={`text-indent-10 my-3 border-0 shadow p-2 ${
                              theme.mode === "dark"
                                ? "bg-gray-main "
                                : "bg-white"
                            }`}
                          >
                            <DepartCardOver name={depart.name} />
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </Card.Body>
              </>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
