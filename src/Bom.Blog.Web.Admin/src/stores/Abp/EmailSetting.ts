import { message } from "antd";
import { makeAutoObservable } from "mobx";
import { emailSettingApi } from "../../apis/Abp";
import { TestEmailDto, UpdateEmailSetttingDto } from "../../data/models/Abp/Email";
import { getErrorResponse } from "../../util/response";

class EmailSettingStore {
    constructor() {
        makeAutoObservable(this);
    }
    async getEmailSetting() {
        const setting = await emailSettingApi.getEmailSetting();
        return setting.data;
    }
    async updateEmailSetting(update: UpdateEmailSetttingDto) {
        try {
            await emailSettingApi.updateEmailSetting(update);
        } catch (error) {
            message.error(getErrorResponse(error));
            throw error;
        }
    }
    async sendTestEmail(email: TestEmailDto) {
        try {
            await emailSettingApi.sendTestEmail(email);

        } catch (error) {
            message.error(getErrorResponse(error));
            throw error;
        }
    }
}
export default new EmailSettingStore();