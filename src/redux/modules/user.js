import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/cookie";
import axios from 'axios';
import { apis } from '../../shared/axios';

const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

const initialState = {
  // userinfo: {email: "", nickname: ""},
  user: null,
  is_login: false,
};

const loginCheck = (user) => {
  return function (dispatch, getState, { history }) {
    console.log(history);
    dispatch(setUser(user));
    history.push("/");
  };
};

const loginAction = (userEmail, password) => {
  return function (dispatch, getState, { history }) {
    apis
      .login(userEmail, password)
      .then((res) => {
        setCookie('token', res.data.token, 7);
        dispatch(setUser({ userEmail: userEmail, }));
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
        window.alert('없는 회원정보 입니다! 회원가입을 해주세요!')
      });
  };
};

const signupAction = (userEmail, password, passwordCheck, userName) => {
  return function (dispatch, getState, { history }) {
    apis
      .signup(userEmail, password, passwordCheck, userName)
      .then((res) => console.log(res, "회원가입 성공"))
      .catch((error) => console.log(error));
  };
};

const logoutAction = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie("token");
    dispatch(logOut());
    history.replace("/");
  };
};

export default handleActions(
  {
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.userinfo = null;
        draft.is_login = false;
      }),
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.userinfo = action.payload.user;
        draft.is_login = true;
      }),
  },
  initialState
);

const actionCreators = {
  setUser,
  getUser,
  logOut,
  signupAction,
  loginAction,
  logoutAction,
  loginCheck,
  // userInfoDB,
};

export { actionCreators };