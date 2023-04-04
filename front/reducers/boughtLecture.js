import produce from "../util/produce";

export const initailState = {
  boughtAdminList: [],
  boughtMeDetail: null,

  boughtAdminId: null,

  boughtDetail: null,

  st_boughtAdminListLoading: false, // 리스트
  st_boughtAdminListDone: false,
  st_boughtAdminListError: null,
  //
  st_boughtAdminIdLoading: false, // 리스트 - 관리자
  st_boughtAdminIdDone: false,
  st_boughtAdminIdError: null,
  //
  st_boughtAdminCreateLoading: false, // 부여 - 관리자
  st_boughtAdminCreateDone: false,
  st_boughtAdminCreateError: null,
  //
  st_boughtAdminUpdateLoading: false, // 수정 - 관리자
  st_boughtAdminUpdateDone: false,
  st_boughtAdminUpdateError: null,
  //
  st_boughtAdminDeleteLoading: false, // 삭제 - 관리자
  st_boughtAdminDeleteDone: false,
  st_boughtAdminDeleteError: null,
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
  //
  st_boughtMeDetailLoading: false, // 자신의 수강권
  st_boughtMeDetailDone: false,
  st_boughtMeDetailError: null,
  //
  st_boughtRecentlyUpdateLoading: false, // 마지막으로 들은 수강ㄴ
  st_boughtRecentlyUpdateDone: false,
  st_boughtRecentlyUpdateError: null,
  //
  st_boughtDetailLoading: false, // 수강권 상세
  st_boughtDetailDone: false,
  st_boughtDetailError: null,
};

export const BOUGHT_ADMIN_LIST_REQUEST = "BOUGHT_ADMIN_LIST_REQUEST";
export const BOUGHT_ADMIN_LIST_SUCCESS = "BOUGHT_ADMIN_LIST_SUCCESS";
export const BOUGHT_ADMIN_LIST_FAILURE = "BOUGHT_ADMIN_LIST_FAILURE";

export const BOUGHT_ADMIN_ID_REQUEST = "BOUGHT_ADMIN_ID_REQUEST";
export const BOUGHT_ADMIN_ID_SUCCESS = "BOUGHT_ADMIN_ID_SUCCESS";
export const BOUGHT_ADMIN_ID_FAILURE = "BOUGHT_ADMIN_ID_FAILURE";

export const BOUGHT_ADMIN_CREATE_REQUEST = "BOUGHT_ADMIN_CREATE_REQUEST";
export const BOUGHT_ADMIN_CREATE_SUCCESS = "BOUGHT_ADMIN_CREATE_SUCCESS";
export const BOUGHT_ADMIN_CREATE_FAILURE = "BOUGHT_ADMIN_CREATE_FAILURE";

export const BOUGHT_ADMIN_UPDATE_REQUEST = "BOUGHT_ADMIN_UPDATE_REQUEST";
export const BOUGHT_ADMIN_UPDATE_SUCCESS = "BOUGHT_ADMIN_UPDATE_SUCCESS";
export const BOUGHT_ADMIN_UPDATE_FAILURE = "BOUGHT_ADMIN_UPDATE_FAILURE";

export const BOUGHT_ADMIN_DELETE_REQUEST = "BOUGHT_ADMIN_DELETE_REQUEST";
export const BOUGHT_ADMIN_DELETE_SUCCESS = "BOUGHT_ADMIN_DELETE_SUCCESS";
export const BOUGHT_ADMIN_DELETE_FAILURE = "BOUGHT_ADMIN_DELETE_FAILURE";

export const BOUGHT_CREATE_REQUEST = "BOUGHT_CREATE_REQUEST";
export const BOUGHT_CREATE_SUCCESS = "BOUGHT_CREATE_SUCCESS";
export const BOUGHT_CREATE_FAILURE = "BOUGHT_CREATE_FAILURE";

export const BOUGHT_ISPAY_UPDATE_REQUEST = "BOUGHT_ISPAY_UPDATE_REQUEST";
export const BOUGHT_ISPAY_UPDATE_SUCCESS = "BOUGHT_ISPAY_UPDATE_SUCCESS";
export const BOUGHT_ISPAY_UPDATE_FAILURE = "BOUGHT_ISPAY_UPDATE_FAILURE";

export const BOUGHT_ADDRESS_UPDATE_REQUEST = "BOUGHT_ADDRESS_UPDATE_REQUEST";
export const BOUGHT_ADDRESS_UPDATE_SUCCESS = "BOUGHT_ADDRESS_UPDATE_SUCCESS";
export const BOUGHT_ADDRESS_UPDATE_FAILURE = "BOUGHT_ADDRESS_UPDATE_FAILURE";

export const BOUGHT_ME_DETAIL_REQUEST = "BOUGHT_ME_DETAIL_REQUEST";
export const BOUGHT_ME_DETAIL_SUCCESS = "BOUGHT_ME_DETAIL_SUCCESS";
export const BOUGHT_ME_DETAIL_FAILURE = "BOUGHT_ME_DETAIL_FAILURE";

export const BOUGHT_RECENTLY_UPDATE_REQUEST = "BOUGHT_RECENTLY_UPDATE_REQUEST";
export const BOUGHT_RECENTLY_UPDATE_SUCCESS = "BOUGHT_RECENTLY_UPDATE_SUCCESS";
export const BOUGHT_RECENTLY_UPDATE_FAILURE = "BOUGHT_RECENTLY_UPDATE_FAILURE";

