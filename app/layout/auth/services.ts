import type { DataFunctionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { SignInInput } from "./dtos/signin.dto";

import { middleWare } from "~/lib/common";
import { User } from "~/models/user.models";
import SupabaseServices from "~/modules/supabase/supabase.services";
import { ERROR_CODE, SUCCESS_CODE } from "~/shared/message-code";

export const SignInServices = {
  action: async ({ request }: DataFunctionArgs) => {
    const input = await middleWare({ dto: SignInInput, request });
    if (!input.success) json(input, { status: Number(ERROR_CODE.BAD_REQUEST) });
    let data, error;
    try {
      data = await db.users.findFirst({
        where: { email: input.data.email, password: input.data.password },
      });
    } catch (error) {
      console.error({ error });
      error = "Internal error";
    }
    if (error) json({ error }, { status: ERROR_CODE.BAD_REQUEST.CODE });
    return json(
      {
        data,
        messages: SUCCESS_CODE.LOGIN_SUCCESS,
      },
      { status: SUCCESS_CODE.CODE }
    );
  },
};

export const SignUpServices = {
  action: async ({ request }: DataFunctionArgs) => {
    try {
      const input = await middleWare({ dto: SignInInput, request });
      if (!input.success)
        json(input, { status: Number(ERROR_CODE.BAD_REQUEST) });
      const dataUser = new User(input.data);
      const resUser = await db.users.create({ data: dataUser });
      console.log({ resUser });
      return json(
        {
          data: resUser,
        },
        { status: SUCCESS_CODE.CODE }
      );
    } catch (error) {
      console.log({ error });
      return json(
        {
          error,
        },
        { status: SUCCESS_CODE.CODE }
      );
    }
  },
};
