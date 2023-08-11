import produce from "../util/produce";

export const initialState = {
  levelList: [],
  zoomLecList: [], // 줌강의
  zoomDetail: [], // 줌강의
  //
  st_levelListLoading: false, // 레벨 가져오기
  st_levelListDone: false,
  st_levelListError: null,
  //
  st_levelUpdateLoading: false, // 레벨 수정하기
  st_levelUpdateDone: false,
  st_levelUpdateError: null,
  //
  st_levelToggleLoading: false, // 레벨 토글
  st_levelToggleDone: false,
  st_levelToggleError: null,
  //
  st_zoomLecListLoading: false, // 줌 강의 가져오기
  st_zoomLecListDone: false,
  st_zoomLecListError: null,
  //
  st_zoomLecCreateLoading: false, // 줌 강의 생성하기
  st_zoomLecCreateDone: false,
  st_zoomLecCreateError: null,
  //
  st_zoomLecUpdateLoading: false, // 줌 강의 수정하기
  st_zoomLecUpdateDone: false,
  st_zoomLecUpdateError: null,
  //
  st_zoomLecAddPeopleLoading: false, // 줌 강의 인원 추가하기
  st_zoomLecAddPeopleDone: false,
  st_zoomLecAddPeopleError: null,
  //
  st_zoomLecDetailLoading: false, // 강의 수강생 정보 보기
  st_zoomLecDetailDone: false,
  st_zoomLecDetailError: null,
};

export const LEVEL_REQUEST = "LEVEL_REQUEST";
export const LEVEL_SUCCESS = "LEVEL_SUCCESS";
export const LEVEL_FAILURE = "LEVEL_FAILURE";

export const LEVEL_UPDATE_REQUEST = "LEVEL_UPDATE_REQUEST";
export const LEVEL_UPDATE_SUCCESS = "LEVEL_UPDATE_SUCCESS";
export const LEVEL_UPDATE_FAILURE = "LEVEL_UPDATE_FAILURE";

export const LEVEL_TOGGLE_REQUEST = "LEVEL_TOGGLE_REQUEST";
export const LEVEL_TOGGLE_SUCCESS = "LEVEL_TOGGLE_SUCCESS";
export const LEVEL_TOGGLE_FAILURE = "LEVEL_TOGGLE_FAILURE";

export const ZOOM_LEC_LIST_REQUEST = "ZOOM_LEC_LIST_REQUEST";
export const ZOOM_LEC_LIST_SUCCESS = "ZOOM_LEC_LIST_SUCCESS";
export const ZOOM_LEC_LIST_FAILURE = "ZOOM_LEC_LIST_FAILURE";

export const ZOOM_LEC_CREATE_REQUEST = "ZOOM_LEC_CREATE_REQUEST";
export const ZOOM_LEC_CREATE_SUCCESS = "ZOOM_LEC_CREATE_SUCCESS";
export const ZOOM_LEC_CREATE_FAILURE = "ZOOM_LEC_CREATE_FAILURE";

export const ZOOM_LEC_UPDATE_REQUEST = "ZOOM_LEC_UPDATE_REQUEST";
export const ZOOM_LEC_UPDATE_SUCCESS = "ZOOM_LEC_UPDATE_SUCCESS";
export const ZOOM_LEC_UPDATE_FAILURE = "ZOOM_LEC_UPDATE_FAILURE";

export const ZOOM_LEC_ADD_PEOPLE_REQUEST = "ZOOM_LEC_ADD_PEOPLE_REQUEST";
export const ZOOM_LEC_ADD_PEOPLE_SUCCESS = "ZOOM_LEC_ADD_PEOPLE_SUCCESS";
export const ZOOM_LEC_ADD_PEOPLE_FAILURE = "ZOOM_LEC_ADD_PEOPLE_FAILURE";

