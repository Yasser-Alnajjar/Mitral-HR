import { useForm } from "react-hook-form";
import Input from "../input";
import { useGetUsersQuery } from "../../../redux/users/usersSlice";
import {
  useGetSingleOvertimeQuery,
  useUpdateOverTimeMutation,
} from "../../../redux/overtime/overtimeSlice";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export default function EditOverTime({ setOpen, overTimeId }) {
  const { data: users, isSuccess } = useGetUsersQuery();
  const { data: overtime } = useGetSingleOvertimeQuery(overTimeId);
  const [updateOverTime] = useUpdateOverTimeMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    reset(overtime);
  }, [overtime, reset]);
  const onSubmit = async (data) => {
    updateOverTime({ id: overTimeId, ...data })
      .unwrap()
      .then(() => {
        setOpen(false);
        toast.success(`(${data.first_name}) Over Time Successfully`);
      })
      .catch((err) => {
        toast.error(err.data);
      })
      .finally(() => {
        reset();
      });
  };

  let inputs = [
    { name: "first_name", type: "text" },
    { name: "last_name", type: "text" },
    { name: "hours", type: "number" },
    { name: "date", type: "date" },
  ];
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container">
        {inputs.map((inp) => (
          <Input
            error={errors.hasOwnProperty(inp.name)}
            label={inp.name}
            register={register}
            type={inp.type}
            key={inp.name}
          />
        ))}
      </div>
      <button type="submit" className="btn btn-success form-submit">
        Save
      </button>
    </form>
  );
}
