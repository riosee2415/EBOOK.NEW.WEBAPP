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
  USER_CHECK_EMAIL_REQUEST,
  USER_CHECK_EMAIL_SUCCESS,
  USER_CHECK_EMAIL_FAILURE,
  /////////////////////////////
  USER_CHECK_USERID_REQUEST,
  USER_CHECK_USERID_SUCCESS,
  USER_CHECK_USERID_FAILURE,
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
  MODIFYPASS_SEND_REQUEST,
  MODIFYPASS_SEND_SUCCESS,
  MODIFYPASS_SEND_FAILURE,
  /////////////////////////////
  MODIFYPASS_CHECKED_REQUEST,
  MODIFYPASS_CHECKED_SUCCESS,
  MODIFYPASS_CHECKED_FAILURE,
  /////////////////////////////
  MODIFYPASS_UPDATE_REQUEST,
  MODIFYPASS_UPDATE_SUCCESS,
  MODIFYPASS_UPDATE_FAILURE,
  /////////////////////////////
  ADMIN_UPDATE_REQUEST,
  ADMIN_UPDATE_SUCCESS,
  ADMIN_UPDATE_FAILURE,
  /////////////////////////////
  ME_UPDATE_REQUEST,
  ME_UPDATE_SUCCESS,
  ME_UPDATE_FAILURE,
  /////////////////////////////
  INSERT_XLSX_REQUEST,
  INSERT_XLSX_SUCCESS,
  INSERT_XLSX_FAILURE,
  /////////////////////////////
  ADMIN_BANNER_REQUEST,
  ADMIN_BANNER_SUCCESS,
  ADMIN_BANNER_FAILURE,
  /////////////////////////////
  USER_ALL_LIST_REQUEST,
  USER_ALL_LIST_SUCCESS,
  USER_ALL_LIST_FAILURE,
  /////////////////////////////
  USER_ADMIN_DELETE_REQUEST,
  USER_ADMIN_DELETE_SUCCESS,
  USER_ADMIN_DELETE_FAILURE,
  /////////////////////////////
  USER_ADMIN_ISBLACK_REQUEST,
  USER_ADMIN_ISBLACK_SUCCESS,
  USER_ADMIN_ISBLACK_FAILURE,
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
async function checkEmailAPI(data) {
  return await axios.post(`/api/user/check/email`, data);
}

