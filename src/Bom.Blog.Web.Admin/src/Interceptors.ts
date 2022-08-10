import axios from "axios";
import { message } from "antd";

const interceptors = () => {
  // Add a request interceptor
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      // config.headers['platform-type'] = 'SC';
      config.xsrfCookieName = "XSRF-TOKEN";
      config.xsrfHeaderName = "RequestVerificationToken";
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
      console.log(error);
      if (error.response.status === 500) {
        message.error(error.response.data.error.message);
      }
      if (error.response.status === 403) {
        message.error(error.response.data.error.message);
      }
      // const code = get(error, 'response.data.code');
      // const err = get(error, 'response.data.message');
      // if (code === '401101') {
      //     // 如果没有权限，则跳到登录页
      //     message.error('登录已失效，请重新登录');
      //     window.location.href = `/login`;
      // } else if (code !== '200') {
      //     message.error({
      //         content: err || 'error',
      //         duration: 2,
      //     });
      // }
      return Promise.reject(error);
    }
  );
};

export default interceptors;
