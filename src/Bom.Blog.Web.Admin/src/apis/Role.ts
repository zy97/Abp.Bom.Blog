import axios from "axios";
import { List, PagedList } from "../data/models/PagedList";
import PageRequest from "../data/models/PageRequest";
import { AddRoleDto, RoleDto } from "../data/models/system/Role";

// 添加
export const addRole = (role: AddRoleDto) =>
  axios.post<RoleDto>(`/api/identity/roles`, { ...role });

// 获取列表
export const getRoles = (params: PageRequest) =>
  axios.get<PagedList<RoleDto>>(`/api/identity/roles`, { params });

// 获取列表
export const getAllRoles = () =>
  axios.get<List<RoleDto>>(`/api/identity/roles/all`, {});

// 删除
export const deleteRole = (id: string) =>
  axios.delete(`/api/identity/roles/${id}`);

// 获取指定项
export const getRoleById = (id: string) =>
  axios.get<RoleDto>(`/api/identity/roles/${id}`, {});

// 更新
export const updateRole = (id: string, role: AddRoleDto) =>
  axios.put<AddRoleDto>(`/api/identity/roles/${id}`, { ...role });
