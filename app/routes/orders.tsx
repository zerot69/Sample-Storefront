import { PrismaClient } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";

import SearchBar from "~/components/searchbar";

export async function loader({ request }: { request: any }) {
  const prisma = new PrismaClient();
  const searchData = await new URL(request.url)?.searchParams.get("search");
  let order;
  if (searchData) {
    order = await prisma.orders.findUnique({
      where: {
        order_code: searchData,
      },
    });
  }
  return order || null;
}

export default function OrdersRoute() {
  const data = useLoaderData();
  return (
    <div className="mt-8 grid w-full place-items-center pb-40 ">
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
          </div>
        ) : (
          <p className="text-center">Please type in your correct order code!</p>
        )}
      </div>
    </div>
  );
}
