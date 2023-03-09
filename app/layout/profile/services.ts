import type { DataFunctionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { SaveProfileInput } from "./dtos/save_profile.dto";

import { middleWare } from "~/lib/common";
import { User } from "~/models/user.models";
import { ERROR_CODE, SUCCESS_CODE } from "~/shared/message-code";

export const ProfileServices = {
  loader: async ({ params, request }: DataFunctionArgs) => {
    let message, status, data;
    console.log({ params, request });
    const url = new URL(request.url);
    const search = new URLSearchParams(url.search);
    console.log({ search: search.get("active") });
    if (!params)
      return json(
        { message: ERROR_CODE.BAD_REQUEST.PARAM_MISSING },
        { status: ERROR_CODE.BAD_REQUEST.CODE }
      );

    const foundUser = await db.users.findFirst({
      where: { id: params.profile },
      include: {
        brands: true,
      },
    });

    if (!foundUser) {
      message = ERROR_CODE.NOT_FOUND.USER_NOT_FOUND;
      status = ERROR_CODE.NOT_FOUND.CODE;
    } else {
      data = foundUser;
      status = SUCCESS_CODE.CODE;
    }
    return json(
      {
        data,
        message,
      },
      { status }
    );
  },
  action: async ({ request }: DataFunctionArgs) => {
    let message, status, data;
    try {
      const input = await middleWare({ dto: SaveProfileInput, request });
      if (!input.success)
        return json(input, { status: Number(ERROR_CODE.BAD_REQUEST) });
      const foundEmail = await db.users.findFirst({
        where: { email: input.data.email, NOT: { id: input.data.id } },
      });

      if (foundEmail) {
        message = ERROR_CODE.NOT_FOUND.USER_NOT_FOUND;
        status = ERROR_CODE.NOT_FOUND.CODE;
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
