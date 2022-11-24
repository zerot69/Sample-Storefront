import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaGooglePay, FaPaypal } from "react-icons/fa";
import { RiMastercardFill, RiVisaLine } from "react-icons/ri";
import { Form, Link } from "@remix-run/react";

export default function CheckoutRoute() {
  const [cart, setCart] = useState(() => {
    return typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart")!) || [{}]
      : [{}];
  });

  const item = cart.reduce(
    (total: any, item: any) => (total = total + item.quantity),
    0
  );

  const subtotal = cart.reduce(
    (total: any, currentValue: any) =>
      (total = total + currentValue.price * currentValue.quantity),
    0
  );
  const tax = subtotal * 0.05;
  const shipping = 50000;

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
      <Form
        method="post"
        action="/checkout/confirmation"
        className="grid w-full  max-w-screen-2xl items-baseline gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
      >
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
                    id="firstName"
                    name="firstName"
                    required
                  />
                </div>
                <div>
                  <label className="text-md font-semibold">Last name</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-md font-semibold">Email</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="email"
                    id="email"
                    name="email"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-md font-semibold">Phone</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="phone"
                    id="phone"
                    name="phone"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-md font-semibold">Address</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="text"
                    id="address"
                    name="address"
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
                    id="apartment"
                    name="apartment"
                    placeholder="(optional)"
                  />
                </div>
                <div>
                  <label className="text-md font-semibold">Zipcode</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="text"
                    pattern="\b\d{5}\b|\b\d{6}\b"
                    id="zipcode"
                    name="zipcode"
                    required
                  />
                </div>
                <div>
                  <label className="text-md font-semibold">City</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="text"
                    id="city"
                    name="city"
                    required
                  />
                </div>
                <div>
                  <label className="text-md font-semibold">State</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="text"
                    id="state"
                    name="state"
                  />
                </div>
                <div>
                  <label className="text-md font-semibold">Country</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="text"
                    id="country"
                    name="country"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <h2 className="mt-8 text-lg font-medium">Payment Method</h2>
          <div className="mt-4 rounded-xl bg-white shadow-lg">
            <div className="py-4">
              <div className="my-4 grid grid-cols-2 gap-4 px-8">
                <div className="col-span-2">
                  <Link to="/about">
                    <button className="text-md mt-1 flex h-10 w-full items-center justify-center rounded border bg-yellow-400 px-4 font-semibold text-white hover:bg-yellow-500">
                      Pay with ECO
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to="#">
                    <button className="text-md mt-1 flex h-10 w-full items-center justify-center rounded border bg-yellow-400 px-4 font-semibold text-white hover:bg-yellow-500">
                      Pay with <FaPaypal style={{ marginLeft: 8 }} />
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to="#">
                    <button className="text-md mt-1 flex h-10 w-full items-center justify-center rounded border bg-yellow-400 px-4 font-semibold text-white hover:bg-yellow-500">
                      Pay with{" "}
                      <FaGooglePay style={{ marginLeft: 8 }} size={40} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center">
              <hr className="w-full border" />
              <p className="flex flex-shrink-0 items-center px-4 text-base leading-4 text-gray-500">
                or pay with card{" "}
                <RiVisaLine style={{ marginLeft: 8 }} size={40} />{" "}
                <RiMastercardFill style={{ marginLeft: 8 }} size={40} />
              </p>
              <hr className="w-full border" />
            </div>
            <div className="py-4">
              <div className="my-4 grid grid-cols-2 gap-4 px-8 pb-8">
                <div className="col-span-2">
                  <label className="text-md font-semibold">Name on card</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="text"
                    id="cardName"
                    name="cardName"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-md font-semibold">Card number</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="tel"
                    pattern="[0-9\s]{13,19}"
                    id="cardNumber"
                    name="cardNumber"
                    required
                  />
                </div>
                <div>
                  <label className="text-md font-semibold">Expiry date</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="month"
                    min="2022-01"
                    max="2029-12"
                    id="cardExpiry"
                    name="cardExpiry"
                    required
                  />
                </div>
                <div>
                  <label className="text-md font-semibold">CVV/CVC</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="password"
                    minLength={3}
                    maxLength={3}
                    pattern="[0-9]{3}"
                    id="cardCvc"
                    name="cardCvc"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky top-24">
          <h2 className="text-lg font-medium ">Purchase Summary</h2>
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
                        {(item.price * item.quantity).toLocaleString()}đ
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
                    {subtotal.toLocaleString()}đ
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-sm font-semibold">Tax</span>
                  <span className="mb-px text-sm text-gray-500">
                    {tax.toLocaleString()}đ
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-sm font-semibold">Shipping</span>
                  <span className="mb-px text-sm text-gray-500">
                    {shipping.toLocaleString()}đ
                  </span>
                </div>
              </div>
              <div className="mt-4 border-t px-8 pt-4">
                <div className="flex items-end justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    {(subtotal + tax + shipping).toLocaleString()}đ
                  </span>
                </div>
                <span className="mt-2 text-xs text-gray-500">
                  Save more with{" "}
                  <Link to="/about" className="text-yellow-500">
                    Eco Premium
                  </Link>
                </span>
              </div>
              <input
                type="hidden"
                value={subtotal + tax + shipping}
                name="totalAmount"
              />
              <input type="hidden" value={JSON.stringify(cart)} name="cart" />
              <div className="mt-8 flex items-center px-8">
                <div className="text-xs text-gray-500">
                  By continuing, you agree to the{" "}
                  <Link to="/about" className="text-yellow-500" target="_blank">
                    Terms and conditions
                  </Link>
                  .
                </div>
              </div>
              <div className="flex flex-col px-8 pt-4">
                <button
                  type="submit"
                  className="flex h-10 w-full items-center justify-center rounded bg-yellow-400 text-sm font-medium text-white hover:bg-yellow-500"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </Form>
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
