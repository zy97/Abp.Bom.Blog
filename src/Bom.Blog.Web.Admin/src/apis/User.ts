import axios from "axios";
import PagedList from "../data/models/PagedList";
import PageRequest from "../data/models/PageRequest";
import { AddUserDto, UserDto } from "../data/models/system/User";

// 添加
export const addUser = (user: AddUserDto) =>
  axios.post<UserDto>(`/api/identity/users`, { ...user });

// 获取列表
export const getUsers = (params: PageRequest) =>
  axios.get<PagedList<UserDto>>(`/api/identity/users`, { params });

// 删除
export const deleteUser = (id: string) =>
  axios.delete(`/api/identity/users/${id}`);

// 获取指定项
export const getUserById = (id: string) =>
  axios.get<UserDto>(`/api/identity/users/${id}`, {});

// 更新
export const updateUser = (id: string, user: AddUserDto) =>
  axios.put<AddUserDto>(`/api/identity/users/${id}`, { ...user });
