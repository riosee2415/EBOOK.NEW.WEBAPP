import produce from "../util/produce";

export const initailState = {
  boughtAdminList: [],

  st_boughtAdminListLoading: false, // 리스트
  st_boughtAdminListDone: false,
  st_boughtAdminListError: null,
  //
  st_boughtCreateLoading: false, // 결제하기
  st_boughtCreateDone: false,
  st_boughtCreateError: null,
  //
  st_boughtIsPayUpdateLoading: false, // 승인하기
  st_boughtIsPayUpdateDone: false,
  st_boughtIsPayUpdateError: null,
  //
  st_boughtAddressUpdateLoading: false, // 주소변경
  st_boughtAddressUpdateDone: false,
  st_boughtAddressUpdateError: null,
};

export const BOUGHT_ADMIN_LIST_REQUEST = "BOUGHT_ADMIN_LIST_REQUEST";
export const BOUGHT_ADMIN_LIST_SUCCESS = "BOUGHT_ADMIN_LIST_SUCCESS";
export const BOUGHT_ADMIN_LIST_FAILURE = "BOUGHT_ADMIN_LIST_FAILURE";

export const BOUGHT_CREATE_REQUEST = "BOUGHT_CREATE_REQUEST";
export const BOUGHT_CREATE_SUCCESS = "BOUGHT_CREATE_SUCCESS";
export const BOUGHT_CREATE_FAILURE = "BOUGHT_CREATE_FAILURE";

export const BOUGHT_ISPAY_UPDATE_REQUEST = "BOUGHT_ISPAY_UPDATE_REQUEST";
export const BOUGHT_ISPAY_UPDATE_SUCCESS = "BOUGHT_ISPAY_UPDATE_SUCCESS";
export const BOUGHT_ISPAY_UPDATE_FAILURE = "BOUGHT_ISPAY_UPDATE_FAILURE";

export const BOUGHT_ADDRESS_UPDATE_REQUEST = "BOUGHT_ADDRESS_UPDATE_REQUEST";
export const BOUGHT_ADDRESS_UPDATE_SUCCESS = "BOUGHT_ADDRESS_UPDATE_SUCCESS";
export const BOUGHT_ADDRESS_UPDATE_FAILURE = "BOUGHT_ADDRESS_UPDATE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case BOUGHT_ADMIN_LIST_REQUEST:
        draft.st_boughtAdminListLoading = true;
        draft.st_boughtAdminListDone = false;
        draft.st_boughtAdminListError = null;
        break;
      case BOUGHT_ADMIN_LIST_SUCCESS:
        draft.st_boughtAdminListLoading = false;
        draft.st_boughtAdminListDone = true;
        draft.st_boughtAdminListError = null;
        draft.boughtAdminList = action.data;
        break;
      case BOUGHT_ADMIN_LIST_FAILURE:
        draft.st_boughtAdminListLoading = false;
        draft.st_boughtAdminListDone = false;
        draft.st_boughtAdminListError = action.error;
        break;
      ///////////////////////////////////////////////////////
      case BOUGHT_CREATE_REQUEST:
        draft.st_boughtCreateLoading = true;
        draft.st_boughtCreateDone = false;
        draft.st_boughtCreateError = null;
        break;
      case BOUGHT_CREATE_SUCCESS:
        draft.st_boughtCreateLoading = false;
        draft.st_boughtCreateDone = true;
        draft.st_boughtCreateError = null;
        break;
      case BOUGHT_CREATE_FAILURE:
        draft.st_boughtCreateLoading = false;
        draft.st_boughtCreateDone = false;
        draft.st_boughtCreateError = action.error;
        break;
      ///////////////////////////////////////////////////////
      case BOUGHT_ISPAY_UPDATE_REQUEST:
        draft.st_boughtIsPayUpdateLoading = true;
        draft.st_boughtIsPayUpdateDone = false;
        draft.st_boughtIsPayUpdateError = null;
        break;
      case BOUGHT_ISPAY_UPDATE_SUCCESS:
        draft.st_boughtIsPayUpdateLoading = false;
        draft.st_boughtIsPayUpdateDone = true;
        draft.st_boughtIsPayUpdateError = null;
        break;
      case BOUGHT_ISPAY_UPDATE_FAILURE:
        draft.st_boughtIsPayUpdateLoading = false;
        draft.st_boughtIsPayUpdateDone = false;
        draft.st_boughtIsPayUpdateError = action.error;
        break;
      ///////////////////////////////////////////////////////
      case BOUGHT_ADDRESS_UPDATE_REQUEST:
        draft.st_boughtAddressUpdateLoading = true;
        draft.st_boughtAddressUpdateDone = false;
        draft.st_boughtAddressUpdateError = null;
        break;
      case BOUGHT_ADDRESS_UPDATE_SUCCESS:
        draft.st_boughtAddressUpdateLoading = false;
        draft.st_boughtAddressUpdateDone = true;
        draft.st_boughtAddressUpdateError = null;
        break;
      case BOUGHT_ADDRESS_UPDATE_FAILURE:
        draft.st_boughtAddressUpdateLoading = false;
        draft.st_boughtAddressUpdateDone = false;
        draft.st_boughtAddressUpdateError = action.error;
        break;
      ///////////////////////////////////////////////////////
      default:
        break;
    }
  });

export default reducer;
