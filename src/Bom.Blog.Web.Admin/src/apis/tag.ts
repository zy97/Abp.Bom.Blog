import axios from 'axios';
import PagedList from '../data/models/PagedList';
import PageRequest from '../data/models/PageRequest';
import Tag from '../data/models/Tag';

// 添加博客
export const addTag = (params: any) =>
    axios.post(`/api/app/admin-tag`, { params });

// 获取博客
export const getTags = (params: PageRequest) =>
    axios.get<PagedList<Tag>>(`/api/app/admin-tag`, { params });

// 删除博客
export const deleteTag = (id: string) =>
    axios.delete(`/api/app/admin-tag/${id}`);

// 获取指定博客
export const getTagById = (id: any, params: any) =>
    axios.get(`/api/app/admin-tag/${id}`, { params });

// 更新博客
export const updateTag = (id: any, params: any) =>
    axios.put(`/api/app/admin-tag/${id}`, { params });
