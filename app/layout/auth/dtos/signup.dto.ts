import { IsEmail, IsString } from "class-validator";

export class SignUpInput {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
