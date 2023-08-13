let usersChart = [
  { id: 1, year: 2014, gain: 20000, lost: 2000, salary: 600000 },
  { id: 2, year: 2015, gain: 60000, lost: 10000, salary: 100000 },
  { id: 3, year: 2016, gain: 65000, lost: 2000, salary: 400000 },
  { id: 4, year: 2017, gain: 65000, lost: 6000, salary: 900000 },
  { id: 5, year: 2018, gain: 65000, lost: 1000, salary: 1000000 },
  { id: 6, year: 2019, gain: 70000, lost: 7000, salary: 500000 },
  { id: 7, year: 2020, gain: 65000, lost: 3000, salary: 200000 },
  { id: 8, year: 2021, gain: 65000, lost: 60000, salary: 700000 },
  { id: 9, year: 2022, gain: 65000, lost: 1000, salary: 500000 },
  { id: 10, year: 2023, gain: 65000, lost: 3000, salary: 400000 },
];
export const chartData = {
  labels: usersChart.map((item) => item.year),
  datasets: [
    {
      label: "Gain",
      data: usersChart.map((item) => item.gain),
      backgroundColor: ["#079f9f"],
    },
    {
      label: "Lost",
      data: usersChart.map((item) => item.lost),
      backgroundColor: ["#f00"],
    },
    {
      label: "Salary",
      data: usersChart.map((item) => item.salary),
      backgroundColor: ["#18446a"],
    },
  ],
};
