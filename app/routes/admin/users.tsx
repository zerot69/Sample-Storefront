import toast, { Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { Form, Link, useLoaderData } from "@remix-run/react";

import { prisma } from "~/db.server";

export async function loader() {
  return await prisma.users.findMany({});
}

export async function action({ request }: { request: any }) {
  const formData = await request.formData();
  const userId = formData.get("userId");
  await prisma.users.delete({
    where: {
      id: userId,
    },
  });
  return null;
}

export default function AdminUsersRoute() {
  const users = useLoaderData();

  return (
    <div className="mt-8 w-full px-24 pb-20">
      <h1 className="text-gray-00 p-8 pt-20 text-center text-5xl">Users</h1>
      <div className="">
        <Link to="/admin" className="text-yellow-500 hover:text-yellow-600">
          {"< "} Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-8 pb-8">
        <div className="mt-8 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8">
          <h1 className="text-lg uppercase text-gray-400">Total users</h1>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>
        <div className="mt-8 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8">
          <h1 className="text-lg uppercase text-gray-400">Active users</h1>
          <p className="text-3xl font-bold">
            {users.filter((user: any) => user.active === true).length}
          </p>
        </div>
        <div className="mt-8 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8">
          <h1 className="text-lg uppercase text-gray-400">Newest user</h1>
          <p className="text-lg font-bold">
            {new Date(users[users.length - 1].created_at).toLocaleTimeString() +
              ", " +
              new Date(users[users.length - 1].created_at).toLocaleDateString()}
          </p>
          <p className="text-xs font-light">{users[users.length - 1].email}</p>
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
                  Edit
                </th>
                <th scope="col" className="py-3 px-6">
                  id
                </th>
                <th scope="col" className="py-3 px-6">
                  created_at
                </th>
                <th scope="col" className="py-3 px-6">
                  updated_at
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
                  dob
                </th>
                <th scope="col" className="py-3 px-6">
                  gender
                </th>
                <th scope="col" className="py-3 px-6">
                  active
                </th>
                <th scope="col" className="py-3 px-6">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr
                  key={user.id}
                  className="border-b bg-white hover:bg-gray-100"
                >
                  <td className="cursor-pointer whitespace-nowrap py-4 px-6 text-yellow-500 hover:text-yellow-600">
                    Edit
                  </td>
                  <th
                    scope="row"
                    className="whitespace-nowrap py-4 px-6 font-medium text-gray-900"
                  >
                    {user.id}
                  </th>
                  <td className="whitespace-nowrap py-4 px-6">
                    {user.created_at}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {user.updated_at}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">{user.email}</td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {user.first_name}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {user.last_name}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">{user.dob}</td>
                  <td className="whitespace-nowrap py-4 px-6">{user.gender}</td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {user.active ? "active" : "disabled"}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    <Form action="/admin/users" method="post">
                      <input type="hidden" name="userId" value={user.id} />
                      <button
                        type="submit"
                        onClick={() => toast.error("User removed!")}
                        className="px-4 text-red-500 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </Form>
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
