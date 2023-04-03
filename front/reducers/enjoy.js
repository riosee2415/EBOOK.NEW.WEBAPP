import produce from "../util/produce";

export const initailState = {
  adminUserEnjoyList: [],
  maxLen: 0,
  enjoyMeList: [],

  st_adminUserEnjoyLoading: false,
  st_adminUserEnjoyDone: false,
  st_adminUserEnjoyError: null,

  st_enjoyMeListLoading: false,
  st_enjoyMeListDone: false,
  st_enjoyMeListError: null,

  st_enjoyCreateLoading: false,
  st_enjoyCreateDone: false,
  st_enjoyCreateError: null,
};

export const ADMIN_USER_ENJOY_REQUEST = "ADMIN_USER_ENJOY_REQUEST";
export const ADMIN_USER_ENJOY_SUCCESS = "ADMIN_USER_ENJOY_SUCCESS";
export const ADMIN_USER_ENJOY_FAILURE = "ADMIN_USER_ENJOY_FAILURE";

export const ENJOY_ME_LIST_REQUEST = "ENJOY_ME_LIST_REQUEST";
export const ENJOY_ME_LIST_SUCCESS = "ENJOY_ME_LIST_SUCCESS";
export const ENJOY_ME_LIST_FAILURE = "ENJOY_ME_LIST_FAILURE";

export const ENJOY_CREATE_REQUEST = "ENJOY_CREATE_REQUEST";
export const ENJOY_CREATE_SUCCESS = "ENJOY_CREATE_SUCCESS";
export const ENJOY_CREATE_FAILURE = "ENJOY_CREATE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      ///////////////////////////////////////////////////////

      case ADMIN_USER_ENJOY_REQUEST: {
        draft.st_adminUserEnjoyLoading = true;
        draft.st_adminUserEnjoyDone = false;
        draft.st_adminUserEnjoyError = null;
        break;
      }

      case ADMIN_USER_ENJOY_SUCCESS: {
        draft.st_adminUserEnjoyLoading = false;
        draft.st_adminUserEnjoyDone = true;
        draft.st_adminUserEnjoyError = null;
        draft.adminUserEnjoyList = action.data.list;
        draft.maxLen = action.data.maxLen;
        break;
      }

      case ADMIN_USER_ENJOY_FAILURE: {
        draft.st_adminUserEnjoyLoading = false;
        draft.st_adminUserEnjoyDone = false;
        draft.st_adminUserEnjoyError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case ENJOY_ME_LIST_REQUEST: {
        draft.st_enjoyMeListLoading = true;
        draft.st_enjoyMeListDone = false;
        draft.st_enjoyMeListError = null;
        break;
      }

      case ENJOY_ME_LIST_SUCCESS: {
        draft.st_enjoyMeListLoading = false;
        draft.st_enjoyMeListDone = true;
        draft.st_enjoyMeListError = null;
        draft.enjoyMeList = action.data;
        break;
      }

      case ENJOY_ME_LIST_FAILURE: {
        draft.st_enjoyMeListLoading = false;
        draft.st_enjoyMeListDone = false;
        draft.st_enjoyMeListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case ENJOY_CREATE_REQUEST: {
        draft.st_enjoyCreateLoading = true;
        draft.st_enjoyCreateDone = false;
        draft.st_enjoyCreateError = null;
        break;
      }

      case ENJOY_CREATE_SUCCESS: {
        draft.st_enjoyCreateLoading = false;
        draft.st_enjoyCreateDone = true;
        draft.st_enjoyCreateError = null;
        break;
      }

      case ENJOY_CREATE_FAILURE: {
        draft.st_enjoyCreateLoading = false;
        draft.st_enjoyCreateDone = false;
        draft.st_enjoyCreateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      default:
        break;
    }
  });

export default reducer;
