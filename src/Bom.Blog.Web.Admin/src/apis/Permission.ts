import axios from "axios";

// // 添加
// export const addUser = (user: AddUserDto) =>
//   axios.post<UserDto>(`/api/identity/users`, { ...user });

// // 获取列表
// export const getUsers = (params: PageRequest) =>
//   axios.get<PagedList<UserDto>>(`/api/identity/users`, { params });

// // 删除
// export const deleteUser = (id: string) =>
//   axios.delete(`/api/identity/users/${id}`);

// // 获取指定项
// export const getUserById = (id: string) =>
//   axios.get<UserDto>(`/api/identity/users/${id}`, {});

// // 更新
// export const updateUser = (id: string, user: UpdateUserDto) =>
//   axios.put<UserDto>(`/api/identity/users/${id}`, { ...user });

// // 获取用户角色
// export const getUserRoleById = (id: string) =>
//   axios.get<RoleDtoItems>(`/api/identity/users/${id}/roles`, {});

// // 获取可分配角色
// export const getAssignableRoles = () =>
//   axios.get<RoleDtoItems>(`/api/identity/users/assignable-roles`, {});

// 获取可分配角色
export const getPermissions = (providerName: string, providerKey: string) =>
  axios.get<PermissionGroup>(`/api/permission-management/permissions`, {
    params: { providerName, providerKey },
  });
