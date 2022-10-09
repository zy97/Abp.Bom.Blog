import { ExtensibleEntityDto } from "@abp/ng.core";

export interface CategorySelectOptionDto extends ExtensibleEntityDto<string> {
  displayName: string;
}
export interface CategoryDto extends AddCategoryDto, ExtensibleEntityDto<string> { }

export interface AddCategoryDto {
  categoryName: string;
  displayName: string;
}
