import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import toast, { Toaster } from "react-hot-toast";
import { FaCircle, FaTrash } from "react-icons/fa";
import { Form, Link, useLoaderData } from "@remix-run/react";

import "chart.js/auto";

import SearchBar from "~/components/searchbar";
import { prisma } from "~/db.server";

export async function loader({ request }: { request: any }) {
  //Filter products with error
  await prisma.products_crawl.updateMany({
    where: {
      active: true,
      price: 0,
      base: 0,
    },
    data: {
      active: false,
    },
  });

  const searchData = new URL(request.url).searchParams.get("search");
  const sort = new URL(request.url).searchParams.get("sort") || "price";
  return {
    searchData: searchData,
    all: await prisma.products_crawl.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchData || "",
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchData || "",
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        price: "asc",
      },
    }),
    mostExpensive: await prisma.products_crawl.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchData || "",
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchData || "",
              mode: "insensitive",
            },
          },
        ],
      },
      take: 1,
      orderBy: {
        price: "desc",
      },
    }),
  };
}

export async function action({ request }: { request: any }) {
  const formData = await request.formData();
  const productId = formData.get("productId");
  await prisma.products_crawl.delete({
    where: {
      id: productId,
    },
  });
  return null;
}

export default function ProductIndexPage() {
  const data = useLoaderData();
  const productMostExpensive = data.mostExpensive;
  const searchData = data.searchData;

  const [products, setProducts] = useState(data.all);
  const [asc, setAsc] = useState({
    active: true,
    id: true,
    created_at: true,
    updated_at: true,
    name: true,
    description: true,
    price: true,
    base: true,
    quantity: true,
  });

  useEffect(() => {
    setProducts([...data.all]);
  }, [data.all]);

  // Data
  const priceRange = [
    "<1,000,000",
    "1,000,000 - 5,000,000",
    "5,000,000 - 10,000,000",
    "10,000,000 - 15,000,000",
    "15,000,000 - 20,000,000",
    "20,000,000 - 25,000,000",
    "25,000,000 - 30,000,000",
    "30,000,000 - 35,000,000",
    ">35,000,000 ",
  ];
  const newUsersArray = Array(priceRange.length).fill(0);
  products.map((product: any) => {
    if (product.price < 1000000 && product.price > 0) {
      newUsersArray[0]++;
    } else if (product.price < 5000000) {
      newUsersArray[1]++;
    } else if (product.price < 10000000) {
      newUsersArray[2]++;
    } else if (product.price < 15000000) {
      newUsersArray[3]++;
    } else if (product.price < 20000000) {
      newUsersArray[4]++;
    } else if (product.price < 25000000) {
      newUsersArray[5]++;
    } else if (product.price < 30000000) {
      newUsersArray[6]++;
    } else if (product.price < 35000000) {
      newUsersArray[7]++;
    } else {
      newUsersArray[8]++;
    }
    return null;
  });

  // Sort table
  const handleSort = (sortBy: string, asc: boolean) => {
    if (sortBy === "price") {
      setProducts([
        ...products.sort((a: { price: number }, b: { price: number }) => {
          return asc ? a.price - b.price : b.price - a.price;
        }),
      ]);
    } else if (sortBy === "base") {
      setProducts([
        ...products.sort((a: { base: number }, b: { base: number }) => {
          return asc ? a.base - b.base : b.base - a.base;
        }),
      ]);
    } else if (sortBy === "quantity") {
      setProducts([
        ...products.sort((a: { quantity: number }, b: { quantity: number }) => {
          return asc ? a.quantity - b.quantity : b.quantity - a.quantity;
        }),
      ]);
    } else if (sortBy === "id") {
      setProducts([
        ...products.sort((a: { id: string }, b: { id: string }) =>
          asc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
        ),
      ]);
    } else if (sortBy === "description") {
      setProducts([
        ...products.sort(
          (a: { description: string }, b: { description: string }) =>
            asc
              ? a.description.localeCompare(b.description)
              : b.description.localeCompare(a.description)
        ),
      ]);
    } else if (sortBy === "name") {
      setProducts([
        ...products.sort((a: { name: string }, b: { name: string }) =>
          asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        ),
      ]);
    } else if (sortBy === "created_at") {
      setProducts([
        ...products.sort(
          (a: { created_at: string }, b: { created_at: string }) =>
            asc
              ? new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
              : new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
        ),
      ]);
    } else if (sortBy === "updated_at") {
      setProducts([
        ...products.sort(
          (a: { updated_at: string }, b: { updated_at: string }) =>
            asc
              ? new Date(a.updated_at).getTime() -
                new Date(b.updated_at).getTime()
              : new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
        ),
      ]);
    } else if (sortBy === "active") {
      setProducts([
        ...products.sort((a: { active: boolean }, b: { active: boolean }) =>
          asc
            ? Number(a.active) - Number(b.active)
            : Number(b.active) - Number(a.active)
        ),
      ]);
    }
  };

  return (
    <div className="mt-8 w-full px-24 pb-20">
      <h1 className="text-gray-00 p-8 pt-20 text-center text-5xl">
        Products
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
          <h1 className="text-lg uppercase text-gray-400">Total products</h1>
          <p className="text-3xl font-bold">{products.length}</p>
        </div>
        <div className="mt-8 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8">
          <h1 className="text-lg uppercase text-gray-400">Active products</h1>
          <p className="text-3xl font-bold">
            {products.filter((product: any) => product.active === true).length}
          </p>
        </div>
        <Link
          to={`${
            productMostExpensive[0]
              ? "/products/tgdd/" + productMostExpensive[0].id
              : "/admin/products"
          }`}
          prefetch="intent"
        >
          <div className="mt-8 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8 ">
            <h1 className="text-lg uppercase text-gray-400">
              Most expensive product
            </h1>
            <p className="truncate text-lg font-bold duration-500 ease-in-out hover:overflow-visible hover:whitespace-pre-line ">
              {productMostExpensive[0]
                ? productMostExpensive[0].name
                : "Not available"}
            </p>
            <p className="text-xs font-light">
              {productMostExpensive[0]
                ? productMostExpensive[0].price.toLocaleString()
                : "Not available"}
              {productMostExpensive[0] && "₫"}
            </p>
          </div>
        </Link>
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
          Products by price range (active only)
        </h1>
        <Bar
          data={{
            labels: priceRange,
            datasets: [
              {
                label: "Items",
                backgroundColor: ["#facc15"],
                data: newUsersArray,
                barThickness: 50,
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
                text: "Products by price range",
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
          <Link to={"/admin/products"}>
            <button>Clear search</button>
          </Link>
        )}
      </div>

      <div className="max-w-full overflow-x-auto py-8">
        <div className="max-h-[80vh] overflow-x-auto shadow-md sm:rounded-lg">
          <table className="sortable min-w-full table-fixed text-left text-sm text-gray-500">
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
                    setAsc({ ...asc, name: !asc.name });
                    handleSort("name", asc.name);
                  }}
                >
                  name
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 hover:cursor-pointer"
                  onClick={() => {
                    setAsc({ ...asc, description: !asc.description });
                    handleSort("description", asc.description);
                  }}
                >
                  description
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 hover:cursor-pointer"
                  onClick={() => {
                    setAsc({ ...asc, price: !asc.price });
                    handleSort("price", asc.price);
                  }}
                >
                  price
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 hover:cursor-pointer"
                  onClick={() => {
                    setAsc({ ...asc, base: !asc.base });
                    handleSort("base", asc.base);
                  }}
                >
                  base
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 hover:cursor-pointer"
                  onClick={() => {
                    setAsc({ ...asc, quantity: !asc.quantity });
                    handleSort("quantity", asc.quantity);
                  }}
                >
                  quantity
                </th>
                <th scope="col" className="py-3 px-6">
                  edit
                </th>
                <th scope="col" className="py-3 px-6">
                  remove
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr
                  key={product.id}
                  className="border-b bg-white hover:bg-gray-100"
                >
                  <td className="whitespace-nowrap py-4 px-6">
                    {product.active ? (
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
                  <th
                    scope="row"
                    className="whitespace-nowrap py-4 px-6 font-medium text-gray-900"
                  >
                    <a
                      href={`/products/tgdd/${product.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {product.id}
                    </a>
                  </th>
                  <td className="whitespace-nowrap py-4 px-6">
                    {new Date(product.created_at).toLocaleTimeString() +
                      ", " +
                      new Date(product.created_at).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {new Date(product.updated_at).toLocaleTimeString() +
                      ", " +
                      new Date(product.updated_at).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    <p className="w-80 truncate duration-700 ease-in-out hover:w-max hover:overflow-visible">
                      {product.name}
                    </p>
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    <p className="w-80 truncate duration-700 ease-in-out hover:w-max hover:overflow-visible">
                      {product.description}
                    </p>
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {product.price}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {product.base}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    {product.quantity}
                  </td>
                  <td className="cursor-pointer whitespace-nowrap py-4 px-6 text-yellow-500 hover:text-yellow-600">
                    Edit
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    <Form action="/admin/products" method="post">
                      <input
                        type="hidden"
                        name="productId"
                        value={product.id}
                      />
                      <button
                        type="submit"
                        onClick={() => toast.error("Product removed!")}
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
          success: {
            style: {
              background: "rgba(34, 197, 94)",
            },
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
