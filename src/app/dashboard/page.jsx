"use client";

import { Chart as ChartJS, LineController } from "chart.js/auto";
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
import { Bar, Pie, Scatter, Line } from "react-chartjs-2";
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

  // Start Chart Configuration
  let showChart = [
    branches?.length,
    departments?.length,
    tasks?.length,
    users?.length,
  ].every(Boolean);
  let categorieschart = [
    { name: "branches", length: branches?.length * 2, usersOf: 1000 },
    { name: "departments", length: departments?.length * 2, usersOf: 350 },
    { name: "tasks", length: tasks?.length * 6, usersOf: 400 },
    { name: "users", length: users?.length * 7, usersOf: 5500 },
  ];
  const lengthes = {
    labels: categorieschart.map((item) => item.name),
    datasets: [
      {
        label: "Category",
        data: categorieschart.map((item) => item.length),
        backgroundColor: ["#079f9f"],
      },
      {
        label: "Users Of",
        data: categorieschart.map((item) => item.usersOf),
        backgroundColor: ["#18446a"],
      },
    ],
  };
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,

    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  // End Chart Configuration
  return (
    <section className="mt-lg">
      {content}
      <div className="container">
        <div className="chart">
          {showChart && (
            <div className="card flex">
              <Line data={lengthes} options={options} />
            </div>
          )}
          <div className="card flex">
            <Bar data={chartData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
