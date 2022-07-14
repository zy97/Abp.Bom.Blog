import { makeAutoObservable } from "mobx";
import { tagApi } from "../apis";
import { AddTagDto } from "../data/models/Tag";
class TagStore {
  constructor() {
    makeAutoObservable(this);
  }
  getTags = async (data: any, form: any) => {
    try {
      const result = await tagApi.getTags({
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
      await tagApi.deleteTag(id);
      return true;
    } catch (error) {
      return false;
    }
  }
  async addTag(tag: AddTagDto) {
    try {
      const data = await tagApi.addTag(tag);
      return data.data;
    } catch (error) {
      return false;
    }
  }
  async getTagById(id: string) {
    try {
      const tag = await tagApi.getTagById(id);
      return tag.data;
    } catch (error) {
      console.log(error);
    }
  }
  async updateTag(id: string, tag: AddTagDto) {
    try {
      const result = await tagApi.updateTag(id, tag);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllTags() {
    try {
      const tags = await tagApi.getAllTags();
      return tags.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export default new TagStore();
