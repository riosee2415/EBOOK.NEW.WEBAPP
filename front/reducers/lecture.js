import produce from "../util/produce";

export const initailState = {
  lectureAdminList: [],

  thumbnailPath: null,

  st_lectureAdminListLoading: false,
  st_lectureAdminListDone: false,
  st_lectureAdminListError: null,

  st_lectureImageUploadLoading: false,
  st_lectureImageUploadDone: false,
  st_lectureImageUploadError: null,

  st_lectureCreateLoading: false,
  st_lectureCreateDone: false,
  st_lectureCreateError: null,

  st_lectureUpdateLoading: false,
  st_lectureUpdateDone: false,
  st_lectureUpdateError: null,

  st_lectureDeleteLoading: false,
  st_lectureDeleteDone: false,
  st_lectureDeleteError: null,
};

export const LECTURE_ADMIN_LIST_REQUEST = "LECTURE_ADMIN_LIST_REQUEST";
export const LECTURE_ADMIN_LIST_SUCCESS = "LECTURE_ADMIN_LIST_SUCCESS";
export const LECTURE_ADMIN_LIST_FAILURE = "LECTURE_ADMIN_LIST_FAILURE";

export const LECTURE_IMAGE_UPLOAD_REQUEST = "LECTURE_IMAGE_UPLOAD_REQUEST";
export const LECTURE_IMAGE_UPLOAD_SUCCESS = "LECTURE_IMAGE_UPLOAD_SUCCESS";
export const LECTURE_IMAGE_UPLOAD_FAILURE = "LECTURE_IMAGE_UPLOAD_FAILURE";

export const LECTURE_CREATE_REQUEST = "LECTURE_CREATE_REQUEST";
export const LECTURE_CREATE_SUCCESS = "LECTURE_CREATE_SUCCESS";
export const LECTURE_CREATE_FAILURE = "LECTURE_CREATE_FAILURE";

export const LECTURE_UPDATE_REQUEST = "LECTURE_UPDATE_REQUEST";
export const LECTURE_UPDATE_SUCCESS = "LECTURE_UPDATE_SUCCESS";
export const LECTURE_UPDATE_FAILURE = "LECTURE_UPDATE_FAILURE";

export const LECTURE_DELETE_REQUEST = "LECTURE_DELETE_REQUEST";
export const LECTURE_DELETE_SUCCESS = "LECTURE_DELETE_SUCCESS";
export const LECTURE_DELETE_FAILURE = "LECTURE_DELETE_FAILURE";

export const LECTURE_IMAGE_RESET = "LECTURE_IMAGE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      ///////////////////////////////////////////////////////
      case LECTURE_ADMIN_LIST_REQUEST: {
        draft.st_lectureAdminListLoading = true;
        draft.st_lectureAdminListDone = false;
        draft.st_lectureAdminListError = null;
        break;
      }
      case LECTURE_ADMIN_LIST_SUCCESS: {
        draft.st_lectureAdminListLoading = false;
        draft.st_lectureAdminListDone = true;
        draft.st_lectureAdminListError = null;
        draft.lectureAdminList = action.data;
        break;
      }
      case LECTURE_ADMIN_LIST_FAILURE: {
        draft.st_lectureAdminListLoading = false;
        draft.st_lectureAdminListDone = false;
        draft.st_lectureAdminListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case LECTURE_IMAGE_UPLOAD_REQUEST: {
        draft.st_lectureImageUploadLoading = true;
        draft.st_lectureImageUploadDone = false;
        draft.st_lectureImageUploadError = null;
        break;
      }
      case LECTURE_IMAGE_UPLOAD_SUCCESS: {
        draft.st_lectureImageUploadLoading = false;
        draft.st_lectureImageUploadDone = true;
        draft.st_lectureImageUploadError = null;
        draft.thumbnailPath = action.data.path;
        break;
      }
      case LECTURE_IMAGE_UPLOAD_FAILURE: {
        draft.st_lectureImageUploadLoading = false;
        draft.st_lectureImageUploadDone = false;
        draft.st_lectureImageUploadError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case LECTURE_CREATE_REQUEST: {
        draft.st_lectureCreateLoading = true;
        draft.st_lectureCreateDone = false;
        draft.st_lectureCreateError = null;
        break;
      }
      case LECTURE_CREATE_SUCCESS: {
        draft.st_lectureCreateLoading = false;
        draft.st_lectureCreateDone = true;
        draft.st_lectureCreateError = null;
        break;
      }
      case LECTURE_CREATE_FAILURE: {
        draft.st_lectureCreateLoading = false;
        draft.st_lectureCreateDone = false;
        draft.st_lectureCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case LECTURE_UPDATE_REQUEST: {
        draft.st_lectureUpdateLoading = true;
        draft.st_lectureUpdateDone = false;
        draft.st_lectureUpdateError = null;
        break;
      }
      case LECTURE_UPDATE_SUCCESS: {
        draft.st_lectureUpdateLoading = false;
        draft.st_lectureUpdateDone = true;
        draft.st_lectureUpdateError = null;
        break;
      }
      case LECTURE_UPDATE_FAILURE: {
        draft.st_lectureUpdateLoading = false;
        draft.st_lectureUpdateDone = false;
        draft.st_lectureUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case LECTURE_DELETE_REQUEST: {
        draft.st_lectureDeleteLoading = true;
        draft.st_lectureDeleteDone = false;
        draft.st_lectureDeleteError = null;
        break;
      }
      case LECTURE_DELETE_SUCCESS: {
        draft.st_lectureDeleteLoading = false;
        draft.st_lectureDeleteDone = true;
        draft.st_lectureDeleteError = null;
        break;
      }
      case LECTURE_DELETE_FAILURE: {
        draft.st_lectureDeleteLoading = false;
        draft.st_lectureDeleteDone = false;
        draft.st_lectureDeleteError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case LECTURE_IMAGE_RESET: {
        draft.thumbnailPath = action.data.thumbnailPath;
        break;
      }

      ///////////////////////////////////////////////////////
      default:
        break;
    }
  });

export default reducer;
