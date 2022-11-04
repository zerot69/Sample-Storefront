import { Link } from "@remix-run/react";

export default function AboutRoute() {
  return (
    <div className="mt-8 w-4/5 pb-40">
      <h1 className="text-gray-00 p-8 pt-20 text-center text-5xl">Checkout</h1>
      <div className="py-8">
        <Link to="/products" className="text-yellow-500">
          {"< "} Continue shopping
        </Link>
      </div>
      <div className="grid w-full max-w-screen-2xl items-center gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
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
          <div className="mt-4 rounded-xl bg-white py-6 shadow-lg">
            <div className="space-y-4 px-8">
              <div className="flex items-end">
                <p className="font-semibold">Item 1</p>
                <span className="ml-auto text-sm font-semibold">$20</span>
              </div>
              <span className="mt-2 text-xs text-gray-500">
                Lorem ipsum dolor sit amet consectetur.
              </span>
              <div className="flex items-end">
                <p className="font-semibold">Item 2</p>
                <span className="ml-auto text-sm font-semibold">$40</span>
              </div>
              <span className="mt-2 text-xs text-gray-500">
                Lorem ipsum dolor sit amet consectetur.
              </span>
            </div>
            <div className="mt-4 space-y-1 px-8">
              <div className="flex items-end justify-between">
                <span className="text-sm font-semibold">Tax</span>
                <span className="mb-px text-sm text-gray-500">$6</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-sm font-semibold">Shipping</span>
                <span className="mb-px text-sm text-gray-500">$2</span>
              </div>
            </div>
            <div className="mt-4 border-t px-8 pt-4">
              <div className="flex items-end justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">$68</span>
              </div>
              <span className="mt-2 text-xs text-gray-500">
                Save more with{" "}
                <Link to="#" className="text-yellow-500">
                  Eco Premium
                </Link>
              </span>
            </div>
            <div className="mt-8 flex items-center px-8">
              <input id="termsConditions" type="checkbox" />
              <label
                className="ml-2 text-xs text-gray-500"
                htmlFor="termsConditions"
              >
                I agree to the terms and conditions.
              </label>
            </div>
            <div className="flex flex-col px-8 pt-4">
              <button className="flex h-10 w-full items-center justify-center rounded bg-yellow-500 text-sm font-medium text-white hover:bg-yellow-600">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
