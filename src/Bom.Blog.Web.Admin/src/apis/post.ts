import { PagedResultDto, PagedResultRequestDto } from "@abp/ng.core";
import axios from "axios";
import { AddPostDto, PostDto } from "../data/models/post";

// 添加博客
export const addPost = (post: AddPostDto) =>
  axios.post<PostDto>(`/api/app/post-admin`, { ...post });

// 获取博客
export const getPosts = (params: PagedResultRequestDto) =>
  axios.get<PagedResultDto<PostDto>>(`/api/app/post-admin`, { params });

// 删除博客
export const deletePost = (id: string) =>
  axios.delete(`/api/app/post-admin/${id}`);

// 获取指定博客
export const getPostById = (id: string) =>
  axios.get<PostDto>(`/api/app/post-admin/${id}`, {});

// 更新博客
export const updatePost = (id: string, post: AddPostDto) =>
  axios.put(`/api/app/post-admin/${id}`, { ...post });
