import type { IUser } from "~/interfaces/db.interface";

export class User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  dob: string;
  active: boolean;
  created_at: Date;
  constructor(obj: IUser) {
    Object.assign(this, obj);
  }
}
