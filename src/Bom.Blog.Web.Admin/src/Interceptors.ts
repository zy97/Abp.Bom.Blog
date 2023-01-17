import axios from "axios";
import { message } from "antd";
import { User } from "oidc-client-ts";

const interceptors = () => {
  // Add a request interceptor
  axios.interceptors.request.use(
    function (config) {
      config.xsrfCookieName = "XSRF-TOKEN";
      config.xsrfHeaderName = "RequestVerificationToken";
      const oidcStorage = localStorage.getItem("oidc.user:https://localhost:44400:Blog_React");
      if (oidcStorage)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        config.headers!.Authorization = `Bearer ${User.fromStorageString(oidcStorage).access_token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (axios.isCancel(error)) {
        return Promise.reject(error);
      }
      if (error.response.status === 500) {
        message.error(error.response.data.error.message);
      }
      if (error.response.status === 403) {
        // let msg = "未授权，请联系管理员";
        let msg = ""
        const data = error.response.data;
        if (data && data.error && data.error.message)
          msg = "错误信息：" + error.response.data.error.message;
        if (data && data.error && data.error.detail) {
          msg = "\r\n详细信息：" + error.response.data.error.detail
        }

        message.error(msg);
      }
      if (error.response.status === 400) {
        let msg = "";
        const data = error.response.data;
        if (data && data.error && data.error.message)
          msg = error.response.data.error.details;
        message.error(msg);
      }
      return Promise.reject(error);
    }
  );
};

export default interceptors;
