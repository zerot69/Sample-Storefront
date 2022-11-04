import type { DataFunctionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { SignInInput } from "./dtos/sigin.dto";

import { middleWare } from "~/lib/common";
import { User } from "~/models/user.models";
import SupabaseServices from "~/modules/supabase/supabase.services";
import { ERROR_CODE, SUCCESS_CODE } from "~/shared/message-code";

export const SignInServices = {
  action: async ({ request }: DataFunctionArgs) => {
    const input = await middleWare({ dto: SignInInput, request });
    console.log({ input });
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
};

export const SignUpServices = {
  action: async ({ request }: DataFunctionArgs) => {
    const input = await middleWare({ dto: SignInInput, request });
    console.log({ input });
    if (!input.success) json(input, { status: Number(ERROR_CODE.BAD_REQUEST) });
    const dataUser = new User(input.data);
    const { supabaseClient } = new SupabaseServices(request);
    console.log({ dataUser });
    const { data, error } = await supabaseClient.auth.signUp({
      email: dataUser.email,
      password: dataUser.password,
      options: {
        data: {
          first_name: dataUser.first_name,
          last_name: dataUser.last_name,
          email: dataUser.email,
          dob: dataUser.dob || new Date().toISOString(),
          active: true,
        },
      },
    });
    console.log({ data, error });
    if (error) json({ data, error }, { status: ERROR_CODE.BAD_REQUEST.CODE });
    return json(
      {
        data,
      },
      { status: SUCCESS_CODE.CODE }
    );
  },
};
