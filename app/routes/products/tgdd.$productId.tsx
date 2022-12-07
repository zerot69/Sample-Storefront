import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiShoppingBag } from "react-icons/bi";
import { Link, useLoaderData } from "@remix-run/react";

import { prisma } from "~/db.server";

export async function loader({ params }: { params: any }) {
  const product = await prisma.products_crawl.findUnique({
    where: {
      id: params.productId,
    },
  });

  const relatedKeywords = product?.name.split(" ");
  for (let i = 0; i < relatedKeywords?.length!; i++) {
    if (relatedKeywords && relatedKeywords[i].length < 3) {
      relatedKeywords?.splice(i, 1);
    }
  }

  if (relatedKeywords && relatedKeywords?.length < 5) {
    for (let i = 0; i < 5 - relatedKeywords?.length; i++) {
      relatedKeywords?.push(relatedKeywords[0]);
    }
  }
  let relatedProducts;
  if (relatedKeywords) {
    relatedProducts = await prisma.products_crawl.findMany({
      where: {
        OR: [
          {
            name: {
              contains: relatedKeywords[0],
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: relatedKeywords[1],
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: relatedKeywords[2],
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: relatedKeywords[3],
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: relatedKeywords[4],
              mode: "insensitive",
            },
          },
        ],
        active: true,
        id: {
          not: params.productId,
        },
      },
    });
  }

  try {
    return {
      product: product,
      relatedProducts: relatedProducts
        ?.sort(function (a: any, b: any) {
          return Math.random() - 0.5;
        })
        .slice(0, 5),
    };
  } catch (error) {
    throw new Error("No products found!");
  }
}

