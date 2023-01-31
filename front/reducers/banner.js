import produce from "../util/produce";

export const initailState = {
  banners: null,
  uploadBannerPath: null,
  bannerHistory: [],
  //
  st_mainBannerLoading: false, // 메인배너 가져오기
  st_mainBannerDone: false,
  st_mainBannerError: null,
  //
  st_bannerUploadLoading: false, // 메인베너 이미지 업로드
  st_bannerUploadDone: false,
  st_bannerUploadError: null,
  //
  st_bannerUpdateLoading: false, // 메인베너 정보 수정
  st_bannerUpdateDone: false,
  st_bannerUpdateError: null,
  //
  st_bannerCreateLoading: false, // 메인베너 생성
  st_bannerCreateDone: false,
  st_bannerCreateError: null,
  //
  st_bannerDeleteLoading: false, // 메인베너 삭제
  st_bannerDeleteDone: false,
  st_bannerDeleteError: null,
  //
  st_bannerSortUpdateLoading: false, // 메인베너 우선순위 변경
  st_bannerSortUpdateDone: false,
  st_bannerSortUpdateError: null,

  //
  st_bannerOnlyImageUpdateLoading: false, // 이미지만 수정하기!
  st_bannerOnlyImageUpdateDone: false,
  st_bannerOnlyImageUpdateError: null,
  //
  st_bannerUseYnLoading: false, // 이미지만 수정하기!
  st_bannerUseYnDone: false,
  st_bannerUseYnError: null,
  //
  st_bannerFastCreateLoading: false, // 배너 빠른생성!
  st_bannerFastCreateDone: false,
  st_bannerFastCreateError: null,
  //
  st_bannerHistoryLoading: false, // 배너 빠른생성!
  st_bannerHistoryDone: false,
  st_bannerHistoryError: null,
};

export const MAIN_BANNER_REQUEST = "MAIN_BANNER_REQUEST";
export const MAIN_BANNER_SUCCESS = "MAIN_BANNER_SUCCESS";
export const MAIN_BANNER_FAILURE = "MAIN_BANNER_FAILURE";

export const BANNER_UPLOAD_REQUEST = "BANNER_UPLOAD_REQUEST";
export const BANNER_UPLOAD_SUCCESS = "BANNER_UPLOAD_SUCCESS";
export const BANNER_UPLOAD_FAILURE = "BANNER_UPLOAD_FAILURE";

export const BANNER_UPDATE_REQUEST = "BANNER_UPDATE_REQUEST";
export const BANNER_UPDATE_SUCCESS = "BANNER_UPDATE_SUCCESS";
export const BANNER_UPDATE_FAILURE = "BANNER_UPDATE_FAILURE";

export const BANNER_CREATE_REQUEST = "BANNER_CREATE_REQUEST";
export const BANNER_CREATE_SUCCESS = "BANNER_CREATE_SUCCESS";
export const BANNER_CREATE_FAILURE = "BANNER_CREATE_FAILURE";

export const BANNER_DELETE_REQUEST = "BANNER_DELETE_REQUEST";
export const BANNER_DELETE_SUCCESS = "BANNER_DELETE_SUCCESS";
export const BANNER_DELETE_FAILURE = "BANNER_DELETE_FAILURE";

export const BANNER_SORT_UPDATE_REQUEST = "BANNER_SORT_UPDATE_REQUEST";
export const BANNER_SORT_UPDATE_SUCCESS = "BANNER_SORT_UPDATE_SUCCESS";
export const BANNER_SORT_UPDATE_FAILURE = "BANNER_SORT_UPDATE_FAILURE";

export const BANNER_ONLY_IMAGE_REQUEST = "BANNER_ONLY_IMAGE_REQUEST";
export const BANNER_ONLY_IMAGE_SUCCESS = "BANNER_ONLY_IMAGE_SUCCESS";
export const BANNER_ONLY_IMAGE_FAILURE = "BANNER_ONLY_IMAGE_FAILURE";

export const BANNER_USE_YN_REQUEST = "BANNER_USE_YN_REQUEST";
export const BANNER_USE_YN_SUCCESS = "BANNER_USE_YN_SUCCESS";
export const BANNER_USE_YN_FAILURE = "BANNER_USE_YN_FAILURE";

export const BANNER_FAST_CREATE_REQUEST = "BANNER_FAST_CREATE_REQUEST";
export const BANNER_FAST_CREATE_SUCCESS = "BANNER_FAST_CREATE_SUCCESS";
export const BANNER_FAST_CREATE_FAILURE = "BANNER_FAST_CREATE_FAILURE";

export const BANNER_HISTORY_REQUEST = "BANNER_HISTORY_REQUEST";
export const BANNER_HISTORY_SUCCESS = "BANNER_HISTORY_SUCCESS";
export const BANNER_HISTORY_FAILURE = "BANNER_HISTORY_FAILURE";

