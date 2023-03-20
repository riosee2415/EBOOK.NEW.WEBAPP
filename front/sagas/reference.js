import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  REFERENCE_LIST_REQUEST,
  REFERENCE_LIST_SUCCESS,
  REFERENCE_LIST_FAILURE,
  /////////////////////////////
  REFERENCE_CREATE_REQUEST,
  REFERENCE_CREATE_SUCCESS,
  REFERENCE_CREATE_FAILURE,
  /////////////////////////////
  REFERENCE_DELETE_REQUEST,
  REFERENCE_DELETE_SUCCESS,
  REFERENCE_DELETE_FAILURE,
  /////////////////////////////
  REFERENCE_UPLOAD_REQUEST,
  REFERENCE_UPLOAD_SUCCESS,
  REFERENCE_UPLOAD_FAILURE,
  /////////////////////////////
} from "../reducers/reference";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function referenceListAPI(data) {
  return await axios.post(`/api/reference/list`, data);
}

function* referenceList(action) {
  try {
    const result = yield call(referenceListAPI, action.data);
    yield put({
      type: REFERENCE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REFERENCE_LIST_FAILURE,
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
async function referenceCreateAPI(data) {
  return await axios.post(`/api/reference/create`, data);
}

function* referenceCreate(action) {
  try {
    const result = yield call(referenceCreateAPI, action.data);
    yield put({
      type: REFERENCE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REFERENCE_CREATE_FAILURE,
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
async function referenceDeleteAPI(data) {
  return await axios.post(`/api/reference/delete`, data);
}

function* referenceDelete(action) {
  try {
    const result = yield call(referenceDeleteAPI, action.data);
    yield put({
      type: REFERENCE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REFERENCE_DELETE_FAILURE,
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
async function referenceUploadAPI(data) {
  return await axios.post(`/api/reference/file`, data);
}

function* referenceUpload(action) {
  try {
    const result = yield call(referenceUploadAPI, action.data);
    yield put({
      type: REFERENCE_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REFERENCE_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

function* watchReferenceList() {
  yield takeLatest(REFERENCE_LIST_REQUEST, referenceList);
}

function* watchReferenceCreate() {
  yield takeLatest(REFERENCE_CREATE_REQUEST, referenceCreate);
}

function* watchReferenceDelete() {
  yield takeLatest(REFERENCE_DELETE_REQUEST, referenceDelete);
}

function* watchReferenceUpload() {
  yield takeLatest(REFERENCE_UPLOAD_REQUEST, referenceUpload);
}

//////////////////////////////////////////////////////////////
export default function* referenceSaga() {
  yield all([
    fork(watchReferenceList),
    fork(watchReferenceCreate),
    fork(watchReferenceDelete),
    fork(watchReferenceUpload),

    //
  ]);
}
