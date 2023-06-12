import produce from "../util/produce";

export const initailState = {
  lectureAdminList: [],
  lectureList: [],
  lectureDetail: null,
  tagList: [],
  lectureTagList: [],

  thumbnailPath: null,

  st_lectureListLoading: false,
  st_lectureListDone: false,
  st_lectureListError: null,

  st_lectureAdminListLoading: false,
  st_lectureAdminListDone: false,
  st_lectureAdminListError: null,

  st_lectureDetailLoading: false,
  st_lectureDetailDone: false,
  st_lectureDetailError: null,

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
  //
  st_tagListLoading: false, // 키워드 리스트
  st_tagListDone: false,
  st_tagListError: null,
  //
  st_tagCreateLoading: false, // 키워드 생성
  st_tagCreateDone: false,
  st_tagCreateError: null,
  //
  st_tagDeleteLoading: false, // 키워드 삭제
  st_tagDeleteDone: false,
  st_tagDeleteError: null,
  //
  st_lectureTagListLoading: false, // 키워드 회원 리스트
  st_lectureTagListDone: false,
  st_lectureTagListError: null,
  //
  st_lectureTagCreateLoading: false, // 키워드 회원 생성
  st_lectureTagCreateDone: false,
  st_lectureTagCreateError: null,
  //
  st_lectureTagDeleteLoading: false, // 카워드 회원 삭제
  st_lectureTagDeleteDone: false,
  st_lectureTagDeleteError: null,
};

export const LECTURE_LIST_REQUEST = "LECTURE_LIST_REQUEST";
export const LECTURE_LIST_SUCCESS = "LECTURE_LIST_SUCCESS";
export const LECTURE_LIST_FAILURE = "LECTURE_LIST_FAILURE";

export const LECTURE_ADMIN_LIST_REQUEST = "LECTURE_ADMIN_LIST_REQUEST";
export const LECTURE_ADMIN_LIST_SUCCESS = "LECTURE_ADMIN_LIST_SUCCESS";
export const LECTURE_ADMIN_LIST_FAILURE = "LECTURE_ADMIN_LIST_FAILURE";

export const LECTURE_DETAIL_REQUEST = "LECTURE_DETAIL_REQUEST";
export const LECTURE_DETAIL_SUCCESS = "LECTURE_DETAIL_SUCCESS";
export const LECTURE_DETAIL_FAILURE = "LECTURE_DETAIL_FAILURE";

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
//
export const TAG_LIST_REQUEST = "TAG_LIST_REQUEST";
export const TAG_LIST_SUCCESS = "TAG_LIST_SUCCESS";
export const TAG_LIST_FAILURE = "TAG_LIST_FAILURE";
//
export const TAG_CREATE_REQUEST = "TAG_CREATE_REQUEST";
export const TAG_CREATE_SUCCESS = "TAG_CREATE_SUCCESS";
export const TAG_CREATE_FAILURE = "TAG_CREATE_FAILURE";
//
export const TAG_DELETE_REQUEST = "TAG_DELETE_REQUEST";
export const TAG_DELETE_SUCCESS = "TAG_DELETE_SUCCESS";
export const TAG_DELETE_FAILURE = "TAG_DELETE_FAILURE";
//
export const LECTURE_TAG_LIST_REQUEST = "LECTURE_TAG_LIST_REQUEST";
export const LECTURE_TAG_LIST_SUCCESS = "LECTURE_TAG_LIST_SUCCESS";
export const LECTURE_TAG_LIST_FAILURE = "LECTURE_TAG_LIST_FAILURE";
//
export const LECTURE_TAG_CREATE_REQUEST = "LECTURE_TAG_CREATE_REQUEST";
export const LECTURE_TAG_CREATE_SUCCESS = "LECTURE_TAG_CREATE_SUCCESS";
export const LECTURE_TAG_CREATE_FAILURE = "LECTURE_TAG_CREATE_FAILURE";
//
export const LECTURE_TAG_DELETE_REQUEST = "LECTURE_TAG_DELETE_REQUEST";
export const LECTURE_TAG_DELETE_SUCCESS = "LECTURE_TAG_DELETE_SUCCESS";
export const LECTURE_TAG_DELETE_FAILURE = "LECTURE_TAG_DELETE_FAILURE";

