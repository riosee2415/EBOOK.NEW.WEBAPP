import produce from "../util/produce";

export const initailState = {
  companys: null,
  createModal: false, // create 모달 실행
  companyHistory: [],
  snsInfos: [],
  snsImagePath: null,
  historys: [],
  kakaochs: [],
  kakaochPreviewImage: null,
  kakaochHistory: [],
  //
  st_companyLoading: false, // 하단 정보 가져오기
  st_companyDone: false,
  st_companyError: null,
  //
  st_companyCreateLoading: false, // 하단 정보 추가하기
  st_companyCreateDone: false,
  st_companyCreateError: null,
  //
  st_companyDeleteLoading: false, // 하단 정보 삭제하기
  st_companyDeleteDone: false,
  st_companyDeleteError: null,
  //
  st_companyUpdateLoading: false, // 하단 정보 수정하기
  st_companyUpdateDone: false,
  st_companyUpdateError: null,

  //
  st_companySortUpdateLoading: false,
  st_companySortUpdateDone: false,
  st_companySortUpdateError: null,
  //
  st_companyInfohistoryListLoading: false,
  st_companyInfohistoryListDone: false,
  st_companyInfohistoryListError: null,
  //
  st_snsInfoListLoading: false,
  st_snsInfoListDone: false,
  st_snsInfoListError: null,
  //
  st_snsSortUpdateLoading: false,
  st_snsSortUpdateDone: false,
  st_snsSortUpdateError: null,
  //
  st_snsUseUpdateLoading: false,
  st_snsUseUpdateDone: false,
  st_snsUseUpdateError: null,
  //
  st_snsImageLoading: false,
  st_snsImageDone: false,
  st_snsImageError: null,
  //
  st_snsNewLoading: false,
  st_snsNewDone: false,
  st_snsNewError: null,
  //
  st_snsUpdateLoading: false,
  st_snsUpdateDone: false,
  st_snsUpdateError: null,
  //
  st_snsDeleteLoading: false,
  st_snsDeleteDone: false,
  st_snsDeleteError: null,
  //
  st_snsHistoryLoading: false,
  st_snsHistoryDone: false,
  st_snsHistoryError: null,
  //
  st_kakaochGetLoading: false,
  st_kakaochGetDone: false,
  st_kakaochGetError: null,
  //
  st_kakaochNewLoading: false,
  st_kakaochNewDone: false,
  st_kakaochNewError: null,
  //
  st_kakaochUseYnLoading: false,
  st_kakaochUseYnDone: false,
  st_kakaochUseYnError: null,
  //
  st_kakakochPreviewLoading: false,
  st_kakaochPreviewYnDone: false,
  st_kakaochPreviewYnError: null,
  //
  st_kakakochUpdateLoading: false,
  st_kakaochUpdateYnDone: false,
  st_kakaochUpdateYnError: null,
  //
  st_kakaochHistoryLoading: false,
  st_kakaochHistoryYnDone: false,
  st_kakaochHistoryYnError: null,
};

export const COMPANY_GET_REQUEST = "COMPANY_GET_REQUEST";
export const COMPANY_GET_SUCCESS = "COMPANY_GET_SUCCESS";
export const COMPANY_GET_FAILURE = "COMPANY_GET_FAILURE";

export const COMPANY_CREATE_REQUEST = "COMPANY_CREATE_REQUEST";
export const COMPANY_CREATE_SUCCESS = "COMPANY_CREATE_SUCCESS";
export const COMPANY_CREATE_FAILURE = "COMPANY_CREATE_FAILURE";

export const COMPANY_DELETE_REQUEST = "COMPANY_DELETE_REQUEST";
export const COMPANY_DELETE_SUCCESS = "COMPANY_DELETE_SUCCESS";
export const COMPANY_DELETE_FAILURE = "COMPANY_DELETE_FAILURE";

export const COMPANY_UPDATE_REQUEST = "COMPANY_UPDATE_REQUEST";
export const COMPANY_UPDATE_SUCCESS = "COMPANY_UPDATE_SUCCESS";
export const COMPANY_UPDATE_FAILURE = "COMPANY_UPDATE_FAILURE";

export const COMPANY_SORT_UPDATE_REQUEST = "COMPANY_SORT_UPDATE_REQUEST";
export const COMPANY_SORT_UPDATE_SUCCESS = "COMPANY_SORT_UPDATE_SUCCESS";
export const COMPANY_SORT_UPDATE_FAILURE = "COMPANY_SORT_UPDATE_FAILURE";