export default function TgddProductRoute() {
  const product = useLoaderData().product;
  const relatedProducts = useLoaderData().relatedProducts;
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(0);
  const [expandText, setExpandText] = useState(false);

  // Handle quantity change
  const handleQuantityChange = (action: any) => {
    switch (action) {
      case "+":
        if (quantity < product.quantity) setQuantity(quantity + 1);
        else toast.error("Not enough stock!");
        break;

      case "-":
        if (quantity > 1) setQuantity(quantity - 1);
        else if (quantity === 1)
          toast.error("Quantity must be greater than 0!");
        break;

      default:
        alert("Something went wrong!");
        break;
    }
  };

  // Add to cart
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

  // Open full screen image
  const openFullScreen = () => {
    document.getElementById("productImage")?.requestFullscreen();
  };

  // Expand discount content
  const handleExpandDiscountContent = () => {
    setExpandText(!expandText);
  };

  // Reset state when product changes
  useEffect(() => {
    setImage(0);
    setExpandText(false);
    setQuantity(1);
  }, [product]);

  useEffect(() => {
    product.discounts.map((discount: any) =>
      expandText
        ? (document
            .getElementById("discountContent" + discount.key)
            ?.classList.add("whitespace-pre-line"),
          document
            .getElementById("discountContent" + discount.key)
            ?.classList.remove("truncate"))
        : (document
            .getElementById("discountContent" + discount.key)
            ?.classList.remove("whitespace-pre-line"),
          document
            .getElementById("discountContent" + discount.key)
            ?.classList.add("truncate"))
    );
  }, [expandText, product]);

  return (
    <div className="w-full pt-16">
      {product ? (
        <>
          <div className="grid items-start md:grid-cols-2">
            <div className="inline-block">
              <div className="overflow-hidden">
                <img
                  id="productImage"
                  className="m-16 aspect-square h-4/5 w-4/5 transform justify-center overflow-hidden rounded-2xl bg-white object-scale-down object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:cursor-pointer hover:shadow-2xl hover:shadow-yellow-400/50"
                  src={product.images[image]}
                  alt={product.shortDesc}
                  onClick={() => {
                    if (document.fullscreenElement) {
                      if (image < product.images.length - 1)
                        setImage(image + 1);
                      else setImage(0);
                    } else openFullScreen();
                  }}
                />
              </div>
              <div
                className={`mx-16 flex w-4/5 flex-nowrap space-x-4 overflow-x-hidden py-4 px-2 hover:overflow-x-auto lg:${
                  product.images.length > 6 ? "justify-start" : "justify-center"
                }`}
                id="productImages"
              >
                {product.images.map((imageURL: string, index: number) => (
                  <div
                    className={`group shrink-0 overflow-hidden rounded-lg bg-white object-center shadow-md transition duration-500 ease-in-out hover:-translate-y-1 hover:cursor-pointer hover:shadow-xl ${
                      index === image &&
                      "shadow-yellow-500/50 hover:shadow-yellow-500/50"
                    }`}
                    key={index}
                  >
                    <img
                      className="h-20 w-20 scale-75 object-scale-down object-center duration-500 group-hover:scale-90"
                      src={imageURL}
                      alt={product.id}
                      onClick={() => {
                        setImage(index);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="inline-block">
              <div className="flex flex-col space-y-6 pb-4 pl-6 pr-20 pt-20">
                <h6>
                  <Link
                    to="/products"
                    className="font-semibold text-yellow-500"
                    prefetch="intent"
                  >
                    Products
                  </Link>{" "}
                  /{" "}
                  <Link
                    to={`/products/tgdd`}
                    className="font-semibold"
                    prefetch="intent"
                  >
                    Thế Giới Di Động{" "}
                  </Link>{" "}
                  / {product.name}{" "}
                </h6>
                <h1 className="text-3xl font-semibold text-gray-800">
                  {product.name}{" "}
                </h1>
                <p>
                  {product.base ? (
                    <p className="text-3xl font-semibold text-yellow-500">
                      {product.price.toLocaleString()}₫{" "}
                      <span className="text-xl font-light text-gray-600 line-through">
                        {product.base.toLocaleString()}₫
                      </span>{" "}
                      <span className="text-xl font-semibold text-yellow-500">
                        -{Math.round((1 - product.price / product.base) * 100)}%
                      </span>
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
                  {!product.quantity && (product.price || product.base) ? (
                    <p className="mt-8 text-3xl font-semibold text-red-400">
                      Out of stock
                    </p>
                  ) : null}
                </p>
                {(product.quantity && product.price) ||
                (product.base && !product.price) ? (
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
                    {product.attribute.length ? (
                      product.attribute.map((attribute: any) => (
                        <li
                          key={attribute.key}
                          className="mt-2 grid grid-cols-3 gap-4"
                        >
                          <div className="font-semibold">{attribute.key}:</div>
                          <div className="col-span-2">{attribute.value}</div>
                        </li>
                      ))
                    ) : (
                      <p className="mt-4">No description for this product.</p>
                    )}
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
                              className="text-xs text-yellow-500"
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
                  <p className="mt-4 font-bold">
                    Discounts
                    <span
                      className="ml-2 select-none text-right text-xs text-gray-400 hover:cursor-pointer"
                      id="discountContent"
                      onClick={() => handleExpandDiscountContent()}
                    >
                      {product.discounts.length
                        ? expandText
                          ? "▼"
                          : "▲"
                        : null}
                    </span>
                  </p>
                  <hr className="mt-2 w-2/3 border-t-2 border-gray-300" />
                  {product.discounts.length ? (
                    <ul className="mt-4">
                      {product.discounts.map((discount: any) => (
                        <li key={discount.key} className="mt-4 gap-4">
                          <div className="mt-4 font-semibold">
                            {discount.key.toUpperCase()}
                            {discount.value && ":"}
                          </div>
                          <div
                            className="truncate"
                            id={`discountContent${discount.key}`}
                          >
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
                  <p className="mt-4 font-bold">
                    Learn more about this product
                  </p>
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
            <div className="col-span-2 mx-4">
              {relatedProducts?.length ? (
                <div>
                  <p className="my-6 ml-10 text-2xl font-bold">
                    You may also like
                  </p>
                  <div className="mx-10 grid grid-cols-5 justify-between space-x-2 overflow-x-visible">
                    {relatedProducts?.map((product: any) => (
                      <div key={product.id}>
                        <section className="w-64 rounded-xl bg-white shadow-lg transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-xl ">
                          <Link
                            to={`/products/tgdd/${product.id}`}
                            prefetch="intent"
                          >
                            <div className="overflow-hidden">
                              <img
                                className="aspect-square h-64 w-64 object-scale-down object-center duration-500 hover:scale-110"
                                src={product.images[0]}
                                alt={product.id}
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="break-words py-2 text-base font-bold text-gray-700 hover:underline">
                                {product.name}
                              </h3>
                              <p className="font-italic text-sm text-gray-700">
                                {product.description
                                  ? product.description
                                  : "Lorem ipsum dolor sit, amet consectetur adipisicing elit."}
                              </p>
                              <p className="py-2 text-center text-base font-bold text-yellow-400">
                                {product.base ? (
                                  <p className="py-2 text-center text-base font-bold text-yellow-400">
                                    <span className="text-sm font-light text-gray-600 line-through">
                                      {product.base.toLocaleString()}₫
                                    </span>{" "}
                                    {product.price.toLocaleString()}₫
                                  </p>
                                ) : (
                                  <>
                                    {product.price ? (
                                      <p className="py-2 text-center text-base font-bold text-yellow-400">
                                        {product.price.toLocaleString()}₫
                                      </p>
                                    ) : (
                                      <p className="py-2 text-center text-base font-bold text-red-400">
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
                                className="mb-2 flex w-full items-center justify-center rounded-lg border border-transparent bg-yellow-400 px-6 py-1 text-sm font-medium text-white hover:bg-yellow-500 md:py-2 md:px-10"
                              >
                                Add to cart
                              </button>
                            ) : null}
                          </div>
                        </section>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="my-6 ml-10 text-2xl font-bold">
                  No related products for this product.
                </p>
              )}
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
        </>
      ) : (
        <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-5">
          <h1>No product found!</h1>
          <p className="mt-4 mb-8">
            You can still find plenty of other things on our website.
          </p>
          <Link
            to="/products/tgdd"
            className="rounded bg-yellow-400 px-8 py-3 font-semibold text-white hover:bg-yellow-500"
          >
            Back to Products
          </Link>
        </div>
      )}
    </div>
  );
}