export const UPLOAD_BANNER_INIT_REQUEST = "UPLOAD_BANNER_INIT_REQUEST";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MAIN_BANNER_REQUEST: {
        draft.st_mainBannerLoading = true;
        draft.st_mainBannerDone = null;
        draft.st_mainBannerError = false;
        break;
      }
      case MAIN_BANNER_SUCCESS: {
        draft.st_mainBannerLoading = false;
        draft.st_mainBannerDone = true;
        draft.banners = action.data;
        break;
      }
      case MAIN_BANNER_FAILURE: {
        draft.st_mainBannerLoading = false;
        draft.st_mainBannerDone = false;
        draft.st_mainBannerError = action.error;
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
        draft.uploadBannerPath = action.data.path;
        break;
      }
      case BANNER_UPLOAD_FAILURE: {
        draft.st_bannerUploadLoading = false;
        draft.st_bannerUploadDone = false;
        draft.st_bannerUploadError = action.error;
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

      case BANNER_CREATE_REQUEST: {
        draft.st_bannerCreateLoading = true;
        draft.st_bannerCreateDone = null;
        draft.st_bannerCreateError = false;
        break;
      }
      case BANNER_CREATE_SUCCESS: {
        draft.st_bannerCreateLoading = false;
        draft.st_bannerCreateDone = true;
        draft.uploadBannerPath = null;
        break;
      }
      case BANNER_CREATE_FAILURE: {
        draft.st_bannerCreateLoading = false;
        draft.st_bannerCreateDone = false;
        draft.st_bannerCreateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case BANNER_DELETE_REQUEST: {
        draft.st_bannerDeleteLoading = true;
        draft.st_bannerDeleteDone = null;
        draft.st_bannerDeleteError = false;
        break;
      }
      case BANNER_DELETE_SUCCESS: {
        draft.st_bannerDeleteLoading = false;
        draft.st_bannerDeleteDone = true;
        draft.uploadBannerPath = null;
        break;
      }
      case BANNER_DELETE_FAILURE: {
        draft.st_bannerDeleteLoading = false;
        draft.st_bannerDeleteDone = false;
        draft.st_bannerDeleteError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case BANNER_SORT_UPDATE_REQUEST: {
        draft.st_bannerSortUpdateLoading = true;
        draft.st_bannerSortUpdateDone = null;
        draft.st_bannerSortUpdateError = false;
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

      case BANNER_ONLY_IMAGE_REQUEST: {
        draft.st_bannerOnlyImageUpdateLoading = true;
        draft.st_bannerOnlyImageUpdateDone = null;
        draft.st_bannerOnlyImageUpdateError = false;
        break;
      }
      case BANNER_ONLY_IMAGE_SUCCESS: {
        draft.st_bannerOnlyImageUpdateLoading = false;
        draft.st_bannerOnlyImageUpdateDone = true;
        draft.st_bannerOnlyImageUpdateError = null;
        draft.uploadBannerPath = null;
        break;
      }
      case BANNER_ONLY_IMAGE_FAILURE: {
        draft.st_bannerOnlyImageUpdateLoading = false;
        draft.st_bannerOnlyImageUpdateDone = false;
        draft.st_bannerOnlyImageUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case BANNER_USE_YN_REQUEST: {
        draft.st_bannerUseYnLoading = true;
        draft.st_bannerUseYnDone = false;
        draft.st_bannerUseYnError = null;
        break;
      }
      case BANNER_USE_YN_SUCCESS: {
        draft.st_bannerUseYnLoading = false;
        draft.st_bannerUseYnDone = true;
        draft.st_bannerUseYnError = null;
        break;
      }
      case BANNER_USE_YN_FAILURE: {
        draft.st_bannerUseYnLoading = false;
        draft.st_bannerUseYnDone = false;
        draft.st_bannerUseYnError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case BANNER_FAST_CREATE_REQUEST: {
        draft.st_bannerFastCreateLoading = true;
        draft.st_bannerFastCreateDone = false;
        draft.st_bannerFastCreateError = null;
        break;
      }
      case BANNER_FAST_CREATE_SUCCESS: {
        draft.st_bannerFastCreateLoading = false;
        draft.st_bannerFastCreateDone = true;
        draft.st_bannerFastCreateError = null;
        break;
      }
      case BANNER_FAST_CREATE_FAILURE: {
        draft.st_bannerFastCreateLoading = false;
        draft.st_bannerFastCreateDone = false;
        draft.st_bannerFastCreateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case BANNER_HISTORY_REQUEST: {
        draft.st_bannerHistoryLoading = true;
        draft.st_bannerHistoryDone = false;
        draft.st_bannerHistoryError = null;
        break;
      }
      case BANNER_HISTORY_SUCCESS: {
        draft.st_bannerHistoryLoading = false;
        draft.st_bannerHistoryDone = true;
        draft.st_bannerHistoryError = null;
        draft.bannerHistory = action.data;
        break;
      }
      case BANNER_HISTORY_FAILURE: {
        draft.st_bannerHistoryLoading = false;
        draft.st_bannerHistoryDone = false;
        draft.st_bannerHistoryError = action.error;
        break;
      }
      //////////////////////////////////////////////

      //////////////////////////////////////////////

      case UPLOAD_BANNER_INIT_REQUEST: {
        draft.uploadBannerPath = null;
        break;
      }
      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
