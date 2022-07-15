import { makeAutoObservable } from "mobx";
import { postApi } from "../apis";
import { AddPostDto } from "../data/models/post";
class PostStore {
  constructor() {
    makeAutoObservable(this);
  }
  getPosts = async (data: any, form: any) => {
    try {
      const result = await postApi.getPosts({
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
  async deletePost(id: string) {
    try {
      await postApi.deletePost(id);
      return true;
    } catch (error) {
      return false;
    }
  }
  async addPost(tag: AddPostDto) {
    try {
      const data = await postApi.addPost(tag);
      return data.data;
    } catch (error) {
      return {};
    }
  }
  async getPostById(id: string) {
    try {
      const tag = await postApi.getPostById(id);
      return tag.data;
    } catch (error) {
      console.log(error);
    }
  }
  async updatePost(id: string, tag: AddPostDto) {
    try {
      const result = await postApi.updatePost(id, tag);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new PostStore();
