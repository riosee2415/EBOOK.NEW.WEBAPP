import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  /////////////////////////////
  LOGIN_ADMIN_REQUEST,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAILURE,
  /////////////////////////////
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  /////////////////////////////
  USERLIST_REQUEST,
  USERLIST_SUCCESS,
  USERLIST_FAILURE,
  /////////////////////////////
  USER_FIND_USERID_REQUEST,
  USER_FIND_USERID_SUCCESS,
  USER_FIND_USERID_FAILURE,
  /////////////////////////////
  USERLIST_UPDATE_REQUEST,
  USERLIST_UPDATE_SUCCESS,
  USERLIST_UPDATE_FAILURE,
  /////////////////////////////
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  /////////////////////////////
  KAKAO_LOGIN_REQUEST,
  KAKAO_LOGIN_SUCCESS,
  KAKAO_LOGIN_FAILURE,
  /////////////////////////////
  USER_HISTORY_REQUEST,
  USER_HISTORY_SUCCESS,
  USER_HISTORY_FAILURE,
  /////////////////////////////
  MENURIGHT_UPDATE_REQUEST,
  MENURIGHT_UPDATE_SUCCESS,
  MENURIGHT_UPDATE_FAILURE,
  /////////////////////////////
  ADMINUSERLIST_REQUEST,
  ADMINUSERLIST_SUCCESS,
  ADMINUSERLIST_FAILURE,
  /////////////////////////////
  ADMINUSERRIGHT_HISTORY_REQUEST,
  ADMINUSERRIGHT_HISTORY_SUCCESS,
  ADMINUSERRIGHT_HISTORY_FAILURE,
  /////////////////////////////
  ADMINUSER_EXITTRUE_REQUEST,
  ADMINUSER_EXITTRUE_SUCCESS,
  ADMINUSER_EXITTRUE_FAILURE,
  /////////////////////////////
  ADMINUSER_EXITFALSE_REQUEST,
  ADMINUSER_EXITFALSE_SUCCESS,
  ADMINUSER_EXITFALSE_FAILURE,
  /////////////////////////////
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  /////////////////////////////
} from "../reducers/user";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function loadMyInfoAPI(data) {
  return await axios.get("/api/user/signin", data);
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// *****

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function signinPI(data) {
  return await axios.post(`/api/user/signin`, data);
}

function* signin(action) {
  try {
    const result = yield call(signinPI, action.data);
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function signinAdminPI(data) {
  return await axios.post(`/api/user/signin/admin`, data);
}

function* signinAdmin(action) {
  try {
    const result = yield call(signinAdminPI, action.data);
    yield put({
      type: LOGIN_ADMIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGIN_ADMIN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function signUpAPI(data) {
  return await axios.post(`/api/user/signup`, data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGNUP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userListAPI(data) {
  return await axios.post(`/api/user/list`, data);
}

function* userList(action) {
  try {
    const result = yield call(userListAPI, action.data);
    yield put({
      type: USERLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USERLIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function findUserIdAPI(data) {
  return await axios.post(`/api/user/find/userid`, data);
}

function* findUserId(action) {
  try {
    const result = yield call(findUserIdAPI, action.data);
    yield put({
      type: USER_FIND_USERID_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_FIND_USERID_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userListUpdateAPI(data) {
  return await axios.patch(`/api/user/level/update`, data);
}

function* userListUpdate(action) {
  try {
    const result = yield call(userListUpdateAPI, action.data);
    yield put({
      type: USERLIST_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USERLIST_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function kakaoLoginAPI() {
  return await axios.get(`/api/user/kakaoLogin`);
}

function* kakaoLogin() {
  try {
    const result = yield call(kakaoLoginAPI);

    yield put({
      type: KAKAO_LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KAKAO_LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userHistoryAPI(data) {
  return await axios.post(`/api/user/history/list`, data);
}

function* userHistory(action) {
  try {
    const result = yield call(userHistoryAPI, action.data);

    yield put({
      type: USER_HISTORY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_HISTORY_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function menuRightUpAPI(data) {
  return await axios.post(`/api/user/update/menuRight`, data);
}

function* menuRightUp(action) {
  try {
    const result = yield call(menuRightUpAPI, action.data);

    yield put({
      type: MENURIGHT_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MENURIGHT_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function adminUserListAPI(data) {
  return await axios.post("/api/user/adminList", data);
}

function* adminUserList(action) {
  try {
    const result = yield call(adminUserListAPI, action.data);
    yield put({
      type: ADMINUSERLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMINUSERLIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function adminUserRightHistoryAPI(data) {
  return await axios.post(`/api/user/adminUserRight/history/list`, data);
}

function* adminUserRightHistoryList(action) {
  try {
    const result = yield call(adminUserRightHistoryAPI, action.data);

    yield put({
      type: ADMINUSERRIGHT_HISTORY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMINUSERRIGHT_HISTORY_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function adminUserExitTrueAPI(data) {
  return await axios.post(`/api/user/exit/update/true`, data);
}

function* adminUserExitTrue(action) {
  try {
    const result = yield call(adminUserExitTrueAPI, action.data);

    yield put({
      type: ADMINUSER_EXITTRUE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMINUSER_EXITTRUE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function adminUserExitFalseAPI(data) {
  return await axios.post(`/api/user/exit/update/false`, data);
}

function* adminUserExitFalse(action) {
  try {
    const result = yield call(adminUserExitFalseAPI, action.data);

    yield put({
      type: ADMINUSER_EXITFALSE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMINUSER_EXITFALSE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function logoutAPI() {
  return await axios.get(`/api/user/logout`);
}

function* logout(action) {
  try {
    const result = yield call(logoutAPI, action.data);

    yield put({
      type: LOGOUT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGOUT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchSignin() {
  yield takeLatest(LOGIN_REQUEST, signin);
}

function* watchSigninAdmin() {
  yield takeLatest(LOGIN_ADMIN_REQUEST, signinAdmin);
}

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

function* watchUserList() {
  yield takeLatest(USERLIST_REQUEST, userList);
}

function* watchFindUserId() {
  yield takeLatest(USER_FIND_USERID_REQUEST, findUserId);
}

function* watchUserListUpdate() {
  yield takeLatest(USERLIST_UPDATE_REQUEST, userListUpdate);
}

function* watchKakaoLogin() {
  yield takeLatest(KAKAO_LOGIN_REQUEST, kakaoLogin);
}

function* watchUserHistory() {
  yield takeLatest(USER_HISTORY_REQUEST, userHistory);
}

function* watchMenuRightUp() {
  yield takeLatest(MENURIGHT_UPDATE_REQUEST, menuRightUp);
}

function* watchAdminUserList() {
  yield takeLatest(ADMINUSERLIST_REQUEST, adminUserList);
}

function* watchAdminUserRightHistoryList() {
  yield takeLatest(ADMINUSERRIGHT_HISTORY_REQUEST, adminUserRightHistoryList);
}

function* watchAdminUserExitTrue() {
  yield takeLatest(ADMINUSER_EXITTRUE_REQUEST, adminUserExitTrue);
}

function* watchAdminUserExitFalse() {
  yield takeLatest(ADMINUSER_EXITFALSE_REQUEST, adminUserExitFalse);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

//////////////////////////////////////////////////////////////
export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchSignin),
    fork(watchSigninAdmin),
    fork(watchSignUp),
    fork(watchUserList),
    fork(watchFindUserId),
    fork(watchUserListUpdate),
    fork(watchKakaoLogin),
    fork(watchUserHistory),
    fork(watchMenuRightUp),
    fork(watchAdminUserList),
    fork(watchAdminUserRightHistoryList),
    fork(watchAdminUserExitTrue),
    fork(watchAdminUserExitFalse),
    fork(watchLogout),
    //
  ]);
}
