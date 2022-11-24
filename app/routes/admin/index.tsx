import { useLoaderData } from "@remix-run/react";

import AdminChart from "~/components/admin/chart";
import AdminStats from "~/components/admin/stats";
import AdminTable from "~/components/admin/table";
import { prisma } from "~/db.server";

export async function loader() {
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
  return { orders: orders, users: users };
}

export default function AdminRoute() {
  const data = useLoaderData();

  return (
    <div className="mt-8 w-full px-24 pb-20">
      <h1 className="text-gray-00 p-8 pt-20 text-center text-5xl">
        Admin Dashboard
      </h1>
      <AdminStats />
      <AdminTable orders={data.orders} users={data.users} />
      <AdminChart />
      {/* <div className="grid grid-cols-4 gap-8">
        <Link
          className="text-lg font-bold uppercase text-white"
          to="/admin/orders"
        >
          <div className="mt-8 rounded-xl border bg-yellow-400 p-4 text-justify shadow-md hover:bg-yellow-500 sm:p-8">
            Orders
          </div>
        </Link>
        <Link
          className="text-lg font-bold uppercase text-white"
          to="/admin/orders"
        >
          <div className="mt-8 rounded-xl border bg-yellow-400 p-4 text-justify shadow-md hover:bg-yellow-500 sm:p-8">
            Orders
          </div>
        </Link>
        <Link
          className="text-lg font-bold uppercase text-white"
          to="/admin/orders"
        >
          <div className="mt-8 rounded-xl border bg-yellow-400 p-4 text-justify shadow-md hover:bg-yellow-500 sm:p-8">
            Orders
          </div>
        </Link>
        <Link
          className="text-lg font-bold uppercase text-white"
          to="/admin/orders"
        >
          <div className="mt-8 rounded-xl border bg-yellow-400 p-4 text-justify shadow-md hover:bg-yellow-500 sm:p-8">
            Orders
          </div>
        </Link>
      </div> */}
    </div>
  );
}
