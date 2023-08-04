"use client";
import Loading from "../../../components/Loading";
import { useGetDepartmentsQuery } from "../../../redux/deparments/departmentSlice";

export default function Departments() {
  const {
    data: departments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDepartmentsQuery();
  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <section className="department">
        <div className="container">
          <div className="department__items">
            {departments.map((item) => (
              <div key={item.id} className="department__items__item">
                <h2>{item.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } else if (isError) {
    content = JSON.stringify(error.message);
  }
  return content;
}
