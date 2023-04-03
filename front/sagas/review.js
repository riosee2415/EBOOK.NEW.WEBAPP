import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_LIST_FAILURE,
  /////////////////////////////
  REVIEW_ADMIN_LIST_REQUEST,
  REVIEW_ADMIN_LIST_SUCCESS,
  REVIEW_ADMIN_LIST_FAILURE,
  /////////////////////////////
  REVIEW_DETAIL_REQUEST,
  REVIEW_DETAIL_SUCCESS,
  REVIEW_DETAIL_FAILURE,
  /////////////////////////////
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAILURE,
  /////////////////////////////
  REVIEW_UPDATE_REQUEST,
  REVIEW_UPDATE_SUCCESS,
  REVIEW_UPDATE_FAILURE,
  /////////////////////////////
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
  REVIEW_DELETE_FAILURE,
  /////////////////////////////
  REVIEW_ADMIN_DELETE_REQUEST,
  REVIEW_ADMIN_DELETE_SUCCESS,
  REVIEW_ADMIN_DELETE_FAILURE,
  /////////////////////////////
  REVIEW_ADMIN_ISOK_REQUEST,
  REVIEW_ADMIN_ISOK_SUCCESS,
  REVIEW_ADMIN_ISOK_FAILURE,
  /////////////////////////////
} from "../reducers/review";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function reviewListAPI(data) {
  return await axios.post(`/api/review/list`, data);
}

function* reviewList(action) {
  try {
    const result = yield call(reviewListAPI, action.data);
    yield put({
      type: REVIEW_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_LIST_FAILURE,
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
async function reviewAdminListAPI(data) {
  return await axios.post(`/api/review/admin/list`, data);
}

function* reviewAdminList(action) {
  try {
    const result = yield call(reviewAdminListAPI, action.data);
    yield put({
      type: REVIEW_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_ADMIN_LIST_FAILURE,
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
async function reviewDetailAPI(data) {
  return await axios.post(`/api/review/detail`, data);
}

function* reviewDetail(action) {
  try {
    const result = yield call(reviewDetailAPI, action.data);
    yield put({
      type: REVIEW_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_DETAIL_FAILURE,
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
async function reviewCreateAPI(data) {
  return await axios.post(`/api/review/create`, data);
}

function* reviewCreate(action) {
  try {
    const result = yield call(reviewCreateAPI, action.data);
    yield put({
      type: REVIEW_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_CREATE_FAILURE,
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
async function reviewUpdateAPI(data) {
  return await axios.post(`/api/review/update`, data);
}

function* reviewUpdate(action) {
  try {
    const result = yield call(reviewUpdateAPI, action.data);
    yield put({
      type: REVIEW_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_UPDATE_FAILURE,
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
async function reviewDeleteAPI(data) {
  return await axios.post(`/api/review/delete`, data);
}

function* reviewDelete(action) {
  try {
    const result = yield call(reviewDeleteAPI, action.data);
    yield put({
      type: REVIEW_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_DELETE_FAILURE,
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
async function reviewAdminDeleteAPI(data) {
  return await axios.post(`/api/review/admin/delete`, data);
}

function* reviewAdminDelete(action) {
  try {
    const result = yield call(reviewAdminDeleteAPI, action.data);
    yield put({
      type: REVIEW_ADMIN_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_ADMIN_DELETE_FAILURE,
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
async function reviewAdminIsOkAPI(data) {
  return await axios.post(`/api/review/admin/isOk`, data);
}

function* reviewAdminIsOk(action) {
  try {
    const result = yield call(reviewAdminIsOkAPI, action.data);
    yield put({
      type: REVIEW_ADMIN_ISOK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_ADMIN_ISOK_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

function* watchReviewList() {
  yield takeLatest(REVIEW_LIST_REQUEST, reviewList);
}

function* watchReviewAdminList() {
  yield takeLatest(REVIEW_ADMIN_LIST_REQUEST, reviewAdminList);
}

function* watchReviewDetail() {
  yield takeLatest(REVIEW_DETAIL_REQUEST, reviewDetail);
}

function* watchReviewCreate() {
  yield takeLatest(REVIEW_CREATE_REQUEST, reviewCreate);
}

function* watchReviewUpdate() {
  yield takeLatest(REVIEW_UPDATE_REQUEST, reviewUpdate);
}

function* watchReviewDelete() {
  yield takeLatest(REVIEW_DELETE_REQUEST, reviewDelete);
}

function* watchReviewAdminDelete() {
  yield takeLatest(REVIEW_ADMIN_DELETE_REQUEST, reviewAdminDelete);
}

function* watchReviewAdminOk() {
  yield takeLatest(REVIEW_ADMIN_ISOK_REQUEST, reviewAdminIsOk);
}

//////////////////////////////////////////////////////////////
export default function* reviewSaga() {
  yield all([
    fork(watchReviewList),
    fork(watchReviewAdminList),
    fork(watchReviewDetail),
    fork(watchReviewCreate),
    fork(watchReviewUpdate),
    fork(watchReviewDelete),
    fork(watchReviewAdminDelete),
    fork(watchReviewAdminOk),
    //
  ]);
}
