import axios from 'axios';

//axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://54.180.141.91:8080';

/* const openApi = axios.create();
openApi.defaults.withCredentials=false;
const token = `KakaoAK 08f47c215f89ea20492b07610fc231dc`
 */
export const userAPI = {
  login: function (data) {
    return axios.post('/api/user/login', data);
  },
  logout: function () {
    return axios.post('/user/logout');
  },
  signup: function (data) {
    return axios.post(`/api/user/signup`, data);
  },
  emailCheck: function (data) {
    return axios.post(`/api/user/signup/emailCheck`, data);
  },
  findPassword: function (data) {
    return axios.post('/api/user/findPassword', data);
  },
  updatePassword: function (data) {
    return axios.put('/api/user/changePassword', data);
  },
  getUserByToken: function () {
    /*  axios.defaults.headers.common[
      'token'
    ] = `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNSIsImlhdCI6MTYxODU1MTQzMSwiZXhwIjoxNjE4NTUzMjMxfQ.3g-mQ3MVy1xcTKkts0lYLaWN4bfjorEtzCLwmqb-sJY`; */
    return axios.get('/api/user/getUserInfo');
  }
};
