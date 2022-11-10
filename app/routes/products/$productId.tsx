import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiShoppingBag } from "react-icons/bi";
import { Link, useLoaderData } from "@remix-run/react";

export function ErrorBoundary({ error }: { error: any }) {
  return (
    <section className="flex h-full min-h-screen w-full items-center">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-lg text-center">
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry! Something went wrong with this product.
          </p>
          <pre className="mt-4 mb-4">{error.message}</pre>
          <p className="mt-4 mb-8">
            You can still find plenty of other things on our website.
          </p>
          <Link
            rel="noopener noreferrer"
            to="/products"
            className="rounded bg-yellow-400 px-8 py-3 font-semibold text-white hover:bg-yellow-500"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </section>
  );
}

export const loader = async ({ params }: { params: any }) => {
  try {
    const product = await fetch(
      `https://635739669243cf412f94ec88.mockapi.io/Products/${params.productId}`
    );

    return product.json();
  } catch (error) {
    throw new Error("No product found!");
  }
};

export default function ProductRoute() {
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
    <>
      <div className="w-full pt-16">
        <div className="grid items-baseline md:grid-cols-2">
          <div className="overflow-hidden">
            <img
              className="m-16 aspect-square h-4/5 w-4/5 justify-center overflow-hidden rounded-2xl object-cover object-center shadow-xl"
              src={product.image}
              alt={product.shortDesc}
            />
          </div>
          <div className="flex flex-col space-y-6 pb-4 pl-6 pr-20 pt-20">
            <h6>
              <Link to="/products" className="font-semibold text-yellow-500">
                Products
              </Link>{" "}
              /{" "}
              <Link
                to={`/category/${product.category}`}
                className="font-semibold"
              >
                {product.category}{" "}
              </Link>{" "}
              / {product.name}{" "}
            </h6>
            <h1 className="text-3xl font-semibold text-gray-800">
              {product.name}{" "}
            </h1>
            <p className="text-3xl font-semibold text-yellow-500">
              ${product.price}
            </p>
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
            <div>
              <p className="font-semibold">Product Description</p>
              <hr className="mt-2 w-2/3 border-t-2 border-gray-300" />
              <p className="mt-4 text-gray-700">{product.description}</p>
            </div>
            <div>
              <p className="font-semibold">Product Rating</p>
              <hr className="mt-2 w-2/3 border-t-2 border-gray-300" />
              <div className="mt-4 flex items-center space-x-1">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <p className="text-sm font-bold text-gray-700">4.95</p>
                <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500" />
                <Link
                  to={`/products/${product.id}/reviews`}
                  className="text-sm font-medium text-gray-700 no-underline"
                >
                  {product.reviews?.length} reviews
                </Link>
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
