import { Link, useActionData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";

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
  localStorage.setItem("cart", JSON.stringify(null));

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-5">
      <h1 className="text-gray-00 p-8 text-center text-5xl">
        Thank you for your order!
      </h1>
      <p className="text-center text-lg">Order code: {data.orderCode}</p>

      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <Link
          rel="noopener noreferrer"
          to="/"
          className="rounded bg-yellow-400 px-8 py-3 font-semibold text-white hover:bg-yellow-500"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
