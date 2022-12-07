import { useLoaderData } from "@remix-run/react";

import AdminChart from "~/components/admin/chart";
import AdminLinks from "~/components/admin/links";
import AdminStats from "~/components/admin/stats";
import AdminTable from "~/components/admin/table";
import { prisma } from "~/db.server";

export async function loader() {
  const numberUsersThisWeek = await prisma.users.count({
    where: {
      created_at: {
        gte: new Date(
          new Date(
            new Date().setDate(new Date().getDate() - new Date().getDay() + 1)
          ).setUTCHours(0, 0, 0, 0)
        ),
      },
    },
  });
  const usersLastWeek = await prisma.users.findMany({
    where: {
      created_at: {
        gte: new Date(
          new Date(
            new Date().setDate(new Date().getDate() - new Date().getDay() - 6)
          ).setUTCHours(0, 0, 0, 0)
        ),
        lt: new Date(
          new Date(
            new Date().setDate(new Date().getDate() - new Date().getDay() + 1)
          ).setUTCHours(0, 0, 0, 0)
        ),
      },
    },
  });
  const numberUsersLastWeek = usersLastWeek.length;
  const newUsersRatio =
    ((numberUsersThisWeek - numberUsersLastWeek) / numberUsersLastWeek) * 100;
  const ordersToday = await prisma.orders.count({
    where: {
      created_at: {
        gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
      },
    },
  });
  const ordersYesterday = await prisma.orders.count({
    where: {
      created_at: {
        gte: new Date(new Date().setUTCHours(0, 0, 0, 0) - 86400000),
        lt: new Date(new Date().setUTCHours(0, 0, 0, 0)),
      },
    },
  });
  const newOrdersRatio =
    ((ordersToday - ordersYesterday) / ordersYesterday) * 100;
  const orders = await prisma.orders.findMany({
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });
  const users = await prisma.users.findMany({
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });
  return {
    usersThisWeek: numberUsersThisWeek,
    usersLastWeek: usersLastWeek,
    newUsersRatio: newUsersRatio,
    ordersToday: ordersToday,
    newOrdersRatio: newOrdersRatio,
    orders: orders,
    users: users,
  };
}

export default function AdminRoute() {
  const data = useLoaderData();

  return (
    <div className="mt-8 w-full px-24 pb-20">
      <h1 className="text-gray-00 p-8 pt-20 text-center text-5xl">
        Admin Dashboard
      </h1>
      <AdminStats
        usersThisWeek={data.usersThisWeek}
        newUsersRatio={data.newUsersRatio}
        ordersToday={data.ordersToday}
        newOrdersRatio={data.newOrdersRatio}
      />
      <AdminTable orders={data.orders} users={data.users} />
      <AdminLinks />
      <AdminChart usersLastWeek={data.usersLastWeek} />
    </div>
  );
}
