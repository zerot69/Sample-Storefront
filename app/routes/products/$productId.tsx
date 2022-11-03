import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { Link, useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: { params: any }) => {
  const product = await fetch(
    `https://635739669243cf412f94ec88.mockapi.io/Products/${params.productId}`
  );
  return await product.json();
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

  return (
    <div className="w-full pt-16">
      <div className="grid items-center md:grid-cols-2">
        <div>
          <img
            className="m-16 aspect-square h-4/5 w-4/5 justify-center overflow-hidden rounded-2xl object-cover object-center shadow-xl hover:border-yellow-500"
            src={product.image}
            alt={product.shortDesc}
          />
        </div>
        <div className="flex flex-col space-y-6 py-4 pl-6 pr-20">
          <h6>
            <Link to="/" className="font-semibold text-yellow-500">
              Home
            </Link>{" "}
            /{" "}
            <Link to="" className="font-semibold">
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
            <button className="inline-flex items-center rounded bg-yellow-500 px-4 py-2 font-semibold text-gray-50 hover:bg-yellow-600">
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
                69 reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
