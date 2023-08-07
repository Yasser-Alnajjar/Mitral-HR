"use client";
import Loading from "../../components/Loading";
import { toast } from "react-hot-toast";
import {
  selectAllData,
  useGetAllBranchesQuery,
  useGetAllDepartmentsQuery,
  useGetAllTasksQuery,
  useGetAllUsersQuery,
} from "../../redux/dashboard/dashboardSlice";
import Card from "../../components/Card";
const Dashboard = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllUsersQuery();
  const { data: branches } = useGetAllBranchesQuery();
  const { data: departments } = useGetAllDepartmentsQuery();
  const { data: tasks } = useGetAllTasksQuery();
  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <div className="container">
        <div className="card-container">
          <Card title={"Tasks"} text={tasks?.length} />
          <Card title={"Departments"} text={departments?.length} />
          <Card title={"Branches"} text={branches?.length} />
          <Card title={"Users"} text={users?.length} />
        </div>
      </div>
    );
  } else if (isError) {
    toast.error(error.message);
    content = "";
  }
  return (
    <section>
      <h2 style={{ textAlign: "center", marginTop: 20 }}>Hello</h2>
      {content}
    </section>
  );
};

export default Dashboard;