export const BOUGHT_DETAIL_REQUEST = "BOUGHT_DETAIL_REQUEST";
export const BOUGHT_DETAIL_SUCCESS = "BOUGHT_DETAIL_SUCCESS";
export const BOUGHT_DETAIL_FAILURE = "BOUGHT_DETAIL_FAILURE";

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
      case BOUGHT_ADMIN_ID_REQUEST:
        draft.st_boughtAdminIdLoading = true;
        draft.st_boughtAdminIdDone = false;
        draft.st_boughtAdminIdError = null;
        break;
      case BOUGHT_ADMIN_ID_SUCCESS:
        draft.st_boughtAdminIdLoading = false;
        draft.st_boughtAdminIdDone = true;
        draft.st_boughtAdminIdError = null;
        draft.boughtAdminId = action.data;
        break;
      case BOUGHT_ADMIN_ID_FAILURE:
        draft.st_boughtAdminIdLoading = false;
        draft.st_boughtAdminIdDone = false;
        draft.st_boughtAdminIdError = action.error;
        break;
      ///////////////////////////////////////////////////////
      case BOUGHT_ADMIN_CREATE_REQUEST:
        draft.st_boughtAdminCreateLoading = true;
        draft.st_boughtAdminCreateDone = false;
        draft.st_boughtAdminCreateError = null;
        break;
      case BOUGHT_ADMIN_CREATE_SUCCESS:
        draft.st_boughtAdminCreateLoading = false;
        draft.st_boughtAdminCreateDone = true;
        draft.st_boughtAdminCreateError = null;
        break;
      case BOUGHT_ADMIN_CREATE_FAILURE:
        draft.st_boughtAdminCreateLoading = false;
        draft.st_boughtAdminCreateDone = false;
        draft.st_boughtAdminCreateError = action.error;
        break;
      ///////////////////////////////////////////////////////
      case BOUGHT_ADMIN_UPDATE_REQUEST:
        draft.st_boughtAdminUpdateLoading = true;
        draft.st_boughtAdminUpdateDone = false;
        draft.st_boughtAdminUpdateError = null;
        break;
      case BOUGHT_ADMIN_UPDATE_SUCCESS:
        draft.st_boughtAdminUpdateLoading = false;
        draft.st_boughtAdminUpdateDone = true;
        draft.st_boughtAdminUpdateError = null;
        break;
      case BOUGHT_ADMIN_UPDATE_FAILURE:
        draft.st_boughtAdminUpdateLoading = false;
        draft.st_boughtAdminUpdateDone = false;
        draft.st_boughtAdminUpdateError = action.error;
        break;
      ///////////////////////////////////////////////////////
      case BOUGHT_ADMIN_DELETE_REQUEST:
        draft.st_boughtAdminDeleteLoading = true;
        draft.st_boughtAdminDeleteDone = false;
        draft.st_boughtAdminDeleteError = null;
        break;
      case BOUGHT_ADMIN_DELETE_SUCCESS:
        draft.st_boughtAdminDeleteLoading = false;
        draft.st_boughtAdminDeleteDone = true;
        draft.st_boughtAdminDeleteError = null;
        break;
      case BOUGHT_ADMIN_DELETE_FAILURE:
        draft.st_boughtAdminDeleteLoading = false;
        draft.st_boughtAdminDeleteDone = false;
        draft.st_boughtAdminDeleteError = action.error;
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
      case BOUGHT_ME_DETAIL_REQUEST:
        draft.st_boughtMeDetailLoading = true;
        draft.st_boughtMeDetailDone = false;
        draft.st_boughtMeDetailError = null;
        break;
      case BOUGHT_ME_DETAIL_SUCCESS:
        draft.st_boughtMeDetailLoading = false;
        draft.st_boughtMeDetailDone = true;
        draft.st_boughtMeDetailError = null;
        draft.boughtMeDetail = action.data;
        break;
      case BOUGHT_ME_DETAIL_FAILURE:
        draft.st_boughtMeDetailLoading = false;
        draft.st_boughtMeDetailDone = false;
        draft.st_boughtMeDetailError = action.error;
        break;
      ///////////////////////////////////////////////////////
      case BOUGHT_RECENTLY_UPDATE_REQUEST:
        draft.st_boughtRecentlyUpdateLoading = true;
        draft.st_boughtRecentlyUpdateDone = false;
        draft.st_boughtRecentlyUpdateError = null;
        break;
      case BOUGHT_RECENTLY_UPDATE_SUCCESS:
        draft.st_boughtRecentlyUpdateLoading = false;
        draft.st_boughtRecentlyUpdateDone = true;
        draft.st_boughtRecentlyUpdateError = null;
        break;
      case BOUGHT_RECENTLY_UPDATE_FAILURE:
        draft.st_boughtRecentlyUpdateLoading = false;
        draft.st_boughtRecentlyUpdateDone = false;
        draft.st_boughtRecentlyUpdateError = action.error;
        break;
      ///////////////////////////////////////////////////////
      case BOUGHT_DETAIL_REQUEST:
        draft.st_boughtDetailLoading = true;
        draft.st_boughtDetailDone = false;
        draft.st_boughtDetailError = null;
        break;
      case BOUGHT_DETAIL_SUCCESS:
        draft.st_boughtDetailLoading = false;
        draft.st_boughtDetailDone = true;
        draft.st_boughtDetailError = null;
        draft.boughtDetail = action.data;
        break;
      case BOUGHT_DETAIL_FAILURE:
        draft.st_boughtDetailLoading = false;
        draft.st_boughtDetailDone = false;
        draft.st_boughtDetailError = action.error;
        break;
      ///////////////////////////////////////////////////////
      default:
        break;
    }
  });

export default reducer;
