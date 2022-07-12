import axios from 'axios';
import CategoryDto from '../data/models/CategoryDto';
import AddCategoryDto from '../data/models/CategoryDto';
import PagedList from '../data/models/PagedList';
import PageRequest from '../data/models/PageRequest';

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
