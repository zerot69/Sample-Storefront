import { IsBoolean, IsDate, IsEmail, IsEnum, IsString } from "class-validator";

import { EGender } from "~/interfaces/db.interface";

export class SaveProfileInput {
  @IsString()
  id: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsDate()
  dob: Date;
  @IsEnum(EGender)
  gender: EGender;
  @IsBoolean()
  active: boolean;
}
