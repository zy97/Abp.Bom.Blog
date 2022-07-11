import axios from 'axios';
import PagedList from '../data/models/PagedList';
import PageRequest from '../data/models/PageRequest';
import AddTag from '../data/models/Tag';
import Tag from '../data/models/Tag';

// 添加博客
export const addTag = (tag: AddTag) =>
    axios.post<Tag>(`/api/app/admin-tag`, { ...tag });

// 获取博客
export const getTags = (params: PageRequest) =>
    axios.get<PagedList<Tag>>(`/api/app/admin-tag`, { params });

// 删除博客
export const deleteTag = (id: string) =>
    axios.delete(`/api/app/admin-tag/${id}`);

// 获取指定博客
export const getTagById = (id: string) =>
    axios.get<Tag>(`/api/app/admin-tag/${id}`, {});

// 更新博客
export const updateTag = (id: string, tag: AddTag) =>
    axios.put<Tag>(`/api/app/admin-tag/${id}`, { ...tag });
