import axios from "axios";
import { EmailSetttingDto, TestEmailDto, UpdateEmailSetttingDto } from "../../data/models/Abp/Email";

export const getEmailSetting = () => axios.get<EmailSetttingDto>(`/api/setting-management/emailing`, {});
export const updateEmailSetting = (update: UpdateEmailSetttingDto) => axios.post(`/api/setting-management/emailing`, { ...update });
export const sendTestEmail = (email: TestEmailDto) => axios.post(`/api/setting-management/emailing/send-test-email`, { ...email });