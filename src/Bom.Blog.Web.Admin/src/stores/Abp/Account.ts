import { ChangePasswordInput, UpdateProfileDto } from "@abp/ng.account.core/proxy";
import { makeAutoObservable } from "mobx";
import { accountApi } from "../../apis";

class AccountStore {
    constructor() {
        makeAutoObservable(this);
    }
    async logout() {
        await accountApi.logout();
    }
    async getProfile() {
        const profile = await accountApi.getProfile();
        return profile.data;
    }
    async updateProfile(update: UpdateProfileDto) {
        const profile = await accountApi.updateProfile(update);
        return profile.data;
    }
    async changePassword(update: ChangePasswordInput) {
        await accountApi.changePassword(update);
    }
}

export default new AccountStore();
