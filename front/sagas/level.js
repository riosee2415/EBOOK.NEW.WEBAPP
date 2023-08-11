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
} from "../reducers/level";

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

//////////////////////////////////////////////////////////////
export default function* levelSaga() {
  yield all([
    fork(watchLevelList),
    fork(watchLevelUpdate),
    fork(watchLevelToggle),
    //
  ]);
}
