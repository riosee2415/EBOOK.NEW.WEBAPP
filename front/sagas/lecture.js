import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LECTURE_LIST_REQUEST,
  LECTURE_LIST_SUCCESS,
  LECTURE_LIST_FAILURE,
  //
  LECTURE_ADMIN_LIST_REQUEST,
  LECTURE_ADMIN_LIST_SUCCESS,
  LECTURE_ADMIN_LIST_FAILURE,
  //
  LECTURE_DETAIL_REQUEST,
  LECTURE_DETAIL_SUCCESS,
  LECTURE_DETAIL_FAILURE,
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
  //
  TAG_LIST_REQUEST,
  TAG_LIST_SUCCESS,
  TAG_LIST_FAILURE,
  //
  TAG_CREATE_REQUEST,
  TAG_CREATE_SUCCESS,
  TAG_CREATE_FAILURE,
  //
  TAG_DELETE_REQUEST,
  TAG_DELETE_SUCCESS,
  TAG_DELETE_FAILURE,
  //
  LECTURE_TAG_LIST_REQUEST,
  LECTURE_TAG_LIST_SUCCESS,
  LECTURE_TAG_LIST_FAILURE,
  //
  LECTURE_TAG_CREATE_REQUEST,
  LECTURE_TAG_CREATE_SUCCESS,
  LECTURE_TAG_CREATE_FAILURE,
  //
  LECTURE_TAG_DELETE_REQUEST,
  LECTURE_TAG_DELETE_SUCCESS,
  LECTURE_TAG_DELETE_FAILURE,
} from "../reducers/lecture";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function lectureListAPI(data) {
  return await axios.post(`/api/lecture/list`, data);
}

function* lectureList(action) {
  try {
    const result = yield call(lectureListAPI, action.data);

    yield put({
      type: LECTURE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LECTURE_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

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
async function lectureDetailAPI(data) {
  return await axios.post(`/api/lecture/detail`, data);
}

function* lectureDetail(action) {
  try {
    const result = yield call(lectureDetailAPI, action.data);

    yield put({
      type: LECTURE_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LECTURE_DETAIL_FAILURE,
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

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function tagListAPI(data) {
  return await axios.post(`/api/lecture/tag/list`, data);
}

function* tagList(action) {
  try {
    const result = yield call(tagListAPI, action.data);

    yield put({
      type: TAG_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: TAG_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function tagCreateAPI(data) {
  return await axios.post(`/api/lecture/tag/create`, data);
}

function* tagCreate(action) {
  try {
    const result = yield call(tagCreateAPI, action.data);

    yield put({
      type: TAG_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: TAG_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function tagDeleteAPI(data) {
  return await axios.post(`/api/lecture/tag/delete`, data);
}

function* tagDelete(action) {
  try {
    const result = yield call(tagDeleteAPI, action.data);

    yield put({
      type: TAG_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: TAG_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function lectureTagListAPI(data) {
  return await axios.post(`/api/lecture/tag/tagList`, data);
}

function* lectureTagList(action) {
  try {
    const result = yield call(lectureTagListAPI, action.data);

    yield put({
      type: LECTURE_TAG_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LECTURE_TAG_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function lectureTagCreateAPI(data) {
  return await axios.post(`/api/lecture/tag/tagCreate`, data);
}

function* lectureTagCreate(action) {
  try {
    const result = yield call(lectureTagCreateAPI, action.data);

    yield put({
      type: LECTURE_TAG_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LECTURE_TAG_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function lectureTagDeleteAPI(data) {
  return await axios.post(`/api/lecture/tag/tagDelete`, data);
}

function* lectureTagDelete(action) {
  try {
    const result = yield call(lectureTagDeleteAPI, action.data);

    yield put({
      type: LECTURE_TAG_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LECTURE_TAG_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchLectureList() {
  yield takeLatest(LECTURE_LIST_REQUEST, lectureList);
}

function* watchLectureAdminList() {
  yield takeLatest(LECTURE_ADMIN_LIST_REQUEST, lectureAdminList);
}

function* watchLectureDetail() {
  yield takeLatest(LECTURE_DETAIL_REQUEST, lectureDetail);
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

function* watchTagList() {
  yield takeLatest(TAG_LIST_REQUEST, tagList);
}

function* watchTagCreate() {
  yield takeLatest(TAG_CREATE_REQUEST, tagCreate);
}

function* watchTagDelete() {
  yield takeLatest(TAG_DELETE_REQUEST, tagDelete);
}

function* watchLectureTagList() {
  yield takeLatest(LECTURE_TAG_LIST_REQUEST, lectureTagList);
}

function* watchLectureTagCreate() {
  yield takeLatest(LECTURE_TAG_CREATE_REQUEST, lectureTagCreate);
}

function* watchLectureTagDelete() {
  yield takeLatest(LECTURE_TAG_DELETE_REQUEST, lectureTagDelete);
}

//////////////////////////////////////////////////////////////
export default function* lectureSaga() {
  yield all([
    fork(watchLectureList),
    fork(watchLectureAdminList),
    fork(watchLectureDetail),
    fork(watchLectureImageUpload),
    fork(watchlectureCreate),
    fork(watchlectureUpdate),
    fork(watchLectureDelete),
    fork(watchTagList),
    fork(watchTagCreate),
    fork(watchTagDelete),
    fork(watchLectureTagList),
    fork(watchLectureTagCreate),
    fork(watchLectureTagDelete),
    //
  ]);
}
