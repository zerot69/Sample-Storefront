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

export type Attribute = {
  key: string;
  value: string;
  active: Date;
};

export interface IBrands {
  id: string;
  created_at: Date;
  updated_at: Date;
  active: boolean;

  name: string;
  description?: string;
  business?: string;
  attribute?: Attribute[];
  productsId?: string;
}

export interface IProducts {
  id: string;
  created_at?: Date;
  updated_at?: Date;
  active: Date;

  name: string;
  description?: string;
  attribute?: Attribute[];
  categories?: Attribute[];
  images?: string[];
  price: number;
  base: number;
  quantity: number;
  sold?: Attribute[];
  views?: Attribute[];
  comments?: Attribute[];
  brands?: IBrands[];
}
