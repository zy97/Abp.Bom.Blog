import BaseEntity from "./BaseEntity";
export type TestBaseDto = BaseEntity<string>;

export interface AddTestDto {
  tagName: string;
  displayName: string;
}
export interface TestDto extends AddTestDto, TestBaseDto {}
