import axios from 'axios';

// 添加博客
export const addPost = (params: any) =>
    axios.post(`/api/app/post-admin`, { params });

// 获取博客
export const getPosts = (params) =>
    axios.get(`/api/app/post-admin`, { params });

// 删除博客
export const deletePost = (id: any) =>
    axios.delete(`/api/app/post-admin/${id}`);

// 获取指定博客
export const getPostById = (id: any, params: any) =>
    axios.get(`/api/app/post-admin/${id}`,{ params });

// 更新博客
export const updatePost = (id: any, params: any) =>
    axios.put(`/api/app/post-admin/${id}`,{ params };
