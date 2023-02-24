import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaCodeBranch } from "react-icons/fa";
import BranchCard from "@/components/branches/BranchCard";
import FormAddbranch from "@/components/branches/FormAddbranch";
import { useEffect, useState } from "react";
import { deleteBranch, fetchBranch } from "redux/slices/barnches-slice";
import { AiOutlineCreditCard, AiOutlineOrderedList } from "react-icons/ai";
import Loading from "@/components/Shared/Loading";
import Swal from "sweetalert2";
import Modals from "@/components/Shared/Modals";
export default function Branches() {
  const { theme, branches } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [list, setList] = useState(false);

  useEffect(() => {
    dispatch(fetchBranch());
  }, [dispatch]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure !",
      text: "After This step Branch is will deleted",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
      background: theme.mode === "dark" ? "#1a1a1a" : "#f6f7fc",
      color: theme.mode === "dark" ? "#f6f7fc" : "#1a1a1a",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBranch(id));
        setTimeout(() => {
          dispatch(fetchBranch());
        }, 100);
      }
    });
  };
  const [open, setOpen] = useState(false);
  return (
    <div className={`py-5 ${theme.mode} `}>
      {branches.loading && <Loading />}
      <Container>
        <Modals
          title="Add Branch"
          show={open}
          onHide={() => setOpen(!open)}
          forms={<FormAddbranch />}
        />
        <div className="d-flex align-items-center justify-content-end">
          <ButtonGroup>
            <Button
              variant={!list ? "warning" : "danger"}
              className="d-flex align-items-center gap-1"
              onClick={() => setList(!list)}
            >
              {list ? <AiOutlineOrderedList /> : <AiOutlineCreditCard />}
            </Button>
            <Button
              variant={!open ? "success" : "danger"}
              className="d-flex align-items-center gap-1"
              onClick={() => setOpen(!open)}
            >
              <FaCodeBranch />+
            </Button>
          </ButtonGroup>
        </div>
        {!list ? (
          <Row className="my-5">
            {branches?.branches &&
              branches?.branches.map((item) => {
                return (
                  <Col className="mb-4" key={item.id} lg="3">
                    <BranchCard
                      id={item.id}
                      handleDelete={handleDelete}
                      title={item.name}
                    />
                  </Col>
                );
              })}
          </Row>
        ) : (
          <Row className="my-5">
            <Card className={theme.mode + " shadow"}>
              <Table className={`${theme.mode} text-center`} responsive>
                <thead>
                  <tr>
                    <th>Branch_DI</th>
                    <th>Branch Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {branches?.branches &&
                    branches?.branches.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Card>
          </Row>
        )}
      </Container>
    </div>
  );
}
