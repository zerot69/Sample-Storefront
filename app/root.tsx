import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";

import Layout from "./layouts";

import tailwindStylesheetUrl from "./styles/tailwind.css";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Eco Store",
  viewport: "width=device-width,initial-scale=1",
});

export const loader = () => {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;
  return json({
    env: {
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
    },
  });
};

export default function App() {
  const { env } = useLoaderData();

  return (
    <Document>
      <Layout>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        />
        <LiveReload />
      </Layout>
    </Document>
  );
}

function Document({ children }: { children: any }) {
  return (
    <html
      lang="en"
      className="antialiased; bg-gray-100 font-sans text-gray-800"
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body className="overflow-x-hidden; flex min-h-screen flex-col">
        {children}
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: any }) {
  console.error({ error });
  return (
    <Document>
      <Layout>
        <div className="text-red-500">
          <h1>Gratz! You found an error:</h1>
          <p>{error.message}</p>
        </div>
      </Layout>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <html>
      <head>
        <title>Oops! Something went wrong!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <section className="flex h-full min-h-screen items-center p-16 dark:bg-yellow-900 dark:text-yellow-100">
          <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
            <div className="max-w-md text-center">
              <h2 className="mb-8 text-9xl font-extrabold dark:text-yellow-500">
                <span className="sr-only">Error</span>
                {caught.status}
              </h2>
              <p className="yellow text-2xl font-semibold dark:text-yellow-600 md:text-3xl">
                Sorry, we couldn't find this page.
              </p>
              <p className="mt-4 mb-8 dark:text-yellow-600">
                But dont worry, you can find plenty of other things on our
                homepage.
              </p>
              <Link
                rel="noopener noreferrer"
                to="/"
                className="rounded px-8 py-3 font-semibold dark:bg-yellow-500 dark:text-gray-900"
              >
                Back to homepage
              </Link>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