function* checkEmail(action) {
  try {
    const result = yield call(checkEmailAPI, action.data);
    yield put({
      type: USER_CHECK_EMAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_CHECK_EMAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function checkUserIdAPI(data) {
  return await axios.post(`/api/user/check/userid`, data);
}

function* checkUserId(action) {
  try {
    const result = yield call(checkUserIdAPI, action.data);
    yield put({
      type: USER_CHECK_USERID_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_CHECK_USERID_FAILURE,
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
  return await axios.post(`/api/user/find/userId`, data);
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

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function modifyPassSendAPI(data) {
  return await axios.post(`/api/user/modifypass`, data);
}

function* modifyPassSend(action) {
  try {
    const result = yield call(modifyPassSendAPI, action.data);

    yield put({
      type: MODIFYPASS_SEND_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MODIFYPASS_SEND_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function modifyPassCheckedAPI(data) {
  return await axios.post(`/api/user/modifypass/checked`, data);
}

function* modifyPassChecked(action) {
  try {
    const result = yield call(modifyPassCheckedAPI, action.data);

    yield put({
      type: MODIFYPASS_CHECKED_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MODIFYPASS_CHECKED_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function modifyPassUpdateAPI(data) {
  return await axios.post(`/api/user/modifypass/update`, data);
}

function* modifyPassUpdate(action) {
  try {
    const result = yield call(modifyPassUpdateAPI, action.data);

    yield put({
      type: MODIFYPASS_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MODIFYPASS_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function adminUpdateAPI(data) {
  return await axios.post(`/api/user/admin/update`, data);
}

function* adminUpdate(action) {
  try {
    const result = yield call(adminUpdateAPI, action.data);

    yield put({
      type: ADMIN_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMIN_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function meUpdateAPI(data) {
  return await axios.post(`/api/user/me/update`, data);
}

function* meUpdate(action) {
  try {
    const result = yield call(meUpdateAPI, action.data);

    yield put({
      type: ME_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ME_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function insertXlsxAPI(data) {
  return await axios.post(`/api/user/insert/xlsx`, data);
}

function* insertXlsx(action) {
  try {
    const result = yield call(insertXlsxAPI, action.data);

    yield put({
      type: INSERT_XLSX_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INSERT_XLSX_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function adminBannerAPI(data) {
  return await axios.post(`/api/user/admin/banner`, data);
}

function* adminBanner(action) {
  try {
    const result = yield call(adminBannerAPI, action.data);

    yield put({
      type: ADMIN_BANNER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMIN_BANNER_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userAllListAPI(data) {
  return await axios.post(`/api/user/all/list`, data);
}

function* userAllList(action) {
  try {
    const result = yield call(userAllListAPI, action.data);

    yield put({
      type: USER_ALL_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_ALL_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userAdminDeleteAPI(data) {
  return await axios.post(`/api/user/admin/delete`, data);
}

function* userAdminDelete(action) {
  try {
    const result = yield call(userAdminDeleteAPI, action.data);

    yield put({
      type: USER_ADMIN_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_ADMIN_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userAdminIsBlackAPI(data) {
  return await axios.post(`/api/user/admin/isBlack`, data);
}

function* userAdminIsBlack(action) {
  try {
    const result = yield call(userAdminIsBlackAPI, action.data);

    yield put({
      type: USER_ADMIN_ISBLACK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_ADMIN_ISBLACK_FAILURE,
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

function* watchCheckEmail() {
  yield takeLatest(USER_CHECK_EMAIL_REQUEST, checkEmail);
}

function* watchCheckUserId() {
  yield takeLatest(USER_CHECK_USERID_REQUEST, checkUserId);
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

function* watchModifyPassSend() {
  yield takeLatest(MODIFYPASS_SEND_REQUEST, modifyPassSend);
}

function* watchModifyPassChecked() {
  yield takeLatest(MODIFYPASS_CHECKED_REQUEST, modifyPassChecked);
}

function* watchModifyPassUpdate() {
  yield takeLatest(MODIFYPASS_UPDATE_REQUEST, modifyPassUpdate);
}

function* watchAdminUpdate() {
  yield takeLatest(ADMIN_UPDATE_REQUEST, adminUpdate);
}

function* watchMeUpdate() {
  yield takeLatest(ME_UPDATE_REQUEST, meUpdate);
}

function* watchXlsx() {
  yield takeLatest(INSERT_XLSX_REQUEST, insertXlsx);
}

function* watchAdminBanner() {
  yield takeLatest(ADMIN_BANNER_REQUEST, adminBanner);
}

function* watchUserAllList() {
  yield takeLatest(USER_ALL_LIST_REQUEST, userAllList);
}

function* watchUserAdminDelete() {
  yield takeLatest(USER_ADMIN_DELETE_REQUEST, userAdminDelete);
}

function* watchUserAdminIsBlack() {
  yield takeLatest(USER_ADMIN_ISBLACK_REQUEST, userAdminIsBlack);
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
    fork(watchCheckEmail),
    fork(watchCheckUserId),
    fork(watchUserListUpdate),
    fork(watchKakaoLogin),
    fork(watchUserHistory),
    fork(watchMenuRightUp),
    fork(watchAdminUserList),
    fork(watchAdminUserRightHistoryList),
    fork(watchAdminUserExitTrue),
    fork(watchAdminUserExitFalse),
    fork(watchLogout),
    fork(watchModifyPassSend),
    fork(watchModifyPassChecked),
    fork(watchModifyPassUpdate),
    fork(watchAdminUpdate),
    fork(watchMeUpdate),
    fork(watchXlsx),
    fork(watchAdminBanner),
    fork(watchUserAllList),
    fork(watchUserAdminDelete),
    fork(watchUserAdminIsBlack),
    //
  ]);
}
