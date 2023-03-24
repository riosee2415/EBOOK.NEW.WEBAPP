import produce from "../util/produce";

export const initailState = {
  mediaAdminList: [],
  mediaList: [],
  lastPage: 1,

  mediaAllList: [],

  mediaPath: null,
  mediaDetail: null,

  st_mediaListLoading: false,
  st_mediaListDone: false,
  st_mediaListError: null,

  st_mediaAllListLoading: false,
  st_mediaAllListDone: false,
  st_mediaAllListError: null,

  st_mediaDetialLoading: false,
  st_mediaDetialDone: false,
  st_mediaDetialError: null,

  st_mediaAdminListLoading: false,
  st_mediaAdminListDone: false,
  st_mediaAdminListError: null,

  st_mediaFileUploadLoading: false,
  st_mediaFileUploadDone: false,
  st_mediaFileUploadError: null,

  st_mediaCreateLoading: false,
  st_mediaCreateDone: false,
  st_mediaCreateError: null,

  st_mediaUpdateLoading: false,
  st_mediaUpdateDone: false,
  st_mediaUpdateError: null,

  st_mediaDeleteLoading: false,
  st_mediaDeleteDone: false,
  st_mediaDeleteError: null,
};

export const MEDIA_ADMIN_LIST_REQUEST = "MEDIA_ADMIN_LIST_REQUEST";
export const MEDIA_ADMIN_LIST_SUCCESS = "MEDIA_ADMIN_LIST_SUCCESS";
export const MEDIA_ADMIN_LIST_FAILURE = "MEDIA_ADMIN_LIST_FAILURE";

export const MEDIA_LIST_REQUEST = "MEDIA_LIST_REQUEST";
export const MEDIA_LIST_SUCCESS = "MEDIA_LIST_SUCCESS";
export const MEDIA_LIST_FAILURE = "MEDIA_LIST_FAILURE";

export const MEDIA_ALL_LIST_REQUEST = "MEDIA_ALL_LIST_REQUEST";
export const MEDIA_ALL_LIST_SUCCESS = "MEDIA_ALL_LIST_SUCCESS";
export const MEDIA_ALL_LIST_FAILURE = "MEDIA_ALL_LIST_FAILURE";

export const MEDIA_DETAIL_REQUEST = "MEDIA_DETAIL_REQUEST";
export const MEDIA_DETAIL_SUCCESS = "MEDIA_DETAIL_SUCCESS";
export const MEDIA_DETAIL_FAILURE = "MEDIA_DETAIL_FAILURE";

export const MEDIA_FILE_UPLOAD_REQUEST = "MEDIA_FILE_UPLOAD_REQUEST";
export const MEDIA_FILE_UPLOAD_SUCCESS = "MEDIA_FILE_UPLOAD_SUCCESS";
export const MEDIA_FILE_UPLOAD_FAILURE = "MEDIA_FILE_UPLOAD_FAILURE";

export const MEDIA_CREATE_REQUEST = "MEDIA_CREATE_REQUEST";
export const MEDIA_CREATE_SUCCESS = "MEDIA_CREATE_SUCCESS";
export const MEDIA_CREATE_FAILURE = "MEDIA_CREATE_FAILURE";

export const MEDIA_UPDATE_REQUEST = "MEDIA_UPDATE_REQUEST";
export const MEDIA_UPDATE_SUCCESS = "MEDIA_UPDATE_SUCCESS";
export const MEDIA_UPDATE_FAILURE = "MEDIA_UPDATE_FAILURE";

export const MEDIA_DELETE_REQUEST = "MEDIA_DELETE_REQUEST";
export const MEDIA_DELETE_SUCCESS = "MEDIA_DELETE_SUCCESS";
export const MEDIA_DELETE_FAILURE = "MEDIA_DELETE_FAILURE";

