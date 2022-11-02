import { Link, useLoaderData } from "@remix-run/react";
import { LoaderArgs } from "@remix-run/server-runtime";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { json, redirect } from "@remix-run/node";

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();

  const supabaseClient = createServerClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || "",
    { request, response }
  );
  const { data, error } = await supabaseClient.from("products").select("*");

  if (error) return json({ error }, { status: 403 });
  return json({ data }, { status: 200 });
};
export default function ProductIndexPage() {
  const products = useLoaderData();
  console.log(products);
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-3 gap-4">
        {products?.data?.map((data: any, idx: number) => {
          return (
            <div key={idx}>
              <Link
                to={data.id}
                className="flex flex-col items-center rounded-lg border bg-white shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:max-w-xl md:flex-row"
              />
              <img
                className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src="/docs/images/blog/image-4.jpg"
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {data.name} {data.prices} ({data.currency})
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {data.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
