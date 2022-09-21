import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api/v1`,
});

axiosInstance.interceptors.request.use((request) => {
  request.headers.authorization = `${'Bearer' + ' '}${JSON.parse(
    localStorage.getItem('token'),
  )}`;
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/member/signIn';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
