import { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";

import { prisma } from "~/db.server";

export async function action({ request }: { request: any }) {
  const formData = await request.formData();
  let productName = formData
    .get("productName")
    .replace(/ +(?= )/g, "")
    .split(" ")
    .filter((i: any) => i)
    .map((word: string) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");

  let productAttributeData = formData
    .get("productAttribute")
    .replace(/ +(?= )/g, "")
    .split("; ");
  const productAttribute = productAttributeData[0]
    ? productAttributeData.map((attribute: string) => {
        const attributeArray = attribute.split(": ");
        return {
          key: attributeArray[0],
          value: attributeArray[1] || "No value",
          active: true,
        };
      })
    : [];

  let productPromotionsData = formData
    .get("productPromotions")
    .replace(/ +(?= )/g, "")
    .split("; ");
  const productPromotions = productPromotionsData[0]
    ? productPromotionsData.map((promotion: string) => {
        const promotionArray = promotion.split(": ");
        return {
          key: promotionArray[1] || "",
          value: promotionArray[0],
          active: true,
        };
      })
    : [];

  let productDiscountsData = formData
    .get("productDiscounts")
    .replace(/ +(?= )/g, "")
    .split("; ");
  const productDiscounts = productDiscountsData[0]
    ? productDiscountsData.map((discount: string) => {
        const discountArray = discount.split(": ");
        return {
          key: discountArray[0],
          value: discountArray[1]
            ? discountArray[1].charAt(0).toUpperCase() +
              discountArray[1].slice(1)
            : null,
          active: true,
        };
      })
    : [];

  await prisma.products_crawl.create({
    data: {
      name: productName,
      description: formData.get("productDescription"),
      images: formData
        .get("productImage")
        .replace(/ +(?= )/g, "")
        .split("; "),
      price: parseFloat(formData.get("productPrice")),
      base:
        formData.get("productPrice") < formData.get("productBase")
          ? parseFloat(formData.get("productBase"))
          : 0,
      quantity: parseInt(formData.get("productQuantity")),
      created_at: new Date(),
      updated_at: new Date(),
      active: true,
      promotions: productPromotions,
      discounts: productDiscounts,
      attribute: productAttribute,
      redirect:
        formData.get("productRedirect") || "https://www.thegioididong.com/",
    },
  });
  return {
    productName: productName,
  };
}

export default function ProductCreatePage() {
  let transition = useTransition();
  let isCreating =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "create";

  let formRef = useRef<HTMLFormElement>(null);
  let taskInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!isCreating) {
      formRef.current?.reset();
      taskInputRef.current?.focus();
    } else {
      toast.success(`Product created!`);
    }
  }, [isCreating]);

  return (
    <div className="mt-8 w-2/3 pb-40">
      <h1 className="text-gray-00 p-8 pt-20 text-center text-5xl">
        Create new product
      </h1>
      <div className="py-8">
        <Link
          to="/admin/products"
          className="text-yellow-500 hover:text-yellow-600"
        >
          {"< "} Back to Products
        </Link>
      </div>
      <Form
        method="post"
        action="/admin/products/create"
        ref={formRef}
        className="w-full max-w-screen-2xl items-baseline gap-12"
      >
        <div className="lg:col-span-2">
          <h2 className="text-lg font-medium">Product Information</h2>
          <div className="mt-4 rounded-xl bg-white shadow-lg">
            <div className="py-4">
              <div className="my-4 grid grid-cols-3 gap-4 px-8 pb-8">
                <div className="col-span-3">
                  <label className="text-md font-semibold">
                    Name <span className="text-xs text-yellow-400">*</span>
                  </label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="text"
                    id="productName"
                    name="productName"
                    placeholder="Product Name"
                    ref={taskInputRef}
                    required
                  />
                </div>
                <div className="col-span-3">
                  <label className="text-md font-semibold">
                    Description{" "}
                    <span className="text-xs text-yellow-400">*</span>
                  </label>
                  <textarea
                    className="text-md mt-1 flex h-24 w-full items-center rounded border p-4"
                    id="productDescription"
                    name="productDescription"
                    placeholder="Product Description"
                    required
                  />
                </div>
                <div>
                  <label className="text-md font-semibold">
                    Price <span className="text-xs text-yellow-400">*</span>
                  </label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4 [appearance:textfield]"
                    type="number"
                    id="productPrice"
                    name="productPrice"
                    placeholder="Product Price"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="text-md font-semibold">
                    Price before discount
                  </label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4 [appearance:textfield]"
                    type="number"
                    id="productBase"
                    name="productBase"
                    placeholder="Set 0 if no discount"
                    min="0"
                  />
                </div>
                <div>
                  <label className="text-md font-semibold">
                    Quantity <span className="text-xs text-yellow-400">*</span>
                  </label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4 [appearance:textfield]"
                    type="number"
                    id="productQuantity"
                    name="productQuantity"
                    placeholder="Set 0 if no quantity"
                    min="0"
                    required
                  />
                </div>
                <div className="col-span-3">
                  <label className="text-md font-semibold">
                    Image <span className="text-xs text-yellow-400">*</span>
                  </label>
                  <textarea
                    className="text-md mt-1 flex h-24 w-full items-center rounded border p-4"
                    id="productImage"
                    name="productImage"
                    placeholder="Product Image URL link, separate by semicolon and a space (; ) if having multiple images.
Example: https://url.com/image1.jpg; https://url.com/image2.jpg"
                    required
                  />
                </div>
                <div className="col-span-3">
                  <label className="text-md font-semibold">
                    Product Attribute
                  </label>
                  <textarea
                    className="text-md mt-1 flex h-24 w-full items-center rounded border p-4"
                    id="productAttribute"
                    name="productAttribute"
                    placeholder={`Product Attribute, format as "title: content", separate by semicolon and a space (; ) if having multiple attributes.
Example: Color: Red; Size: 32GB`}
                  />
                </div>
                <div className="col-span-3">
                  <label className="text-md font-semibold">
                    Promotions info
                  </label>
                  <textarea
                    className="text-md mt-1 flex h-24 w-full items-center rounded border p-4"
                    id="productPromotions"
                    name="productPromotions"
                    placeholder={`Promotions info, format as "title: URL", separate by semicolon and a space (; ) if having multiple promotions.
Example: Free shipping; Free gift: https://url.com/freegift`}
                  />
                </div>
                <div className="col-span-3">
                  <label className="text-md font-semibold">
                    Discounts info
                  </label>
                  <textarea
                    className="text-md mt-1 flex h-24 w-full items-center rounded border p-4"
                    id="productDiscounts"
                    name="productDiscounts"
                    placeholder={`Discounts info, format as "title: content", separate by semicolon and a space (; ) if having multiple discounts.
Example: 3 months: 10% off; 6 months: 20% off`}
                  />
                </div>
                <div className="col-span-3">
                  <label className="text-md font-semibold">Product link</label>
                  <input
                    className="text-md mt-1 flex h-10 w-full items-center rounded border px-4"
                    type="url"
                    id="productRedirect"
                    name="productRedirect"
                    placeholder="TheGioiDiDong URL link"
                  />
                </div>
                <div className="col-span-3 pt-8">
                  <button
                    type="submit"
                    name="_action"
                    value="create"
                    disabled={isCreating}
                    className={`flex h-10 w-full items-center justify-center rounded text-sm font-medium text-white ${
                      isCreating
                        ? "cursor-not-allowed bg-yellow-500 hover:bg-yellow-500"
                        : "bg-yellow-400 hover:bg-yellow-500"
                    }`}
                  >
                    {isCreating ? "Creating your product" : "Create Product"}
                  </button>
                </div>
              </div>
            </div>
          </div>
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
          success: {
            style: {
              background: "rgba(40, 167, 69)",
            },
          },
        }}
      />
    </div>
  );
}
