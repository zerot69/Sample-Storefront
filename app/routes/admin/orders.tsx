import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { Form, Link, useLoaderData } from "@remix-run/react";

import "chart.js/auto";

import SearchBar from "~/components/searchbar";
import { prisma } from "~/db.server";

export async function loader({ request }: { request: Request }) {
  const searchData = new URL(request.url).searchParams.get("search");
  return {
    searchData: searchData,
    all: await prisma.orders.findMany({
      where: {
        OR: [
          { first_name: { contains: searchData || "", mode: "insensitive" } },
          { last_name: { contains: searchData || "", mode: "insensitive" } },
          { email: { contains: searchData || "", mode: "insensitive" } },
          { address: { contains: searchData || "", mode: "insensitive" } },
          { order_code: { contains: searchData || "", mode: "insensitive" } },
          { phone: { contains: searchData || "", mode: "insensitive" } },
        ],
      },
      orderBy: {
        created_at: "desc",
      },
    }),
    thisWeek: await prisma.orders.findMany({
      where: {
        OR: [
          { first_name: { contains: searchData || "", mode: "insensitive" } },
          { last_name: { contains: searchData || "", mode: "insensitive" } },
          { email: { contains: searchData || "", mode: "insensitive" } },
          { address: { contains: searchData || "", mode: "insensitive" } },
          { order_code: { contains: searchData || "", mode: "insensitive" } },
          { phone: { contains: searchData || "", mode: "insensitive" } },
        ],
        created_at: {
          gte: new Date(
            new Date(
              new Date().setDate(new Date().getDate() - new Date().getDay() + 1)
            ).setUTCHours(0, 0, 0, 0)
          ),
        },
      },
    }),
    lastWeek: await prisma.orders.findMany({
      where: {
        OR: [
          { first_name: { contains: searchData || "", mode: "insensitive" } },
          { last_name: { contains: searchData || "", mode: "insensitive" } },
          { email: { contains: searchData || "", mode: "insensitive" } },
          { address: { contains: searchData || "", mode: "insensitive" } },
          { order_code: { contains: searchData || "", mode: "insensitive" } },
          { phone: { contains: searchData || "", mode: "insensitive" } },
        ],
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
    }),
    twoWeeksAgo: await prisma.orders.findMany({
      where: {
        OR: [
          { first_name: { contains: searchData || "", mode: "insensitive" } },
          { last_name: { contains: searchData || "", mode: "insensitive" } },
          { email: { contains: searchData || "", mode: "insensitive" } },
          { address: { contains: searchData || "", mode: "insensitive" } },
          { order_code: { contains: searchData || "", mode: "insensitive" } },
          { phone: { contains: searchData || "", mode: "insensitive" } },
        ],
        created_at: {
          gte: new Date(
            new Date(
              new Date().setDate(
                new Date().getDate() - new Date().getDay() - 13
              )
            ).setUTCHours(0, 0, 0, 0)
          ),
          lt: new Date(
            new Date(
              new Date().setDate(new Date().getDate() - new Date().getDay() - 6)
            ).setUTCHours(0, 0, 0, 0)
          ),
        },
      },
    }),
  };
}

export async function action({ request }: { request: any }) {
  const formData = await request.formData();
  const orderId = formData.get("orderId");
  await prisma.orders.delete({
    where: {
      id: orderId,
    },
  });
  return null;
}

export default function AdminOrdersRoute() {
  const data = useLoaderData();
  const [orders, setOrders] = useState(data.all);
  const [asc, setAsc] = useState({
    id: true,
    created_at: true,
    order_code: true,
    total_amount: true,
    address: true,
    email: true,
    first_name: true,
    last_name: true,
  });

  useEffect(() => {
    setOrders([...data.all]);
  }, [data]);

  const ordersThisWeek = data.thisWeek;
  const ordersLastWeek = data.lastWeek;
  const ordersTwoWeeksAgo = data.twoWeeksAgo;
  const searchData = data.searchData;

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const ordersThisWeekArray = Array(7).fill(0);
  const ordersLastWeekArray = Array(7).fill(0);
  const ordersTwoWeeksAgoArray = Array(7).fill(0);

  ordersThisWeek.map(
    (order: any) =>
      ordersThisWeekArray[
        new Date(order.created_at).getDay()
          ? new Date(order.created_at).getDay() - 1
          : 6
      ]++
  );
  ordersLastWeek.map(
    (order: any) =>
      ordersLastWeekArray[
        new Date(order.created_at).getDay()
          ? new Date(order.created_at).getDay() - 1
          : 6
      ]++
  );
  ordersTwoWeeksAgo.map(
    (order: any) =>
      ordersTwoWeeksAgoArray[
        new Date(order.created_at).getDay()
          ? new Date(order.created_at).getDay() - 1
          : 6
      ]++
  );

  // Sort table
  const handleSort = (sortBy: string, asc: boolean) => {
    if (sortBy === "id") {
      setOrders([
        ...orders.sort((a: { id: string }, b: { id: string }) =>
          asc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
        ),
      ]);
    } else if (sortBy === "created_at") {
      setOrders([
        ...orders.sort((a: { created_at: string }, b: { created_at: string }) =>
          asc
            ? new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            : new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
        ),
      ]);
    } else if (sortBy === "order_code") {
      setOrders([
        ...orders.sort((a: { order_code: string }, b: { order_code: string }) =>
          asc
            ? a.order_code.localeCompare(b.order_code)
            : b.order_code.localeCompare(a.order_code)
        ),
      ]);
    } else if (sortBy === "first_name") {
      setOrders([
        ...orders.sort((a: { first_name: string }, b: { first_name: string }) =>
          asc
            ? a.first_name.localeCompare(b.first_name)
            : b.first_name.localeCompare(a.first_name)
        ),
      ]);
    } else if (sortBy === "last_name") {
      setOrders([
        ...orders.sort((a: { last_name: string }, b: { last_name: string }) =>
          asc
            ? a.last_name.localeCompare(b.last_name)
            : b.last_name.localeCompare(a.last_name)
        ),
      ]);
    } else if (sortBy === "email") {
      setOrders([
        ...orders.sort((a: { email: string }, b: { email: string }) =>
          asc ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email)
        ),
      ]);
    } else if (sortBy === "address") {
      setOrders([
        ...orders.sort((a: { address: string }, b: { address: string }) =>
          asc
            ? a.address.localeCompare(b.address)
            : b.address.localeCompare(a.address)
        ),
      ]);
    } else if (sortBy === "total_amount") {
      setOrders([
        ...orders.sort(
          (a: { total_amount: number }, b: { total_amount: number }) =>
            asc
              ? a.total_amount - b.total_amount
              : b.total_amount - a.total_amount
        ),
      ]);
    }
  };

  return (
    <div className="mt-8 w-full px-24 pb-20">
      <h1 className="text-gray-00 p-8 pt-20 text-center text-5xl">
        Orders{searchData && `: ${searchData}`}
      </h1>
      <div className="">
        <Link
          to="/admin"
          className="text-yellow-500 hover:text-yellow-600"
          prefetch="intent"
        >
          {"< "} Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-8 pb-8">
        <div className="mt-8 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8">
          <h1 className="text-lg uppercase text-gray-400">Total orders</h1>
          <p className="text-3xl font-bold">{orders.length}</p>
        </div>
        <div className="mt-8 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8">
          <h1 className="text-lg uppercase text-gray-400">Highest payment</h1>
          <p className="truncate text-3xl font-bold hover:overflow-visible">
            {Math.max(
              ...orders.map(
                (order: { total_amount: any }) => order.total_amount
              ),
              0
            ).toLocaleString()}
            ₫
          </p>
        </div>
        <div className="mt-8 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8">
          <h1 className="text-lg uppercase text-gray-400">Highest items</h1>
          <p className="text-3xl font-bold">
            {Math.max(
              ...orders.map((order: { items: any }) =>
                order.items.reduce(
                  (total: any, item: any) => (total = total + item.quantity),
                  0
                )
              ),
              0
            )}
          </p>
        </div>
        <div className="mt-8 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8">
          <h1 className="text-lg uppercase text-gray-400">Updated at</h1>
          <p className="text-3xl font-bold">
            {new Date().toLocaleTimeString()}
            <span className="text-base font-light">
              {" " + new Date().toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>

      <div className="mb-8 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8">
        <h1 className="text-lg uppercase text-gray-400">Orders this week</h1>
        <Line
          data={{
            labels: weekdays,
            datasets: [
              {
                label: "This week",
                backgroundColor: ["#facc15"],
                borderColor: ["#facc15"],
                data: ordersThisWeekArray,
              },
              {
                label: "Last week",
                backgroundColor: ["#6ee7b7"],
                borderColor: ["#6ee7b7"],
                data: ordersLastWeekArray,
              },
              {
                label: "Two weeks ago",
                backgroundColor: ["#7dd3fc"],
                borderColor: ["#7dd3fc"],
                data: ordersTwoWeeksAgoArray,
              },
            ],
          }}
          options={{
            aspectRatio: 4,
            plugins: {
              legend: {
                position: "top" as const,
              },
              title: {
                display: true,
                text: "Orders",
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                },
              },
            },
          }}
          height={575}
        />
      </div>

      <SearchBar />
      <div className="text-right text-yellow-400 hover:text-yellow-500">
        {searchData && (
          <Link to={"/admin/orders"}>
            <button>Clear search</button>
          </Link>
        )}
      </div>

      <div className="max-w-full overflow-x-auto py-8">
        <div className="max-h-[80vh] overflow-x-auto shadow-md sm:rounded-lg">
          <table className="table-fixed border-collapse text-left text-sm text-gray-500">
            <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Remove
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 hover:cursor-pointer"
                  onClick={() => {
                    setAsc({ ...asc, id: !asc.id });
                    handleSort("id", asc.id);
                  }}
                >
                  id
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 hover:cursor-pointer"
                  onClick={() => {
                    setAsc({ ...asc, created_at: !asc.created_at });
                    handleSort("created_at", asc.created_at);
                  }}
                >
                  created_at
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 hover:cursor-pointer"
                  onClick={() => {
                    setAsc({ ...asc, order_code: !asc.order_code });
                    handleSort("order_code", asc.order_code);
                  }}
                >
                  order_code
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 hover:cursor-pointer"
                  onClick={() => {
                    setAsc({ ...asc, total_amount: !asc.total_amount });
                    handleSort("total_amount", asc.total_amount);
                  }}
                >
                  total_amount
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 hover:cursor-pointer"
                  onClick={() => {
                    setAsc({ ...asc, address: !asc.address });
                    handleSort("address", asc.address);
                  }}
                >
                  address
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 hover:cursor-pointer"
                  onClick={() => {
                    setAsc({ ...asc, email: !asc.email });
                    handleSort("email", asc.email);
                  }}
                >
                  email
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 hover:cursor-pointer"
                  onClick={() => {
                    setAsc({ ...asc, first_name: !asc.first_name });
                    handleSort("first_name", asc.first_name);
                  }}
                >
                  first_name
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 hover:cursor-pointer"
                  onClick={() => {
                    setAsc({ ...asc, last_name: !asc.last_name });
                    handleSort("last_name", asc.last_name);
                  }}
                >
                  last_name
                </th>
                <th scope="col" className="py-3 px-6">
                  card
                </th>
                <th scope="col" className="py-3 px-6">
                  items
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr
                  key={order.id}
                  className="border-b bg-white odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  <td className="whitespace-nowrap py-4 px-6">
                    <Form action="/admin/orders" method="post">
                      <input type="hidden" name="orderId" value={order.id} />
                      <button
                        type="submit"
                        onClick={() => toast.error("Order removed!")}
                        className="px-4 text-red-500 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </Form>
                  </td>
                  <th
                    scope="row"
                    className="whitespace-nowrap py-4 px-6 font-medium text-gray-900"
                  >
                    {order.id}
                  </th>
                  <td className="whitespace-nowrap py-4 px-6">
                    {new Date(order.created_at).toLocaleTimeString() +
                      ", " +
                      new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {order.order_code}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {order.total_amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <p className="w-48 truncate duration-300 ease-in-out hover:overflow-clip hover:whitespace-pre-line">
                      {order.address}
                    </p>
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">{order.email}</td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {order.first_name}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {order.last_name}
                  </td>
                  <td className="truncate py-4 px-6">
                    <p className="w-80 truncate duration-300 ease-in-out hover:overflow-clip hover:whitespace-pre-line">
                      {JSON.stringify(order.card)}
                    </p>
                  </td>
                  <td className="truncate py-4 px-6">
                    <p className="w-80 truncate duration-300 ease-in-out hover:overflow-clip hover:whitespace-pre-line">
                      {JSON.stringify(order.items)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(251, 191, 36)",
            color: "#fff",
          },
          iconTheme: {
            primary: "white",
            secondary: "black",
          },
          error: {
            style: {
              background: "rgba(239, 68, 68)",
            },
          },
        }}
      />
    </div>
  );
}
