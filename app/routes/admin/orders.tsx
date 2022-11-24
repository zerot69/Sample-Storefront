import toast, { Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { Form, Link, useLoaderData } from "@remix-run/react";

import { prisma } from "~/db.server";

export async function loader() {
  return await prisma.orders.findMany({});
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
  const orders = useLoaderData();

  return (
    <div className="mt-8 w-full px-24 pb-20">
      <h1 className="text-gray-00 p-8 pt-20 text-center text-5xl">Orders</h1>
      <div className="">
        <Link to="/admin" className="text-yellow-500 hover:text-yellow-600">
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
          <p className="text-3xl font-bold">
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

      <div className="max-w-full overflow-x-auto pb-8">
        <div className="max-h-[80vh] overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full table-fixed text-left text-sm text-gray-500">
            <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Remove
                </th>
                <th scope="col" className="py-3 px-6">
                  id
                </th>
                <th scope="col" className="py-3 px-6">
                  created_at
                </th>
                <th scope="col" className="py-3 px-6">
                  order_code
                </th>
                <th scope="col" className="py-3 px-6">
                  total_amount
                </th>
                <th scope="col" className="py-3 px-6">
                  address
                </th>
                <th scope="col" className="py-3 px-6">
                  email
                </th>
                <th scope="col" className="py-3 px-6">
                  first_name
                </th>
                <th scope="col" className="py-3 px-6">
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
                  className="border-b bg-white hover:bg-gray-100"
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
                    {order.created_at}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {order.order_code}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {order.total_amount}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {order.address}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">{order.email}</td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {order.first_name}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {order.last_name}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {JSON.stringify(order.card)}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {JSON.stringify(order.items)}
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
