import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ADMIN_USER_ENJOY_REQUEST,
  ADMIN_USER_ENJOY_SUCCESS,
  ADMIN_USER_ENJOY_FAILURE,
} from "../reducers/enjoy";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function enjoyAdminListAPI(data) {
  return await axios.post(`/api/enjoy/admin/list`, data);
}

function* enjoyAdminList(action) {
  try {
    const result = yield call(enjoyAdminListAPI, action.data);

    yield put({
      type: ADMIN_USER_ENJOY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMIN_USER_ENJOY_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchEnjoyAdminList() {
  yield takeLatest(ADMIN_USER_ENJOY_REQUEST, enjoyAdminList);
}

//////////////////////////////////////////////////////////////
export default function* enjoySaga() {
  yield all([
    fork(watchEnjoyAdminList),

    //
  ]);
}
