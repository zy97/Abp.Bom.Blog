export interface EmailSetttingDto {
    smtpHost: string;
    smtpPort: number;
    smtpUserName: string;
    smtpPassword: string;
    smtpDomain?: string;
    smtpEnableSsl: boolean;
    smtpUseDefaultCredentials: boolean;
    defaultFromAddress: string;
    defaultFromDisplayName: string;
}
export type UpdateEmailSetttingDto = EmailSetttingDto;
export interface TestEmailDto {
    senderEmailAddress: string;
    targetEmailAddress: number;
    subject: string;
    body: string;
}