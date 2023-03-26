import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ADMIN_USER_ENJOY_REQUEST,
  ADMIN_USER_ENJOY_SUCCESS,
  ADMIN_USER_ENJOY_FAILURE,
  //
  ENJOY_ME_LIST_REQUEST,
  ENJOY_ME_LIST_SUCCESS,
  ENJOY_ME_LIST_FAILURE,
  //
  ENJOY_CREATE_REQUEST,
  ENJOY_CREATE_SUCCESS,
  ENJOY_CREATE_FAILURE,
} from "../reducers/enjoy";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function enjoyAdminListAPI(data) {
  return await axios.post(`/api/enjoy/admin/list`, data);
}

function* enjoyAdminList(action) {
  try {
    const result = yield call(enjoyAdminListAPI, action.data);

    yield put({
      type: ADMIN_USER_ENJOY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMIN_USER_ENJOY_FAILURE,
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
async function enjoyMeListAPI(data) {
  return await axios.post(`/api/enjoy/me/list`, data);
}

function* enjoyMeList(action) {
  try {
    const result = yield call(enjoyMeListAPI, action.data);

    yield put({
      type: ENJOY_ME_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ENJOY_ME_LIST_FAILURE,
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
async function enjoyCreateAPI(data) {
  return await axios.post(`/api/enjoy/create`, data);
}

function* enjoyCreate(action) {
  try {
    const result = yield call(enjoyCreateAPI, action.data);

    yield put({
      type: ENJOY_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ENJOY_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchEnjoyAdminList() {
  yield takeLatest(ADMIN_USER_ENJOY_REQUEST, enjoyAdminList);
}

function* watchEnjoyMeList() {
  yield takeLatest(ENJOY_ME_LIST_REQUEST, enjoyMeList);
}

function* watchEnjoyCreate() {
  yield takeLatest(ENJOY_CREATE_REQUEST, enjoyCreate);
}

//////////////////////////////////////////////////////////////
export default function* enjoySaga() {
  yield all([
    fork(watchEnjoyAdminList),
    fork(watchEnjoyMeList),
    fork(watchEnjoyCreate),

    //
  ]);
}
