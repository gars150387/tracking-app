// import { cssBundleHref } from "@remix-run/css-bundle";
import stylesheet from "~/tailwind.css";
import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

export const links: LinksFunction = () => [
  // ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: "https://cdn.simplecss.org/simple.min.css" },
];

function Layout() {
  const options = [
    { label: "Home", route: "/home" },
    { label: "Dashboard", route: "/dashboard" },
    { label: "Employees", route: "/employees" },
    { label: "Inventory", route: "/inventory" },
    { label: "Profile", route: "/profile" },
    { label: "Sign out", route: "/" },
  ];
  return (
    <div className="flex justify-start items-center self-start gap-6">
      <div className="w-20vw h-3/4 flex flex-col justify-between items-center self-stretch px-1 py-2">
        {options.map((option) => (
          <Link key={option.route} to={option.route}>
            <div key={option.route}>{option.label}</div>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html lang="en-US" translate="no">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div>
          <strong>Something went wrong. </strong>
          <span style={{ color: "red" }}>Try again later</span>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang="en" translate="no">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-80vw h-dvh flex justify-start items-start self-stretch p-4">
        <Layout />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
