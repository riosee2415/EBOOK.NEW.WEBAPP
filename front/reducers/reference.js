import produce from "../util/produce";

export const initailState = {
  referenceList: [],

  filepath: null,

  st_referenceListLoading: false,
  st_referenceListDone: false,
  st_referenceListError: null,
  //
  st_referenceCreateLoading: false,
  st_referenceCreateDone: false,
  st_referenceCreateError: null,
  //
  st_referenceDeleteLoading: false,
  st_referenceDeleteDone: false,
  st_referenceDeleteError: null,
  //
  st_referenceUploadLoading: false,
  st_referenceUploadDone: false,
  st_referenceUploadError: null,
};

export const REFERENCE_LIST_REQUEST = "REFERENCE_LIST_REQUEST";
export const REFERENCE_LIST_SUCCESS = "REFERENCE_LIST_SUCCESS";
export const REFERENCE_LIST_FAILURE = "REFERENCE_LIST_FAILURE";

export const REFERENCE_CREATE_REQUEST = "REFERENCE_CREATE_REQUEST";
export const REFERENCE_CREATE_SUCCESS = "REFERENCE_CREATE_SUCCESS";
export const REFERENCE_CREATE_FAILURE = "REFERENCE_CREATE_FAILURE";

export const REFERENCE_DELETE_REQUEST = "REFERENCE_DELETE_REQUEST";
export const REFERENCE_DELETE_SUCCESS = "REFERENCE_DELETE_SUCCESS";
export const REFERENCE_DELETE_FAILURE = "REFERENCE_DELETE_FAILURE";

export const REFERENCE_UPLOAD_REQUEST = "REFERENCE_UPLOAD_REQUEST";
export const REFERENCE_UPLOAD_SUCCESS = "REFERENCE_UPLOAD_SUCCESS";
export const REFERENCE_UPLOAD_FAILURE = "REFERENCE_UPLOAD_FAILURE";

export const REFERENCE_FILE_RESET = "REFERENCE_FILE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      ///////////////////////////////////////////////////////
      case REFERENCE_LIST_REQUEST: {
        draft.st_referenceListLoading = true;
        draft.st_referenceListDone = false;
        draft.st_referenceListError = null;

        break;
      }
      case REFERENCE_LIST_SUCCESS: {
        draft.st_referenceListLoading = false;
        draft.st_referenceListDone = true;
        draft.st_referenceListError = null;
        draft.referenceList = action.data;
        break;
      }
      case REFERENCE_LIST_FAILURE: {
        draft.st_referenceListLoading = false;
        draft.st_referenceListDone = false;
        draft.st_referenceListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REFERENCE_CREATE_REQUEST: {
        draft.st_referenceCreateLoading = true;
        draft.st_referenceCreateDone = false;
        draft.st_referenceCreateError = null;
        break;
      }
      case REFERENCE_CREATE_SUCCESS: {
        draft.st_referenceCreateLoading = false;
        draft.st_referenceCreateDone = true;
        draft.st_referenceCreateError = null;
        break;
      }
      case REFERENCE_CREATE_FAILURE: {
        draft.st_referenceCreateLoading = false;
        draft.st_referenceCreateDone = false;
        draft.st_referenceCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REFERENCE_DELETE_REQUEST: {
        draft.st_referenceDeleteLoading = true;
        draft.st_referenceDeleteDone = false;
        draft.st_referenceDeleteError = null;
        break;
      }
      case REFERENCE_DELETE_SUCCESS: {
        draft.st_referenceDeleteLoading = false;
        draft.st_referenceDeleteDone = true;
        draft.st_referenceDeleteError = null;
        break;
      }
      case REFERENCE_DELETE_FAILURE: {
        draft.st_referenceDeleteLoading = false;
        draft.st_referenceDeleteDone = false;
        draft.st_referenceDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REFERENCE_UPLOAD_REQUEST: {
        draft.st_referenceUploadLoading = true;
        draft.st_referenceUploadDone = false;
        draft.st_referenceUploadError = null;
        break;
      }
      case REFERENCE_UPLOAD_SUCCESS: {
        draft.st_referenceUploadLoading = false;
        draft.st_referenceUploadDone = true;
        draft.st_referenceUploadError = null;
        draft.filepath = action.data.path;
        break;
      }
      case REFERENCE_UPLOAD_FAILURE: {
        draft.st_referenceUploadLoading = false;
        draft.st_referenceUploadDone = false;
        draft.st_referenceUploadError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REFERENCE_FILE_RESET: {
        draft.filepath = action.data.filepath;
        break;
      }
      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
