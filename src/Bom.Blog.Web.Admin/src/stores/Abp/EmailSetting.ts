import { UpdateEmailSettingsDto } from "@abp/ng.setting-management/config";
import { EmailSettingsDto, SendTestEmailInput } from "@abp/ng.setting-management/config/public-api";
import { message } from "antd";
import create from "zustand";
import { emailSettingApi } from "../../apis/Abp";
import { getErrorResponse } from "../../util/response";

interface EmailSettingState {
    getEmailSetting: () => Promise<EmailSettingsDto>
    updateEmailSetting: (update: UpdateEmailSettingsDto) => Promise<void>
    sendTestEmail: (email: SendTestEmailInput) => Promise<void>
}
export const useEmailSettingStore = create<EmailSettingState>()(() => ({
    getEmailSetting: async () => {
        const setting = await emailSettingApi.getEmailSetting();
        return setting.data;
    },
    updateEmailSetting: async (update: UpdateEmailSettingsDto) => {
        try {
            await emailSettingApi.updateEmailSetting(update);
        } catch (error) {
            message.error(getErrorResponse(error));
            throw error;
        }
    },
    sendTestEmail: async (email: SendTestEmailInput) => {
        try {
            await emailSettingApi.sendTestEmail(email);

        } catch (error) {
            message.error(getErrorResponse(error));
            throw error;
        }
    }
}))