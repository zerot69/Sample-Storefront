/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Form, Link, useActionData } from "@remix-run/react";

export const SignInLayout = () => {
  const actionData = useActionData();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(JSON.stringify(actionData));
  }, [actionData]);

  useEffect(() => {
    if (actionData && actionData.message)
      toast.error("Error: " + actionData.message + ". Please try again!");
    if (actionData && actionData.user)
      toast.success("Email: " + actionData.user + ".");
  }, [actionData]);

  return (
    <div className="flex min-h-screen w-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          <div>
            <h1 className="pb-14 text-center align-middle text-5xl font-bold text-gray-800">
              Log In
            </h1>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData ? true : undefined}
                aria-describedby="email-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={actionData ? true : undefined}
                aria-describedby="password-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded bg-yellow-400  py-2 px-4 text-white hover:bg-yellow-500 focus:bg-yellow-300"
          >
            Log in
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link className="text-yellow-400 underline" to="/sign-up">
                Sign up
              </Link>
            </div>
          </div>
        </Form>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(251, 191, 36)",
            color: "#fff",
          },
          iconTheme: {
            primary: "white",
            secondary: "black",
          },
          error: {
            style: {
              background: "rgba(239, 68, 68)",
            },
          },
        }}
      />
    </div>
  );
};
