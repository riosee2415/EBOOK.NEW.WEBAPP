import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LEVEL_REQUEST,
  LEVEL_SUCCESS,
  LEVEL_FAILURE,
  //
  LEVEL_UPDATE_REQUEST,
  LEVEL_UPDATE_SUCCESS,
  LEVEL_UPDATE_FAILURE,
  //
  LEVEL_TOGGLE_REQUEST,
  LEVEL_TOGGLE_SUCCESS,
  LEVEL_TOGGLE_FAILURE,
  //
  ZOOM_LEC_LIST_REQUEST,
  ZOOM_LEC_LIST_SUCCESS,
  ZOOM_LEC_LIST_FAILURE,
  //
  ZOOM_LEC_CREATE_REQUEST,
  ZOOM_LEC_CREATE_SUCCESS,
  ZOOM_LEC_CREATE_FAILURE,
  //
  ZOOM_LEC_UPDATE_REQUEST,
  ZOOM_LEC_UPDATE_SUCCESS,
  ZOOM_LEC_UPDATE_FAILURE,
  //
  ZOOM_LEC_ADD_PEOPLE_REQUEST,
  ZOOM_LEC_ADD_PEOPLE_SUCCESS,
  ZOOM_LEC_ADD_PEOPLE_FAILURE,
  //
  ZOOM_LEC_DETAIL_REQUEST,
  ZOOM_LEC_DETAIL_SUCCESS,
  ZOOM_LEC_DETAIL_FAILURE,
  //
  ZOOM_LEC_MY_REQUEST,
  ZOOM_LEC_MY_SUCCESS,
  ZOOM_LEC_MY_FAILURE,
  //
  ZOOM_LEC_HISTORY_REQUEST,
  ZOOM_LEC_HISTORY_SUCCESS,
  ZOOM_LEC_HISTORY_FAILURE,
  //
  ZOOM_LEC_HISTORY_ADD_REQUEST,
  ZOOM_LEC_HISTORY_ADD_SUCCESS,
  ZOOM_LEC_HISTORY_ADD_FAILURE,
  //
  ZOOM_LEC_HISTORY_DELETE_REQUEST,
  ZOOM_LEC_HISTORY_DELETE_SUCCESS,
  ZOOM_LEC_HISTORY_DELETE_FAILURE,
  //
  ZOOM_DETAIL_REQUEST,
  ZOOM_DETAIL_SUCCESS,
  ZOOM_DETAIL_FAILURE,
  //
  ZOOM_LEC_HISTORY_DETAIL_REQUEST,
  ZOOM_LEC_HISTORY_DETAIL_SUCCESS,
  ZOOM_LEC_HISTORY_DETAIL_FAILURE,
  //
  ZOOM_LEC_MOVE_REQUEST,
  ZOOM_LEC_MOVE_SUCCESS,
  ZOOM_LEC_MOVE_FAILURE,
  //
  ZOOM_LEC_HISTORY_PAY_REQUEST,
  ZOOM_LEC_HISTORY_PAY_SUCCESS,
  ZOOM_LEC_HISTORY_PAY_FAILURE,
  //
  ZOOM_LEC_CHECK_REQUEST,
  ZOOM_LEC_CHECK_SUCCESS,
  ZOOM_LEC_CHECK_FAILURE,
  //
  ZOOM_LEC_DELETE_REQUEST,
  ZOOM_LEC_DELETE_SUCCESS,
  ZOOM_LEC_DELETE_FAILURE,
} from "../reducers/level";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function levelListAPI(data) {
  return await axios.post(`/api/lev/list`, data);
}

