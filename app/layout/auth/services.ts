import type { DataFunctionArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";

import { SignInInput } from "./dtos/signin.dto";
import { SignUpInput } from "./dtos/signup.dto";

import { middleWare } from "~/lib/common";
import { User } from "~/models/user.models";
import { ERROR_CODE, SUCCESS_CODE } from "~/shared/message-code";

export const SignInServices = {
  action: async ({ request }: DataFunctionArgs) => {
    let message, status, data;

    let user;
    try {
      const input = await middleWare({ dto: SignInInput, request });
      if (!input.success)
        return json(input, { status: Number(ERROR_CODE.BAD_REQUEST) });
      const foundUser = await db.users.findFirst({
        where: { email: input.data.email, password: input.data.password },
      });
      if (foundUser) {
        status = SUCCESS_CODE.CODE;
        data = foundUser;
        user = input.data.email;
      } else {
        message = ERROR_CODE.NOT_FOUND.USER_NOT_FOUND;
        status = ERROR_CODE.NOT_FOUND.CODE;
      }
    } catch (error) {
      console.error(error);
      message = ERROR_CODE.NOT_FOUND.USER_NOT_FOUND;
      status = ERROR_CODE.NOT_FOUND.CODE;
    }
    if (user) {
      return redirect("/");
    }
    return json(
      {
        message,
        data,
      },
      { status }
    );
  },
};

export const SignUpServices = {
  action: async ({ request }: DataFunctionArgs) => {
    let message, status, data;

    let user;
    try {
      const input = await middleWare({ dto: SignUpInput, request });
      if (!input.success)
        return json(input, { status: Number(ERROR_CODE.BAD_REQUEST) });
      const foundEmail = await db.users.findFirst({
        where: { email: input.data.email },
      });

      if (foundEmail) {
        message = ERROR_CODE.NOT_FOUND.USER_NOT_FOUND;
        status = ERROR_CODE.NOT_FOUND.CODE;
      } else {
        const dataUser = new User(input.data);
        data = await db.users.create({ data: dataUser });
        status = SUCCESS_CODE.CODE;
        user = input.data.email;
      }
    } catch (error) {
      message = ERROR_CODE.UNPROCESSABLE_ENTITY.SIGN_IN_FAIL;
      status = ERROR_CODE.UNPROCESSABLE_ENTITY.CODE;
      console.error(error);
    }
    if (user) {
      return redirect("/");
    } else {
      return json(
        {
          message,
          data,
        },
        { status }
      );
    }
  },
};
