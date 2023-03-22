import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  BOUGHT_ADMIN_LIST_REQUEST,
  BOUGHT_ADMIN_LIST_SUCCESS,
  BOUGHT_ADMIN_LIST_FAILURE,
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

//////////////////////////////////////////////////////////////
export default function* boughtLectureSaga() {
  yield all([
    fork(watchBoughtAdminList),
    fork(watchBoughtCreate),
    fork(watchBoughtIsPayUpdate),
    fork(watchBoughtAddressUpdate),
    //
  ]);
}
