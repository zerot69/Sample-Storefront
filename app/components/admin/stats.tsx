import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function Stats() {
  return (
    <div className="grid grid-cols-4 gap-8">
      <div className="mt-8 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8">
        <h1 className="text-lg uppercase text-gray-400">Traffic</h1>
        <p className="text-3xl font-bold">123,456</p>
        <p className="flex flex-shrink-0 items-center pt-4 text-base leading-4 text-green-500">
          <FaArrowUp className="mr-1" />
          3.48% <span className="ml-2 text-gray-400">Since last month</span>
        </p>
      </div>
      <div className="mt-8 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8">
        <h1 className="text-lg uppercase text-gray-400">New users</h1>
        <p className="text-3xl font-bold">3,456</p>
        <p className="flex flex-shrink-0 items-center pt-4 text-base leading-4 text-red-500">
          <FaArrowDown className="mr-1" />
          6.82% <span className="ml-2 text-gray-400">Since last week</span>
        </p>
      </div>
      <div className="mt-8 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8">
        <h1 className="text-lg uppercase text-gray-400">Sales</h1>
        <p className="text-3xl font-bold">924,123,456</p>
        <p className="flex flex-shrink-0 items-center pt-4 text-base leading-4 text-green-500">
          <FaArrowUp className="mr-1" />
          1.48% <span className="ml-2 text-gray-400">Since yesterday</span>
        </p>
      </div>
      <div className="mt-8 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8">
        <h1 className="text-lg uppercase text-gray-400">Performance</h1>
        <p className="text-3xl font-bold">36%</p>
        <p className="flex flex-shrink-0 items-center pt-4 text-base leading-4 text-red-500">
          <FaArrowDown className="mr-1" />
          12% <span className="ml-2 text-gray-400">Since last month</span>
        </p>
      </div>
    </div>
  );
}
