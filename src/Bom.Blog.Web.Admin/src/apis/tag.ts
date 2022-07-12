import axios from 'axios';
import PagedList from '../data/models/PagedList';
import PageRequest from '../data/models/PageRequest';
import { AddTagDto, TagDto } from '../data/models/Tag';

// 添加博客
export const addTag = (tag: AddTagDto) =>
    axios.post<TagDto>(`/api/app/admin-tag`, { ...tag });

// 获取博客
export const getTags = (params: PageRequest) =>
    axios.get<PagedList<TagDto>>(`/api/app/admin-tag`, { params });

// 删除博客
export const deleteTag = (id: string) =>
    axios.delete(`/api/app/admin-tag/${id}`);

// 获取指定博客
export const getTagById = (id: string) =>
    axios.get<TagDto>(`/api/app/admin-tag/${id}`, {});

// 更新博客
export const updateTag = (id: string, tag: AddTagDto) =>
    axios.put<TagDto>(`/api/app/admin-tag/${id}`, { ...tag });
