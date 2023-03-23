import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  BOUGHT_ADMIN_LIST_REQUEST,
  BOUGHT_ADMIN_LIST_SUCCESS,
  BOUGHT_ADMIN_LIST_FAILURE,
  //
  BOUGHT_ADMIN_ID_REQUEST,
  BOUGHT_ADMIN_ID_SUCCESS,
  BOUGHT_ADMIN_ID_FAILURE,
  //
  BOUGHT_ADMIN_CREATE_REQUEST,
  BOUGHT_ADMIN_CREATE_SUCCESS,
  BOUGHT_ADMIN_CREATE_FAILURE,
  //
  BOUGHT_ADMIN_UPDATE_REQUEST,
  BOUGHT_ADMIN_UPDATE_SUCCESS,
  BOUGHT_ADMIN_UPDATE_FAILURE,
  //
  BOUGHT_ADMIN_DELETE_REQUEST,
  BOUGHT_ADMIN_DELETE_SUCCESS,
  BOUGHT_ADMIN_DELETE_FAILURE,
  //
  BOUGHT_CREATE_REQUEST,
  BOUGHT_CREATE_SUCCESS,
  BOUGHT_CREATE_FAILURE,
  //
  BOUGHT_ISPAY_UPDATE_REQUEST,
  BOUGHT_ISPAY_UPDATE_SUCCESS,
  BOUGHT_ISPAY_UPDATE_FAILURE,
  //
  BOUGHT_ADDRESS_UPDATE_REQUEST,
  BOUGHT_ADDRESS_UPDATE_SUCCESS,
  BOUGHT_ADDRESS_UPDATE_FAILURE,
  //
} from "../reducers/boughtLecture";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function boughtAdminListAPI(data) {
  return await axios.post(`/api/bought/admin/list`, data);
}

function* boughtAdminList(action) {
  try {
    const result = yield call(boughtAdminListAPI, action.data);

    yield put({
      type: BOUGHT_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_ADMIN_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function boughtAdminIdAPI(data) {
  return await axios.post(`/api/bought/admin/bought`, data);
}

function* boughtAdminId(action) {
  try {
    const result = yield call(boughtAdminIdAPI, action.data);

    yield put({
      type: BOUGHT_ADMIN_ID_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_ADMIN_ID_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function boughtAdminCreateAPI(data) {
  return await axios.post(`/api/bought/admin/create`, data);
}

function* boughtAdminCreate(action) {
  try {
    const result = yield call(boughtAdminCreateAPI, action.data);

    yield put({
      type: BOUGHT_ADMIN_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_ADMIN_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function boughtAdminUpdateAPI(data) {
  return await axios.post(`/api/bought/admin/update`, data);
}

function* boughtAdminUpdate(action) {
  try {
    const result = yield call(boughtAdminUpdateAPI, action.data);

    yield put({
      type: BOUGHT_ADMIN_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_ADMIN_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function boughtAdminDeleteAPI(data) {
  return await axios.post(`/api/bought/admin/delete`, data);
}

function* boughtAdminDelete(action) {
  try {
    const result = yield call(boughtAdminDeleteAPI, action.data);

    yield put({
      type: BOUGHT_ADMIN_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_ADMIN_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function boughtCreateAPI(data) {
  return await axios.post(`/api/bought/create`, data);
}

function* boughtCreate(action) {
  try {
    const result = yield call(boughtCreateAPI, action.data);

    yield put({
      type: BOUGHT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function boughtIsPayUpdateAPI(data) {
  return await axios.post(`/api/bought/isPay/update`, data);
}

function* boughtIsPayUpdate(action) {
  try {
    const result = yield call(boughtIsPayUpdateAPI, action.data);

    yield put({
      type: BOUGHT_ISPAY_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_ISPAY_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function boughtAddressUpdateAPI(data) {
  return await axios.post(`/api/bought/address/update`, data);
}

function* boughtAddressUpdate(action) {
  try {
    const result = yield call(boughtAddressUpdateAPI, action.data);

    yield put({
      type: BOUGHT_ADDRESS_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_ADDRESS_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchBoughtAdminList() {
  yield takeLatest(BOUGHT_ADMIN_LIST_REQUEST, boughtAdminList);
}

function* watchBoughtCreate() {
  yield takeLatest(BOUGHT_CREATE_REQUEST, boughtCreate);
}

function* watchBoughtIsPayUpdate() {
  yield takeLatest(BOUGHT_ISPAY_UPDATE_REQUEST, boughtIsPayUpdate);
}

function* watchBoughtAddressUpdate() {
  yield takeLatest(BOUGHT_ADDRESS_UPDATE_REQUEST, boughtAddressUpdate);
}

function* watchBoughtAdminId() {
  yield takeLatest(BOUGHT_ADMIN_ID_REQUEST, boughtAdminId);
}

function* watchBoughtAdminCreate() {
  yield takeLatest(BOUGHT_ADMIN_CREATE_REQUEST, boughtAdminCreate);
}

function* watchBoughtAdminUpdate() {
  yield takeLatest(BOUGHT_ADMIN_UPDATE_REQUEST, boughtAdminUpdate);
}

function* watchBoughtAdminDelete() {
  yield takeLatest(BOUGHT_ADMIN_DELETE_REQUEST, boughtAdminDelete);
}

//////////////////////////////////////////////////////////////
export default function* boughtLectureSaga() {
  yield all([
    fork(watchBoughtAdminList),
    fork(watchBoughtCreate),
    fork(watchBoughtIsPayUpdate),
    fork(watchBoughtAddressUpdate),
    fork(watchBoughtAdminId),
    fork(watchBoughtAdminCreate),
    fork(watchBoughtAdminUpdate),
    fork(watchBoughtAdminDelete),
    //
  ]);
}
