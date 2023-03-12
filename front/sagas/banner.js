import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  BANNER_LIST_REQUEST,
  BANNER_LIST_SUCCESS,
  BANNER_LIST_FAILURE,
  //
  BANNER_CREATE_REQUEST,
  BANNER_CREATE_SUCCESS,
  BANNER_CREATE_FAILURE,
  //
  BANNER_UPDATE_REQUEST,
  BANNER_UPDATE_SUCCESS,
  BANNER_UPDATE_FAILURE,
  //
  BANNER_SORT_UPDATE_REQUEST,
  BANNER_SORT_UPDATE_SUCCESS,
  BANNER_SORT_UPDATE_FAILURE,
  //
  BANNER_DELETE_REQUEST,
  BANNER_DELETE_SUCCESS,
  BANNER_DELETE_FAILURE,
  //
  BANNER_UPLOAD_REQUEST,
  BANNER_UPLOAD_SUCCESS,
  BANNER_UPLOAD_FAILURE,
  //
  BANNER_MOBILE_UPLOAD_REQUEST,
  BANNER_MOBILE_UPLOAD_SUCCESS,
  BANNER_MOBILE_UPLOAD_FAILURE,
} from "../reducers/banner";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function bannerListAPI(data) {
  return await axios.post(`/api/banner/list`, data);
}

function* bannerList(action) {
  try {
    const result = yield call(bannerListAPI, action.data);

    yield put({
      type: BANNER_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BANNER_LIST_FAILURE,
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
async function bannerCreateAPI(data) {
  return await axios.post(`/api/banner/create`, data);
}

function* bannerCreate(action) {
  try {
    const result = yield call(bannerCreateAPI, action.data);

    yield put({
      type: BANNER_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BANNER_CREATE_FAILURE,
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
async function bannerUpdateAPI(data) {
  return await axios.post(`/api/banner/update`, data);
}

function* bannerUpdate(action) {
  try {
    const result = yield call(bannerUpdateAPI, action.data);

    yield put({
      type: BANNER_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BANNER_UPDATE_FAILURE,
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
async function bannerSortUpdateAPI(data) {
  return await axios.post(`/api/banner/sort/update`, data);
}

function* bannerSortUpdate(action) {
  try {
    const result = yield call(bannerSortUpdateAPI, action.data);

    yield put({
      type: BANNER_SORT_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BANNER_SORT_UPDATE_FAILURE,
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
async function bannerDeleteAPI(data) {
  return await axios.post(`/api/banner/delete`, data);
}

function* bannerDelete(action) {
  try {
    const result = yield call(bannerDeleteAPI, action.data);

    yield put({
      type: BANNER_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BANNER_DELETE_FAILURE,
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
async function bannerUploadAPI(data) {
  return await axios.post(`/api/banner/image`, data);
}

function* bannerUpload(action) {
  try {
    const result = yield call(bannerUploadAPI, action.data);

    yield put({
      type: BANNER_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BANNER_UPLOAD_FAILURE,
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
async function bannerMobileUploadAPI(data) {
  return await axios.post(`/api/banner/image`, data);
}

function* bannerMobileUpload(action) {
  try {
    const result = yield call(bannerMobileUploadAPI, action.data);

    yield put({
      type: BANNER_MOBILE_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BANNER_MOBILE_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchBannerList() {
  yield takeLatest(BANNER_LIST_REQUEST, bannerList);
}
function* watchBannerCreate() {
  yield takeLatest(BANNER_CREATE_REQUEST, bannerCreate);
}
function* watchBannerUpdate() {
  yield takeLatest(BANNER_UPDATE_REQUEST, bannerUpdate);
}
function* watchBannerSortUpdate() {
  yield takeLatest(BANNER_SORT_UPDATE_REQUEST, bannerSortUpdate);
}
function* watchBannerDelete() {
  yield takeLatest(BANNER_DELETE_REQUEST, bannerDelete);
}
function* watchBannerUpload() {
  yield takeLatest(BANNER_UPLOAD_REQUEST, bannerUpload);
}
function* watchBannerMobileUpload() {
  yield takeLatest(BANNER_MOBILE_UPLOAD_REQUEST, bannerMobileUpload);
}

//////////////////////////////////////////////////////////////
export default function* bannerSaga() {
  yield all([
    fork(watchBannerList),
    fork(watchBannerCreate),
    fork(watchBannerUpdate),
    fork(watchBannerSortUpdate),
    fork(watchBannerDelete),
    fork(watchBannerUpload),
    fork(watchBannerMobileUpload),

    //
  ]);
}
