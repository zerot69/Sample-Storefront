import toast, { Toaster } from "react-hot-toast";
import { PrismaClient } from "@prisma/client";
import { Form, useLoaderData } from "@remix-run/react";

import SearchBar from "~/components/searchbar";

export async function loader({ request }: { request: any }) {
  const prisma = new PrismaClient();
  const searchData = await new URL(request.url)?.searchParams.get("search");
  return searchData
    ? await prisma.orders.findUnique({
        where: {
          order_code: searchData,
        },
      })
    : null;
}

export async function action({ request }: { request: any }) {
  const prisma = new PrismaClient();
  const formData = await request.formData();
  const orderId = formData.get("orderId");
  await prisma.orders.delete({
    where: {
      id: orderId,
    },
  });
  return null;
}

export default function OrdersRoute() {
  const data = useLoaderData();

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-5">
      <h1 className="text-gray-00 p-8 pt-20 text-center text-5xl">
        Track your order
      </h1>
      <SearchBar />
      <div className="mt-8 w-1/3 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8">
        {data ? (
          <div>
            <h1 className="mb-4">ECO Shipment</h1>
            <p>
              <span className="font-bold">Order code: </span>
              {data.order_code}
            </p>
            <p>
              <span className="font-bold">Created at: </span>
              {new Date(data.created_at).toLocaleTimeString() +
                " " +
                new Date(data.created_at).toLocaleDateString()}
            </p>
            <p>
              <span className="font-bold">Deliver to: </span>
              {data.first_name + " " + data.last_name}
            </p>
            <p>
              <span className="font-bold">Address: </span>
              {data.address}
            </p>
            <Form action="/orders" method="post">
              <input type="hidden" name="orderId" value={data.id} />
              <button
                type="submit"
                onClick={() => toast.error("Order cancelled!")}
                className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
              >
                Cancel order
              </button>
            </Form>
          </div>
        ) : (
          <p className="text-center">Please type in your correct order code!</p>
        )}
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
