import produce from "../util/produce";

export const initailState = {
  bannerList: [],
  mobileBannerList: [],

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
  //
  st_mobileBannerListLoading: false,
  st_mobileBannerListDone: false,
  st_mobileBannerListError: null,
  //
  st_mobileBannerCreateLoading: false,
  st_mobileBannerCreateDone: false,
  st_mobileBannerCreateError: null,
  //
  st_mobileBannerUpdateLoading: false,
  st_mobileBannerUpdateDone: false,
  st_mobileBannerUpdateError: null,
  //
  st_mobileBannerSortUpdateLoading: false,
  st_mobileBannerSortUpdateDone: false,
  st_mobileBannerSortUpdateError: null,
  //
  st_mobileBannerDeleteLoading: false,
  st_mobileBannerDeleteDone: false,
  st_mobileBannerDeleteError: null,
  //
  st_mobileBannerUploadLoading: false,
  st_mobileBannerUploadDone: false,
  st_mobileBannerUploadError: null,
};

// PC
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

export const BANNER_IMAGE_RESET = "BANNER_IMAGE_RESET";
// MOBILE
export const MOBILE_BANNER_LIST_REQUEST = "MOBILE_BANNER_LIST_REQUEST";
export const MOBILE_BANNER_LIST_SUCCESS = "MOBILE_BANNER_LIST_SUCCESS";
export const MOBILE_BANNER_LIST_FAILURE = "MOBILE_BANNER_LIST_FAILURE";

export const MOBILE_BANNER_CREATE_REQUEST = "MOBILE_BANNER_CREATE_REQUEST";
export const MOBILE_BANNER_CREATE_SUCCESS = "MOBILE_BANNER_CREATE_SUCCESS";
export const MOBILE_BANNER_CREATE_FAILURE = "MOBILE_BANNER_CREATE_FAILURE";

export const MOBILE_BANNER_UPDATE_REQUEST = "MOBILE_BANNER_UPDATE_REQUEST";
export const MOBILE_BANNER_UPDATE_SUCCESS = "MOBILE_BANNER_UPDATE_SUCCESS";
export const MOBILE_BANNER_UPDATE_FAILURE = "MOBILE_BANNER_UPDATE_FAILURE";

export const MOBILE_BANNER_SORT_UPDATE_REQUEST =
  "MOBILE_BANNER_SORT_UPDATE_REQUEST";
export const MOBILE_BANNER_SORT_UPDATE_SUCCESS =
  "MOBILE_BANNER_SORT_UPDATE_SUCCESS";
export const MOBILE_BANNER_SORT_UPDATE_FAILURE =
  "MOBILE_BANNER_SORT_UPDATE_FAILURE";

export const MOBILE_BANNER_DELETE_REQUEST = "MOBILE_BANNER_DELETE_REQUEST";
export const MOBILE_BANNER_DELETE_SUCCESS = "MOBILE_BANNER_DELETE_SUCCESS";
export const MOBILE_BANNER_DELETE_FAILURE = "MOBILE_BANNER_DELETE_FAILURE";

export const BANNER_MOBILE_UPLOAD_REQUEST = "BANNER_MOBILE_UPLOAD_REQUEST";
export const BANNER_MOBILE_UPLOAD_SUCCESS = "BANNER_MOBILE_UPLOAD_SUCCESS";
export const BANNER_MOBILE_UPLOAD_FAILURE = "BANNER_MOBILE_UPLOAD_FAILURE";

