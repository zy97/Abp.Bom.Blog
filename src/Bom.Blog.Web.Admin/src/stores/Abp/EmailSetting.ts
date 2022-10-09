import { UpdateEmailSettingsDto } from "@abp/ng.setting-management/config";
import { SendTestEmailInput } from "@abp/ng.setting-management/config/public-api";
import { message } from "antd";
import { makeAutoObservable } from "mobx";
import { emailSettingApi } from "../../apis/Abp";
import { getErrorResponse } from "../../util/response";

class EmailSettingStore {
    constructor() {
        makeAutoObservable(this);
    }
    async getEmailSetting() {
        const setting = await emailSettingApi.getEmailSetting();
        return setting.data;
    }
    async updateEmailSetting(update: UpdateEmailSettingsDto) {
        try {
            await emailSettingApi.updateEmailSetting(update);
        } catch (error) {
            message.error(getErrorResponse(error));
            throw error;
        }
    }
    async sendTestEmail(email: SendTestEmailInput) {
        try {
            await emailSettingApi.sendTestEmail(email);

        } catch (error) {
            message.error(getErrorResponse(error));
            throw error;
        }
    }
}
export default new EmailSettingStore();