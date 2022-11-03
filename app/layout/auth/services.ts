import {
  LoaderArgs,
  json,
  ActionArgs,
  DataFunctionArgs,
} from "@remix-run/server-runtime";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { createUserSession } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

export const SignInServices = {
  loader: async ({ request }: LoaderArgs) => {
    return json({});
  },
  action: async ({ request, params }: DataFunctionArgs) => {
    console.log({ request });
    const formData = await request.formData();
    const { email, password, redirectTo, remember } = Object.fromEntries<any>(
      formData.entries()
    );

    console.log("server", { email, password, redirectTo, remember });

    if (!validateEmail(email)) {
      return json(
        { errors: { email: "Email is invalid", password: null } },
        { status: 400 }
      );
    }

    if (typeof password !== "string" || password.length === 0) {
      return json(
        { errors: { email: null, password: "Password is required" } },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return json(
        { errors: { email: null, password: "Password is too short" } },
        { status: 400 }
      );
    }

    const response = new Response();
    const supabaseClient = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      { request, response }
    );
    const { data, error }: { data: any; error: any } =
      await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
    console.log({ data, error });

    if (!data) {
      return json(
        { errors: { email: "Invalid email or password", password: null } },
        { status: 400 }
      );
    }

    return createUserSession({
      request,
      userId: data?.session?.access_token.toString(),
      remember: remember === "on" ? true : false,
      redirectTo: "joins",
    });
  },

  meta: () => {
    return {
      title: "Login",
    };
  },
};
