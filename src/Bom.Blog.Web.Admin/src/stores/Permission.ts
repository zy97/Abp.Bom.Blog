import { makeAutoObservable } from "mobx";
import { permissionApi } from "../apis";
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
}

export default new PermissionStore();
