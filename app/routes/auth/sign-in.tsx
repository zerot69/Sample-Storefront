import { DataFunctionArgs } from "@remix-run/server-runtime";
import { SignInServices } from "~/layout/auth/services";
import { SignInLayout } from "~/layout/auth/views/sign-in";
export const action = async (req: DataFunctionArgs) => {
  return await SignInServices.action(req);
};
export default function LoginRouter() {
  return <SignInLayout />;
}
