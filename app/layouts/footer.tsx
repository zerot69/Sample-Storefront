import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-300 p-4 shadow md:px-20 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a
          href="https://finviet.com.vn/"
          className="mb-4 flex items-center sm:mb-0"
        >
          <img src="/eco-logo.png" className="mr-3 h-8" alt="Eco" />
          <span className="self-center whitespace-nowrap text-2xl font-semibold text-gray-500">
            Eco Store
          </span>
        </a>
        <ul className="text-md mb-6 flex flex-wrap items-center text-gray-500 sm:mb-0">
          <li>
            <Link to="/about" className="mr-4 hover:underline md:mr-6 ">
              About
            </Link>
          </li>
          <li>
            <Link to="/about" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/about" className="mr-4 hover:underline md:mr-6 ">
              Licensing
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <span className="text-md block text-gray-500 sm:text-center">
        &copy; Copyright {new Date().getFullYear()} Finviet™. All Rights
        Reserved
      </span>
    </footer>
  );
}
