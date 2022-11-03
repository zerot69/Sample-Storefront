/* eslint-disable jsx-a11y/anchor-has-content */
import { Link, useLoaderData } from "@remix-run/react";

import Pagination from "~/components/pagination";

export async function loader() {
  const products = await fetch(
    `https://635739669243cf412f94ec88.mockapi.io/Products?page=1&limit=10`
  );
  return await products.json();
}

export default function ProductIndexPage() {
  const products = useLoaderData();

  return (
    <div className="mt-8 w-full pb-40">
      <h1 className="text-gray-00 p-8 pt-20 pl-24 text-5xl">Eco Store</h1>

      <Pagination />

      <div className="mt-8 grid grid-cols-1 justify-items-center gap-6 px-4 md:grid-cols-2 md:px-12 lg:grid-cols-3 lg:px-6 xl:gap-6 xl:px-4 2xl:grid-cols-4 2xl:gap-6 2xl:px-24">
        {products.map((product: any) => (
          <div key={product.id}>
            <section className="w-80 overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg">
              <Link to={`/products/${product.id}`}>
                <img
                  className="h-80 w-80 object-cover object-center lg:h-80 lg:w-80"
                  src={product.image}
                  alt={product.shortDesc}
                />
                <div className="p-4">
                  <h3 className="py-2 text-lg font-bold text-gray-700 hover:underline">
                    {product.name}
                  </h3>
                  <p className="font-italic text-gray-700">
                    {product.description}
                  </p>
                  <p className="py-2 text-center text-lg font-bold text-yellow-400">
                    ${product.price}
                  </p>
                  <button className="my-2 flex w-full items-center justify-center rounded-lg border border-transparent bg-yellow-400 px-6 py-1 text-base font-medium text-white hover:bg-yellow-500 md:py-2 md:px-10 md:text-lg">
                    Add to cart
                  </button>
                </div>
              </Link>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}
