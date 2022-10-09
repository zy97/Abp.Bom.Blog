import { ListResultDto, PagedResultDto, PagedResultRequestDto } from "@abp/ng.core";
import axios from "axios";
import { AddCategoryDto, CategoryDto, CategorySelectOptionDto } from "../data/models/Category";

// 添加博客
export const addCategory = (Category: AddCategoryDto) =>
  axios.post<CategoryDto>(`/api/app/admin-Category`, { ...Category });

// 获取博客
export const getCategories = (params: PagedResultRequestDto) =>
  axios.get<PagedResultDto<CategoryDto>>(`/api/app/admin-Category`, { params });

// 删除博客
export const deleteCategory = (id: string) =>
  axios.delete(`/api/app/admin-Category/${id}`);

// 获取指定博客
export const getCategoryById = (id: string) =>
  axios.get<CategoryDto>(`/api/app/admin-Category/${id}`, {});

// 更新博客
export const updateCategory = (id: string, Category: AddCategoryDto) =>
  axios.put<CategoryDto>(`/api/app/admin-Category/${id}`, { ...Category });

// 获取所有目录
export const getAllCategories = () =>
  axios.get<ListResultDto<CategorySelectOptionDto>>(
    `/api/app/post-admin/category-lookup`,
    {}
  );
