"use client";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Input from "../input";
import { useForm } from "react-hook-form";
import { useAddTaskMutation } from "../../../redux/tasks/tasksSlice";
import { useGetUsersQuery } from "../../../redux/users/usersSlice";

export default function AddTask({ setOpen }) {
  const [addTask] = useAddTaskMutation();
  const { data: users, isSuccess, isError, error } = useGetUsersQuery();

  // React hook from
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const user = data.user.split(" ");
    addTask({
      id: user[0],
      employee: `${user[1]} ${user[2]}`,
      title: data.title,
      from: data.from,
      to: data.to,
      description: data.description,
    })
      .unwrap()
      .then(() => {
        toast.success(`${data.title} has been Updated!`);
        reset();
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err.data);
      });
  };

  let inputs = [
    { name: "title", type: "text" },
    { name: "from", type: "date" },
    { name: "to", type: "date" },
  ];

  let content;
  if (isSuccess) {
    content = (
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-container">
          <div>
            <select
              className="form-select"
              {...register("user", {
                required: "Invalid user pls select!",
              })}
            >
              <option value={""}>Select User</option>
              {users.map((user) => (
                <option key={user.id} value={() => ({})}>
                  {user.id} {user.first_name} {user.last_name}
                </option>
              ))}
            </select>
          </div>
          {inputs.map((inp) => {
            return (
              <div key={inp.name}>
                <Input
                  register={register}
                  label={inp.name}
                  type={inp.type}
                  error={errors.hasOwnProperty(inp.name)}
                />
              </div>
            );
          })}
        </div>
        <textarea
          className="form-textarea"
          {...register("description", {
            required: "Invalid description pls try again!",
          })}
        ></textarea>
        <button type="submit" className="btn btn-warning form-submit">
          Save
        </button>
      </form>
    );
  }
  if (isError) {
    toast.error(error.data);
  }
  return content;
}
