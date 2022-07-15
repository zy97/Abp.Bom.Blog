import BaseEntity from "./BaseEntity";
export type CategoryBaseDto = BaseEntity<string>;

export interface CategorySelectOptionDto extends CategoryBaseDto {
  displayName: string;
}
export interface CategoryDto extends AddCategoryDto, CategoryBaseDto {}

export interface AddCategoryDto {
  categoryName: string;
  displayName: string;
}
