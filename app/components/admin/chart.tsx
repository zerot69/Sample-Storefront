import { useMemo } from "react";
import { Bar } from "react-chartjs-2";

import "chart.js/auto";

export default function Chart({ usersLastWeek }: { usersLastWeek: any }) {
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
  const revenue = useMemo(() => {
    const revenue = [];
    for (let i = 0; i < 12; i++) {
      revenue.push(
        Math.floor(Math.random() * (10000000 - 1000000 + 1) + 1000000)
      );
    }
    return revenue;
  }, []);

  const cost = useMemo(() => {
    const cost = [];
    for (let i = 0; i < 12; i++) {
      cost.push(
        Math.floor(Math.random() * (10000000 - 1000000 + 1) + 1000000) * -1
      );
    }
    return cost;
  }, []);

  const profit = revenue.map(function (revenue, index) {
    return revenue + cost[index];
  });
  const weeklyActiveUsers = useMemo(() => {
    const weeklyActiveUsers = [];
    for (let i = 0; i < 7; i++) {
      weeklyActiveUsers.push(Math.floor(Math.random() * (100 - 10 + 1) + 10));
    }
    return weeklyActiveUsers;
  }, []);

  const usersLastWeekArray = Array(7).fill(0);
  usersLastWeek.map(
    (user: any) =>
      usersLastWeekArray[
        new Date(user.created_at).getDay()
          ? new Date(user.created_at).getDay() - 1
          : 6
      ]++
  );
  const totalRevenue = revenue.reduce((a, b) => a + b, 0);
  const totalCost = cost.reduce((a, b) => a + b, 0);
  const totalProfit = totalRevenue + totalCost;

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
        <p className="mt-6 text-center text-sm">
          <span>
            <span className="font-bold text-green-500">Revenue: </span>
            <span className="font-semibold">
              {totalRevenue.toLocaleString()}đ
            </span>
          </span>
          <span className="ml-4">
            <span className="font-bold text-red-500">Cost: </span>
            <span className="font-semibold">{totalCost.toLocaleString()}đ</span>
          </span>
          <span className="ml-4">
            <span className="font-bold text-yellow-500">Profit: </span>
            {totalProfit > 0 ? (
              <span className="font-semibold text-green-500">
                +{totalProfit.toLocaleString()}đ
              </span>
            ) : (
              <span className="font-semibold text-red-500">
                {totalProfit.toLocaleString()}đ
              </span>
            )}
          </span>
        </p>
      </div>
      <div className="col-span-4 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8 xl:col-span-1">
        <h1 className="text-lg uppercase text-gray-400">Daily active users</h1>
        <Bar
          data={{
            labels: weekdays,
            datasets: [
              {
                label: "Active",
                backgroundColor: ["#facc15"],
                data: weeklyActiveUsers,
              },
              {
                label: "New",
                backgroundColor: ["#fef08a"],
                data: usersLastWeekArray,
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
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
              },
            },
          }}
          height={575}
        />
      </div>
    </div>
  );
}
