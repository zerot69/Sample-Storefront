import { Link } from "@remix-run/react/dist/components";

export default function Links() {
  return (
    <div className="grid grid-cols-4 gap-8 xl:grid-cols-4">
      <Link
        to="/admin/products"
        className="transition-ease-in-out col-span-2 mt-8 rounded-xl border bg-white p-4 text-justify shadow-md duration-300 hover:bg-yellow-300 hover:text-white sm:p-8"
      >
        <p className="text-3xl font-bold">Products</p>
        <p className="flex flex-shrink-0 items-center pt-4 text-base leading-4">
          Take a look at all the products
        </p>
      </Link>
      <a
        href="https://analytics.google.com/analytics/web/provision/#/provision"
        target="_blank"
        rel="noreferrer noopener"
        className="transition-ease-in-out col-span-2 mt-8 rounded-xl border bg-white p-4 text-justify shadow-md duration-300 hover:bg-yellow-300 hover:text-white sm:p-8"
      >
        <p className="text-3xl font-bold">Performance</p>
        <p className="flex flex-shrink-0 items-center pt-4 text-base leading-4">
          See how your site is performing
        </p>
      </a>
    </div>
  );
}
