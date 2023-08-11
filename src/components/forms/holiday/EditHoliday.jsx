"use client";
import { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import Input from "../input";
import { useForm } from "react-hook-form";
import {
  useGetHolidayQuery,
  useUpdateHolidayMutation,
} from "../../../redux/holidays/holidaysSlice";
import { Content } from "next/font/google";

export default function EditHoliday({ holidayId, setOpen }) {
  const {
    data: holiday,
    isSuccess,
    isError,
    error,
  } = useGetHolidayQuery(holidayId);
  const [updateHoliday] = useUpdateHolidayMutation(holidayId);
  // React hook from
  const holidayObj = useMemo(
    () => ({
      name: holiday?.name,
      date: holiday?.date,
      day: holiday?.day,
    }),
    [holiday?.name, holiday?.date, holiday?.day]
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: holidayObj,
  });
  // Restore default values
  useEffect(() => {
    reset(holidayObj);
  }, [reset, holidayObj]);
  const onSubmit = async (data) => {
    updateHoliday({
      id: holidayId,
      ...data,
    })
      .unwrap()
      .then(() => {
        toast.success(`(${data.name}) has been Updated!`);
        reset();
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
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
  let content;
  if (isSuccess) {
    content = (
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-container">
          {inputs.map((inp) => {
            return (
              <Input
                key={inp.name}
                register={register}
                label={inp.name}
                type={inp.type}
                required={true}
                error={errors.hasOwnProperty(inp.name)}
              />
            );
          })}
          <select
            className={`form-control ${
              errors.gender && "text-danger border-danger"
            }`}
            {...register("day", { required: true })}
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
  if (isError) {
    toast.error(error.data);
  }
  return content;
}
