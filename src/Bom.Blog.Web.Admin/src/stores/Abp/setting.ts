import { ChangePasswordInput, UpdateProfileDto } from "@abp/ng.account.core/proxy";
import { makeAutoObservable } from "mobx";
import { settingApi } from "../../apis";
import { SettingDto } from "../../data/models/abp/settingDto";

class SettingStore {
    constructor() {
        makeAutoObservable(this);
    }
    async changeSetting(setting: SettingDto) {
        await settingApi.updateSetting(setting);
    }
}

export default new SettingStore();