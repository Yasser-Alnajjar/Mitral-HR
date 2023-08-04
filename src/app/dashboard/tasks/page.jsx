"use client";
import Loading from "../../../components/Loading";
import { useGetTasksQuery } from "../../../redux/taks/tasksSlice.js";

export default function Tasks() {
  const {
    data: tasks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTasksQuery();
  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <section className="tasks">
        <div className="container">
          <div className="tasks__items">
            {tasks.map((task) => (
              <div key={task.id} className="tasks__items__item">
                <h2 className="tasks__items__item__name">{task.taskname}</h2>
                <p className="tasks__items__item__description">
                  {task.description}
                </p>
                <p className="tasks__items__item__employee">{task.employee}</p>
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
