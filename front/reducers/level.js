import produce from "../util/produce";

export const initialState = {
  levelList: [],
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

      default:
        break;
    }
  });

export default reducer;
