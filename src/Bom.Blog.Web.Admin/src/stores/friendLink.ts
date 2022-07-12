import { AntdTableResult } from 'ahooks/lib/useAntdTable/types';
import { makeAutoObservable } from 'mobx';
import { friendLinkApi } from '../apis';
import { AddFriendLink } from '../data/models/FriendLink';
class FriendLinkStore {
    constructor() {
        makeAutoObservable(this);
    }
    getFriendLinks = async (data: any, form: any) => {
        try {
            const result = await friendLinkApi.getFriendLinks({
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
    async deleteFriendLink(id: string) {
        try {
            await friendLinkApi.deleteFriendLink(id);
            return true;
        } catch (error) {
            return false;
        }
    }
    async addFriendLink(tag: AddFriendLink) {
        try {
            const data = await friendLinkApi.addFriendLink(tag);
            return data.data;
        } catch (error) {
            return false;
        }
    }
    async getFriendLinkById(id: string) {
        try {
            const tag = await friendLinkApi.getFriendLinkById(id);
            return tag.data;
        } catch (error) {}
    }
    async updateFriendLink(id: string, tag: AddFriendLink) {
        try {
            const result = await friendLinkApi.updateFriendLink(id, tag);
            return result.data;
        } catch (error) {}
    }
}

export default new FriendLinkStore();