export const MEDIA_FILE_RESET = "MEDIA_FILE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      ///////////////////////////////////////////////////////
      case MEDIA_ADMIN_LIST_REQUEST: {
        draft.st_mediaAdminListLoading = true;
        draft.st_mediaAdminListDone = false;
        draft.st_mediaAdminListError = null;
        break;
      }
      case MEDIA_ADMIN_LIST_SUCCESS: {
        draft.st_mediaAdminListLoading = false;
        draft.st_mediaAdminListDone = true;
        draft.st_mediaAdminListError = null;
        draft.mediaAdminList = action.data;
        break;
      }
      case MEDIA_ADMIN_LIST_FAILURE: {
        draft.st_mediaAdminListLoading = false;
        draft.st_mediaAdminListDone = false;
        draft.st_mediaAdminListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case MEDIA_LIST_REQUEST: {
        draft.st_mediaListLoading = true;
        draft.st_mediaListDone = false;
        draft.st_mediaListError = null;
        break;
      }
      case MEDIA_LIST_SUCCESS: {
        draft.st_mediaListLoading = false;
        draft.st_mediaListDone = true;
        draft.st_mediaListError = null;
        draft.mediaList = action.data.list;
        draft.lastPage = action.data.lastPage;
        break;
      }
      case MEDIA_LIST_FAILURE: {
        draft.st_mediaListLoading = false;
        draft.st_mediaListDone = false;
        draft.st_mediaListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case MEDIA_ALL_LIST_REQUEST: {
        draft.st_mediaAllListLoading = true;
        draft.st_mediaAllListDone = false;
        draft.st_mediaAllListError = null;
        break;
      }
      case MEDIA_ALL_LIST_SUCCESS: {
        draft.st_mediaAllListLoading = false;
        draft.st_mediaAllListDone = true;
        draft.st_mediaAllListError = null;
        draft.mediaAllList = action.data;
        break;
      }
      case MEDIA_ALL_LIST_FAILURE: {
        draft.st_mediaAllListLoading = false;
        draft.st_mediaAllListDone = false;
        draft.st_mediaAllListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case MEDIA_DETAIL_REQUEST: {
        draft.st_mediaDetialLoading = true;
        draft.st_mediaDetialDone = false;
        draft.st_mediaDetialError = null;
        break;
      }
      case MEDIA_DETAIL_SUCCESS: {
        draft.st_mediaDetialLoading = false;
        draft.st_mediaDetialDone = true;
        draft.st_mediaDetialError = null;
        draft.mediaDetail = action.data;
        break;
      }
      case MEDIA_DETAIL_FAILURE: {
        draft.st_mediaDetialLoading = false;
        draft.st_mediaDetialDone = false;
        draft.st_mediaDetialError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case MEDIA_FILE_UPLOAD_REQUEST: {
        draft.st_mediaFileUploadLoading = true;
        draft.st_mediaFileUploadDone = false;
        draft.st_mediaFileUploadError = null;
        break;
      }
      case MEDIA_FILE_UPLOAD_SUCCESS: {
        draft.st_mediaFileUploadLoading = false;
        draft.st_mediaFileUploadDone = true;
        draft.st_mediaFileUploadError = null;
        draft.mediaPath = action.data.path;
        break;
      }
      case MEDIA_FILE_UPLOAD_FAILURE: {
        draft.st_mediaFileUploadLoading = false;
        draft.st_mediaFileUploadDone = false;
        draft.st_mediaFileUploadError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case MEDIA_CREATE_REQUEST: {
        draft.st_mediaCreateLoading = true;
        draft.st_mediaCreateDone = false;
        draft.st_mediaCreateError = null;
        break;
      }
      case MEDIA_CREATE_SUCCESS: {
        draft.st_mediaCreateLoading = false;
        draft.st_mediaCreateDone = true;
        draft.st_mediaCreateError = null;
        break;
      }
      case MEDIA_CREATE_FAILURE: {
        draft.st_mediaCreateLoading = false;
        draft.st_mediaCreateDone = false;
        draft.st_mediaCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case MEDIA_UPDATE_REQUEST: {
        draft.st_mediaUpdateLoading = true;
        draft.st_mediaUpdateDone = false;
        draft.st_mediaUpdateError = null;
        break;
      }
      case MEDIA_UPDATE_SUCCESS: {
        draft.st_mediaUpdateLoading = false;
        draft.st_mediaUpdateDone = true;
        draft.st_mediaUpdateError = null;
        break;
      }
      case MEDIA_UPDATE_FAILURE: {
        draft.st_mediaUpdateLoading = false;
        draft.st_mediaUpdateDone = false;
        draft.st_mediaUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case MEDIA_DELETE_REQUEST: {
        draft.st_mediaDeleteLoading = true;
        draft.st_mediaDeleteDone = false;
        draft.st_mediaDeleteError = null;
        break;
      }
      case MEDIA_DELETE_SUCCESS: {
        draft.st_mediaDeleteLoading = false;
        draft.st_mediaDeleteDone = true;
        draft.st_mediaDeleteError = null;
        break;
      }
      case MEDIA_DELETE_FAILURE: {
        draft.st_mediaDeleteLoading = false;
        draft.st_mediaDeleteDone = false;
        draft.st_mediaDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case MEDIA_FILE_RESET: {
        draft.mediaPath = action.data.mediaPath;
        break;
      }
      ///////////////////////////////////////////////////////
      default:
        break;
    }
  });

export default reducer;
