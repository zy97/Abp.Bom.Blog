import { IdentityUserCreateDto, IdentityUserUpdateDto } from "@abp/ng.identity/proxy";
import { makeAutoObservable } from "mobx";
import { userApi } from "../../apis";
class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
  getUsers = async (data: any, form: any) => {
    try {
      const result = await userApi.getUsers({
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
  async deleteUser(id: string) {
    try {
      await userApi.deleteUser(id);
      return true;
    } catch (error: any) {
      return false;
    }
  }
  async addUser(user: IdentityUserCreateDto) {
    try {
      const data = await userApi.addUser(user);
      return data.data;
    } catch (error) {
      return false;
    }
  }
  async getUserById(id: string) {
    try {
      const user = await userApi.getUserById(id);
      return user.data;
    } catch (error) {
      console.log(error);
    }
  }
  async updateUser(id: string, user: IdentityUserUpdateDto) {
    try {
      const result = await userApi.updateUser(id, user);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getUserRoleById(id: string) {
    try {
      const result = await userApi.getUserRoleById(id);
      return result.data;
    } catch (error) {
      console.log(error);
      return { items: [] };
    }
  }
  async getAssignableRoles() {
    try {
      const result = await userApi.getAssignableRoles();
      return result.data;
    } catch (error) {
      console.log(error);
      return { items: [] };
    }
  }
}

export default new UserStore();
