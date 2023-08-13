"use client";
import { toast } from "react-hot-toast";
import Input from "../input";
import { useForm } from "react-hook-form";
import { useAddHolidayMutation } from "../../../redux/holidays/holidaysSlice";
export default function AddHoliday({ setOpen }) {
  const [addHoliday] = useAddHolidayMutation();
  // React hook from
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    addHoliday({
      ...data,
    })
      .unwrap()
      .then(() => {
        reset();
        setOpen(false);
        toast.success(`(${data.name}) Holiday has been added!`);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  let inputs = [
    { name: "name", type: "text" },
    { name: "date", type: "date" },
  ];
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const onError = (err) => {
    errors.day && toast.error(errors.day.message);
    errors.date && toast.error(errors.date.message);
    errors.name && toast.error(errors.day.message);
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="form-container">
        {inputs.map((inp) => {
          return (
            <div key={inp.name}>
              <Input
                key={inp.name}
                register={register}
                label={inp.name}
                type={inp.type}
                required={`${inp.name} is required`}
                error={errors.hasOwnProperty(inp.name)}
              />
            </div>
          );
        })}
        <select
          className={`form-control ${
            errors.gender && "text-danger border-danger"
          }`}
          {...register("day", { required: "day is required" })}
        >
          <option value="">Select Pleace</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-success form-submit">
        Save
      </button>
    </form>
  );
}
