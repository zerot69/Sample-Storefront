import type { DataFunctionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { SignInInput } from "./dtos/signin.dto";
import _ from "lodash";

import { middleWare } from "~/lib/common";
import { ERROR_CODE, SUCCESS_CODE } from "~/shared/message-code";
import { User } from "~/models/user.models";
import { SignUpInput } from "./dtos/signup.dto";

export const SignInServices = {
  action: async ({ request }: DataFunctionArgs) => {
    let message, status, data;
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
      } else {
        message = ERROR_CODE.NOT_FOUND.USER_NOT_FOUND;
        status = ERROR_CODE.NOT_FOUND.CODE;
      }
    } catch (error) {
      message = ERROR_CODE.NOT_FOUND.USER_NOT_FOUND;
      status = ERROR_CODE.NOT_FOUND.CODE;
      console.error(error);
    }

    return json(
      {
        data,
        message,
      },
      { status }
    );
  },
};

export const SignUpServices = {
  action: async ({ request }: DataFunctionArgs) => {
    let message, status, data;
    try {
      const input = await middleWare({ dto: SignUpInput, request });
      if (!input.success)
        return json(input, { status: Number(ERROR_CODE.BAD_REQUEST) });
      const foundEmail = await db.users.findFirst({
        where: { email: input.data.email },
      });

      if (foundEmail) {
        message = ERROR_CODE.UNPROCESSABLE_ENTITY.USER_NOT_FOUND;
        status = ERROR_CODE.UNPROCESSABLE_ENTITY.CODE;
      } else {
        const dataUser = new User(input.data);
        data = await db.users.create({ data: dataUser });
        status = SUCCESS_CODE.CODE;
      }
    } catch (error) {
      message = ERROR_CODE.UNPROCESSABLE_ENTITY.SIGN_IN_FAIL;
      status = ERROR_CODE.UNPROCESSABLE_ENTITY.CODE;
      console.error(error);
    }

    return json(
      {
        data,
        message,
      },
      { status }
    );
  },
};
