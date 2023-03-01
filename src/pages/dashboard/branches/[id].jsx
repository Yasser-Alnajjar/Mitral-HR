import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { AiOutlineCloseCircle, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranch_employees } from "redux/slices/barnches-slice";
import { deleteEmployee } from "redux/slices/employees-slice";
import Swal from "sweetalert2";

export default function BranchInfo() {
  const { theme, branches } = useSelector((state) => state);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBranch_employees(id));
  }, [dispatch, id]);

  const handleClick = (userId) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this, employee will be deleted !!",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEmployee(userId));
        setTimeout(() => {
          dispatch(fetchBranch_employees(id));
        }, 200);
      }
    });
  };
  return (
    <Layout py>
      <Container>
        <Card className={theme.mode + " shadow"}>
          <Table className={theme.mode + " "}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Department</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Salary</th>
                <th>Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {branches?.branch_employees ? (
                branches?.branch_employees.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.department}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>{user.salary}</td>
                    <td>{user.rate}</td>
                    <td>
                      <tr className="d-flex justify-content-center gap-2">
                        <Link href={""} className="cursor-p">
                          <AiOutlineEdit size={20} className="text-success" />
                        </Link>
                        <td
                          className="cursor-p"
                          onClick={() => handleClick(user.id)}
                        >
                          <AiOutlineCloseCircle
                            size={20}
                            className="text-danger"
                          />
                        </td>
                      </tr>
                    </td>
                  </tr>
                ))
              ) : (
                <h1>This Branch Not Working Now</h1>
              )}
            </tbody>
          </Table>
        </Card>
      </Container>
    </Layout>
  );
}
