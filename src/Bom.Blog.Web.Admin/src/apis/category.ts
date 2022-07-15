import axios from "axios";
import CategoryDto, { CategorySelectOptionDto } from "../data/models/Category";
import AddCategoryDto from "../data/models/Category";
import PagedList from "../data/models/PagedList";
import PageRequest from "../data/models/PageRequest";

// 添加博客
export const addCategory = (Category: AddCategoryDto) =>
  axios.post<CategoryDto>(`/api/app/admin-Category`, { ...Category });

// 获取博客
export const getCategories = (params: PageRequest) =>
  axios.get<PagedList<CategoryDto>>(`/api/app/admin-Category`, { params });

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
  axios.get<CategorySelectOptionDto[]>(
    `/api/app/admin-Category/categories`,
    {}
  );
