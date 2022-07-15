import { CategoryDto } from "./Category";
import { TagDto } from "./Tag";

export interface PostDto {
  id: string;
  title: string;
  author: string;
  markdown: string;
  category: CategoryDto;
  tags: TagDto[];
}
export interface AddPostDto {
  title: string;
  author: string;
  markdown: string;
  categoryId: string;
  tagIds: string[];
}
