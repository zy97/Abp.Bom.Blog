export default interface AddCategoryDto {
    categoryName: string;
    displayName: string;
}
export default interface CategoryDto extends AddCategoryDto {
    id: string;
}
