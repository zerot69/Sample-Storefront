/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Form, Link, useActionData } from "@remix-run/react";

export const SignUpLayout = () => {
  const actionData = useActionData();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  console.log(actionData);

  useEffect(() => {
    if (actionData && actionData.message)
      toast.error("Error: " + actionData.message + ". Please try again!");
  }, [actionData]);

  return (
    <div className="flex min-h-full w-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          <h1 className="pb-14 text-center align-middle text-5xl font-bold text-gray-800">
            Sign Up
          </h1>
          <div>
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
                type="text"
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
                autoComplete="new-password"
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
            Create Account
          </button>
          <div className="flex items-center justify-center">
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link className="text-yellow-400 underline" to="/auth/sign-in">
                Log in
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
