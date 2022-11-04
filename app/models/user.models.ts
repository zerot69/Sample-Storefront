import type { EGender, IUser } from "~/interfaces/db.interface";
import _ from "lodash";
import { SignUpInput } from "~/layout/auth/dtos/signup.dto";
import { SignInInput } from "~/layout/auth/dtos/signin.dto";
import { ITransitMessage } from "~/interfaces/common.interface";

export class User {
  table: "users";
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  dob: string;
  gender: EGender;
  active: boolean;
  created_at: Date;
  constructor(obj: IUser) {
    const data = _.pick(obj, [
      "id",
      "first_name",
      "last_name",
      "email",
      "password",
      "dob",
      "gender",
      "active",
      "created_at",
    ]);
    Object.assign(this, data);
  }

  signIn = async (data: SignUpInput): Promise<ITransitMessage> => {
    let response, messages;
    try {
      response = await db.users.create({ data });
    } catch (error) {
      console.error({ error });
      messages = "Internal error";
    }
    return { success: !!response, data: response, messages };
  };

  signUp = async (data: SignInInput): Promise<ITransitMessage> => {
    let response, messages;
    try {
      response = await db.users.findFirst({
        where: { email: data.email, password: data.password },
      });
    } catch (error) {
      console.error({ error });
      messages = "Internal error";
    }
    return { success: !!response, data: response, messages };
  };
}
