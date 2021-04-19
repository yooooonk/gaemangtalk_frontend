import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteCookie, setCookie } from '../../shared/cookie';
import { userAPI } from '../../shared/api';

export const initialState = {
  userInfo: null,
  isValidEmailMultiple: false,
  loginError: null,
  authNumber: '',
  is_login: false,
};

const setUser = createAction('user/SET_USER');
const setLoginError = createAction('user/SET_LOGIN_ERROR');
const setIsValidEmailMultiple = createAction(
  'user/SET_IS_VALID_EMAIL_MULTIPLE'
);
const setAuthNumber = createAction('user/SET_AUTH_NUMBER');
// 로그인 / 로그아웃 시 is_login을 바꾸는 액션
const setLoginStatus = createAction('user/SETISLOGINSTATUS');
const setLogoutStatus = createAction('user/SETISLOGOUTSTATUS');

const user = createReducer(initialState, {
  [setUser]: (state, { payload }) => {
    state.userInfo = payload;
  },

  [setIsValidEmailMultiple]: (state, { payload }) => {
    state.isValidEmailMultiple = payload;
  },
  [setLoginError]: (state, { payload }) => {
    state.loginError = payload;
  },
  [setAuthNumber]: (state, { payload }) => {
    state.authNumber = payload;
  },
  [setLoginStatus]: (state, { payload }) => {
    state.is_login = true;
  },
  [setLogoutStatus]: (state, { payload }) => {
    state.is_login = false;
  },
});

// thunk
const signup = (data) => async (dispatch, getState, { history }) => {
  try {
    const res = await userAPI.signup(data);
    console.log(res);
    alert('회원가입이 완료되었습니다');
    history.push('/');
  } catch (error) {
    console.log(error.response);
    alert(error.response.data.errorMessage);
  }
};

const emailCheck = (email) => async (dispatch, getState, { history }) => {
  try {
    const res = await userAPI.emailCheck({ email });
    alert('사용 가능한 이메일입니다');
    dispatch(setIsValidEmailMultiple(true));
  } catch (error) {
    alert('이미 사용중인 이메일입니다');
  }
};

const login = (data) => async (dispatch, getState, { history }) => {
  try {
    const res = await userAPI.login(data);

    const token = res.data.token;
    const username = res.data.username;
    const userId = res.data.userid;

    setCookie('access-token', token);
    setCookie('username', username);
    setCookie('userId', userId);
    setCookie('email', data.email);
    axios.defaults.headers.common['token'] = `${token}`;

    dispatch(setUser(res.data));
    dispatch(setLoginStatus());
    history.push('/chat');
  } catch (error) {
    console.error(error);
    dispatch(setLoginError(error.response.data.errorMessage));
  }
};

const logout = (data) => async (dispatch, getState, { history }) => {
  try {
    deleteCookie('access-token');
    deleteCookie('username');
    deleteCookie('email');
    deleteCookie('userId');
    axios.defaults.headers.common['token'] = ``;

    dispatch(setUser(null));
    dispatch(setLogoutStatus());
    history.push('/');
  } catch (error) {
    console.error(error);
    dispatch(setLoginError(error.response.data.errorMessage));
  }
};

const loginByKakao = (data) => async (dispatch, getState, { history }) => {
  try {
    const res = await userAPI.loginByKakao(data);

    const token = res.data.token;
    const username = res.data.username;
    const userId = res.data.userid;

    setCookie('access-token', token);
    setCookie('username', username);
    setCookie('userId', userId);

    axios.defaults.headers.common['token'] = `${token}`;

    dispatch(setUser({ username, userId }));
    dispatch(setLoginStatus());
    history.push('/chat');
  } catch (error) {
    console.error(error);
    dispatch(setLoginError(error.response.data.errorMessage));
  }
};

const findPassword = (email) => async (dispatch, getState, { history }) => {
  try {
    const res = await userAPI.findPassword({ email });
    dispatch(setAuthNumber(res.data.CertificationNumber));
  } catch (error) {
    console.error(error);
  }
};

const updatePassword = (data) => async (dispatch, getState, { history }) => {
  try {
    const res = await userAPI.updatePassword(data);
    alert('비밀번호를 변경했습니다');
    history.push('/');
  } catch (error) {
    console.error(error);
  }
};

export const userActions = {
  signup,
  emailCheck,
  setIsValidEmailMultiple,
  login,
  logout,
  setLoginError,
  findPassword,
  setAuthNumber,
  updatePassword,
  setUser,
  loginByKakao,
  setLoginStatus
};

export default user;
