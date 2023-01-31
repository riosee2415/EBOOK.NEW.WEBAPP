import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  COMPANY_GET_REQUEST,
  COMPANY_GET_SUCCESS,
  COMPANY_GET_FAILURE,
  //
  COMPANY_CREATE_REQUEST,
  COMPANY_CREATE_SUCCESS,
  COMPANY_CREATE_FAILURE,
  //
  COMPANY_DELETE_REQUEST,
  COMPANY_DELETE_SUCCESS,
  COMPANY_DELETE_FAILURE,
  //
  COMPANY_UPDATE_REQUEST,
  COMPANY_UPDATE_SUCCESS,
  COMPANY_UPDATE_FAILURE,
  //
  COMPANY_SORT_UPDATE_REQUEST,
  COMPANY_SORT_UPDATE_SUCCESS,
  COMPANY_SORT_UPDATE_FAILURE,
  //
  COMPANYINFO_HISTORY_REQUEST,
  COMPANYINFO_HISTORY_SUCCESS,
  COMPANYINFO_HISTORY_FAILURE,
  //
  SNS_INFO_LIST_REQUEST,
  SNS_INFO_LIST_SUCCESS,
  SNS_INFO_LIST_FAILURE,
  //
  SNS_SORT_UPDATE_REQUEST,
  SNS_SORT_UPDATE_SUCCESS,
  SNS_SORT_UPDATE_FAILURE,
  //
  SNS_USE_UPDATE_REQUEST,
  SNS_USE_UPDATE_SUCCESS,
  SNS_USE_UPDATE_FAILURE,
  //
  SNS_IMAGE_REQUEST,
  SNS_IMAGE_SUCCESS,
  SNS_IMAGE_FAILURE,
  //
  SNS_NEW_REQUEST,
  SNS_NEW_SUCCESS,
  SNS_NEW_FAILURE,
  //
  SNS_UPDATE_REQUEST,
  SNS_UPDATE_SUCCESS,
  SNS_UPDATE_FAILURE,
  //
  SNS_DELETE_REQUEST,
  SNS_DELETE_SUCCESS,
  SNS_DELETE_FAILURE,
  //
  SNS_HISTORY_REQUEST,
  SNS_HISTORY_SUCCESS,
  SNS_HISTORY_FAILURE,
  //
  KAKAOCH_GET_REQUEST,
  KAKAOCH_GET_SUCCESS,
  KAKAOCH_GET_FAILURE,
  //
  KAKAOCH_NEW_REQUEST,
  KAKAOCH_NEW_SUCCESS,
  KAKAOCH_NEW_FAILURE,
  //
  KAKAOCH_USEYN_REQUEST,
  KAKAOCH_USEYN_SUCCESS,
  KAKAOCH_USEYN_FAILURE,
  //
  KAKAOCH_PREVIEW_REQUEST,
  KAKAOCH_PREVIEW_SUCCESS,
  KAKAOCH_PREVIEW_FAILURE,
  //
  KAKAOCH_UPDATE_REQUEST,
  KAKAOCH_UPDATE_SUCCESS,
  KAKAOCH_UPDATE_FAILURE,
  //
  KAKAOCH_HISTORY_REQUEST,
  KAKAOCH_HISTORY_SUCCESS,
  KAKAOCH_HISTORY_FAILURE,
} from "../reducers/company";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function companyGetAPI() {
  return await axios.get(`/api/company/list`);
}

