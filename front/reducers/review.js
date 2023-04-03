import produce from "../util/produce";

export const initailState = {
  reviewList: [],
  reviewLastPage: 1,

  reviewAdminList: [],

  reviewDetail: null,
  reviewNext: null,
  reviewPrev: null,

  st_reviewListLoading: false,
  st_reviewListDone: false,
  st_reviewListError: null,
  //
  st_reviewAdminListLoading: false,
  st_reviewAdminListDone: false,
  st_reviewAdminListError: null,
  //
  st_reviewDetailLoading: false,
  st_reviewDetailDone: false,
  st_reviewDetailError: null,
  //
  st_reviewCreateLoading: false,
  st_reviewCreateDone: false,
  st_reviewCreateError: null,
  //
  st_reviewUpdateLoading: false,
  st_reviewUpdateDone: false,
  st_reviewUpdateError: null,
  //
  st_reviewDeleteLoading: false,
  st_reviewDeleteDone: false,
  st_reviewDeleteError: null,
  //
  st_reviewAdminDeleteLoading: false,
  st_reviewAdminDeleteDone: false,
  st_reviewAdminDeleteError: null,
  //
  st_reviewAdminIsOkLoading: false,
  st_reviewAdminIsOkDone: false,
  st_reviewAdminIsOkError: null,
};

export const REVIEW_LIST_REQUEST = "REVIEW_LIST_REQUEST";
export const REVIEW_LIST_SUCCESS = "REVIEW_LIST_SUCCESS";
export const REVIEW_LIST_FAILURE = "REVIEW_LIST_FAILURE";

export const REVIEW_ADMIN_LIST_REQUEST = "REVIEW_ADMIN_LIST_REQUEST";
export const REVIEW_ADMIN_LIST_SUCCESS = "REVIEW_ADMIN_LIST_SUCCESS";
export const REVIEW_ADMIN_LIST_FAILURE = "REVIEW_ADMIN_LIST_FAILURE";

export const REVIEW_DETAIL_REQUEST = "REVIEW_DETAIL_REQUEST";
export const REVIEW_DETAIL_SUCCESS = "REVIEW_DETAIL_SUCCESS";
export const REVIEW_DETAIL_FAILURE = "REVIEW_DETAIL_FAILURE";

export const REVIEW_CREATE_REQUEST = "REVIEW_CREATE_REQUEST";
export const REVIEW_CREATE_SUCCESS = "REVIEW_CREATE_SUCCESS";
export const REVIEW_CREATE_FAILURE = "REVIEW_CREATE_FAILURE";

export const REVIEW_UPDATE_REQUEST = "REVIEW_UPDATE_REQUEST";
export const REVIEW_UPDATE_SUCCESS = "REVIEW_UPDATE_SUCCESS";
export const REVIEW_UPDATE_FAILURE = "REVIEW_UPDATE_FAILURE";

export const REVIEW_DELETE_REQUEST = "REVIEW_DELETE_REQUEST";
export const REVIEW_DELETE_SUCCESS = "REVIEW_DELETE_SUCCESS";
export const REVIEW_DELETE_FAILURE = "REVIEW_DELETE_FAILURE";

export const REVIEW_ADMIN_DELETE_REQUEST = "REVIEW_ADMIN_DELETE_REQUEST";
export const REVIEW_ADMIN_DELETE_SUCCESS = "REVIEW_ADMIN_DELETE_SUCCESS";
export const REVIEW_ADMIN_DELETE_FAILURE = "REVIEW_ADMIN_DELETE_FAILURE";

