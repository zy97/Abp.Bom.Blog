import { ListResultDto, PagedResultDto, PagedResultRequestDto } from "@abp/ng.core";
import axios from "axios";
import { AddTagDto, TagDto, TagSelectOptionDto } from "../data/models/Tag";

// 添加博客
export const addTag = (tag: AddTagDto) =>
  axios.post<TagDto>(`/api/app/admin-tag`, { ...tag });

// 获取博客
export const getTags = (params: PagedResultRequestDto) =>
  axios.get<PagedResultDto<TagDto>>(`/api/app/admin-tag`, { params });

// 删除博客
export const deleteTag = (id: string) =>
  axios.delete(`/api/app/admin-tag/${id}`);

// 获取指定博客
export const getTagById = (id: string) =>
  axios.get<TagDto>(`/api/app/admin-tag/${id}`, {});

// 更新博客
export const updateTag = (id: string, tag: AddTagDto) =>
  axios.put<TagDto>(`/api/app/admin-tag/${id}`, { ...tag });

// 获取所有标签
export const getAllTags = () =>
  axios.get<ListResultDto<TagSelectOptionDto>>(`/api/app/post-admin/tag-lookup`, {});
