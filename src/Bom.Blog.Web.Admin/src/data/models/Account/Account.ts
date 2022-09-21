export interface AccountDto {
    userName: string;
    email: string;
    name: string;
    surname?: string;
    phoneNumber?: string;
    isExternal: boolean;
    hasPassword: boolean;
    concurrencyStamp: string;
    extraProperties: ExtraProperties;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ExtraProperties {
}
export type UpdateAccountDto = Omit<AccountDto, "extraProperties" | "hasPassword" | "isExternal">