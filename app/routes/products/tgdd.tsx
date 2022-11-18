import toast, { Toaster } from "react-hot-toast";
import { PrismaClient } from "@prisma/client";
import { Link, useLoaderData } from "@remix-run/react";

import Pagination from "~/components/pagination";
import SearchBar from "~/components/searchbar";

export async function loader({ request }: { request: any }) {
  const prisma = new PrismaClient();
  const searchData = new URL(request.url).searchParams.get("search");
  let products;
  if (searchData !== null) {
    products = await prisma.products.findMany({
      where: {
        name: {
          contains: searchData,
        },
      },
    });
  } else {
    products = await prisma.products.findMany({
      take: 100,
    });
  }
  return await products;
}

export default function ProductIndexPage() {
  const products = useLoaderData();

  const handleAddToCart = (
    id: string,
    name: string,
    quantity: number,
    price: number
  ) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")!) || [];
    const item = {
      id: id,
      name: name,
      quantity: quantity,
      price: price,
    };
    if (currentCart.length === 0) {
      currentCart.push(item);
    } else {
      let temp = -1;
      for (let i = 0; i < currentCart.length; i++) {
        if (currentCart[i].id === id) temp = i;
      }
      if (temp >= 0) {
        currentCart[temp].quantity += quantity;
      } else {
        currentCart.push(item);
      }
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));
  };

  return (
    <div className="mt-8 w-full pb-40">
      <h1 className="text-gray-00 p-8 pt-20 pl-24 text-5xl">
        Eco Store - Thegioididong
      </h1>

      <SearchBar />
      <Pagination />

      {products.length === 0 ? (
        <h2 className="w-full pt-20 text-center">
          Nothing found! Please try another keyword!
        </h2>
      ) : (
        <div className="mt-8 grid grid-cols-1 justify-items-center px-4 md:grid-cols-2 md:px-12 lg:grid-cols-3 lg:px-6 xl:gap-6 xl:px-4 2xl:grid-cols-4 2xl:gap-6 2xl:px-24">
          {products.map((product: any) => (
            <div key={product.id}>
              <section className="w-80 rounded-lg bg-white shadow-md hover:shadow-lg">
                <Link to={"#"} prefetch="none">
                  <div className="overflow-hidden">
                    <img
                      className="h-80 w-80 object-scale-down object-center duration-300 hover:scale-125 lg:h-80 lg:w-80"
                      src={product.images[0]}
                      alt={product.id}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="py-2 text-lg font-bold text-gray-700 hover:underline">
                      {product.name}
                    </h3>
                    <p className="font-italic text-gray-700">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                    <p className="py-2 text-center text-lg font-bold text-yellow-400">
                      {product.base ? (
                        <p className="py-2 text-center text-lg font-bold text-yellow-400">
                          <span className="font-light text-gray-600 line-through">
                            {product.base.toLocaleString()}₫
                          </span>{" "}
                          {product.price.toLocaleString()}₫
                        </p>
                      ) : (
                        <>
                          {product.price ? (
                            <p className="py-2 text-center text-lg font-bold text-yellow-400">
                              {product.price.toLocaleString()}₫
                            </p>
                          ) : (
                            <p className="py-2 text-center text-lg font-bold text-red-400">
                              Out of stock
                            </p>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                </Link>

                <div className="flex flex-col px-8 pb-4">
                  {product.price ? (
                    <button
                      onClick={() => {
                        handleAddToCart(
                          product.id,
                          product.name,
                          1,
                          product.price
                        );
                        toast.success("Great! Item added.");
                      }}
                      className="my-2 flex w-full items-center justify-center rounded-lg border border-transparent bg-yellow-400 px-6 py-1 text-base font-medium text-white hover:bg-yellow-500 md:py-2 md:px-10 md:text-lg"
                    >
                      Add to cart
                    </button>
                  ) : null}
                </div>
              </section>
            </div>
          ))}
        </div>
      )}

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
        }}
      />
    </div>
  );
}
