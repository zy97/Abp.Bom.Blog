import axios from "axios";
import {
  PermissionGroup,
  UpdatePermissionListDto,
} from "../data/models/system/Permission";

// 获取可分配角色
export const getPermissions = (providerName: string, providerKey: string) =>
  axios.get<PermissionGroup>(
    `/api/permission-management/permissions?providerName=${providerName}&providerKey=${providerKey}`,
    {}
  );

// 获取可分配角色
export const updatePermissions = (
  providerName: string,
  providerKey: string,
  permissions: UpdatePermissionListDto
) =>
  axios.put(
    `/api/permission-management/permissions?providerName=${providerName}&providerKey=${providerKey}`,
    {
      ...permissions,
    }
  );
