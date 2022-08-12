import BaseEntity from "../BaseEntity";
export type RoleBaseDto = BaseEntity<string>;

export interface RoleDto extends RoleBaseDto {
  extraProperties: object;
  name: string;
  isDefault: boolean;
  isStatic: boolean;
  isPublic: boolean;
  concurrencyStamp: string;
}
export type AddRoleDto = Omit<UpdateRoleDto, "concurrencyStamp">;
export type UpdateRoleDto = Omit<
  RoleDto,
  "extraProperties" | "isStatic" | "id"
>;
