import { FaCircle } from "react-icons/fa";
import { Link } from "@remix-run/react";

export default function Table({ orders, users }: { orders: any; users: any }) {
  return (
    <div className="grid grid-cols-4 gap-8">
      <div className="col-span-4 mt-8 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8 xl:col-span-2">
        <div className="flex flex-shrink-0 items-center justify-between ">
          <h1 className="text-lg uppercase text-gray-400">Newest Orders</h1>
          <Link to="/admin/orders" className="">
            See all
          </Link>
        </div>

        <div className="max-w-full overflow-x-auto py-4 px-2">
          <div className="max-h-full overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full table-fixed text-left text-sm text-gray-500">
              <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
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
                    <th
                      scope="row"
                      className="whitespace-nowrap py-4 px-6 font-medium text-gray-900"
                    >
                      {order.id}
                    </th>
                    <td className="whitespace-nowrap py-4 px-6">
                      {new Date(order.created_at).toLocaleDateString() +
                        ", " +
                        new Date(order.created_at).toLocaleTimeString()}
                    </td>
                    <td className="whitespace-nowrap py-4 px-6">
                      {order.order_code}
                    </td>
                    <td className="whitespace-nowrap py-4 px-6">
                      {order.total_amount}
                    </td>
                    <td className="whitespace-nowrap py-4 px-6">
                      <p className="w-36 truncate duration-700 ease-in-out hover:w-max hover:overflow-visible">
                        {order.address}
                      </p>
                    </td>
                    <td className="whitespace-nowrap py-4 px-6">
                      {order.email}
                    </td>
                    <td className="whitespace-nowrap py-4 px-6">
                      {order.first_name}
                    </td>
                    <td className="whitespace-nowrap py-4 px-6">
                      {order.last_name}
                    </td>
                    <td className="whitespace-nowrap py-4 px-6">
                      <p className="w-36 truncate duration-700 ease-in-out hover:w-max hover:overflow-visible">
                        {JSON.stringify(order.card)}
                      </p>
                    </td>
                    <td className="whitespace-nowrap py-4 px-6">
                      <p className="w-36 truncate duration-700 ease-in-out hover:w-max hover:overflow-visible">
                        {JSON.stringify(order.items)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="col-span-4 mt-8 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8 xl:col-span-2">
        <div className="flex flex-shrink-0 items-center justify-between ">
          <h1 className="text-lg uppercase text-gray-400">Newest Users</h1>
          <Link to="/admin/users" className="">
            See all
          </Link>
        </div>
        <div className="max-w-full overflow-x-auto py-4 px-2">
          <div className="max-h-full overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full table-fixed text-left text-sm text-gray-500">
              <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    created_at
                  </th>
                  <th scope="col" className="py-3 px-6">
                    name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    active
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr
                    key={user.id}
                    className="border-b bg-white hover:bg-gray-100"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap py-4 px-6 font-medium text-gray-900"
                    >
                      <p className="w-36 truncate">{user.email}</p>
                    </th>
                    <td className="whitespace-nowrap py-4 px-6">
                      {new Date(user.created_at).toLocaleDateString() +
                        ", " +
                        new Date(user.created_at).toLocaleTimeString()}
                    </td>
                    <td className="whitespace-nowrap py-4 px-6">
                      {user.last_name + " " + user.first_name}
                    </td>
                    <td className="whitespace-nowrap py-4 px-6">
                      {user.active ? (
                        <FaCircle
                          style={{ marginLeft: 15, color: "#22c55e" }}
                          size={12}
                        />
                      ) : (
                        <FaCircle
                          style={{ marginLeft: 15, color: "#ef4444" }}
                          size={12}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
