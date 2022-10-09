import { ExtensibleEntityDto } from "@abp/ng.core";

export interface TagSelectOptionDto extends ExtensibleEntityDto<string> {
  displayName: string;
}
export interface AddTagDto {
  tagName: string;
  displayName: string;
}
export interface TagDto extends AddTagDto, ExtensibleEntityDto<string> { }
