import produce from "../util/produce";

export const initailState = {
  typeList: [],

  st_faqTypeListLoading: false,
  st_faqTypeListDone: false,
  st_faqTypeListError: null,
  //
  st_faqTypeDeleteLoading: false,
  st_faqTypeDeleteDone: false,
  st_faqTypeDeleteError: null,
  //
  st_faqTypeAddLoading: false,
  st_faqTypeAddDone: false,
  st_faqTypeAddError: null,
  //
};

export const FAQTYPE_LIST_REQUEST = "FAQTYPE_LIST_REQUEST";
export const FAQTYPE_LIST_SUCCESS = "FAQTYPE_LIST_SUCCESS";
export const FAQTYPE_LIST_FAILURE = "FAQTYPE_LIST_FAILURE";

export const FAQTYPE_DELETE_REQUEST = "FAQTYPE_DELETE_REQUEST";
export const FAQTYPE_DELETE_SUCCESS = "FAQTYPE_DELETE_SUCCESS";
export const FAQTYPE_DELETE_FAILURE = "FAQTYPE_DELETE_FAILURE";

export const FAQTYPE_ADD_REQUEST = "FAQTYPE_ADD_REQUEST";
export const FAQTYPE_ADD_SUCCESS = "FAQTYPE_ADD_SUCCESS";
export const FAQTYPE_ADD_FAILURE = "FAQTYPE_ADD_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FAQTYPE_LIST_REQUEST: {
        draft.st_faqTypeListLoading = true;
        draft.st_faqTypeListDone = false;
        draft.st_faqTypeListError = null;
        break;
      }

      case FAQTYPE_LIST_SUCCESS: {
        draft.st_faqTypeListLoading = false;
        draft.st_faqTypeListDone = true;
        draft.st_faqTypeListError = null;
        draft.typeList = action.data;
        break;
      }

      case FAQTYPE_LIST_FAILURE: {
        draft.st_faqTypeListLoading = false;
        draft.st_faqTypeListDone = false;
        draft.st_faqTypeListError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////

      case FAQTYPE_DELETE_REQUEST: {
        draft.st_faqTypeDeleteLoading = true;
        draft.st_faqTypeDeleteDone = false;
        draft.st_faqTypeDeleteError = null;
        break;
      }

      case FAQTYPE_DELETE_SUCCESS: {
        draft.st_faqTypeDeleteLoading = false;
        draft.st_faqTypeDeleteDone = true;
        draft.st_faqTypeDeleteError = null;
        break;
      }

      case FAQTYPE_DELETE_FAILURE: {
        draft.st_faqTypeDeleteLoading = false;
        draft.st_faqTypeDeleteDone = false;
        draft.st_faqTypeDeleteError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      
      case FAQTYPE_ADD_REQUEST: {
        draft.st_faqTypeAddLoading = true;
        draft.st_faqTypeAddDone = false;
        draft.st_faqTypeAddError = null;
        break;
      }

      case FAQTYPE_ADD_SUCCESS: {
        draft.st_faqTypeAddLoading = false;
        draft.st_faqTypeAddDone = true;
        draft.st_faqTypeAddError = null;
        break;
      }

      case FAQTYPE_ADD_FAILURE: {
        draft.st_faqTypeAddLoading = false;
        draft.st_faqTypeAddDone = false;
        draft.st_faqTypeAddError = action.error;
        break;
      }

      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
