import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FAQTYPE_LIST_REQUEST,
  FAQTYPE_LIST_SUCCESS,
  FAQTYPE_LIST_FAILURE,
  //
  FAQTYPE_DELETE_REQUEST,
  FAQTYPE_DELETE_SUCCESS,
  FAQTYPE_DELETE_FAILURE,
  //
  FAQTYPE_ADD_REQUEST,
  FAQTYPE_ADD_SUCCESS,
  FAQTYPE_ADD_FAILURE,
} from "../reducers/faq";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function faqTypeListAPI(data) {
  return await axios.post("/api/faq/type/list", data);
}

function* faqTypeList(action) {
  try {
    const result = yield call(faqTypeListAPI, action.data);

    yield put({
      type: FAQTYPE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQTYPE_LIST_FAILURE,
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
async function faqTypeDeleteAPI(data) {
  return await axios.post("/api/faq/type/delete", data);
}

function* faqTypeDelete(action) {
  try {
    const result = yield call(faqTypeDeleteAPI, action.data);

    yield put({
      type: FAQTYPE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQTYPE_DELETE_FAILURE,
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
async function faqTypeAddAPI(data) {
  return await axios.post("/api/faq/type/create", data);
}

function* faqTypeAdd(action) {
  try {
    const result = yield call(faqTypeAddAPI, action.data);

    yield put({
      type: FAQTYPE_ADD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQTYPE_ADD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchFaqTypeList() {
  yield takeLatest(FAQTYPE_LIST_REQUEST, faqTypeList);
}

function* watchFaqTypeDelete() {
  yield takeLatest(FAQTYPE_DELETE_REQUEST, faqTypeDelete);
}

function* watchFaqTypeAdd() {
  yield takeLatest(FAQTYPE_ADD_REQUEST, faqTypeAdd);
}

//////////////////////////////////////////////////////////////
export default function* faqSaga() {
  yield all([
    fork(watchFaqTypeList),
    fork(watchFaqTypeDelete),
    fork(watchFaqTypeAdd),
    //
  ]);
}
