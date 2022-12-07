import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useActionData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { QRCodeCanvas } from "qrcode.react";

import { prisma } from "~/db.server";

export async function action({ request }: { request: any }) {
  const orderCode = (
    (Math.random() + 1 + new Date().getTime() * (Math.random() + 1)) *
    10000
  )
    .toString(36)
    .toLocaleUpperCase();

  const formData = await request.formData();
  await prisma.orders.create({
    data: {
      order_code: orderCode,
      total_amount: formData.get("totalAmount"),
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      address:
        formData.get("address") +
        ", " +
        formData.get("zipcode") +
        ", " +
        formData.get("city") +
        ", " +
        formData.get("country"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      card: {
        name: formData.get("cardName"),
        number: formData.get("cardNumber"),
        expiry: formData.get("cardExpiry"),
        cvc: formData.get("cardCvc"),
      },
      items: JSON.parse(formData.get("cart")),
    },
  });

  return json({ orderCode: orderCode });
}

export default function ConfirmationRoute() {
  const data = useActionData();

  useEffect(() => {
    if (data) {
      localStorage?.setItem("cart", JSON.stringify(null));
      document.documentElement.scrollTop = 0;
    }
  }, [data]);

  return (
    <>
      {data?.orderCode ? (
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-5">
          <h1 className="text-gray-00 p-8 text-center text-5xl">
            Thank you for your order!
          </h1>
          <p className="text-center text-lg">
            Order code:{" "}
            <span className="text-xs italic text-yellow-400">
              Click to copy
            </span>
            <div
              className="mt-4 select-all rounded-lg border border-yellow-400 bg-yellow-100 p-2"
              onClick={() => {
                navigator.clipboard.writeText(data.orderCode);
                toast.success("Order code copied to clipboard!");
              }}
            >
              {data.orderCode}
            </div>
          </p>

          <div className="mt-4">
            <QRCodeCanvas
              value={`http://localhost:3000/orders?search=${data.orderCode}`}
            />
          </div>

          <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
            <Link
              rel="noopener noreferrer"
              to="/"
              className="rounded bg-yellow-400 px-8 py-3 font-semibold text-white hover:bg-yellow-500"
            >
              Back to Home
            </Link>
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
      ) : (
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-5">
          <h1 className="text-gray-00 p-8 text-center text-5xl">
            You haven't placed an order yet!
          </h1>
          <p className="mt-4 mb-8">
            Try to buy something on our website, will you?
          </p>
          <Link
            to="/products"
            className="rounded bg-yellow-400 px-8 py-3 font-semibold text-white hover:bg-yellow-500"
          >
            Take me there
          </Link>
        </div>
      )}
    </>
  );
}
