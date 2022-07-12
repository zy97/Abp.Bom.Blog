import CategoryDto from './CategoryDto';
import { TagDto } from './Tag';

export interface PostDto {
    id: string;
    title: string;
    author: string;
    url: string;
    html: string;
    markdown: string;
    creationTime: string;
    category: CategoryDto;
    tags: TagDto[];
}
export interface AddPostDto {
    title: string;
    author: string;
    url: string;
    html: string;
    markdown: string;
    creationTime: string;
    categoryId: string;
    tagIds: string[];
}
