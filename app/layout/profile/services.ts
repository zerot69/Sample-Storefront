import type { DataFunctionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { ProfileInput } from "./dtos/save_profile.dto";

import { middleWare } from "~/lib/common";
import { User } from "~/models/user.models";
import SupabaseServices from "~/modules/supabase/supabase.services";
import { ERROR_CODE, SUCCESS_CODE } from "~/shared/message-code";

export const ProfileServices = {
  loader: async ({ params }: DataFunctionArgs) => {
    console.log({ params });
  },
  action: async ({ request }: DataFunctionArgs) => {
    try {
      const input = await middleWare({ dto: ProfileInput, request });
      console.log({ input });
      if (!input.success)
        json(input, { status: Number(ERROR_CODE.BAD_REQUEST) });
      const dataUser = new User(input.data);
      const { supabaseClient } = new SupabaseServices(request);
      const { data, error } = await supabaseClient.auth.signUp({
        email: dataUser.email,
        password: dataUser.password,
      });

      if (error) json({ data, error }, { status: ERROR_CODE.BAD_REQUEST.CODE });
      console.log("name", User.name);
      await supabaseClient.from(User.name).insert(dataUser);
      return json(
        {
          data,
        },
        { status: SUCCESS_CODE.CODE }
      );
    } catch (error) {
      return json(
        {
          error,
        },
        { status: SUCCESS_CODE.CODE }
      );
    }
  },
};
