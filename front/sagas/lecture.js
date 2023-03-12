import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LECTURE_ADMIN_LIST_REQUEST,
  LECTURE_ADMIN_LIST_SUCCESS,
  LECTURE_ADMIN_LIST_FAILURE,
  //
  LECTURE_IMAGE_UPLOAD_REQUEST,
  LECTURE_IMAGE_UPLOAD_SUCCESS,
  LECTURE_IMAGE_UPLOAD_FAILURE,
  //
  LECTURE_CREATE_REQUEST,
  LECTURE_CREATE_SUCCESS,
  LECTURE_CREATE_FAILURE,
  //
  LECTURE_UPDATE_REQUEST,
  LECTURE_UPDATE_SUCCESS,
  LECTURE_UPDATE_FAILURE,
  //
  LECTURE_DELETE_REQUEST,
  LECTURE_DELETE_SUCCESS,
  LECTURE_DELETE_FAILURE,
} from "../reducers/lecture";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function lectureAdminListAPI(data) {
  return await axios.post(`/api/lecture/admin/list`, data);
}

function* lectureAdminList(action) {
  try {
    const result = yield call(lectureAdminListAPI, action.data);

    yield put({
      type: LECTURE_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LECTURE_ADMIN_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function lectureImageUploadAPI(data) {
  return await axios.post(`/api/lecture/image`, data);
}

function* lectureImageUpload(action) {
  try {
    const result = yield call(lectureImageUploadAPI, action.data);

    yield put({
      type: LECTURE_IMAGE_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LECTURE_IMAGE_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function lectureCreateAPI(data) {
  return await axios.post(`/api/lecture/create`, data);
}

function* lectureCreate(action) {
  try {
    const result = yield call(lectureCreateAPI, action.data);

    yield put({
      type: LECTURE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LECTURE_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function lectureUpdateAPI(data) {
  return await axios.post(`/api/lecture/update`, data);
}

function* lectureUpdate(action) {
  try {
    const result = yield call(lectureUpdateAPI, action.data);

    yield put({
      type: LECTURE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LECTURE_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function lectureDeleteAPI(data) {
  return await axios.post(`/api/lecture/delete`, data);
}

function* lectureDelete(action) {
  try {
    const result = yield call(lectureDeleteAPI, action.data);

    yield put({
      type: LECTURE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LECTURE_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchLectureAdminList() {
  yield takeLatest(LECTURE_ADMIN_LIST_REQUEST, lectureAdminList);
}

function* watchLectureImageUpload() {
  yield takeLatest(LECTURE_IMAGE_UPLOAD_REQUEST, lectureImageUpload);
}

function* watchlectureCreate() {
  yield takeLatest(LECTURE_CREATE_REQUEST, lectureCreate);
}

function* watchlectureUpdate() {
  yield takeLatest(LECTURE_UPDATE_REQUEST, lectureUpdate);
}

function* watchLectureDelete() {
  yield takeLatest(LECTURE_DELETE_REQUEST, lectureDelete);
}

//////////////////////////////////////////////////////////////
export default function* lectureSaga() {
  yield all([
    fork(watchLectureAdminList),
    fork(watchLectureImageUpload),
    fork(watchlectureCreate),
    fork(watchlectureUpdate),
    fork(watchLectureDelete),
    //
  ]);
}