export const COMPANYINFO_HISTORY_REQUEST = "COMPANYINFO_HISTORY_REQUEST";
export const COMPANYINFO_HISTORY_SUCCESS = "COMPANYINFO_HISTORY_SUCCESS";
export const COMPANYINFO_HISTORY_FAILURE = "COMPANYINFO_HISTORY_FAILURE";

export const SNS_INFO_LIST_REQUEST = "SNS_INFO_LIST_REQUEST";
export const SNS_INFO_LIST_SUCCESS = "SNS_INFO_LIST_SUCCESS";
export const SNS_INFO_LIST_FAILURE = "SNS_INFO_LIST_FAILURE";

export const SNS_SORT_UPDATE_REQUEST = "SNS_SORT_UPDATE_REQUEST";
export const SNS_SORT_UPDATE_SUCCESS = "SNS_SORT_UPDATE_SUCCESS";
export const SNS_SORT_UPDATE_FAILURE = "SNS_SORT_UPDATE_FAILURE";

export const SNS_USE_UPDATE_REQUEST = "SNS_USE_UPDATE_REQUEST";
export const SNS_USE_UPDATE_SUCCESS = "SNS_USE_UPDATE_SUCCESS";
export const SNS_USE_UPDATE_FAILURE = "SNS_USE_UPDATE_FAILURE";

export const SNS_IMAGE_REQUEST = "SNS_IMAGE_REQUEST";
export const SNS_IMAGE_SUCCESS = "SNS_IMAGE_SUCCESS";
export const SNS_IMAGE_FAILURE = "SNS_IMAGE_FAILURE";

export const SNS_NEW_REQUEST = "SNS_NEW_REQUEST";
export const SNS_NEW_SUCCESS = "SNS_NEW_SUCCESS";
export const SNS_NEW_FAILURE = "SNS_NEW_FAILURE";

export const SNS_UPDATE_REQUEST = "SNS_UPDATE_REQUEST";
export const SNS_UPDATE_SUCCESS = "SNS_UPDATE_SUCCESS";
export const SNS_UPDATE_FAILURE = "SNS_UPDATE_FAILURE";

export const SNS_DELETE_REQUEST = "SNS_DELETE_REQUEST";
export const SNS_DELETE_SUCCESS = "SNS_DELETE_SUCCESS";
export const SNS_DELETE_FAILURE = "SNS_DELETE_FAILURE";

export const SNS_HISTORY_REQUEST = "SNS_HISTORY_REQUEST";
export const SNS_HISTORY_SUCCESS = "SNS_HISTORY_SUCCESS";
export const SNS_HISTORY_FAILURE = "SNS_HISTORY_FAILURE";

export const KAKAOCH_GET_REQUEST = "KAKAOCH_GET_REQUEST";
export const KAKAOCH_GET_SUCCESS = "KAKAOCH_GET_SUCCESS";
export const KAKAOCH_GET_FAILURE = "KAKAOCH_GET_FAILURE";

export const KAKAOCH_NEW_REQUEST = "KAKAOCH_NEW_REQUEST";
export const KAKAOCH_NEW_SUCCESS = "KAKAOCH_NEW_SUCCESS";
export const KAKAOCH_NEW_FAILURE = "KAKAOCH_NEW_FAILURE";

export const KAKAOCH_USEYN_REQUEST = "KAKAOCH_USEYN_REQUEST";
export const KAKAOCH_USEYN_SUCCESS = "KAKAOCH_USEYN_SUCCESS";
export const KAKAOCH_USEYN_FAILURE = "KAKAOCH_USEYN_FAILURE";

export const KAKAOCH_PREVIEW_REQUEST = "KAKAOCH_PREVIEW_REQUEST";
export const KAKAOCH_PREVIEW_SUCCESS = "KAKAOCH_PREVIEW_SUCCESS";
export const KAKAOCH_PREVIEW_FAILURE = "KAKAOCH_PREVIEW_FAILURE";

export const KAKAOCH_UPDATE_REQUEST = "KAKAOCH_UPDATE_REQUEST";
export const KAKAOCH_UPDATE_SUCCESS = "KAKAOCH_UPDATE_SUCCESS";
export const KAKAOCH_UPDATE_FAILURE = "KAKAOCH_UPDATE_FAILURE";

