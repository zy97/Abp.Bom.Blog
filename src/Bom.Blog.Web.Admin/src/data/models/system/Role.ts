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
