export interface IBaseUser {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface IFullUser extends IBaseUser {
  password: string;
}
