import type { DataFunctionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { SignInInput } from "./dtos/sigin.dto";

import { middleWare } from "~/lib/common";
import SupabaseServices from "~/modules/supabase/supabase.services";
import { ERROR_CODE, SUCCESS_CODE } from "~/shared/message-code";

export const SignInServices = {
  action: async ({ request, params }: DataFunctionArgs) => {
    const input = await middleWare({ dto: SignInInput, request });
    if (!input.success) json(input, { status: Number(ERROR_CODE.BAD_REQUEST) });
    const { supabaseClient } = new SupabaseServices(request);
    const { email, password, remember } = input.data;
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) json({ data, error }, { status: ERROR_CODE.BAD_REQUEST.CODE });
    return json(
      {
        data: {
          email,
          password,
          messages: SUCCESS_CODE.LOGIN_SUCCESS,
          remember: remember === "on" ? true : false,
        },
      },
      { status: SUCCESS_CODE.CODE }
    );
  },

  meta: () => {
    return {
      title: "Login",
    };
  },
};
