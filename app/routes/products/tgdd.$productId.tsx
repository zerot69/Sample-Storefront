import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiShoppingBag } from "react-icons/bi";
import { Link, useLoaderData } from "@remix-run/react";

import { prisma } from "~/db.server";

export async function loader({ params }: { params: any }) {
  try {
    return await prisma.products_crawl.findUnique({
      where: {
        id: params.productId,
      },
    });
  } catch (error) {
    throw new Error("No products found!");
  }
}

export default function TgddProductRoute() {
  const product = useLoaderData();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (action: any) => {
    switch (action) {
      case "+":
        if (quantity < product.stock) setQuantity(quantity + 1);
        break;

      case "-":
        if (quantity > 1) setQuantity(quantity - 1);
        break;

      default:
        break;
    }
  };

  const handleAddToCart = (
    id: string,
    name: string,
    quantity: number,
    price: string
  ) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")!) || [];
    const item = {
      id: id,
      name: name,
      quantity: quantity,
      price: parseInt(price),
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
    <>
      <div className="w-full pt-16">
        <div className="grid items-baseline md:grid-cols-2">
          <div className="overflow-hidden">
            <img
              className="m-16 aspect-square h-4/5 w-4/5 justify-center overflow-hidden rounded-2xl object-scale-down object-center shadow-xl"
              src={product.images[0]}
              alt={product.shortDesc}
            />
          </div>
          <div className="flex flex-col space-y-6 pb-4 pl-6 pr-20 pt-20">
            <h6>
              <Link to="/products" className="font-semibold text-yellow-500">
                Products
              </Link>{" "}
              /{" "}
              <Link to={`/products/tgdd`} className="font-semibold">
                Thế giới di động{" "}
              </Link>{" "}
              / {product.name}{" "}
            </h6>
            <h1 className="text-3xl font-semibold text-gray-800">
              {product.name}{" "}
            </h1>
            <p>
              {product.base ? (
                <p className="text-3xl font-semibold text-yellow-500">
                  <span className="text-xl font-light text-gray-600 line-through">
                    {product.base.toLocaleString()}₫
                  </span>{" "}
                  {product.price.toLocaleString()}₫
                </p>
              ) : (
                <>
                  {product.price ? (
                    <p className="text-3xl font-semibold text-yellow-500">
                      {product.price.toLocaleString()}₫
                    </p>
                  ) : (
                    <p className="text-3xl font-semibold text-red-400">
                      Out of stock
                    </p>
                  )}
                </>
              )}
            </p>
            {product.price ? (
              <>
                <div>
                  <p className="font-semibold">Select Quantity</p>
                  <div className="mt-2 flex items-center space-x-4 pr-4">
                    <button
                      className="w-10 rounded-md bg-gray-200 px-2 py-2 hover:border-yellow-500 hover:bg-yellow-500 hover:font-extrabold hover:text-yellow-700 hover:shadow-sm"
                      onClick={() => handleQuantityChange("-")}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      className="w-10 rounded-md bg-gray-200 px-2 py-2 hover:border-yellow-500 hover:bg-yellow-500 hover:font-extrabold hover:text-yellow-700 hover:shadow-sm"
                      onClick={() => handleQuantityChange("+")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    className="inline-flex items-center rounded bg-yellow-500 px-4 py-2 font-semibold text-gray-50 hover:bg-yellow-600"
                    onClick={() => {
                      handleAddToCart(
                        product.id,
                        product.name,
                        quantity,
                        product.price
                      );
                      toast.success("Great! Item(s) added.");
                    }}
                  >
                    <BiShoppingBag className="mr-2 text-lg" />{" "}
                    <span>Add to Cart</span>
                  </button>
                </div>
              </>
            ) : null}
            <div>
              <p className="mt-4 font-bold">Product Description</p>
              <hr className="mt-2 w-2/3 border-t-2 border-gray-300" />
              <ul className="mt-4">
                {product.attribute.map((attribute: any) => (
                  <li
                    key={attribute.key}
                    className="mt-2 grid grid-cols-3 gap-4"
                  >
                    <div className="font-semibold">{attribute.key}:</div>
                    <div className="col-span-2">{attribute.value}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mt-4 font-bold">Promotions</p>
              <hr className="mt-2 w-2/3 border-t-2 border-gray-300" />
              {product.promotions.length ? (
                <ul className="mt-4 list-inside list-disc">
                  {product.promotions.map((promotion: any) => (
                    <li key={promotion.key} className="mt-1">
                      {promotion.value}{" "}
                      {promotion.key ? (
                        <a
                          href={promotion.key}
                          target="_blank"
                          rel="noreferrer"
                          className="text-yellow-500"
                        >
                          (Click để xem chi tiết)
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4">No promotions for this product.</p>
              )}
            </div>
            <div>
              <p className="mt-4 font-bold">Discounts</p>
              <hr className="mt-2 w-2/3 border-t-2 border-gray-300" />
              {product.discounts.length ? (
                <ul className="mt-4">
                  {product.discounts.map((discount: any) => (
                    <li
                      key={discount.key}
                      className="mt-4 grid grid-cols-3 gap-4"
                    >
                      <div className="font-semibold">
                        {discount.key.toUpperCase()}:
                      </div>
                      <div className="col-span-2 whitespace-pre-line">
                        {discount.value.replaceAll(" - ", " \n ")}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4">No discounts for this product.</p>
              )}
            </div>
            <div>
              <p className="mt-4 font-bold">Learn more about this product</p>
              <hr className="mt-2 w-2/3 border-t-2 border-gray-300" />
              <div className="mt-4 flex items-center space-x-1">
                <a
                  href={product.redirect}
                  target="_blank"
                  rel="noreferrer"
                  className="text-yellow-400"
                >
                  Thế giới di động
                </a>
              </div>
            </div>
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
          }}
        />
      </div>
    </>
  );
}
