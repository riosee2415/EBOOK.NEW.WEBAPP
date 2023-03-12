import produce from "../util/produce";

export const initailState = {
  bannerList: [],

  imagePath: null,
  mobileImagePath: null,

  //
  st_bannerListLoading: false,
  st_bannerListDone: false,
  st_bannerListError: null,
  //
  st_bannerCreateLoading: false,
  st_bannerCreateDone: false,
  st_bannerCreateError: null,
  //
  st_bannerUpdateLoading: false,
  st_bannerUpdateDone: false,
  st_bannerUpdateError: null,
  //
  st_bannerSortUpdateLoading: false,
  st_bannerSortUpdateDone: false,
  st_bannerSortUpdateError: null,
  //
  st_bannerDeleteLoading: false,
  st_bannerDeleteDone: false,
  st_bannerDeleteError: null,
  //
  st_bannerUploadLoading: false,
  st_bannerUploadDone: false,
  st_bannerUploadError: null,
  //
  st_bannerMobileUploadLoading: false,
  st_bannerMobileUploadDone: false,
  st_bannerMobileUploadError: null,
};

export const BANNER_LIST_REQUEST = "BANNER_LIST_REQUEST";
export const BANNER_LIST_SUCCESS = "BANNER_LIST_SUCCESS";
export const BANNER_LIST_FAILURE = "BANNER_LIST_FAILURE";

export const BANNER_CREATE_REQUEST = "BANNER_CREATE_REQUEST";
export const BANNER_CREATE_SUCCESS = "BANNER_CREATE_SUCCESS";
export const BANNER_CREATE_FAILURE = "BANNER_CREATE_FAILURE";

export const BANNER_UPDATE_REQUEST = "BANNER_UPDATE_REQUEST";
export const BANNER_UPDATE_SUCCESS = "BANNER_UPDATE_SUCCESS";
export const BANNER_UPDATE_FAILURE = "BANNER_UPDATE_FAILURE";

export const BANNER_SORT_UPDATE_REQUEST = "BANNER_SORT_UPDATE_REQUEST";
export const BANNER_SORT_UPDATE_SUCCESS = "BANNER_SORT_UPDATE_SUCCESS";
export const BANNER_SORT_UPDATE_FAILURE = "BANNER_SORT_UPDATE_FAILURE";

export const BANNER_DELETE_REQUEST = "BANNER_DELETE_REQUEST";
export const BANNER_DELETE_SUCCESS = "BANNER_DELETE_SUCCESS";
export const BANNER_DELETE_FAILURE = "BANNER_DELETE_FAILURE";

export const BANNER_UPLOAD_REQUEST = "BANNER_UPLOAD_REQUEST";
export const BANNER_UPLOAD_SUCCESS = "BANNER_UPLOAD_SUCCESS";
export const BANNER_UPLOAD_FAILURE = "BANNER_UPLOAD_FAILURE";

export const BANNER_MOBILE_UPLOAD_REQUEST = "BANNER_MOBILE_UPLOAD_REQUEST";
export const BANNER_MOBILE_UPLOAD_SUCCESS = "BANNER_MOBILE_UPLOAD_SUCCESS";
export const BANNER_MOBILE_UPLOAD_FAILURE = "BANNER_MOBILE_UPLOAD_FAILURE";

