import { Bar, Line } from "react-chartjs-2";

import "chart.js/auto";

export default function Chart() {
  // Date
  const date = new Date();
  const lastMonday = date.getDate() - date.getDay() - 6; // Monday of last week
  const lastSunday = lastMonday + 6; // Sunday of last week
  const firstDay = new Date(date.setDate(lastMonday)).toLocaleDateString();
  const lastDay = new Date(date.setDate(lastSunday)).toLocaleDateString();
  const currentYear = date.getFullYear().toString();

  //Month
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  //Weekdays
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Data
  const revenue = [
    44780, 32670, 43490, 54409, 33367, 35986, 40954, 52345, 34983, 57812, 21933,
    29840,
  ];
  const cost = [
    -24435, -22345, -23495, -24896, -23456, -45623, -34567, -61231, -52356,
    -41325, -42213, -36498,
  ];
  const profit = revenue.map(function (revenue, idx) {
    return revenue + cost[idx];
  });
  const weeklyUsers = [52670, 73490, 78409, 43367, 65986, 60954, 92345];

  return (
    <div className="mt-8 grid grid-cols-4 gap-8">
      <div className="col-span-4 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8 lg:col-span-4 xl:col-span-3">
        <h1 className="text-lg uppercase text-gray-400">Monthly Profit</h1>
        <Bar
          data={{
            labels: month,
            datasets: [
              {
                label: "Revenue",
                backgroundColor: ["#4ade80"],
                data: revenue,
                stack: "Stack 0",
              },
              {
                label: "Cost",
                backgroundColor: ["#f87171"],
                data: cost,
                stack: "Stack 0",
              },
              {
                label: "Profit",
                backgroundColor: ["#facc15"],
                data: profit,
                stack: "Stack 1",
              },
            ],
          }}
          options={{
            aspectRatio: 2,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
              },
            },
            plugins: {
              legend: {
                position: "top" as const,
              },
              title: {
                display: true,
                text: currentYear,
              },
            },
          }}
        />
      </div>
      <div className="col-span-4 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8 xl:col-span-1">
        <h1 className="text-lg uppercase text-gray-400">Daily active users</h1>
        <Bar
          data={{
            labels: weekdays,
            datasets: [
              {
                label: "Users",
                backgroundColor: ["#facc15"],
                data: weeklyUsers,
              },
            ],
          }}
          options={{
            aspectRatio: 0.5,
            plugins: {
              legend: {
                position: "top" as const,
              },
              title: {
                display: true,
                text: firstDay + " - " + lastDay,
              },
            },
          }}
          height={575}
        />
      </div>
    </div>
  );
}