function* levelList(action) {
  try {
    const result = yield call(levelListAPI, action.data);

    yield put({
      type: LEVEL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LEVEL_FAILURE,
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
async function levelUpdateAPI(data) {
  return await axios.post(`/api/lev/valueUpdate`, data);
}

function* levelUpdate(action) {
  try {
    const result = yield call(levelUpdateAPI, action.data);

    yield put({
      type: LEVEL_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LEVEL_UPDATE_FAILURE,
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
async function levelToggleAPI(data) {
  return await axios.post(`/api/lev/toggle`, data);
}

function* levelToggle(action) {
  try {
    const result = yield call(levelToggleAPI, action.data);

    yield put({
      type: LEVEL_TOGGLE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LEVEL_TOGGLE_FAILURE,
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
async function zoomLecListAPI(data) {
  return await axios.post(`/api/lev/zoom/lecture/list`, data);
}

function* zoomLecList(action) {
  try {
    const result = yield call(zoomLecListAPI, action.data);

    yield put({
      type: ZOOM_LEC_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ZOOM_LEC_LIST_FAILURE,
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
async function zoomLecCreateAPI(data) {
  return await axios.post(`/api/lev/zoom/lecture/new`, data);
}

function* zoomLecCreate(action) {
  try {
    const result = yield call(zoomLecCreateAPI, action.data);

    yield put({
      type: ZOOM_LEC_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ZOOM_LEC_CREATE_FAILURE,
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
async function zoomLecUpdateAPI(data) {
  return await axios.post(`/api/lev/zoom/lecture/modify`, data);
}

function* zoomLecUpdate(action) {
  try {
    const result = yield call(zoomLecUpdateAPI, action.data);

    yield put({
      type: ZOOM_LEC_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ZOOM_LEC_UPDATE_FAILURE,
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
async function zoomLecAddPeopleAPI(data) {
  return await axios.post(`/api/lev/zoom/lecture/addPeople`, data);
}

function* zoomLecAddPeople(action) {
  try {
    const result = yield call(zoomLecAddPeopleAPI, action.data);

    yield put({
      type: ZOOM_LEC_ADD_PEOPLE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ZOOM_LEC_ADD_PEOPLE_FAILURE,
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
async function zoomLecDetailAPI(data) {
  return await axios.post(`/api/lev/zoom/lecture/detail`, data);
}

function* zoomLecDetail(action) {
  try {
    const result = yield call(zoomLecDetailAPI, action.data);

    yield put({
      type: ZOOM_LEC_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ZOOM_LEC_DETAIL_FAILURE,
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
async function zoomLecMyAPI(data) {
  return await axios.post(`/api/lev/zoom/lecture/my`, data);
}

function* zoomLecMy(action) {
  try {
    const result = yield call(zoomLecMyAPI, action.data);

    yield put({
      type: ZOOM_LEC_MY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ZOOM_LEC_MY_FAILURE,
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
async function zoomLecHistoryAPI(data) {
  return await axios.post(`/api/lev/zoom/lecture/history/list`, data);
}

function* zoomLecHistory(action) {
  try {
    const result = yield call(zoomLecHistoryAPI, action.data);

    yield put({
      type: ZOOM_LEC_HISTORY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ZOOM_LEC_HISTORY_FAILURE,
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
async function zoomLecHistoryAddAPI(data) {
  return await axios.post(`/api/lev/zoom/lecture/history/add`, data);
}

function* zoomLecHistoryAdd(action) {
  try {
    const result = yield call(zoomLecHistoryAddAPI, action.data);

    yield put({
      type: ZOOM_LEC_HISTORY_ADD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ZOOM_LEC_HISTORY_ADD_FAILURE,
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
async function zoomLecHistoryDelAPI(data) {
  return await axios.post(`/api/lev/zoom/lecture/history/delete`, data);
}

function* zoomLecHistoryDel(action) {
  try {
    const result = yield call(zoomLecHistoryDelAPI, action.data);

    yield put({
      type: ZOOM_LEC_HISTORY_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ZOOM_LEC_HISTORY_DELETE_FAILURE,
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
async function zoomDetailAPI(data) {
  return await axios.post(`/api/lev/zoom/lecture/target`, data);
}

function* zoomDetail(action) {
  try {
    const result = yield call(zoomDetailAPI, action.data);

    yield put({
      type: ZOOM_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ZOOM_DETAIL_FAILURE,
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
async function zoomLecHistoryDetailAPI(data) {
  return await axios.post(`/api/lev/zoom/lecture/history/detail`, data);
}

function* zoomLecHistoryDetail(action) {
  try {
    const result = yield call(zoomLecHistoryDetailAPI, action.data);

    yield put({
      type: ZOOM_LEC_HISTORY_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ZOOM_LEC_HISTORY_DETAIL_FAILURE,
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
async function zoomLecMoveAPI(data) {
  return await axios.post(`/api/lev/zoom/lecture/move`, data);
}

function* zoomLecMove(action) {
  try {
    const result = yield call(zoomLecMoveAPI, action.data);

    yield put({
      type: ZOOM_LEC_MOVE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ZOOM_LEC_MOVE_FAILURE,
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
async function zoomLecHistoryPayAPI(data) {
  return await axios.post(`/api/lev/zoom/lecture/history/isPay`, data);
}

function* zoomLecHistoryPay(action) {
  try {
    const result = yield call(zoomLecHistoryPayAPI, action.data);

    yield put({
      type: ZOOM_LEC_HISTORY_PAY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ZOOM_LEC_HISTORY_PAY_FAILURE,
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
async function zoomLecCheckAPI(data) {
  return await axios.post(`/api/lev/zoom/ex`, data);
}

function* zoomLecCheck(action) {
  try {
    const result = yield call(zoomLecCheckAPI, action.data);

    yield put({
      type: ZOOM_LEC_CHECK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ZOOM_LEC_CHECK_FAILURE,
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
async function zoomLecDeleteAPI(data) {
  return await axios.post(`/api/lev/zoom/exclude`, data);
}

function* zoomLecDelete(action) {
  try {
    const result = yield call(zoomLecDeleteAPI, action.data);

    yield put({
      type: ZOOM_LEC_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ZOOM_LEC_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchLevelList() {
  yield takeLatest(LEVEL_REQUEST, levelList);
}
function* watchLevelUpdate() {
  yield takeLatest(LEVEL_UPDATE_REQUEST, levelUpdate);
}
function* watchLevelToggle() {
  yield takeLatest(LEVEL_TOGGLE_REQUEST, levelToggle);
}
function* watchZoomLecList() {
  yield takeLatest(ZOOM_LEC_LIST_REQUEST, zoomLecList);
}
function* watchZoomLecCreate() {
  yield takeLatest(ZOOM_LEC_CREATE_REQUEST, zoomLecCreate);
}
function* watchZoomLecUpdate() {
  yield takeLatest(ZOOM_LEC_UPDATE_REQUEST, zoomLecUpdate);
}
function* watchZoomLecAddPeople() {
  yield takeLatest(ZOOM_LEC_ADD_PEOPLE_REQUEST, zoomLecAddPeople);
}
function* watchZoomLecDetail() {
  yield takeLatest(ZOOM_LEC_DETAIL_REQUEST, zoomLecDetail);
}
function* watchZoomLecMy() {
  yield takeLatest(ZOOM_LEC_MY_REQUEST, zoomLecMy);
}
function* watchZoomLecHistory() {
  yield takeLatest(ZOOM_LEC_HISTORY_REQUEST, zoomLecHistory);
}
function* watchZoomLecHistoryAdd() {
  yield takeLatest(ZOOM_LEC_HISTORY_ADD_REQUEST, zoomLecHistoryAdd);
}
function* watchZoomLecHistoryDel() {
  yield takeLatest(ZOOM_LEC_HISTORY_DELETE_REQUEST, zoomLecHistoryDel);
}
function* watchZoomDetail() {
  yield takeLatest(ZOOM_DETAIL_REQUEST, zoomDetail);
}
function* watchZoomLecHistoryDetail() {
  yield takeLatest(ZOOM_LEC_HISTORY_DETAIL_REQUEST, zoomLecHistoryDetail);
}
function* watchZoomLecMove() {
  yield takeLatest(ZOOM_LEC_MOVE_REQUEST, zoomLecMove);
}
function* watchZoomLecHistoryPay() {
  yield takeLatest(ZOOM_LEC_HISTORY_PAY_REQUEST, zoomLecHistoryPay);
}
function* watchZoomLecCheck() {
  yield takeLatest(ZOOM_LEC_CHECK_REQUEST, zoomLecCheck);
}
function* watchZoomLecDelete() {
  yield takeLatest(ZOOM_LEC_DELETE_REQUEST, zoomLecDelete);
}
//////////////////////////////////////////////////////////////
export default function* levelSaga() {
  yield all([
    fork(watchLevelList),
    fork(watchLevelUpdate),
    fork(watchLevelToggle),
    fork(watchZoomLecList),
    fork(watchZoomLecCreate),
    fork(watchZoomLecUpdate),
    fork(watchZoomLecAddPeople),
    fork(watchZoomLecDetail),
    fork(watchZoomLecMy),
    fork(watchZoomLecHistory),
    fork(watchZoomLecHistoryAdd),
    fork(watchZoomLecHistoryDel),
    fork(watchZoomDetail),
    fork(watchZoomLecHistoryDetail),
    fork(watchZoomLecMove),
    fork(watchZoomLecHistoryPay),
    fork(watchZoomLecCheck),
    fork(watchZoomLecDelete),
    //
  ]);
}
