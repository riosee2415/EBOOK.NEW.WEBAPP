import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  MEDIA_ADMIN_LIST_REQUEST,
  MEDIA_ADMIN_LIST_SUCCESS,
  MEDIA_ADMIN_LIST_FAILURE,
  //
  MEDIA_FILE_UPLOAD_REQUEST,
  MEDIA_FILE_UPLOAD_SUCCESS,
  MEDIA_FILE_UPLOAD_FAILURE,
  //
  MEDIA_CREATE_REQUEST,
  MEDIA_CREATE_SUCCESS,
  MEDIA_CREATE_FAILURE,
  //
  MEDIA_UPDATE_REQUEST,
  MEDIA_UPDATE_SUCCESS,
  MEDIA_UPDATE_FAILURE,
  //
  MEDIA_DELETE_REQUEST,
  MEDIA_DELETE_SUCCESS,
  MEDIA_DELETE_FAILURE,
} from "../reducers/media";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function mediaAdminListAPI(data) {
  return await axios.post(`/api/media/admin/list`, data);
}

function* mediaAdminList(action) {
  try {
    const result = yield call(mediaAdminListAPI, action.data);

    yield put({
      type: MEDIA_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MEDIA_ADMIN_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function mediaFileUploadAPI(data) {
  return await axios.post(`/api/media/file`, data);
}

function* mediaFileUpload(action) {
  try {
    const result = yield call(mediaFileUploadAPI, action.data);

    yield put({
      type: MEDIA_FILE_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MEDIA_FILE_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function mediaCreateAPI(data) {
  return await axios.post(`/api/media/create`, data);
}

function* mediaCreate(action) {
  try {
    const result = yield call(mediaCreateAPI, action.data);

    yield put({
      type: MEDIA_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MEDIA_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function mediaUpdateAPI(data) {
  return await axios.post(`/api/media/update`, data);
}

function* mediaUpdate(action) {
  try {
    const result = yield call(mediaUpdateAPI, action.data);

    yield put({
      type: MEDIA_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MEDIA_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function mediaDeleteAPI(data) {
  return await axios.post(`/api/media/delete`, data);
}

function* mediaDelete(action) {
  try {
    const result = yield call(mediaDeleteAPI, action.data);

    yield put({
      type: MEDIA_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MEDIA_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchMediaAdminList() {
  yield takeLatest(MEDIA_ADMIN_LIST_REQUEST, mediaAdminList);
}

function* watchMediaFileUpload() {
  yield takeLatest(MEDIA_FILE_UPLOAD_REQUEST, mediaFileUpload);
}

function* watchMediaCreate() {
  yield takeLatest(MEDIA_CREATE_REQUEST, mediaCreate);
}

function* watchMediaUpdate() {
  yield takeLatest(MEDIA_UPDATE_REQUEST, mediaUpdate);
}

function* watchMediaDelete() {
  yield takeLatest(MEDIA_DELETE_REQUEST, mediaDelete);
}

//////////////////////////////////////////////////////////////
export default function* mediaSaga() {
  yield all([
    fork(watchMediaAdminList),
    fork(watchMediaFileUpload),
    fork(watchMediaCreate),
    fork(watchMediaUpdate),
    fork(watchMediaDelete),
    //
  ]);
}