export const KAKAOCH_HISTORY_REQUEST = "KAKAOCH_HISTORY_REQUEST";
export const KAKAOCH_HISTORY_SUCCESS = "KAKAOCH_HISTORY_SUCCESS";
export const KAKAOCH_HISTORY_FAILURE = "KAKAOCH_HISTORY_FAILURE";

export const COMPANY_CREATE_MODAL_TOGGLE = "COMPANY_CREATE_MODAL_TOGGLE";
export const SET_IMAGE_PATH = "SET_IMAGE_PATH";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case COMPANY_GET_REQUEST: {
        draft.st_companyLoading = true;
        draft.st_companyDone = null;
        draft.st_companyError = false;
        break;
      }
      case COMPANY_GET_SUCCESS: {
        draft.st_companyLoading = false;
        draft.st_companyDone = true;
        draft.companys = action.data;
        break;
      }
      case COMPANY_GET_FAILURE: {
        draft.st_companyLoading = false;
        draft.st_companyDone = false;
        draft.st_companyError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case COMPANY_CREATE_REQUEST: {
        draft.st_companyCreateLoading = true;
        draft.st_companyCreateDone = false;
        draft.st_companyCreateError = null;
        break;
      }
      case COMPANY_CREATE_SUCCESS: {
        draft.st_companyCreateLoading = false;
        draft.st_companyCreateDone = true;
        draft.st_companyCreateError = null;
        break;
      }
      case COMPANY_CREATE_FAILURE: {
        draft.st_companyCreateLoading = false;
        draft.st_companyCreateDone = false;
        draft.st_companyCreateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case COMPANY_DELETE_REQUEST: {
        draft.st_companyDeleteLoading = true;
        draft.st_companyDeleteDone = null;
        draft.st_companyDeleteError = false;
        break;
      }
      case COMPANY_DELETE_SUCCESS: {
        draft.st_companyDeleteLoading = false;
        draft.st_companyDeleteDone = true;
        draft.uploadImagePath = null;
        break;
      }
      case COMPANY_DELETE_FAILURE: {
        draft.st_companyDeleteLoading = false;
        draft.st_companyDeleteDone = false;
        draft.st_companyDeleteError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case COMPANY_UPDATE_REQUEST: {
        draft.st_companyUpdateLoading = true;
        draft.st_companyUpdateDone = null;
        draft.st_companyUpdateError = false;
        break;
      }
      case COMPANY_UPDATE_SUCCESS: {
        draft.st_companyUpdateLoading = false;
        draft.st_companyUpdateDone = true;
        draft.uploadImagePath = null;
        break;
      }
      case COMPANY_UPDATE_FAILURE: {
        draft.st_companyUpdateLoading = true;
        draft.st_companyUpdateDone = false;
        draft.st_companyUpdateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case COMPANY_SORT_UPDATE_REQUEST: {
        draft.st_companySortUpdateLoading = true;
        draft.st_companySortUpdateDone = false;
        draft.st_companySortUpdateError = null;
        break;
      }
      case COMPANY_SORT_UPDATE_SUCCESS: {
        draft.st_companySortUpdateLoading = false;
        draft.st_companySortUpdateDone = true;
        draft.st_companySortUpdateError = null;
        break;
      }
      case COMPANY_SORT_UPDATE_FAILURE: {
        draft.st_companySortUpdateLoading = true;
        draft.st_companySortUpdateDone = false;
        draft.st_companySortUpdateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case COMPANYINFO_HISTORY_REQUEST: {
        draft.st_companyInfohistoryListLoading = true;
        draft.st_companyInfohistoryListDone = false;
        draft.st_companyInfohistoryListError = null;
        break;
      }
      case COMPANYINFO_HISTORY_SUCCESS: {
        draft.st_companyInfohistoryListLoading = false;
        draft.st_companyInfohistoryListDone = true;
        draft.st_companyInfohistoryListError = null;
        draft.companyHistory = action.data;
        break;
      }
      case COMPANYINFO_HISTORY_FAILURE: {
        draft.st_companyInfohistoryListLoading = true;
        draft.st_companyInfohistoryListDone = false;
        draft.st_companyInfohistoryListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case SNS_INFO_LIST_REQUEST: {
        draft.st_snsInfoListLoading = true;
        draft.st_snsInfoListDone = false;
        draft.st_snsInfoListError = null;
        break;
      }
      case SNS_INFO_LIST_SUCCESS: {
        draft.st_snsInfoListLoading = false;
        draft.st_snsInfoListDone = true;
        draft.st_snsInfoListError = null;
        draft.snsInfos = action.data;
        break;
      }
      case SNS_INFO_LIST_FAILURE: {
        draft.st_snsInfoListLoading = true;
        draft.st_snsInfoListDone = false;
        draft.st_snsInfoListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case SNS_SORT_UPDATE_REQUEST: {
        draft.st_snsSortUpdateLoading = true;
        draft.st_snsSortUpdateDone = false;
        draft.st_snsSortUpdateError = null;
        break;
      }
      case SNS_SORT_UPDATE_SUCCESS: {
        draft.st_snsSortUpdateLoading = false;
        draft.st_snsSortUpdateDone = true;
        draft.st_snsSortUpdateError = null;
        break;
      }
      case SNS_SORT_UPDATE_FAILURE: {
        draft.st_snsSortUpdateLoading = true;
        draft.st_snsSortUpdateDone = false;
        draft.st_snsSortUpdateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case SNS_USE_UPDATE_REQUEST: {
        draft.st_snsUseUpdateLoading = true;
        draft.st_snsUseUpdateDone = false;
        draft.st_snsUseUpdateError = null;
        break;
      }
      case SNS_USE_UPDATE_SUCCESS: {
        draft.st_snsUseUpdateLoading = false;
        draft.st_snsUseUpdateDone = true;
        draft.st_snsUseUpdateError = null;
        break;
      }
      case SNS_USE_UPDATE_FAILURE: {
        draft.st_snsUseUpdateLoading = true;
        draft.st_snsUseUpdateDone = false;
        draft.st_snsUseUpdateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case SNS_IMAGE_REQUEST: {
        draft.st_snsImageLoading = true;
        draft.st_snsImageDone = false;
        draft.st_snsImageError = null;
        break;
      }
      case SNS_IMAGE_SUCCESS: {
        draft.st_snsImageLoading = false;
        draft.st_snsImageDone = true;
        draft.st_snsImageError = null;
        draft.snsImagePath = action.data.path;
        break;
      }
      case SNS_IMAGE_FAILURE: {
        draft.st_snsImageLoading = true;
        draft.st_snsImageDone = false;
        draft.st_snsImageError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case SNS_NEW_REQUEST: {
        draft.st_snsNewLoading = true;
        draft.st_snsNewDone = false;
        draft.st_snsNewError = null;
        break;
      }
      case SNS_NEW_SUCCESS: {
        draft.st_snsNewLoading = false;
        draft.st_snsNewDone = true;
        draft.st_snsNewError = null;
        draft.snsImagePath = null;
        break;
      }
      case SNS_NEW_FAILURE: {
        draft.st_snsNewLoading = true;
        draft.st_snsNewDone = false;
        draft.st_snsNewError = action.error;
        draft.snsImagePath = null;
        break;
      }
      ///////////////////////////////////////////////////////

      case SNS_UPDATE_REQUEST: {
        draft.st_snsUpdateLoading = true;
        draft.st_snsUpdateDone = false;
        draft.st_snsUpdateError = null;
        break;
      }
      case SNS_UPDATE_SUCCESS: {
        draft.st_snsUpdateLoading = false;
        draft.st_snsUpdateDone = true;
        draft.st_snsUpdateError = null;
        break;
      }
      case SNS_UPDATE_FAILURE: {
        draft.st_snsUpdateLoading = true;
        draft.st_snsUpdateDone = false;
        draft.st_snsUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case SNS_DELETE_REQUEST: {
        draft.st_snsDeleteLoading = true;
        draft.st_snsDeleteDone = false;
        draft.st_snsDeleteError = null;
        break;
      }
      case SNS_DELETE_SUCCESS: {
        draft.st_snsDeleteLoading = false;
        draft.st_snsDeleteDone = true;
        draft.st_snsDeleteError = null;
        break;
      }
      case SNS_DELETE_FAILURE: {
        draft.st_snsDeleteLoading = true;
        draft.st_snsDeleteDone = false;
        draft.st_snsDeleteError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case SNS_HISTORY_REQUEST: {
        draft.st_snsHistoryLoading = true;
        draft.st_snsHistoryDone = false;
        draft.st_snsHistoryError = null;
        break;
      }
      case SNS_HISTORY_SUCCESS: {
        draft.st_snsHistoryLoading = false;
        draft.st_snsHistoryDone = true;
        draft.st_snsHistoryError = null;
        draft.historys = action.data;
        break;
      }
      case SNS_HISTORY_FAILURE: {
        draft.st_snsHistoryLoading = true;
        draft.st_snsHistoryDone = false;
        draft.st_snsHistoryError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case KAKAOCH_GET_REQUEST: {
        draft.st_kakaochGetLoading = true;
        draft.st_kakaochGetDone = false;
        draft.st_kakaochGetError = null;
        break;
      }
      case KAKAOCH_GET_SUCCESS: {
        draft.st_kakaochGetLoading = false;
        draft.st_kakaochGetDone = true;
        draft.st_kakaochGetError = null;
        draft.kakaochs = action.data;
        break;
      }
      case KAKAOCH_GET_FAILURE: {
        draft.st_kakaochGetLoading = true;
        draft.st_kakaochGetDone = false;
        draft.st_kakaochGetError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case KAKAOCH_NEW_REQUEST: {
        draft.st_kakaochNewLoading = true;
        draft.st_kakaochNewDone = false;
        draft.st_kakaochNewError = null;
        break;
      }
      case KAKAOCH_NEW_SUCCESS: {
        draft.st_kakaochNewLoading = false;
        draft.st_kakaochNewDone = true;
        draft.st_kakaochNewError = null;
        break;
      }
      case KAKAOCH_NEW_FAILURE: {
        draft.st_kakaochNewLoading = true;
        draft.st_kakaochNewDone = false;
        draft.st_kakaochNewError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case KAKAOCH_USEYN_REQUEST: {
        draft.st_kakaochUseYnLoading = true;
        draft.st_kakaochUseYnDone = false;
        draft.st_kakaochUseYnError = null;
        break;
      }
      case KAKAOCH_USEYN_SUCCESS: {
        draft.st_kakaochUseYnLoading = false;
        draft.st_kakaochUseYnDone = true;
        draft.st_kakaochUseYnError = null;
        break;
      }
      case KAKAOCH_USEYN_FAILURE: {
        draft.st_kakaochUseYnLoading = true;
        draft.st_kakaochUseYnDone = false;
        draft.st_kakaochUseYnError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case KAKAOCH_PREVIEW_REQUEST: {
        draft.st_kakakochPreviewLoading = true;
        draft.st_kakaochPreviewYnDone = false;
        draft.st_kakaochPreviewYnError = null;
        break;
      }
      case KAKAOCH_PREVIEW_SUCCESS: {
        draft.st_kakakochPreviewLoading = false;
        draft.st_kakaochPreviewYnDone = true;
        draft.st_kakaochPreviewYnError = null;
        draft.kakaochPreviewImage = action.data.path;
        break;
      }
      case KAKAOCH_PREVIEW_FAILURE: {
        draft.st_kakakochPreviewLoading = true;
        draft.st_kakaochPreviewYnDone = false;
        draft.st_kakaochPreviewYnError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case KAKAOCH_UPDATE_REQUEST: {
        draft.st_kakakochUpdateLoading = true;
        draft.st_kakaochUpdateYnDone = false;
        draft.st_kakaochUpdateYnError = null;
        break;
      }
      case KAKAOCH_UPDATE_SUCCESS: {
        draft.st_kakakochUpdateLoading = false;
        draft.st_kakaochUpdateYnDone = true;
        draft.st_kakaochUpdateYnError = null;
        draft.kakaochPreviewImage = null;
        break;
      }
      case KAKAOCH_UPDATE_FAILURE: {
        draft.st_kakakochUpdateLoading = true;
        draft.st_kakaochUpdateYnDone = false;
        draft.st_kakaochUpdateYnError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case KAKAOCH_HISTORY_REQUEST: {
        draft.st_kakaochHistoryLoading = true;
        draft.st_kakaochHistoryYnDone = false;
        draft.st_kakaochHistoryYnError = null;
        break;
      }
      case KAKAOCH_HISTORY_SUCCESS: {
        draft.st_kakaochHistoryLoading = false;
        draft.st_kakaochHistoryYnDone = true;
        draft.st_kakaochHistoryYnError = null;
        draft.kakaochHistory = action.data;
        break;
      }
      case KAKAOCH_HISTORY_FAILURE: {
        draft.st_kakaochHistoryLoading = true;
        draft.st_kakaochHistoryYnDone = false;
        draft.st_kakaochHistoryYnError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case COMPANY_CREATE_MODAL_TOGGLE: {
        draft.createModal = !draft.createModal;
        break;
      }

      ///////////////////////////////////////////////////////

      case SET_IMAGE_PATH: {
        draft.snsImagePath = action.data.value;
        break;
      }
      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