export const REVIEW_ADMIN_ISOK_REQUEST = "REVIEW_ADMIN_ISOK_REQUEST";
export const REVIEW_ADMIN_ISOK_SUCCESS = "REVIEW_ADMIN_ISOK_SUCCESS";
export const REVIEW_ADMIN_ISOK_FAILURE = "REVIEW_ADMIN_ISOK_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      ///////////////////////////////////////////////////////
      case REVIEW_LIST_REQUEST: {
        draft.st_reviewListLoading = true;
        draft.st_reviewListDone = false;
        draft.st_reviewListError = null;
        break;
      }
      case REVIEW_LIST_SUCCESS: {
        draft.st_reviewListLoading = false;
        draft.st_reviewListDone = true;
        draft.st_reviewListError = null;
        draft.reviewList = action.data.list;
        draft.reviewLastPage = action.data.lastPage;
        break;
      }
      case REVIEW_LIST_FAILURE: {
        draft.st_reviewListLoading = false;
        draft.st_reviewListDone = false;
        draft.st_reviewListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REVIEW_ADMIN_LIST_REQUEST: {
        draft.st_reviewAdminListLoading = true;
        draft.st_reviewAdminListDone = false;
        draft.st_reviewAdminListError = null;
        break;
      }
      case REVIEW_ADMIN_LIST_SUCCESS: {
        draft.st_reviewAdminListLoading = false;
        draft.st_reviewAdminListDone = true;
        draft.st_reviewAdminListError = null;
        draft.reviewAdminList = action.data;
        break;
      }
      case REVIEW_ADMIN_LIST_FAILURE: {
        draft.st_reviewAdminListLoading = false;
        draft.st_reviewAdminListDone = false;
        draft.st_reviewAdminListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REVIEW_DETAIL_REQUEST: {
        draft.st_reviewDetailLoading = true;
        draft.st_reviewDetailDone = false;
        draft.st_reviewDetailError = null;
        break;
      }
      case REVIEW_DETAIL_SUCCESS: {
        draft.st_reviewDetailLoading = false;
        draft.st_reviewDetailDone = true;
        draft.st_reviewDetailError = null;
        draft.reviewDetail = action.data.detailData;
        draft.reviewNext = action.data.nextNotice;
        draft.reviewPrev = action.data.prevNotice;
        break;
      }
      case REVIEW_DETAIL_FAILURE: {
        draft.st_reviewDetailLoading = false;
        draft.st_reviewDetailDone = false;
        draft.st_reviewDetailError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REVIEW_CREATE_REQUEST: {
        draft.st_reviewCreateLoading = true;
        draft.st_reviewCreateDone = false;
        draft.st_reviewCreateError = null;
        break;
      }
      case REVIEW_CREATE_SUCCESS: {
        draft.st_reviewCreateLoading = false;
        draft.st_reviewCreateDone = true;
        draft.st_reviewCreateError = null;
        break;
      }
      case REVIEW_CREATE_FAILURE: {
        draft.st_reviewCreateLoading = false;
        draft.st_reviewCreateDone = false;
        draft.st_reviewCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REVIEW_UPDATE_REQUEST: {
        draft.st_reviewUpdateLoading = true;
        draft.st_reviewUpdateDone = false;
        draft.st_reviewUpdateError = null;
        break;
      }
      case REVIEW_UPDATE_SUCCESS: {
        draft.st_reviewUpdateLoading = false;
        draft.st_reviewUpdateDone = true;
        draft.st_reviewUpdateError = null;
        break;
      }
      case REVIEW_UPDATE_FAILURE: {
        draft.st_reviewUpdateLoading = false;
        draft.st_reviewUpdateDone = false;
        draft.st_reviewUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REVIEW_DELETE_REQUEST: {
        draft.st_reviewDeleteLoading = true;
        draft.st_reviewDeleteDone = false;
        draft.st_reviewDeleteError = null;
        break;
      }
      case REVIEW_DELETE_SUCCESS: {
        draft.st_reviewDeleteLoading = false;
        draft.st_reviewDeleteDone = true;
        draft.st_reviewDeleteError = null;
        break;
      }
      case REVIEW_DELETE_FAILURE: {
        draft.st_reviewDeleteLoading = false;
        draft.st_reviewDeleteDone = false;
        draft.st_reviewDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REVIEW_ADMIN_DELETE_REQUEST: {
        draft.st_reviewAdminDeleteLoading = true;
        draft.st_reviewAdminDeleteDone = false;
        draft.st_reviewAdminDeleteError = null;
        break;
      }
      case REVIEW_ADMIN_DELETE_SUCCESS: {
        draft.st_reviewAdminDeleteLoading = false;
        draft.st_reviewAdminDeleteDone = true;
        draft.st_reviewAdminDeleteError = null;
        break;
      }
      case REVIEW_ADMIN_DELETE_FAILURE: {
        draft.st_reviewAdminDeleteLoading = false;
        draft.st_reviewAdminDeleteDone = false;
        draft.st_reviewAdminDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REVIEW_ADMIN_ISOK_REQUEST: {
        draft.st_reviewAdminIsOkLoading = true;
        draft.st_reviewAdminIsOkDone = false;
        draft.st_reviewAdminIsOkError = null;
        break;
      }
      case REVIEW_ADMIN_ISOK_SUCCESS: {
        draft.st_reviewAdminIsOkLoading = false;
        draft.st_reviewAdminIsOkDone = true;
        draft.st_reviewAdminIsOkError = null;
        break;
      }
      case REVIEW_ADMIN_ISOK_FAILURE: {
        draft.st_reviewAdminIsOkLoading = false;
        draft.st_reviewAdminIsOkDone = false;
        draft.st_reviewAdminIsOkError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
