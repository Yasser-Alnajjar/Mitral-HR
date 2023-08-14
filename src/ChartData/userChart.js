let usersChart = [
  { id: 1, year: 2014, gain: 200, lost: 200, salary: 600 },
  { id: 2, year: 2015, gain: 600, lost: 1000, salary: 100 },
  { id: 3, year: 2016, gain: 650, lost: 200, salary: 400 },
  { id: 4, year: 2017, gain: 650, lost: 600, salary: 900 },
  { id: 5, year: 2018, gain: 650, lost: 100, salary: 1000 },
  { id: 6, year: 2019, gain: 700, lost: 700, salary: 500 },
  { id: 7, year: 2020, gain: 650, lost: 300, salary: 200 },
  { id: 8, year: 2021, gain: 650, lost: 60, salary: 700 },
  { id: 9, year: 2022, gain: 650, lost: 100, salary: 500 },
  { id: 10, year: 2023, gain: 650, lost: 1000, salary: 400 },
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
