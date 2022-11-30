import { useLoaderData } from "@remix-run/react";

import AdminChart from "~/components/admin/chart";
import AdminLinks from "~/components/admin/links";
import AdminStats from "~/components/admin/stats";
import AdminTable from "~/components/admin/table";
import { prisma } from "~/db.server";

export async function loader() {
  const usersThisWeek = await prisma.users.count({
    where: {
      created_at: {
        gte: new Date(new Date().setHours(0, 0, 0, 0) - 86400000 * 7),
      },
    },
  });
  const userLastWeek = await prisma.users.count({
    where: {
      created_at: {
        gte: new Date(new Date().setHours(0, 0, 0, 0) - 86400000 * 14),
        lt: new Date(new Date().setHours(0, 0, 0, 0) - 86400000 * 7),
      },
    },
  });
  const newUsersRatio = ((usersThisWeek - userLastWeek) / userLastWeek) * 100;
  const ordersToday = await prisma.orders.count({
    where: {
      created_at: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
  });
  const ordersYesterday = await prisma.orders.count({
    where: {
      created_at: {
        gte: new Date(new Date().setHours(0, 0, 0, 0) - 86400000),
        lt: new Date(new Date().setHours(0, 0, 0, 0)),
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
    usersThisWeek: usersThisWeek,
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
      <AdminChart />
    </div>
  );
}
