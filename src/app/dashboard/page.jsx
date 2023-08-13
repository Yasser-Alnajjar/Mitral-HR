"use client";

import { Chart as ChartJS } from "chart.js/auto";
import Loading from "../../components/Loading";
import { toast } from "react-hot-toast";
import {
  useGetAllBranchesQuery,
  useGetAllDepartmentsQuery,
  useGetAllTasksQuery,
  useGetAllUsersQuery,
} from "../../redux/dashboard/dashboardSlice";
import { useGetUserChartQuery } from "../../redux/charts/chartSlice";
import Card from "../../components/Card";
import { Bar, Scatter, Chart } from "react-chartjs-2";
import { chartData } from "../../ChartData/userChart";
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
          <Card classes={"m-0 p-0"} title={"Tasks"} text={tasks?.length} />
          <Card
            classes={"m-0 p-0"}
            title={"Departments"}
            text={departments?.length}
          />
          <Card
            classes={"m-0 p-0"}
            title={"Branches"}
            text={branches?.length}
          />
          <Card classes={"m-0 p-0"} title={"Users"} text={users?.length} />
        </div>
      </div>
    );
  } else if (isError) {
    toast.error(error.data);
    content = "";
  }
  return (
    <section className="mt-lg">
      {content}
      <div className="container">
        <div className="chart">
          <div className="flex">
            <Scatter data={chartData} />
          </div>
          <div className="flex">
            <Bar data={chartData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
