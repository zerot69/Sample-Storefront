import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import toast, { Toaster } from "react-hot-toast";
import { FaCircle, FaTrash } from "react-icons/fa";
import { Form, Link, useLoaderData } from "@remix-run/react";

import "chart.js/auto";

import SearchBar from "~/components/searchbar";
import { prisma } from "~/db.server";

export async function loader({ request }: { request: Request }) {
  const searchData = new URL(request.url).searchParams.get("search");
  return {
    searchData: searchData,
    all: await prisma.users.findMany({
      where: {
        OR: [
          { email: { contains: searchData || "", mode: "insensitive" } },
          { last_name: { contains: searchData || "", mode: "insensitive" } },
          { first_name: { contains: searchData || "", mode: "insensitive" } },
        ],
      },
    }),
    thisMonth: await prisma.users.findMany({
      where: {
        OR: [
          { email: { contains: searchData || "", mode: "insensitive" } },
          { last_name: { contains: searchData || "", mode: "insensitive" } },
          { first_name: { contains: searchData || "", mode: "insensitive" } },
        ],
        created_at: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),
  };
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
  const data = useLoaderData();
  const [users, setUsers] = useState(data.all);
  const [asc, setAsc] = useState({
    email: true,
    password: true,
    first_name: true,
    last_name: true,
    created_at: true,
    updated_at: true,
    dob: true,
    gender: true,
    id: true,
    active: true,
  });

  useEffect(() => {
    setUsers([...data.all]);
  }, [data.all]);

  const newUsersThisMonth = data.thisMonth;
  const searchData = data.searchData;

  // Date
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  const currentMonthName = date.toLocaleString("default", {
    month: "long",
  });
  const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Data
  const days = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);
  const newUsersArray = Array(daysInCurrentMonth).fill(0);
  newUsersThisMonth.map(
    (user: any) => newUsersArray[new Date(user.created_at).getDate() - 1]++
  );

  // Sort table
  const handleSort = (sortBy: string, asc: boolean) => {
    if (sortBy === "email") {
      setUsers([
        ...users.sort((a: { email: string }, b: { email: string }) =>
          asc ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email)
        ),
      ]);
    } else if (sortBy === "password") {
      setUsers([
        ...users.sort((a: { password: string }, b: { password: string }) =>
          asc
            ? a.password.localeCompare(b.password)
            : b.password.localeCompare(a.password)
        ),
      ]);
    } else if (sortBy === "id") {
      setUsers([
        ...users.sort((a: { id: string }, b: { id: string }) =>
          asc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
        ),
      ]);
    } else if (sortBy === "first_name") {
      setUsers([
        ...users.sort((a: { first_name: string }, b: { first_name: string }) =>
          asc
            ? a.first_name.localeCompare(b.first_name)
            : b.first_name.localeCompare(a.first_name)
        ),
      ]);
    } else if (sortBy === "last_name") {
      setUsers([
        ...users.sort((a: { last_name: string }, b: { last_name: string }) =>
          asc
            ? a.last_name.localeCompare(b.last_name)
            : b.last_name.localeCompare(a.last_name)
        ),
      ]);
    } else if (sortBy === "created_at") {
      setUsers([
        ...users.sort((a: { created_at: string }, b: { created_at: string }) =>
          asc
            ? new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            : new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
        ),
      ]);
    } else if (sortBy === "updated_at") {
      setUsers([
        ...users.sort((a: { updated_at: string }, b: { updated_at: string }) =>
          asc
            ? new Date(a.updated_at).getTime() -
              new Date(b.updated_at).getTime()
            : new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
        ),
      ]);
    } else if (sortBy === "dob") {
      setUsers([
        ...users.sort((a: { dob: string }, b: { dob: string }) =>
          asc
            ? new Date(a.dob).getTime() - new Date(b.dob).getTime()
            : new Date(b.dob).getTime() - new Date(a.dob).getTime()
        ),
      ]);
    } else if (sortBy === "active") {
      setUsers([
        ...users.sort((a: { active: boolean }, b: { active: boolean }) =>
          asc
            ? Number(a.active) - Number(b.active)
            : Number(b.active) - Number(a.active)
        ),
      ]);
    } else if (sortBy === "gender") {
      setUsers([
        ...users.sort((a: { gender: string }, b: { gender: string }) =>
          asc
            ? a.gender.toString().localeCompare(b.gender.toString())
            : b.gender.toString().localeCompare(a.gender.toString())
        ),
      ]);
    }
  };

  return (
    <div className="mt-8 w-full px-24 pb-20">
      <h1 className="text-gray-00 p-8 pt-20 text-center text-5xl">
        Users
        <span className="uppercase">{searchData && `: ${searchData}`}</span>
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
            {users[users.length - 1]
              ? new Date(
                  users[users.length - 1].created_at
                ).toLocaleTimeString() +
                ", " +
                new Date(
                  users[users.length - 1].created_at
                ).toLocaleDateString()
              : "Not available"}
          </p>
          <p className="text-xs font-light">
            {users[users.length - 1]
              ? users[users.length - 1].email
              : "Not available"}
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
        <h1 className="text-lg uppercase text-gray-400">
          New users this month
        </h1>
        <Bar
          data={{
            labels: days,
            datasets: [
              {
                label: "New Users",
                backgroundColor: ["#facc15"],
                data: newUsersArray,
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
                text: currentMonthName + " " + currentYear,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
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
          <Link to={"/admin/users"}>
            <button>Clear search</button>
          </Link>
        )}
      </div>

      <div className="max-w-full overflow-x-auto py-8">
        <div className="max-h-[80vh] overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full table-fixed text-left text-sm text-gray-500">
            <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th
                  scope="col"
                  className="py-3 px-6 hover:cursor-pointer"
                  onClick={() => {
                    setAsc({ ...asc, active: !asc.active });
                    handleSort("active", asc.active);
                  }}
                >
                  active
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
                    setAsc({ ...asc, updated_at: !asc.updated_at });
                    handleSort("updated_at", asc.updated_at);
                  }}
                >
                  updated_at
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
                    setAsc({ ...asc, password: !asc.password });
                    handleSort("password", asc.password);
                  }}
                >
                  password
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
                <th
                  scope="col"
                  className="py-3 px-6 hover:cursor-pointer"
                  onClick={() => {
                    setAsc({ ...asc, dob: !asc.dob });
                    handleSort("dob", asc.dob);
                  }}
                >
                  dob
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 hover:cursor-pointer"
                  onClick={() => {
                    setAsc({ ...asc, gender: !asc.gender });
                    handleSort("gender", asc.gender);
                  }}
                >
                  gender
                </th>
                <th scope="col" className="py-3 px-6">
                  Edit
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
                  <td className="whitespace-nowrap py-4 px-6">
                    <button
                      onClick={async () => {
                        await prisma.users.update({
                          where: {
                            id: user.id,
                          },
                          data: {
                            active: !user.active,
                            updated_at: new Date(),
                          },
                        });
                        await console.log("updated");
                      }}
                    >
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
                    </button>
                  </td>
                  <th
                    scope="row"
                    className="whitespace-nowrap py-4 px-6 font-medium text-gray-900"
                  >
                    {user.id}
                  </th>
                  <td className="whitespace-nowrap py-4 px-6">
                    {new Date(user.created_at).toLocaleTimeString() +
                      ", " +
                      new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {new Date(user.updated_at).toLocaleTimeString() +
                      ", " +
                      new Date(user.updated_at).toLocaleDateString()}
                  </td>
                  {/* <td className="whitespace-nowrap py-4 px-6">{user.email}</td> */}
                  <td className="whitespace-nowrap py-4 px-6">
                    <p className="w-44 truncate hover:w-max hover:overflow-visible">
                      {user.email}
                    </p>
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    <p className="w-32 truncate hover:w-max hover:overflow-visible">
                      {user.password}
                    </p>
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {user.first_name}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {user.last_name}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {new Date(user.dob).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">{user.gender}</td>
                  <td className="cursor-pointer whitespace-nowrap py-4 px-6 text-yellow-500 hover:text-yellow-600">
                    Edit
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
