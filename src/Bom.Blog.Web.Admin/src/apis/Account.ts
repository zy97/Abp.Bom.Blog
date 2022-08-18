import axios from "axios";

// 登出
export const logout = () => axios.get(`/api/account/logout`, {});
