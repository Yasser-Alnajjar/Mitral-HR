"use client";
import { toast } from "react-hot-toast";
import Input from "../input";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  useGetSingleLeaveQuery,
  useUpdateLeaveMutation,
} from "../../../redux/leave/leaveSlice";
export default function EditLeave({ setOpen, leaveId }) {
  const { data: leave } = useGetSingleLeaveQuery(leaveId);
  const [updateLeave] = useUpdateLeaveMutation();
  const [chack, setChack] = useState(false);
  // React hook from
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(leave);
  }, [leave, reset]);

  useEffect(() => {
    setChack(leave?.status);
  }, [setChack, leave?.status]);

  const onSubmit = async (data) => {
    updateLeave({ id: leaveId, ...data })
      .unwrap()
      .then(() => {
        setOpen(false);
        toast.success(`Update ${data.name} Leave successfully`);
      })
      .catch((err) => {
        toast.error(err.data);
      })
      .finally(() => {
        reset();
      });
  };

  let inputs = [
    { name: "reason", type: "text", required: true },
    { name: "from", type: "date", required: true },
    { name: "to", type: "date", required: true },
  ];

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container">
        <div>
          <select
            className={`form-select ${errors.type && "border-danger"}`}
            {...register("type", { required: true })}
          >
            <option value="">Select Leave Type</option>
            <option value="casual">Casual Leave</option>
            <option value="medical">Medical Leave</option>
            <option value="loss_of_pay">Loss Of Pay</option>
          </select>
        </div>

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
