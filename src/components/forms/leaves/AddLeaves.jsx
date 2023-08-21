"use client";
import { toast } from "react-hot-toast";
import Input from "../input";
import { useForm } from "react-hook-form";
import { useGetUsersQuery } from "../../../redux/users/usersSlice";
import { useAddLeaveMutation } from "../../../redux/leave/leaveSlice";
import { useState } from "react";
export default function AddLeaves({ setOpen }) {
  const { data: users, isSuccess } = useGetUsersQuery();
  const [chack, setChack] = useState(false);
  const [addLeave] = useAddLeaveMutation();
  // React hook from
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const user = data.user.split(" ");
    addLeave({
      id: user[0],
      type: data.type,
      name: `${user[1]} ${user[2]}`,
      status: data.status,
      to: data.to,
      from: data.from,
      reason: data.reason,
    })
      .then(({ data }) => {
        toast.success(`Leave added to ${data.name} `);
        setOpen(false);
        reset();
      })
      .catch((err) => {
        toast.error(err.data);
      });
  };

  let selectBox;
  if (isSuccess) {
    selectBox = (
      <select
        className={`form-control ${errors.user && "border-danger"}`}
        {...register("user", { required: true })}
      >
        <option value={""}>Select User</option>
        {users.map((item) => (
          <option key={item.id} value={() => ({})}>
            {item.id} {item.first_name} {item.last_name}
          </option>
        ))}
      </select>
    );
  }
  let inputs = [
    { name: "from", type: "date", required: true },
    { name: "to", type: "date", required: true },
    { name: "reason", type: "text", required: true },
  ];

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container">
        <select
          className={`form-control ${errors.type && "border-danger"}`}
          {...register("type", { required: true })}
        >
          <option value="">Select Leave Type</option>
          <option value="casual">Casual Leave</option>
          <option value="medical">Medical Leave</option>
          <option value="loss_of_pay">Loss Of Pay</option>
        </select>
        {selectBox}
        {inputs.map((inp) => {
          return (
            <div key={inp.name}>
              <Input
                register={register}
                label={inp.name}
                type={inp.type}
                required={inp.required}
                error={errors.hasOwnProperty(inp.name)}
              />
            </div>
          );
        })}
        <div className="statusInput">
          <label htmlFor="check">
            Status {chack ? "Approved" : "Disagree"}
          </label>
          <input
            type="checkbox"
            onClick={() => setChack(!chack)}
            id="check"
            {...register("status")}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-success form-submit">
        Save
      </button>
    </form>
  );
}
