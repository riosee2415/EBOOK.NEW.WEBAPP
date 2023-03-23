import produce from "../util/produce";

export const initailState = {
  adminUserEnjoyList: [],

  st_adminUserEnjoyLoading: false,
  st_adminUserEnjoyDone: false,
  st_adminUserEnjoyError: null,
};

export const ADMIN_USER_ENJOY_REQUEST = "ADMIN_USER_ENJOY_REQUEST";
export const ADMIN_USER_ENJOY_SUCCESS = "ADMIN_USER_ENJOY_SUCCESS";
export const ADMIN_USER_ENJOY_FAILURE = "ADMIN_USER_ENJOY_FAILURE";

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
        draft.adminUserEnjoyList = action.data;
        break;
      }

      case ADMIN_USER_ENJOY_FAILURE: {
        draft.st_adminUserEnjoyLoading = false;
        draft.st_adminUserEnjoyDone = false;
        draft.st_adminUserEnjoyError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      default:
        break;
    }
  });

export default reducer;
