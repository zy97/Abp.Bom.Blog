import { GetPermissionListResultDto, UpdatePermissionsDto } from "@abp/ng.permission-management/proxy";
import { makeAutoObservable } from "mobx";
import { permissionApi } from "../apis";
class PermissionStore {
  constructor() {
    makeAutoObservable(this);
  }

  async getPermissionByUser(providerKey: string) {
    try {
      const result = await permissionApi.getPermissions({ providerName: "U", providerKey });
      return result.data;
    } catch (error) {
      console.log(error);
      return {} as GetPermissionListResultDto;
    }
  }
  async getPermissionByRole(providerKey: string) {
    try {
      const result = await permissionApi.getPermissions({ providerName: "R", providerKey });
      return result.data;
    } catch (error) {
      console.log(error);
      return {} as GetPermissionListResultDto;
    }
  }
  async updatePermissionsByUser(
    providerKey: string,
    permissions: UpdatePermissionsDto
  ) {
    try {
      const result = await permissionApi.updatePermissions(
        { providerName: "U", providerKey },
        permissions
      );
      return result.data;
    } catch (error) {
      console.log(error);
      return {} as GetPermissionListResultDto;
    }
  }
  async updatePermissionsByRole(
    providerKey: string,
    permissions: UpdatePermissionsDto
  ) {
    try {
      const result = await permissionApi.updatePermissions(
        { providerName: "R", providerKey },
        permissions
      );
      return result.data;
    } catch (error) {
      console.log(error);
      return {} as GetPermissionListResultDto;
    }
  }
}

export default new PermissionStore();
