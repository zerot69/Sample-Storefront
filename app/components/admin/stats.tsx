import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function Stats({
  usersThisWeek,
  newUsersRatio,
  ordersToday,
  newOrdersRatio,
}: {
  usersThisWeek: number;
  newUsersRatio: number;
  ordersToday: number;
  newOrdersRatio: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-8 xl:grid-cols-4">
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
        <p className="text-3xl font-bold">{usersThisWeek}</p>
        {newUsersRatio >= 0 ? (
          <p className="flex flex-shrink-0 items-center pt-4 text-base leading-4 text-green-500">
            <FaArrowUp className="mr-1" />
            {Math.round((Math.abs(newUsersRatio) + Number.EPSILON) * 100) / 100}
            %<span className="ml-2 text-gray-400">Since last week</span>
          </p>
        ) : (
          <p className="flex flex-shrink-0 items-center pt-4 text-base leading-4 text-red-500">
            <FaArrowDown className="mr-1" />
            {Math.round((Math.abs(newUsersRatio) + Number.EPSILON) * 100) / 100}
            %<span className="ml-2 text-gray-400">Since last week</span>
          </p>
        )}
      </div>
      <div className="mt-8 rounded-xl border bg-white p-4 text-justify shadow-md sm:p-8">
        <h1 className="text-lg uppercase text-gray-400">Sales</h1>
        <p className="text-3xl font-bold">{ordersToday}</p>
        {newOrdersRatio >= 0 ? (
          <p className="flex flex-shrink-0 items-center pt-4 text-base leading-4 text-green-500">
            <FaArrowUp className="mr-1" />
            {Math.round((Math.abs(newOrdersRatio) + Number.EPSILON) * 100) /
              100}
            %<span className="ml-2 text-gray-400">Since yesterday</span>
          </p>
        ) : (
          <p className="flex flex-shrink-0 items-center pt-4 text-base leading-4 text-red-500">
            <FaArrowDown className="mr-1" />
            {Math.round((Math.abs(newOrdersRatio) + Number.EPSILON) * 100) /
              100}
            %<span className="ml-2 text-gray-400">Since yesterday</span>
          </p>
        )}
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
