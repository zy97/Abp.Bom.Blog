import { makeAutoObservable } from "mobx";
import { permissionApi } from "../apis";
import {
  PermissionGroup,
  UpdatePermissionListDto,
} from "../data/models/system/Permission";
class PermissionStore {
  constructor() {
    makeAutoObservable(this);
  }

  async getPermissionByUser(provierKey: string) {
    try {
      const result = await permissionApi.getPermissions("U", provierKey);
      return result.data;
    } catch (error) {
      console.log(error);
      return {} as PermissionGroup;
    }
  }
  async getPermissionByRole(provierKey: string) {
    try {
      const result = await permissionApi.getPermissions("R", provierKey);
      return result.data;
    } catch (error) {
      console.log(error);
      return {} as PermissionGroup;
    }
  }
  async updatePermissionsByUser(
    provierKey: string,
    permissions: UpdatePermissionListDto
  ) {
    try {
      const result = await permissionApi.updatePermissions(
        "U",
        provierKey,
        permissions
      );
      return result.data;
    } catch (error) {
      console.log(error);
      return {} as PermissionGroup;
    }
  }
  async updatePermissionsByRole(
    provierKey: string,
    permissions: UpdatePermissionListDto
  ) {
    try {
      const result = await permissionApi.updatePermissions(
        "R",
        provierKey,
        permissions
      );
      return result.data;
    } catch (error) {
      console.log(error);
      return {} as PermissionGroup;
    }
  }
}

export default new PermissionStore();
