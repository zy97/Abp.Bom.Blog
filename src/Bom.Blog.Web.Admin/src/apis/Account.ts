import axios from "axios";
import { AccountDto, UpdateAccountDto } from "../data/models/Account/Account";
import { UpdatePasswordDto } from "../data/models/Account/Password";

export const logout = () => axios.get(`/api/account/logout`, {});
export const getProfile = () => axios.get<AccountDto>(`/api/account/my-profile`, {});
export const updateProfile = (update: UpdateAccountDto) => axios.put<AccountDto>(`/api/account/my-profile`, { ...update });
export const changePassword = (update: UpdatePasswordDto) => axios.post(`/api/account/my-profile/change-password`, { ...update });
