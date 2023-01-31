import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  MAIN_BANNER_REQUEST,
  MAIN_BANNER_SUCCESS,
  MAIN_BANNER_FAILURE,
  /////////////////////////////
  BANNER_UPLOAD_REQUEST,
  BANNER_UPLOAD_SUCCESS,
  BANNER_UPLOAD_FAILURE,
  /////////////////////////////
  BANNER_UPDATE_REQUEST,
  BANNER_UPDATE_SUCCESS,
  BANNER_UPDATE_FAILURE,
  /////////////////////////////
  BANNER_CREATE_REQUEST,
  BANNER_CREATE_SUCCESS,
  BANNER_CREATE_FAILURE,
  /////////////////////////////
  BANNER_DELETE_REQUEST,
  BANNER_DELETE_SUCCESS,
  BANNER_DELETE_FAILURE,
  /////////////////////////////
  BANNER_SORT_UPDATE_REQUEST,
  BANNER_SORT_UPDATE_SUCCESS,
  BANNER_SORT_UPDATE_FAILURE,
  /////////////////////////////
  BANNER_ONLY_IMAGE_REQUEST,
  BANNER_ONLY_IMAGE_SUCCESS,
  BANNER_ONLY_IMAGE_FAILURE,
  /////////////////////////////
  BANNER_USE_YN_REQUEST,
  BANNER_USE_YN_SUCCESS,
  BANNER_USE_YN_FAILURE,
  /////////////////////////////
  BANNER_FAST_CREATE_REQUEST,
  BANNER_FAST_CREATE_SUCCESS,
  BANNER_FAST_CREATE_FAILURE,
  /////////////////////////////
  BANNER_HISTORY_REQUEST,
  BANNER_HISTORY_SUCCESS,
  BANNER_HISTORY_FAILURE,
} from "../reducers/banner";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function mainBannerAPI() {
  return await axios.post(`/api/banner/list`);
}

function* mainBanner() {
  try {
    const result = yield call(mainBannerAPI);

    yield put({
      type: MAIN_BANNER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MAIN_BANNER_FAILURE,
      error: err.response.data,
    });
  }
}

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

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function bannerSortAPI(data) {
  return await axios.post(`/api/banner/sort/update`, data);
}

function* bannerSort(action) {
  try {
    const result = yield call(bannerSortAPI, action.data);

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

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function bannerOnlyImageAPI(data) {
  return await axios.post(`/api/banner/imageUpdate`, data);
}

function* bannerOnlyImage(action) {
  try {
    const result = yield call(bannerOnlyImageAPI, action.data);

    yield put({
      type: BANNER_ONLY_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BANNER_ONLY_IMAGE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function bannerUseYnAPI(data) {
  return await axios.post(`/api/banner/updateUseYn`, data);
}

function* bannerUseYn(action) {
  try {
    const result = yield call(bannerUseYnAPI, action.data);

    yield put({
      type: BANNER_USE_YN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BANNER_USE_YN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function bannerFastCreateAPI(data) {
  return await axios.post(`/api/banner/fastCreate`, data);
}

function* bannerFastCreate(action) {
  try {
    const result = yield call(bannerFastCreateAPI, action.data);

    yield put({
      type: BANNER_FAST_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BANNER_FAST_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function bannerHistoryAPI(data) {
  return await axios.post(`/api/banner/history/list`, data);
}

function* bannerHistory(action) {
  try {
    const result = yield call(bannerHistoryAPI, action.data);

    yield put({
      type: BANNER_HISTORY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BANNER_HISTORY_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchMainBanner() {
  yield takeLatest(MAIN_BANNER_REQUEST, mainBanner);
}

function* watchMainBannerUpdate() {
  yield takeLatest(BANNER_UPDATE_REQUEST, bannerUpdate);
}

// 베너 이미지만 업로드 하는 코드 (데이터베이스에는 접근하지 않습니다.)
function* watchBannerUpload() {
  yield takeLatest(BANNER_UPLOAD_REQUEST, bannerUpload);
}

function* watchBannerCreate() {
  yield takeLatest(BANNER_CREATE_REQUEST, bannerCreate);
}

function* watchBannerDelete() {
  yield takeLatest(BANNER_DELETE_REQUEST, bannerDelete);
}

function* watchBannerSort() {
  yield takeLatest(BANNER_SORT_UPDATE_REQUEST, bannerSort);
}

function* watchBannerOnlyImage() {
  yield takeLatest(BANNER_ONLY_IMAGE_REQUEST, bannerOnlyImage);
}

function* watchBannerUseYn() {
  yield takeLatest(BANNER_USE_YN_REQUEST, bannerUseYn);
}

function* watchBannerFastCreate() {
  yield takeLatest(BANNER_FAST_CREATE_REQUEST, bannerFastCreate);
}

function* watchBannerHistory() {
  yield takeLatest(BANNER_HISTORY_REQUEST, bannerHistory);
}

//////////////////////////////////////////////////////////////
export default function* bannerSaga() {
  yield all([
    fork(watchMainBanner),
    fork(watchBannerUpload),
    fork(watchMainBannerUpdate),
    fork(watchBannerCreate),
    fork(watchBannerDelete),
    fork(watchBannerSort),
    fork(watchBannerOnlyImage),
    fork(watchBannerUseYn),
    fork(watchBannerFastCreate),
    fork(watchBannerHistory),
    //
  ]);
}
