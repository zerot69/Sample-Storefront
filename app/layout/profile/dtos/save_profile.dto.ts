import { IsEmail, IsString } from "class-validator";

export class ProfileInput {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