export const BANNER_IMAGE_RESET = "BANNER_IMAGE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //////////////////////////////////////////////
      case BANNER_LIST_REQUEST: {
        draft.st_bannerListLoading = true;
        draft.st_bannerListDone = false;
        draft.st_bannerListError = null;
        break;
      }
      case BANNER_LIST_SUCCESS: {
        draft.st_bannerListLoading = false;
        draft.st_bannerListDone = true;
        draft.st_bannerListError = null;
        draft.bannerList = action.data;
        break;
      }
      case BANNER_LIST_FAILURE: {
        draft.st_bannerListLoading = false;
        draft.st_bannerListDone = false;
        draft.st_bannerListError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case BANNER_CREATE_REQUEST: {
        draft.st_bannerCreateLoading = true;
        draft.st_bannerCreateDone = false;
        draft.st_bannerCreateError = null;
        break;
      }
      case BANNER_CREATE_SUCCESS: {
        draft.st_bannerCreateLoading = false;
        draft.st_bannerCreateDone = true;
        draft.st_bannerCreateError = null;
        break;
      }
      case BANNER_CREATE_FAILURE: {
        draft.st_bannerCreateLoading = false;
        draft.st_bannerCreateDone = false;
        draft.st_bannerCreateError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case BANNER_UPDATE_REQUEST: {
        draft.st_bannerUpdateLoading = true;
        draft.st_bannerUpdateDone = false;
        draft.st_bannerUpdateError = null;
        break;
      }
      case BANNER_UPDATE_SUCCESS: {
        draft.st_bannerUpdateLoading = false;
        draft.st_bannerUpdateDone = true;
        draft.st_bannerUpdateError = null;
        break;
      }
      case BANNER_UPDATE_FAILURE: {
        draft.st_bannerUpdateLoading = false;
        draft.st_bannerUpdateDone = false;
        draft.st_bannerUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case BANNER_SORT_UPDATE_REQUEST: {
        draft.st_bannerSortUpdateLoading = true;
        draft.st_bannerSortUpdateDone = false;
        draft.st_bannerSortUpdateError = null;
        break;
      }
      case BANNER_SORT_UPDATE_SUCCESS: {
        draft.st_bannerSortUpdateLoading = false;
        draft.st_bannerSortUpdateDone = true;
        draft.st_bannerSortUpdateError = null;
        break;
      }
      case BANNER_SORT_UPDATE_FAILURE: {
        draft.st_bannerSortUpdateLoading = false;
        draft.st_bannerSortUpdateDone = false;
        draft.st_bannerSortUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case BANNER_DELETE_REQUEST: {
        draft.st_bannerDeleteLoading = true;
        draft.st_bannerDeleteDone = false;
        draft.st_bannerDeleteError = null;
        break;
      }
      case BANNER_DELETE_SUCCESS: {
        draft.st_bannerDeleteLoading = false;
        draft.st_bannerDeleteDone = true;
        draft.st_bannerDeleteError = null;
        break;
      }
      case BANNER_DELETE_FAILURE: {
        draft.st_bannerDeleteLoading = false;
        draft.st_bannerDeleteDone = false;
        draft.st_bannerDeleteError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case BANNER_UPLOAD_REQUEST: {
        draft.st_bannerUploadLoading = true;
        draft.st_bannerUploadDone = false;
        draft.st_bannerUploadError = null;
        break;
      }
      case BANNER_UPLOAD_SUCCESS: {
        draft.st_bannerUploadLoading = false;
        draft.st_bannerUploadDone = true;
        draft.st_bannerUploadError = null;
        draft.imagePath = action.data.path;
        break;
      }
      case BANNER_UPLOAD_FAILURE: {
        draft.st_bannerUploadLoading = false;
        draft.st_bannerUploadDone = false;
        draft.st_bannerUploadError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case BANNER_MOBILE_UPLOAD_REQUEST: {
        draft.st_bannerMobileUploadLoading = true;
        draft.st_bannerMobileUploadDone = false;
        draft.st_bannerMobileUploadError = null;
        break;
      }
      case BANNER_MOBILE_UPLOAD_SUCCESS: {
        draft.st_bannerMobileUploadLoading = false;
        draft.st_bannerMobileUploadDone = true;
        draft.st_bannerMobileUploadError = null;
        draft.mobileImagePath = action.data.path;
        break;
      }
      case BANNER_MOBILE_UPLOAD_FAILURE: {
        draft.st_bannerMobileUploadLoading = false;
        draft.st_bannerMobileUploadDone = false;
        draft.st_bannerMobileUploadError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case BANNER_IMAGE_RESET: {
        draft.imagePath = action.data.imagePath;
        draft.mobileImagePath = action.data.mobileImagePath;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
