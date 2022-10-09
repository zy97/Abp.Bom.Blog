import BaseEntity from "./BaseEntity";
import PageRequest from "./PageRequest";
export type TemplateBaseDto = BaseEntity<string>;

export interface AddTemplateDto {
    a: string;
    b: string;
}
export interface TemplateDto extends AddTemplateDto, TemplateBaseDto { }
export interface SearchTemplateDto extends PageRequest {
    a: string,
    b: string
}