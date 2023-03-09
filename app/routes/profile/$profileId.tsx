import { SignInLayout } from "~/layout/auth/views/sign-in";
import { ProfileServices } from "~/layout/profile/services";

export const loader = ProfileServices.loader;
export default function LoginRouter() {
  return <SignInLayout />;
}
