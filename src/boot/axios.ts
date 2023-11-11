import { boot } from 'quasar/wrappers';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

//https://mystoreapi.com
const api: AxiosInstance = axios.create({
  //not auth api so don't handle
  baseURL: process.env.ENDPOINT,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error.message);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    const status = response.data.status_code;
    if (status === 401 || status === 404) {
    } else if ([400, 403, 422, 500].includes(status)) {
      return Promise.reject(response.data);
    }
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error.message);
  }
);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
