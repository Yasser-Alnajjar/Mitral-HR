"use client";
import LoadingComponent from "../../../components/LoadingComponent";
import { useGetTasksQuery } from "../../../redux/taks/tasksSlice.js";
import Card from "../../../components/Card";
import { toast } from "react-hot-toast";
export default function Tasks() {
  const {
    data: tasks,
    isLoadingComponent,
    isSuccess,
    isError,
    error,
  } = useGetTasksQuery();
  let content;
  if (isLoadingComponent) {
    content = <LoadingComponent />;
  } else if (isSuccess) {
    content = (
      <section className="tasks">
        <div className="container">
          <div className="tasks__items">
            {tasks.map((task) => (
              // <div key={task.id} className="tasks__items__item">
              //   <h2 className="tasks__items__item__name">{task.taskname}</h2>
              // <p className="tasks__items__item__description">
              //   {task.description}
              // </p>
              // <p className="tasks__items__item__employee">{task.employee}</p>
              // </div>
              <Card key={task.id} title={task.taskname}>
                <p className="tasks__items__item__employee">{task.employee}</p>
                <p className="tasks__items__item__description">
                  {task.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  } else if (isError) {
    toast.error(error.data);
  }
  return content;
}
