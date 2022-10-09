import BaseEntity from "./BaseEntity";
import PageRequest from "./PageRequest";
export type TestBaseDto = BaseEntity<string>;

export interface AddTestDto {
  tagName: string;
  displayName: string;
}
export interface TestDto extends AddTestDto, TestBaseDto { }
export interface SearchTestDto extends PageRequest {
  city: string,
  name: string
}