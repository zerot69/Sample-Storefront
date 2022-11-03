import { SignInServices } from "~/layout/auth/services";
import { SignInLayout } from "~/layout/auth/views/sign-in";

export const action = SignInServices.action;
export default function LoginRouter() {
  return <SignInLayout />;
}
