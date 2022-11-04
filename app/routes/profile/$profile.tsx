import { ProfileServices } from "~/layout/profile/services";
import { SignInLayout } from "~/layout/auth/views/sign-in";

export const loader = ProfileServices.loader;
export default function LoginRouter() {
  return <SignInLayout />;
}
