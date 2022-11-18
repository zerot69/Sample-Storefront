import { SignUpServices } from "~/layout/auth/services";
import { SignUpLayout } from "~/layout/auth/views/sign-up";

export const action = SignUpServices.action;
export default function SignUpRoute() {
  return <SignUpLayout />;
}
