import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
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
