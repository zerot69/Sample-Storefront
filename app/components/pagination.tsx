import { Link } from "@remix-run/react";

export default function Pagination() {
  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="hidden px-20 sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-800">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">100</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px bg-gray-100"
            aria-label="Pagination"
          >
            <Link
              to="#"
              className="relative inline-flex items-center rounded-l-md border border-gray-300 px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-20"
            >
              <span className="h-5 w-5 text-center">{"<"}</span>
            </Link>
            {/* Current */}
            <Link
              to="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center border border-yellow-500 bg-yellow-200 px-4 py-2 text-sm font-medium text-yellow-600 focus:z-20"
            >
              1
            </Link>
            <Link
              to="#"
              className="relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-20"
            >
              2
            </Link>
            <Link
              to="#"
              className="relative hidden items-center border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-20 md:inline-flex"
            >
              3
            </Link>
            <span className="relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
              ...
            </span>
            <Link
              to="#"
              className="relative hidden items-center border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-20 md:inline-flex"
            >
              8
            </Link>
            <Link
              to="#"
              className="relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-20"
            >
              9
            </Link>
            <Link
              to="#"
              className="relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-20"
            >
              10
            </Link>
            <Link
              to="#"
              className="relative inline-flex items-center rounded-r-md border border-gray-300 px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-20"
            >
              <span className="h-5 w-5 text-center">{">"}</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