export const LECTURE_IMAGE_RESET = "LECTURE_IMAGE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      ///////////////////////////////////////////////////////
      case LECTURE_LIST_REQUEST: {
        draft.st_lectureListLoading = true;
        draft.st_lectureListDone = false;
        draft.st_lectureListError = null;
        break;
      }
      case LECTURE_LIST_SUCCESS: {
        draft.st_lectureListLoading = false;
        draft.st_lectureListDone = true;
        draft.st_lectureListError = null;
        draft.lectureList = action.data;
        break;
      }
      case LECTURE_LIST_FAILURE: {
        draft.st_lectureListLoading = false;
        draft.st_lectureListDone = false;
        draft.st_lectureListError = action.error;
        break;
      }
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
      case LECTURE_DETAIL_REQUEST: {
        draft.st_lectureDetailLoading = true;
        draft.st_lectureDetailDone = false;
        draft.st_lectureDetailError = null;
        break;
      }
      case LECTURE_DETAIL_SUCCESS: {
        draft.st_lectureDetailLoading = false;
        draft.st_lectureDetailDone = true;
        draft.st_lectureDetailError = null;
        draft.lectureDetail = action.data;
        break;
      }
      case LECTURE_DETAIL_FAILURE: {
        draft.st_lectureDetailLoading = false;
        draft.st_lectureDetailDone = false;
        draft.st_lectureDetailError = action.error;
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
      case TAG_LIST_REQUEST: {
        draft.st_tagListLoading = true;
        draft.st_tagListDone = false;
        draft.st_tagListError = null;
        break;
      }
      case TAG_LIST_SUCCESS: {
        draft.st_tagListLoading = false;
        draft.st_tagListDone = true;
        draft.st_tagListError = null;
        draft.tagList = action.data;
        break;
      }
      case TAG_LIST_FAILURE: {
        draft.st_tagListLoading = false;
        draft.st_tagListDone = false;
        draft.st_tagListError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case TAG_CREATE_REQUEST: {
        draft.st_tagCreateLoading = true;
        draft.st_tagCreateDone = false;
        draft.st_tagCreateError = null;
        break;
      }
      case TAG_CREATE_SUCCESS: {
        draft.st_tagCreateLoading = false;
        draft.st_tagCreateDone = true;
        draft.st_tagCreateError = null;
        break;
      }
      case TAG_CREATE_FAILURE: {
        draft.st_tagCreateLoading = false;
        draft.st_tagCreateDone = false;
        draft.st_tagCreateError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case TAG_DELETE_REQUEST: {
        draft.st_tagDeleteLoading = true;
        draft.st_tagDeleteDone = false;
        draft.st_tagDeleteError = null;
        break;
      }
      case TAG_DELETE_SUCCESS: {
        draft.st_tagDeleteLoading = false;
        draft.st_tagDeleteDone = true;
        draft.st_tagDeleteError = null;
        break;
      }
      case TAG_DELETE_FAILURE: {
        draft.st_tagDeleteLoading = false;
        draft.st_tagDeleteDone = false;
        draft.st_tagDeleteError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case LECTURE_TAG_LIST_REQUEST: {
        draft.st_lectureTagListLoading = true;
        draft.st_lectureTagListDone = false;
        draft.st_lectureTagListError = null;
        break;
      }
      case LECTURE_TAG_LIST_SUCCESS: {
        draft.st_lectureTagListLoading = false;
        draft.st_lectureTagListDone = true;
        draft.st_lectureTagListError = null;
        draft.lectureTagList = action.data;
        break;
      }
      case LECTURE_TAG_LIST_FAILURE: {
        draft.st_lectureTagListLoading = false;
        draft.st_lectureTagListDone = false;
        draft.st_lectureTagListError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case LECTURE_TAG_CREATE_REQUEST: {
        draft.st_lectureTagCreateLoading = true;
        draft.st_lectureTagCreateDone = false;
        draft.st_lectureTagCreateError = null;
        break;
      }
      case LECTURE_TAG_CREATE_SUCCESS: {
        draft.st_lectureTagCreateLoading = false;
        draft.st_lectureTagCreateDone = true;
        draft.st_lectureTagCreateError = null;
        break;
      }
      case LECTURE_TAG_CREATE_FAILURE: {
        draft.st_lectureTagCreateLoading = false;
        draft.st_lectureTagCreateDone = false;
        draft.st_lectureTagCreateError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case LECTURE_TAG_DELETE_REQUEST: {
        draft.st_lectureTagDeleteLoading = true;
        draft.st_lectureTagDeleteDone = false;
        draft.st_lectureTagDeleteError = null;
        break;
      }
      case LECTURE_TAG_DELETE_SUCCESS: {
        draft.st_lectureTagDeleteLoading = false;
        draft.st_lectureTagDeleteDone = true;
        draft.st_lectureTagDeleteError = null;
        break;
      }
      case LECTURE_TAG_DELETE_FAILURE: {
        draft.st_lectureTagDeleteLoading = false;
        draft.st_lectureTagDeleteDone = false;
        draft.st_lectureTagDeleteError = action.error;
        break;
      }
      //////////////////////////////////////////////
      default:
        break;
    }
  });

export default reducer;
