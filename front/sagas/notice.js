import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  NOTICE_LIST_REQUEST,
  NOTICE_LIST_SUCCESS,
  NOTICE_LIST_FAILURE,
  //
  NOTICE_PAGE_LIST_REQUEST,
  NOTICE_PAGE_LIST_SUCCESS,
  NOTICE_PAGE_LIST_FAILURE,
  //
  NOTICE_DETAIL_REQUEST,
  NOTICE_DETAIL_SUCCESS,
  NOTICE_DETAIL_FAILURE,
  //
  NOTICE_CREATE_REQUEST,
  NOTICE_CREATE_SUCCESS,
  NOTICE_CREATE_FAILURE,
  //
  NOTICE_UPDATE_REQUEST,
  NOTICE_UPDATE_SUCCESS,
  NOTICE_UPDATE_FAILURE,
  //
  NOTICE_DELETE_REQUEST,
  NOTICE_DELETE_SUCCESS,
  NOTICE_DELETE_FAILURE,
  //
  NOTICE_UPDATE_TOP_REQUEST,
  NOTICE_UPDATE_TOP_SUCCESS,
  NOTICE_UPDATE_TOP_FAILURE,
  //
  NOTICE_FILE_REQUEST,
  NOTICE_FILE_SUCCESS,
  NOTICE_FILE_FAILURE,
  //
  NOTICE_FILE_INFO_REQUEST,
  NOTICE_FILE_INFO_SUCCESS,
  NOTICE_FILE_INFO_FAILURE,
  //
  NOTICE_HISTORY_REQUEST,
  NOTICE_HISTORY_SUCCESS,
  NOTICE_HISTORY_FAILURE,
} from "../reducers/notice";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function noticeListAPI(data) {
  return await axios.post(`/api/notice/list`, data);
}

function* noticeList(action) {
  try {
    const result = yield call(noticeListAPI, action.data);

    yield put({
      type: NOTICE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function noticePageListAPI(data) {
  return await axios.post(`/api/notice/page/list`, data);
}

function* noticePageList(action) {
  try {
    const result = yield call(noticePageListAPI, action.data);

    yield put({
      type: NOTICE_PAGE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_PAGE_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function noticeDetailAPI(data) {
  return await axios.post(`/api/notice/detail`, data);
}

function* noticeDetail(action) {
  try {
    const result = yield call(noticeDetailAPI, action.data);

    yield put({
      type: NOTICE_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function noticeCreateAPI(data) {
  return await axios.post(`/api/notice/create`, data);
}

function* noticeCreate(action) {
  try {
    const result = yield call(noticeCreateAPI, action.data);

    yield put({
      type: NOTICE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function noticeUpdateAPI(data) {
  return await axios.post(`/api/notice/update`, data);
}

function* noticeUpdate(action) {
  try {
    const result = yield call(noticeUpdateAPI, action.data);

    yield put({
      type: NOTICE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function noticeDeleteAPI(data) {
  return await axios.delete(`/api/notice/delete/${data.noticeId}`);
}

function* noticeDelete(action) {
  try {
    const result = yield call(noticeDeleteAPI, action.data);

    yield put({
      type: NOTICE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function noticeUpdateTopAPI(data) {
  return await axios.post(`/api/notice/update/top`, data);
}

function* noticeUpdateTop(action) {
  try {
    const result = yield call(noticeUpdateTopAPI, action.data);

    yield put({
      type: NOTICE_UPDATE_TOP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_UPDATE_TOP_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function noticeFileAPI(data) {
  return await axios.post(`/api/notice/file`, data);
}

function* noticeFile(action) {
  try {
    const result = yield call(noticeFileAPI, action.data);

    yield put({
      type: NOTICE_FILE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_FILE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function noticeFileInfoAPI(data) {
  return await axios.post(`/api/notice/update/file`, data);
}

function* noticeFileInfo(action) {
  try {
    const result = yield call(noticeFileInfoAPI, action.data);

    yield put({
      type: NOTICE_FILE_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_FILE_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function noticeHistoryAPI(data) {
  return await axios.post(`/api/notice/history/list`, data);
}

function* noticeHistory(action) {
  try {
    const result = yield call(noticeHistoryAPI, action.data);

    yield put({
      type: NOTICE_HISTORY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_HISTORY_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchNoticeList() {
  yield takeLatest(NOTICE_LIST_REQUEST, noticeList);
}

function* watchNoticePageList() {
  yield takeLatest(NOTICE_PAGE_LIST_REQUEST, noticePageList);
}

function* watchNoticeDetail() {
  yield takeLatest(NOTICE_DETAIL_REQUEST, noticeDetail);
}

function* watchNoticeCreate() {
  yield takeLatest(NOTICE_CREATE_REQUEST, noticeCreate);
}

function* watchNoticeUpdate() {
  yield takeLatest(NOTICE_UPDATE_REQUEST, noticeUpdate);
}

function* watchNoticeDelete() {
  yield takeLatest(NOTICE_DELETE_REQUEST, noticeDelete);
}

function* watchNoticeUpdateTop() {
  yield takeLatest(NOTICE_UPDATE_TOP_REQUEST, noticeUpdateTop);
}

function* watchNoticeFile() {
  yield takeLatest(NOTICE_FILE_REQUEST, noticeFile);
}

function* watchNoticeFileInfo() {
  yield takeLatest(NOTICE_FILE_INFO_REQUEST, noticeFileInfo);
}

function* watchNoticeHistory() {
  yield takeLatest(NOTICE_HISTORY_REQUEST, noticeHistory);
}

//////////////////////////////////////////////////////////////
export default function* noticeSaga() {
  yield all([
    fork(watchNoticeList),
    fork(watchNoticePageList),
    fork(watchNoticeDetail),
    fork(watchNoticeCreate),
    fork(watchNoticeUpdate),
    fork(watchNoticeUpdateTop),
    fork(watchNoticeDelete),
    fork(watchNoticeFile),
    fork(watchNoticeFileInfo),
    fork(watchNoticeHistory),
    //
  ]);
}
