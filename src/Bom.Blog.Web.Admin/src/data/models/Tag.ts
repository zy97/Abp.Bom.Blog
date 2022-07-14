import BaseEntity from "./BaseEntity";
export type TagBaseDto = BaseEntity<string>;

export interface TagSelectOptionDto extends TagBaseDto {
  displayName: string;
}
export interface AddTagDto {
  tagName: string;
  displayName: string;
}
export interface TagDto extends AddTagDto, TagBaseDto {}
