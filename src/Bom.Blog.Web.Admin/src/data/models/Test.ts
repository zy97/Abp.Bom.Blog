import { ExtensibleEntityDto, PagedResultRequestDto } from "@abp/ng.core";

export interface AddTestDto {
  tagName: string;
  displayName: string;
}
export interface TestDto extends AddTestDto, ExtensibleEntityDto<string> { }
export interface SearchTestDto extends PagedResultRequestDto {
  city: string,
  name: string
}