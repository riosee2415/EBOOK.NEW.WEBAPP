import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOGO_GET_REQUEST,
  LOGO_GET_SUCCESS,
  LOGO_GET_FAILURE,
  //
  LOGO_HEADER_IMAGE_REQUEST,
  LOGO_HEADER_IMAGE_SUCCESS,
  LOGO_HEADER_IMAGE_FAILURE,
  //
  LOGO_FOOTER_IMAGE_REQUEST,
  LOGO_FOOTER_IMAGE_SUCCESS,
  LOGO_FOOTER_IMAGE_FAILURE,
  //
  LOGO_HISTORY_REQUEST,
  LOGO_HISTORY_SUCCESS,
  LOGO_HISTORY_FAILURE,
} from "../reducers/logo";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function logoGetAPI(data) {
  return await axios.get(`/api/logo/get`);
}

function* logoGet(action) {
  try {
    const result = yield call(logoGetAPI, action.data);

    yield put({
      type: LOGO_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGO_GET_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function logoHeaderImageAPI(data) {
  return await axios.post(`/api/logo/imageHeader`, data);
}

function* logoHeaderImage(action) {
  try {
    const result = yield call(logoHeaderImageAPI, action.data);

    yield put({
      type: LOGO_HEADER_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGO_HEADER_IMAGE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function logoFooterImageAPI(data) {
  return await axios.post(`/api/logo/imageFooter`, data);
}

function* logoFooterImage(action) {
  try {
    const result = yield call(logoFooterImageAPI, action.data);

    yield put({
      type: LOGO_FOOTER_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGO_FOOTER_IMAGE_FAILURE,
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
async function logoHistoryAPI(data) {
  return await axios.post(`/api/logo/history/list`, data);
}

function* logoHistory(action) {
  try {
    const result = yield call(logoHistoryAPI, action.data);

    yield put({
      type: LOGO_HISTORY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGO_HISTORY_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchLogoGet() {
  yield takeLatest(LOGO_GET_REQUEST, logoGet);
}

function* watchLogoHeaderImage() {
  yield takeLatest(LOGO_HEADER_IMAGE_REQUEST, logoHeaderImage);
}

function* watchLogoFooterImage() {
  yield takeLatest(LOGO_FOOTER_IMAGE_REQUEST, logoFooterImage);
}

function* watchHistory() {
  yield takeLatest(LOGO_HISTORY_REQUEST, logoHistory);
}

//////////////////////////////////////////////////////////////
export default function* logoSaga() {
  yield all([
    fork(watchLogoGet),
    fork(watchLogoHeaderImage),
    fork(watchLogoFooterImage),
    fork(watchHistory),
    //
  ]);
}
