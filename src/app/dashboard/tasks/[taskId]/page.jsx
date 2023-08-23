"use client";
import { useParams } from "next/navigation";
import { useGetSlingleTaskQuery } from "../../../../redux/tasks/tasksSlice";
import { useGetUserByNameQuery } from "../../../../redux/users/usersSlice";
import Card from "../../../../components/Card";
import Userinfo from "../../../../components/userinfo/Userinfo";
export default function TaskDetalis() {
  const { taskId } = useParams();
  const {
    data: task,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSlingleTaskQuery(taskId);
  let content;
  if (isSuccess) {
    content = (
      <section className="task-detalis">
        <h1 className="fs-4 text-center mt-lg capitalize">{task.title} Task</h1>

        <div className="container ">
          <div>
            <Card
              classes={"text-start"}
              titleClassName="fs-3 mb-md"
              subtitleClassName="fs-3 mb-md"
              title={`Task id: ${task.id}`}
            >
              <p className="mb-sm">
                <b>Description:</b> ${task.description}
              </p>
              <p className="mb-sm">
                <b>From:</b> {task.from}
              </p>
              <p className="mb-sm">
                <b>Deadline:</b> {task.from}
              </p>
            </Card>
          </div>

          <Userinfo userId={taskId} />
        </div>
      </section>
    );
  }
  return content;
}
