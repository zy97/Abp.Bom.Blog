import { makeAutoObservable } from "mobx";
import { userApi } from "../apis";
import { AddUserDto } from "../data/models/system/User";
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
        total: result.data.totalCount,
        list: result.data.items,
      };
    } catch (error) {
      return { total: 0, list: [] };
    }
  };
  async deleteUser(id: string) {
    try {
      await userApi.deleteUser(id);
      return true;
    } catch (error) {
      return false;
    }
  }
  async addUser(user: AddUserDto) {
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
  async updateUser(id: string, user: AddUserDto) {
    try {
      const result = await userApi.updateUser(id, user);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserStore();
