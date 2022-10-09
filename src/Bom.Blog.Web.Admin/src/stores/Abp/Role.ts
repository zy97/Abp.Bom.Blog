import { IdentityRoleCreateDto, IdentityRoleUpdateDto } from "@abp/ng.identity/proxy";
import { makeAutoObservable } from "mobx";
import { roleApi } from "../../apis";
class RoleStore {
  constructor() {
    makeAutoObservable(this);
  }
  getRoles = async (data: { current: number; pageSize: number }, form: any) => {
    try {
      const result = await roleApi.getRoles({
        skipCount: data.pageSize * (data.current - 1),
        maxResultCount: data.pageSize,
        ...form,
      });
      return {
        total: result.data.totalCount ?? 0,
        list: result.data.items ?? [],
      };
    } catch (error) {
      return { total: 0, list: [] };
    }
  };
  getAllRoles = async () => {
    try {
      const result = await roleApi.getAllRoles();
      return result.data.items;
    } catch (error) {
      return [];
    }
  };
  async deleteRole(id: string) {
    try {
      await roleApi.deleteRole(id);
      return true;
    } catch (error) {
      return false;
    }
  }
  async addRole(role: IdentityRoleCreateDto) {
    try {
      const data = await roleApi.addRole(role);
      return data.data;
    } catch (error) {
      return false;
    }
  }
  async getRoleById(id: string) {
    try {
      const role = await roleApi.getRoleById(id);
      return role.data;
    } catch (error) {
      console.log(error);
    }
  }
  async updateRole(id: string, role: IdentityRoleUpdateDto) {
    try {
      const result = await roleApi.updateRole(id, role);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new RoleStore();