function* companyGet() {
  try {
    const result = yield call(companyGetAPI);

    yield put({
      type: COMPANY_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COMPANY_GET_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function companyCreateAPI(data) {
  return await axios.post(`/api/company/create`, data);
}

function* companyCreate(action) {
  try {
    const result = yield call(companyCreateAPI, action.data);

    yield put({
      type: COMPANY_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COMPANY_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function companyDeleteAPI(data) {
  return await axios.post(`/api/company/delete`, data);
}

function* companyDelete(action) {
  try {
    const result = yield call(companyDeleteAPI, action.data);

    yield put({
      type: COMPANY_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COMPANY_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function companyUpdateAPI(data) {
  return await axios.patch(`/api/company/update`, data);
}

function* companyUpdate(action) {
  try {
    const result = yield call(companyUpdateAPI, action.data);

    yield put({
      type: COMPANY_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COMPANY_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function companySortUpdateAPI(data) {
  return await axios.post(`/api/company/sort/update`, data);
}

function* companySortUpdate(action) {
  try {
    const result = yield call(companySortUpdateAPI, action.data);

    yield put({
      type: COMPANY_SORT_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COMPANY_SORT_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function companyHistoryAPI(data) {
  return await axios.post(`/api/company/history/list`, data);
}

function* companyHistory(action) {
  try {
    const result = yield call(companyHistoryAPI, action.data);

    yield put({
      type: COMPANYINFO_HISTORY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COMPANYINFO_HISTORY_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function snsInfoAPI(data) {
  return await axios.post(`/api/sns/list`, data);
}

function* snsInfo(action) {
  try {
    const result = yield call(snsInfoAPI, action.data);

    yield put({
      type: SNS_INFO_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SNS_INFO_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function snsInfoSortAPI(data) {
  return await axios.post(`/api/sns/sort/update`, data);
}

function* snsInfoSort(action) {
  try {
    const result = yield call(snsInfoSortAPI, action.data);

    yield put({
      type: SNS_SORT_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SNS_SORT_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function snsInfoUseAPI(data) {
  return await axios.post(`/api/sns/use/update`, data);
}

function* snsInfoUse(action) {
  try {
    const result = yield call(snsInfoUseAPI, action.data);

    yield put({
      type: SNS_USE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SNS_USE_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function snsImageAPI(data) {
  return await axios.post(`/api/sns/image`, data);
}

function* snsImage(action) {
  try {
    const result = yield call(snsImageAPI, action.data);

    yield put({
      type: SNS_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SNS_IMAGE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function snsNewAPI(data) {
  return await axios.post(`/api/sns/new`, data);
}

function* snsNew(action) {
  try {
    const result = yield call(snsNewAPI, action.data);

    yield put({
      type: SNS_NEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SNS_NEW_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function snsUpdateAPI(data) {
  return await axios.post(`/api/sns/update`, data);
}

function* snsUpdate(action) {
  try {
    const result = yield call(snsUpdateAPI, action.data);

    yield put({
      type: SNS_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SNS_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function snsDeleteAPI(data) {
  return await axios.post(`/api/sns/delete`, data);
}

function* snsDelete(action) {
  try {
    const result = yield call(snsDeleteAPI, action.data);

    yield put({
      type: SNS_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SNS_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function snsHistoryAPI(data) {
  return await axios.post(`/api/sns/history/list`, data);
}

function* snsHistory(action) {
  try {
    const result = yield call(snsHistoryAPI, action.data);

    yield put({
      type: SNS_HISTORY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SNS_HISTORY_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function kakaochGetAPI(data) {
  return await axios.post(`/api/company/talk/get`, data);
}

function* kakaochGet(action) {
  try {
    const result = yield call(kakaochGetAPI, action.data);

    yield put({
      type: KAKAOCH_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KAKAOCH_GET_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function kakaochNewAPI(data) {
  return await axios.post(`/api/company/talk/new`, data);
}

function* kakaochNew(action) {
  try {
    const result = yield call(kakaochNewAPI, action.data);

    yield put({
      type: KAKAOCH_NEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KAKAOCH_NEW_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function kakaochUseYnAPI(data) {
  return await axios.post(`/api/company/talk/use`, data);
}

function* kakaochUseYn(action) {
  try {
    const result = yield call(kakaochUseYnAPI, action.data);

    yield put({
      type: KAKAOCH_USEYN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KAKAOCH_USEYN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function kakaochPreviewAPI(data) {
  return await axios.post(`/api/company/image`, data);
}

function* kakaochPreview(action) {
  try {
    const result = yield call(kakaochPreviewAPI, action.data);

    yield put({
      type: KAKAOCH_PREVIEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KAKAOCH_PREVIEW_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function kakaochUpdateAPI(data) {
  return await axios.post(`/api/company/talk/update`, data);
}

function* kakaochUpdate(action) {
  try {
    const result = yield call(kakaochUpdateAPI, action.data);

    yield put({
      type: KAKAOCH_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KAKAOCH_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function kakaochHistoryAPI(data) {
  return await axios.post(`/api/company/history/talk/list`, data);
}

function* kakaochHistory(action) {
  try {
    const result = yield call(kakaochHistoryAPI, action.data);

    yield put({
      type: KAKAOCH_HISTORY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KAKAOCH_HISTORY_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchCompanyGet() {
  yield takeLatest(COMPANY_GET_REQUEST, companyGet);
}

function* watchCompanyCreate() {
  yield takeLatest(COMPANY_CREATE_REQUEST, companyCreate);
}

function* watchCompanyDelete() {
  yield takeLatest(COMPANY_DELETE_REQUEST, companyDelete);
}

function* watchCompanyUpdate() {
  yield takeLatest(COMPANY_UPDATE_REQUEST, companyUpdate);
}

function* watchCompanySortUpdate() {
  yield takeLatest(COMPANY_SORT_UPDATE_REQUEST, companySortUpdate);
}

function* watchCompanyHistory() {
  yield takeLatest(COMPANYINFO_HISTORY_REQUEST, companyHistory);
}

function* watchSnsInfo() {
  yield takeLatest(SNS_INFO_LIST_REQUEST, snsInfo);
}

function* watchSnsInfoSort() {
  yield takeLatest(SNS_SORT_UPDATE_REQUEST, snsInfoSort);
}

function* watchSnsInfoUse() {
  yield takeLatest(SNS_USE_UPDATE_REQUEST, snsInfoUse);
}

function* watchSnsImage() {
  yield takeLatest(SNS_IMAGE_REQUEST, snsImage);
}

function* watchSnsNew() {
  yield takeLatest(SNS_NEW_REQUEST, snsNew);
}

function* watchSnsUpdate() {
  yield takeLatest(SNS_UPDATE_REQUEST, snsUpdate);
}

function* watchSnsDelete() {
  yield takeLatest(SNS_DELETE_REQUEST, snsDelete);
}

function* watchSnsHistory() {
  yield takeLatest(SNS_HISTORY_REQUEST, snsHistory);
}

function* watchKakaoChGet() {
  yield takeLatest(KAKAOCH_GET_REQUEST, kakaochGet);
}

function* watchKakaoChNew() {
  yield takeLatest(KAKAOCH_NEW_REQUEST, kakaochNew);
}

function* watchKakaoChUseYn() {
  yield takeLatest(KAKAOCH_USEYN_REQUEST, kakaochUseYn);
}

function* watchKakaoChPreview() {
  yield takeLatest(KAKAOCH_PREVIEW_REQUEST, kakaochPreview);
}

function* watchKakaoChUpdate() {
  yield takeLatest(KAKAOCH_UPDATE_REQUEST, kakaochUpdate);
}

function* watchKakaoChHistory() {
  yield takeLatest(KAKAOCH_HISTORY_REQUEST, kakaochHistory);
}

//////////////////////////////////////////////////////////////
export default function* companySaga() {
  yield all([
    fork(watchCompanyGet),
    fork(watchCompanyCreate),
    fork(watchCompanyDelete),
    fork(watchCompanyUpdate),
    fork(watchCompanySortUpdate),
    fork(watchCompanyHistory),
    fork(watchSnsInfo),
    fork(watchSnsInfoSort),
    fork(watchSnsInfoUse),
    fork(watchSnsImage),
    fork(watchSnsNew),
    fork(watchSnsUpdate),
    fork(watchSnsDelete),
    fork(watchSnsHistory),
    fork(watchKakaoChGet),
    fork(watchKakaoChNew),
    fork(watchKakaoChUseYn),
    fork(watchKakaoChPreview),
    fork(watchKakaoChUpdate),
    fork(watchKakaoChHistory),
    //
  ]);
}
