import { useForm } from "react-hook-form";
import Input from "../input";
import { useGetUsersQuery } from "../../../redux/users/usersSlice";
import { useAddOverTimeMutation } from "../../../redux/overtime/overtimeSlice";
import { toast } from "react-hot-toast";

export default function AddOverTime({ setOpen }) {
  const { data: users, isSuccess } = useGetUsersQuery();
  const [addOverTime] = useAddOverTimeMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const user = data.user.split(" ");
    addOverTime({
      hours: data.hours,
      date: data.date,
      userId: user[0],
      first_name: user[1],
      last_name: user[2],
    })
      .unwrap()
      .then(() => {
        setOpen(false);
        toast.success("Add Over Time Successfully");
      })
      .catch((err) => {
        toast.error(err.data);
      })
      .finally(() => {
        reset();
      });
  };
  let selectUser;
  if (isSuccess) {
    selectUser = (
      <>
        <label htmlFor="selectUser">User</label>
        <select
          id="selectUser"
          className={`form-control ${
            errors.user && "text-danger border-danger"
          }`}
          {...register("user", { required: true })}
        >
          <option value="">Select Please</option>
          {users.map((item) => (
            <option key={item.id} value={() => ({})}>
              {item.id} {item.first_name} {item.last_name}
            </option>
          ))}
        </select>
      </>
    );
  }
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container">
        <Input
          register={register}
          label={"hours"}
          error={errors.hours}
          type={"number"}
          required={true}
        />
        <Input
          register={register}
          label={"date"}
          error={errors.date}
          type={"date"}
          required={true}
        />
        <div>{selectUser}</div>
      </div>
      <button type="submit" className="btn btn-success form-submit">
        Save
      </button>
    </form>
  );
}
