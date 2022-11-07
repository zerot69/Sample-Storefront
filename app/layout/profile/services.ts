import type { DataFunctionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { ERROR_CODE, SUCCESS_CODE } from "~/shared/message-code";

export const ProfileServices = {
  loader: async ({ params }: DataFunctionArgs) => {
    let message, status, data;

    if (!params)
      return json(
        { message: ERROR_CODE.BAD_REQUEST.PARAM_MISSING },
        { status: ERROR_CODE.BAD_REQUEST.CODE }
      );

    const foundUser = await db.users.findFirst({
      where: { id: params.profile },
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
  // action: async ({ request }: DataFunctionArgs) => {},
};
