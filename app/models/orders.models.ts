import _ from "lodash";

import type { IUser } from "~/interfaces/db.interface";

export class Orders {
  id: string;
  created_at: Date;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  constructor(obj: IUser) {
    const data = _.pick(obj, [
      "id",
      "created_at",
      "first_name",
      "last_name",
      "email",
      "password",
      "phone",
    ]);
    Object.assign(this, data);
  }
}