export const ZOOM_LEC_DETAIL_REQUEST = "ZOOM_LEC_DETAIL_REQUEST";
export const ZOOM_LEC_DETAIL_SUCCESS = "ZOOM_LEC_DETAIL_SUCCESS";
export const ZOOM_LEC_DETAIL_FAILURE = "ZOOM_LEC_DETAIL_FAILURE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LEVEL_REQUEST: {
        draft.st_levelListLoading = true;
        draft.st_levelListDone = null;
        draft.st_levelListError = false;
        break;
      }
      case LEVEL_SUCCESS: {
        draft.st_levelListLoading = false;
        draft.st_levelListDone = true;
        draft.st_levelListError = null;
        draft.levelList = action.data;
        break;
      }
      case LEVEL_FAILURE: {
        draft.st_levelListLoading = false;
        draft.st_levelListDone = false;
        draft.st_levelListError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case LEVEL_UPDATE_REQUEST: {
        draft.st_levelUpdateLoading = true;
        draft.st_levelUpdateDone = null;
        draft.st_levelUpdateError = false;
        break;
      }
      case LEVEL_UPDATE_SUCCESS: {
        draft.st_levelUpdateLoading = false;
        draft.st_levelUpdateDone = true;
        draft.st_levelUpdateError = null;
        break;
      }
      case LEVEL_UPDATE_FAILURE: {
        draft.st_levelUpdateLoading = false;
        draft.st_levelUpdateDone = false;
        draft.st_levelUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case LEVEL_TOGGLE_REQUEST: {
        draft.st_levelToggleLoading = true;
        draft.st_levelToggleDone = null;
        draft.st_levelToggleError = false;
        break;
      }
      case LEVEL_TOGGLE_SUCCESS: {
        draft.st_levelToggleLoading = false;
        draft.st_levelToggleDone = true;
        draft.st_levelToggleError = null;
        break;
      }
      case LEVEL_TOGGLE_FAILURE: {
        draft.st_levelToggleLoading = false;
        draft.st_levelToggleDone = false;
        draft.st_levelToggleError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case ZOOM_LEC_LIST_REQUEST: {
        draft.st_zoomLecListLoading = true;
        draft.st_zoomLecListDone = null;
        draft.st_zoomLecListError = false;
        break;
      }
      case ZOOM_LEC_LIST_SUCCESS: {
        draft.st_zoomLecListLoading = false;
        draft.st_zoomLecListDone = true;
        draft.st_zoomLecListError = null;
        draft.zoomLecList = action.data;
        break;
      }
      case ZOOM_LEC_LIST_FAILURE: {
        draft.st_zoomLecListLoading = false;
        draft.st_zoomLecListDone = false;
        draft.st_zoomLecListError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case ZOOM_LEC_CREATE_REQUEST: {
        draft.st_zoomLecCreateLoading = true;
        draft.st_zoomLecCreateDone = null;
        draft.st_zoomLecCreateError = false;
        break;
      }
      case ZOOM_LEC_CREATE_SUCCESS: {
        draft.st_zoomLecCreateLoading = false;
        draft.st_zoomLecCreateDone = true;
        draft.st_zoomLecCreateError = null;
        break;
      }
      case ZOOM_LEC_CREATE_FAILURE: {
        draft.st_zoomLecCreateLoading = false;
        draft.st_zoomLecCreateDone = false;
        draft.st_zoomLecCreateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case ZOOM_LEC_UPDATE_REQUEST: {
        draft.st_zoomLecUpdateLoading = true;
        draft.st_zoomLecUpdateDone = null;
        draft.st_zoomLecUpdateError = false;
        break;
      }
      case ZOOM_LEC_UPDATE_SUCCESS: {
        draft.st_zoomLecUpdateLoading = false;
        draft.st_zoomLecUpdateDone = true;
        draft.st_zoomLecUpdateError = null;
        break;
      }
      case ZOOM_LEC_UPDATE_FAILURE: {
        draft.st_zoomLecUpdateLoading = false;
        draft.st_zoomLecUpdateDone = false;
        draft.st_zoomLecUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case ZOOM_LEC_ADD_PEOPLE_REQUEST: {
        draft.st_zoomLecAddPeopleLoading = true;
        draft.st_zoomLecAddPeopleDone = null;
        draft.st_zoomLecAddPeopleError = false;
        break;
      }
      case ZOOM_LEC_ADD_PEOPLE_SUCCESS: {
        draft.st_zoomLecAddPeopleLoading = false;
        draft.st_zoomLecAddPeopleDone = true;
        draft.st_zoomLecAddPeopleError = null;
        break;
      }
      case ZOOM_LEC_ADD_PEOPLE_FAILURE: {
        draft.st_zoomLecAddPeopleLoading = false;
        draft.st_zoomLecAddPeopleDone = false;
        draft.st_zoomLecAddPeopleError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case ZOOM_LEC_DETAIL_REQUEST: {
        draft.st_zoomLecDetailLoading = true;
        draft.st_zoomLecDetailDone = null;
        draft.st_zoomLecDetailError = false;
        break;
      }
      case ZOOM_LEC_DETAIL_SUCCESS: {
        draft.st_zoomLecDetailLoading = false;
        draft.st_zoomLecDetailDone = true;
        draft.st_zoomLecDetailError = null;
        draft.zoomDetail = action.data;
        break;
      }
      case ZOOM_LEC_DETAIL_FAILURE: {
        draft.st_zoomLecDetailLoading = false;
        draft.st_zoomLecDetailDone = false;
        draft.st_zoomLecDetailError = action.error;
        break;
      }
      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
