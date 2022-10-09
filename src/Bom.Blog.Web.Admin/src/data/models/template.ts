import { ExtensibleEntityDto, PagedResultRequestDto } from "@abp/ng.core";

export interface AddTemplateDto {
    a: string;
    b: string;
}
export interface TemplateDto extends AddTemplateDto, ExtensibleEntityDto<string> { }
export interface SearchTemplateDto extends PagedResultRequestDto {
    a: string,
    b: string
}