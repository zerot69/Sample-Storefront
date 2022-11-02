import { Link } from "@remix-run/react";

// import { useOptionalUser } from "~/utils";

export default function Index() {
  // const user = useOptionalUser();
  return (
    <main className="relative min-h-screen rounded-3xl sm:flex sm:justify-center">
      <div>
        {/* Hero Banner */}
        <div className="w-full bg-yellow-200 px-12 py-32 text-center text-gray-200">
          <h1 className="text-5xl font-bold text-gray-800">
            Welcome to Eco Store
          </h1>
          <p className="mt-2 px-8 font-normal text-gray-700">
            The new arrivals have, well, newly arrived. Check out the latest
            options from our summer small-batch release while they're still in
            stock.
          </p>
          <Link
            to="/products"
            className="color mt-8 inline-block rounded-md bg-gray-100 px-6 py-2 text-sm font-semibold text-gray-700 transition duration-300 hover:scale-110 hover:bg-white hover:text-gray-900"
          >
            Take me to the shop
          </Link>
          <div className="space-x-5">
            <Link
              to="/login"
              className="color mt-8 inline-block rounded-md bg-yellow-400 px-6 py-2 text-xl font-semibold text-gray-700 transition duration-300 hover:scale-110 hover:bg-yellow-500 hover:text-gray-900"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="color mt-8 inline-block rounded-md bg-yellow-400 px-6 py-2 text-xl font-semibold text-gray-700 transition duration-300 hover:scale-110 hover:bg-yellow-500 hover:text-gray-900"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
