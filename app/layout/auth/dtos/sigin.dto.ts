import { IsEmail, IsString } from "class-validator";

export class SignInInput {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
