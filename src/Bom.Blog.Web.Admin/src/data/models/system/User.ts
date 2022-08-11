import BaseEntity from "../BaseEntity";
export type UserBaseDto = BaseEntity<string>;

export interface AddUpdateUserBaseDto {
  userName: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  lockoutEnabled: boolean;
  roleNames: string[];
  password: string;
  concurrencyStamp: string;
}
export type AddUserDto = Omit<AddUpdateUserBaseDto, "concurrencyStamp">;

export type UpdateUserDto = Omit<AddUpdateUserBaseDto, "password">;
export interface UserDto extends UpdateUserDto, UserBaseDto {
  creationTime: string;
  creatorId: string;
  lastModificationTime: string;
  lastModifierId: string;
  isDeleted: boolean;
  deleterId: string;
  deletionTime: string;
  tenantId: string;
  emailConfirmed: boolean;
  phoneNumberConfirmed: boolean;
  lockoutEnd: string;
}
