export interface AddTagDto {
    tagName: string;
    displayName: string;
}
export interface TagDto extends AddTagDto {
    id: string;
}
