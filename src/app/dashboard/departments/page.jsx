"use client";
import { toast } from "react-hot-toast";
import Card from "../../../components/Card";
import LoadingComponent from "../../../components/LoadingComponent";
import {
  useDeleteDepartmentMutation,
  useGetDepartmentsQuery,
} from "../../../redux/departments/departmentSlice";
import EditDepartmentFrom from "../../../components/forms/department/EditDepartmentFrom";
import AddDepartmentFrom from "../../../components/forms/department/AddDepartmentFrom";
import { useState } from "react";
import Modal from "../../../components/apstracts/Modal";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Departments() {
  const [open, setOpen] = useState(false);
  const [departmentId, setDepartmentId] = useState("");

  const {
    data: departments,
    isLoadingComponent,
    isSuccess,
    isError,
    error,
  } = useGetDepartmentsQuery();
  const [deleteDepartment] = useDeleteDepartmentMutation();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#198754",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        deleteDepartment(id).unwrap();
      }
    });
  };
  let content;
  if (isLoadingComponent) {
    content = <LoadingComponent />;
  } else if (isSuccess) {
    content = (
      <section className="department">
        <div className="container">
          <AddDepartmentFrom setOpen={setOpen} departmentId={departmentId} />
          <Modal open={open} setOpen={setOpen} title="Edit Branch">
            <EditDepartmentFrom setOpen={setOpen} departmentId={departmentId} />
          </Modal>
          <div className="department__items">
            {departments.map((item) => (
              <Card
                key={item.id}
                title={`${item.name.replace("_", " ")}`}
                text={item.leader}
              >
                <div className="btns-group">
                  <button
                    onClick={() => {
                      setOpen(true);
                      setDepartmentId(item.id);
                    }}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  <Link
                    href={`/dashboard/departments/${item.name}`}
                    className="btn btn-success"
                  >
                    Details
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  } else if (isError) {
    toast.error(error.data);
  }
  return content;
}
