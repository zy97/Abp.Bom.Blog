import { makeAutoObservable } from "mobx";
import { accountApi } from "../apis";
import { UpdateAccountDto } from "../data/models/Account/Account";
import { UpdatePasswordDto } from "../data/models/Account/Password";

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
    async updateProfile(update: UpdateAccountDto) {
        const profile = await accountApi.updateProfile(update);
        return profile.data;
    }
    async changePassword(update: UpdatePasswordDto) {
        await accountApi.changePassword(update);
    }
}

export default new AccountStore();
