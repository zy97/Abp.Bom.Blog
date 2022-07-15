import { makeAutoObservable } from "mobx";
import { categoryApi } from "../apis";
import { AddCategoryDto } from "../data/models/Category";
class CategoryStore {
  constructor() {
    makeAutoObservable(this);
  }
  getCategories = async (data: any, form: any) => {
    try {
      const result = await categoryApi.getCategories({
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
  async deleteTag(id: string) {
    try {
      await categoryApi.deleteCategory(id);
      return true;
    } catch (error) {
      return false;
    }
  }
  async addTag(tag: AddCategoryDto) {
    try {
      const data = await categoryApi.addCategory(tag);
      return data.data;
    } catch (error) {
      return false;
    }
  }
  async getTagById(id: string) {
    try {
      const tag = await categoryApi.getCategoryById(id);
      return tag.data;
    } catch (error) {
      console.log(error);
    }
  }
  async updateTag(id: string, tag: AddCategoryDto) {
    try {
      const result = await categoryApi.updateCategory(id, tag);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllCategories() {
    try {
      const categories = await categoryApi.getAllCategories();
      return categories.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export default new CategoryStore();