export const MOBILE_BANNER_IMAGE_RESET = "MOBILE_BANNER_IMAGE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // PC
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

      case BANNER_IMAGE_RESET: {
        draft.imagePath = action.data.imagePath;
        break;
      }

      //////////////////////////////////////////////

      // MOBILE
      //////////////////////////////////////////////
      case MOBILE_BANNER_LIST_REQUEST: {
        draft.st_mobileBannerListLoading = true;
        draft.st_mobileBannerListDone = false;
        draft.st_mobileBannerListError = null;
        break;
      }
      case MOBILE_BANNER_LIST_SUCCESS: {
        draft.st_mobileBannerListLoading = false;
        draft.st_mobileBannerListDone = true;
        draft.st_mobileBannerListError = null;
        draft.mobileBannerList = action.data;
        break;
      }
      case MOBILE_BANNER_LIST_FAILURE: {
        draft.st_mobileBannerListLoading = false;
        draft.st_mobileBannerListDone = false;
        draft.st_mobileBannerListError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case MOBILE_BANNER_CREATE_REQUEST: {
        draft.st_mobileBannerCreateLoading = true;
        draft.st_mobileBannerCreateDone = false;
        draft.st_mobileBannerCreateError = null;
        break;
      }
      case MOBILE_BANNER_CREATE_SUCCESS: {
        draft.st_mobileBannerCreateLoading = false;
        draft.st_mobileBannerCreateDone = true;
        draft.st_mobileBannerCreateError = null;
        break;
      }
      case MOBILE_BANNER_CREATE_FAILURE: {
        draft.st_mobileBannerCreateLoading = false;
        draft.st_mobileBannerCreateDone = false;
        draft.st_mobileBannerCreateError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case MOBILE_BANNER_UPDATE_REQUEST: {
        draft.st_mobileBannerUpdateLoading = true;
        draft.st_mobileBannerUpdateDone = false;
        draft.st_mobileBannerUpdateError = null;
        break;
      }
      case MOBILE_BANNER_UPDATE_SUCCESS: {
        draft.st_mobileBannerUpdateLoading = false;
        draft.st_mobileBannerUpdateDone = true;
        draft.st_mobileBannerUpdateError = null;
        break;
      }
      case MOBILE_BANNER_UPDATE_FAILURE: {
        draft.st_mobileBannerUpdateLoading = false;
        draft.st_mobileBannerUpdateDone = false;
        draft.st_mobileBannerUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case MOBILE_BANNER_SORT_UPDATE_REQUEST: {
        draft.st_mobileBannerSortUpdateLoading = true;
        draft.st_mobileBannerSortUpdateDone = false;
        draft.st_mobileBannerSortUpdateError = null;
        break;
      }
      case MOBILE_BANNER_SORT_UPDATE_SUCCESS: {
        draft.st_mobileBannerSortUpdateLoading = false;
        draft.st_mobileBannerSortUpdateDone = true;
        draft.st_mobileBannerSortUpdateError = null;
        break;
      }
      case MOBILE_BANNER_SORT_UPDATE_FAILURE: {
        draft.st_mobileBannerSortUpdateLoading = false;
        draft.st_mobileBannerSortUpdateDone = false;
        draft.st_mobileBannerSortUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case MOBILE_BANNER_DELETE_REQUEST: {
        draft.st_mobileBannerDeleteLoading = true;
        draft.st_mobileBannerDeleteDone = false;
        draft.st_mobileBannerDeleteError = null;
        break;
      }
      case MOBILE_BANNER_DELETE_SUCCESS: {
        draft.st_mobileBannerDeleteLoading = false;
        draft.st_mobileBannerDeleteDone = true;
        draft.st_mobileBannerDeleteError = null;
        break;
      }
      case MOBILE_BANNER_DELETE_FAILURE: {
        draft.st_mobileBannerDeleteLoading = false;
        draft.st_mobileBannerDeleteDone = false;
        draft.st_mobileBannerDeleteError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case BANNER_MOBILE_UPLOAD_REQUEST: {
        draft.st_mobileBannerUploadLoading = true;
        draft.st_mobileBannerUploadDone = false;
        draft.st_mobileBannerUploadError = null;
        break;
      }
      case BANNER_MOBILE_UPLOAD_SUCCESS: {
        draft.st_mobileBannerUploadLoading = false;
        draft.st_mobileBannerUploadDone = true;
        draft.st_mobileBannerUploadError = null;
        draft.mobileImagePath = action.data.path;
        break;
      }
      case BANNER_MOBILE_UPLOAD_FAILURE: {
        draft.st_mobileBannerUploadLoading = false;
        draft.st_mobileBannerUploadDone = false;
        draft.st_mobileBannerUploadError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case MOBILE_BANNER_IMAGE_RESET: {
        draft.mobileImagePath = action.data.mobileImagePath;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
