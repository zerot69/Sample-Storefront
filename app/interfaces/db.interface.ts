export enum EGender {
  male = "male",
  female = "female",
}
export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  dob: string;
  gender: EGender;
  active: boolean;
  created_at: Date;
}
