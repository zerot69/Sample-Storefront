import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";

export const loader = async ({ request }: { request: any }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const product = await fetch(
    `https://635739669243cf412f94ec88.mockapi.io/Products/${id}`
  );
  return await product.json();
};

export default function ProductRoute() {
  const product = useLoaderData();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (action: any) => {
    switch (action) {
      case "inc":
        if (quantity < product.stock) setQuantity(quantity + 1);
        break;

      case "dec":
        if (quantity > 1) setQuantity(quantity - 1);
        break;

      default:
        break;
    }
  };

  return (
    <div className="w-full">
      <div className="grid items-center md:grid-cols-2">
        <div>
          <img
            className="m-16 aspect-square h-4/5 w-4/5 justify-center overflow-hidden rounded-2xl object-cover object-center hover:border-yellow-500"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="flex flex-col space-y-6 px-6 py-4">
          <h1 className="text-3xl font-semibold text-gray-800">
            {product.name}{" "}
          </h1>
          <p className="text-3xl font-semibold text-yellow-500">
            ${product.price}
          </p>
          <div>
            <p className="font-semibold">Select Quantity</p>
            <div className="mt-2 flex items-center space-x-4 px-4">
              <button
                className="px-4 py-2 hover:font-bold hover:text-yellow-500 hover:shadow-sm"
                onClick={() => handleQuantityChange("dec")}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="px-4 py-2 hover:font-bold hover:text-yellow-500 hover:shadow-sm"
                onClick={() => handleQuantityChange("inc")}
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
        </div>
      </div>
    </div>
  );
}
