import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "@remix-run/react";

export default function AboutRoute() {
  // Change cart here <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const [cart, setCart] = useState(() => {
    return typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart")!) || [{}]
      : [{}];
  });

  const item = cart.reduce(
    (total: any, item: any) => (total = total + item.quantity),
    0
  );

  const subtotal =
    Math.round(
      cart.reduce(
        (total: any, currentValue: any) =>
          (total = total + currentValue.price * currentValue.quantity),
        0
      ) * 100
    ) / 100;
  const tax = Math.round(subtotal * 0.05 * 100) / 100;
  const shipping = 5;

  const handleRemoveItem = (id: any) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        cart.splice(i, 1);
      }
    }
    setCart([...cart]);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="mt-8 w-4/5 pb-40">
      <h1 className="text-gray-00 p-8 pt-20 text-center text-5xl">Checkout</h1>
      <div className="py-8">
        <Link to="/products" className="text-yellow-500 hover:text-yellow-600">
          {"< "} Continue shopping
        </Link>
      </div>
      <div className="grid w-full  max-w-screen-2xl items-baseline gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-medium">Customer Information</h2>
          <div className="mt-4 rounded-xl bg-white shadow-lg">
            <div className="py-4">
              <div className="my-4 grid grid-cols-2 gap-4 px-8 pb-8">
                <div>
                  <label className="text-md font-semibold">First name</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label className="text-md font-semibold">Last name</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="text"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-md font-semibold">Email</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="email"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-md font-semibold">Phone</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="phone"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-md font-semibold">Address</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="text"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-md font-semibold">
                    Apartment, suite, etc.
                  </label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="text"
                    placeholder="(optional)"
                  />
                </div>
                <div>
                  <label className="text-md font-semibold">Zipcode</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="text"
                    pattern="[0-9]{5}"
                    required
                  />
                </div>
                <div>
                  <label className="text-md font-semibold">City</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label className="text-md font-semibold">State</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label className="text-md font-semibold">Country</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="text"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-medium">Purchase Summary</h2>
          {JSON.stringify(cart[0]) === JSON.stringify({}) ||
          JSON.stringify(cart) === JSON.stringify([]) ? (
            <div className="mt-4 items-center justify-center rounded-xl bg-white py-6 shadow-lg">
              <h3 className="w-full text-center">No items in cart!</h3>
              <div className="flex flex-col px-8 pt-4">
                <Link
                  to="/products"
                  className="flex h-10 w-full items-center justify-center rounded bg-yellow-400 text-sm font-medium text-white hover:bg-yellow-500"
                >
                  Continue shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-4 rounded-xl bg-white py-6 shadow-lg">
              <div className="space-y-4 px-8">
                {cart.map((item: any) => (
                  <div key={item.id}>
                    <div className="flex items-end">
                      <Link to={`/products/${item.id}`}>
                        <p className="font-semibold duration-200 hover:text-yellow-400">
                          {item.name}
                        </p>
                      </Link>
                      <span className="ml-auto text-sm font-semibold">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                    <div className="flex items-end">
                      <span className="mt-2 text-xs text-gray-500">
                        Quality: {item.quantity}
                      </span>
                      <span
                        onClick={() => {
                          handleRemoveItem(item.id);
                          toast.error("Item removed!");
                        }}
                        className="ml-auto text-xs text-red-400 hover:cursor-pointer"
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t px-8 pt-4">
                <div className="flex items-end justify-between">
                  <span className="text-sm font-semibold">Item(s)</span>
                  <span className="mb-px text-sm text-gray-500">{item}</span>
                </div>
              </div>
              <div className="mt-4 space-y-1 px-8">
                <div className="flex items-end justify-between">
                  <span className="text-sm font-semibold">Sub-total</span>
                  <span className="mb-px text-sm text-gray-500">
                    ${subtotal}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-sm font-semibold">Tax</span>
                  <span className="mb-px text-sm text-gray-500">${tax}</span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-sm font-semibold">Shipping</span>
                  <span className="mb-px text-sm text-gray-500">
                    ${shipping}
                  </span>
                </div>
              </div>
              <div className="mt-4 border-t px-8 pt-4">
                <div className="flex items-end justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    ${Math.round((subtotal + tax + shipping) * 100) / 100}
                  </span>
                </div>
                <span className="mt-2 text-xs text-gray-500">
                  Save more with{" "}
                  <Link to="#" className="text-yellow-500">
                    Eco Premium
                  </Link>
                </span>
              </div>
              <div className="mt-8 flex items-center px-8">
                <input id="termsConditions" type="checkbox" required />
                <label
                  className="ml-2 text-xs text-gray-500"
                  htmlFor="termsConditions"
                >
                  I agree to the{" "}
                  <Link to="/about" className="text-yellow-500" target="_blank">
                    Terms and conditions
                  </Link>
                  .
                </label>
              </div>
              <div className="flex flex-col px-8 pt-4">
                <button className="flex h-10 w-full items-center justify-center rounded bg-yellow-400 text-sm font-medium text-white hover:bg-yellow-500">
                  Checkout
                </button>
              </div>
            </div>
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
    </div>
  );
}
