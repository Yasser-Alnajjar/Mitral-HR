"use client";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useGetDepartmentsQuery } from "../../../redux/departments/departmentSlice";
import { useAddUserMutation } from "../../../redux/users/usersSlice";
import Input from "../../../components/forms/input";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
export default function Register() {
  const { data: departments, isSuccess } = useGetDepartmentsQuery();
  const [addUser] = useAddUserMutation();
  const router = useRouter();
  // React hook from
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const onSubmit = async (data) => {
    addUser({
      ...data,
    })
      .unwrap()
      .then(() => {
        toast.success(`${data.first_name} ${data.last_name} has been added!`);
        reset();
        Swal.fire({
          title: "Are you sure?",
          text: "if U confirmed you navigate to employees",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, go to employees",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/dashboard/employees");
          }
        });
      })
      .catch((err) => {
        toast.error(err.data);
      });
  };

  let selectBox;
  if (isSuccess) {
    selectBox = (
      <div>
        <select
          className={`form-select ${errors.department && "border-danger"}`}
          {...register("department", {
            required: `Department is required !`,
          })}
        >
          <option value={""}>Select Please</option>
          {departments.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
  let inputs = [
    { name: "first_name", type: "text" },
    { name: "last_name", type: "text" },
    {
      name: "email",
      type: "email",
      pattern: `/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g`,
      massage: "Invalid Email pls try again",
    },
    {
      name: "password",
      type: "password",
      pattern:
        "(?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$",
    },
    { name: "address", type: "text" },
    { name: "job_title", type: "text" },
    { name: "phone", type: "number" },
    { name: "country", type: "text" },
    { name: "role", type: "text" },
    { name: "salary", type: "number" },
  ];
  const onError = (err) => {
    err?.first_name && toast.error(err.first_name.message.replaceAll("_", " "));
    err?.last_name && toast.error(err.last_name.message.replaceAll("_", " "));
    err?.email && toast.error(err.email.message);
    err?.password && toast.error(err.password.message);
    err?.address && toast.error(err.address.message);
    err?.job_title && toast.error(err.job_title.message.replaceAll("_", " "));
    err?.phone && toast.error(err.phone.message);
    err?.country && toast.error(err.country.message);
    err?.role && toast.error(err.role.message);
    err?.salary && toast.error(err.salary.message);
  };
  return (
    <section className="container">
      <h1 className="text-center mt-lg mb-lg fs-5 text-primary">Register</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="form-container">
          {inputs.map((inp) => {
            return (
              <div key={inp.name}>
                <Input
                  register={register}
                  label={inp.name}
                  type={inp.type}
                  pattern={inp.pattern ? inp.pattern : null}
                  error={errors.hasOwnProperty(inp.name)}
                />
              </div>
            );
          })}
          <div>
            <select
              className={`form-select ${errors.gender && "border-danger"}`}
              {...register("gender", { required: `Gender is required !` })}
            >
              <option value="">Select Please</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {selectBox}
        </div>
        <button type="submit" className="btn btn-warning form-submit">
          Save
        </button>
      </form>
    </section>
  );
}
