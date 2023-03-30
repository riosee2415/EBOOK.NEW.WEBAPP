import produce from "../util/produce";

export const initailState = {
  me: null,
  currentAdminMenu: [],
  users: null,
  lastPages: 1,
  updateModal: false,
  userHistory: [],
  adminUserRightHistory: [],
  findUserId: null,
  adminBanner: null,
  //
  st_loginLoading: false,
  st_loginDone: false,
  st_loginError: null,
  //
  st_loginAdminLoading: false,
  st_loginAdminDone: false,
  st_loginAdminError: null,
  //
  st_signUpLoading: false,
  st_signUpDone: false,
  st_signUpError: null,
  //
  st_userListLoading: false,
  st_userListDone: false,
  st_userListError: null,
  //
  st_userCheckUserIdLoading: false, // 아아디 중복확인
  st_userCheckUserIdDone: false,
  st_userCheckUserIdError: null,
  //
  st_userFindUserIdLoading: false, // 아아디 찾기
  st_userFindUserIdDone: false,
  st_userFindUserIdError: null,
  //
  st_userListUpdateLoading: false,
  st_userListUpdateDone: false,
  st_userListUpdateError: null,
  //
  st_loadMyInfoLoading: false, // 로그인 정보 가져오기 시도 중
  st_loadMyInfoDone: false,
  st_loadMyInfoError: null,
  //
  st_kakaoLoginLoading: false,
  st_kakaoLoginDone: false,
  st_kakaoLoginError: null,
  //
  st_userHistoryLoading: false, // 회원 이력
  st_userHistoryDone: false,
  st_userHistoryError: null,
  //
  st_menuRightUpdateLoading: false,
  st_menuRightUpdateDone: false,
  st_menuRightUpdateError: null,
  //
  st_adminUserRightHistoryLoading: false, // 포인트 환원 이력
  st_adminUserRightHistoryDone: false,
  st_adminUserRightHistoryError: null,
  //
  st_adminUserExitTrueLoading: false, // 탈퇴
  st_adminUserExitTrueDone: false,
  st_adminUserExitTrueError: null,
  //
  st_adminUserExitFalseLoading: false, // 재가입
  st_adminUserExitFalseDone: false,
  st_adminUserExitFalseError: null,
  //
  st_logoutLoading: false, // 로그아웃
  st_logoutDone: false,
  st_logoutError: null,
  //
  st_modifyPassSendLoading: false, // 비밀번호 찾기
  st_modifyPassSendDone: false,
  st_modifyPassSendError: null,
  //
  st_modifyPassCheckedLoading: false, // 비밀번호 찾기
  st_modifyPassCheckedDone: false,
  st_modifyPassCheckedError: null,
  //
  st_modifyPassUpdateLoading: false, // 비밀번호 찾기
  st_modifyPassUpdateDone: false,
  st_modifyPassUpdateError: null,
  //
  st_adminUpdateLoading: false, // 관리자 수정
  st_adminUpdateDone: false,
  st_adminUpdateError: null,
  //
  st_meUpdateLoading: false, // 회원 수정
  st_meUpdateDone: false,
  st_meUpdateError: null,
  //
  st_insertXlsxLoading: false, // 엑셀 데이터 넣기
  st_insertXlsxDone: false,
  st_insertXlsxError: null,
  //
  st_adminBannerLoading: false,
  st_adminBannerDone: false,
  st_adminBannerError: null,
};

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGIN_ADMIN_REQUEST = "LOGIN_ADMIN_REQUEST";
export const LOGIN_ADMIN_SUCCESS = "LOGIN_ADMIN_SUCCESS";
export const LOGIN_ADMIN_FAILURE = "LOGIN_ADMIN_FAILURE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const USERLIST_REQUEST = "USERLIST_REQUEST";
export const USERLIST_SUCCESS = "USERLIST_SUCCESS";
export const USERLIST_FAILURE = "USERLIST_FAILURE";

export const USER_CHECK_USERID_REQUEST = "USER_CHECK_USERID_REQUEST";
export const USER_CHECK_USERID_SUCCESS = "USER_CHECK_USERID_SUCCESS";
export const USER_CHECK_USERID_FAILURE = "USER_CHECK_USERID_FAILURE";

export const USER_FIND_USERID_REQUEST = "USER_FIND_USERID_REQUEST";
export const USER_FIND_USERID_SUCCESS = "USER_FIND_USERID_SUCCESS";
export const USER_FIND_USERID_FAILURE = "USER_FIND_USERID_FAILURE";

export const USERLIST_UPDATE_REQUEST = "USERLIST_UPDATE_REQUEST";
export const USERLIST_UPDATE_SUCCESS = "USERLIST_UPDATE_SUCCESS";
export const USERLIST_UPDATE_FAILURE = "USERLIST_UPDATE_FAILURE";

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const KAKAO_LOGIN_REQUEST = "KAKAO_LOGIN_REQUEST";
export const KAKAO_LOGIN_SUCCESS = "KAKAO_LOGIN_SUCCESS";
export const KAKAO_LOGIN_FAILURE = "KAKAO_LOGIN_FAILURE";

export const USER_HISTORY_REQUEST = "USER_HISTORY_REQUEST";
export const USER_HISTORY_SUCCESS = "USER_HISTORY_SUCCESS";
export const USER_HISTORY_FAILURE = "USER_HISTORY_FAILURE";

export const MENURIGHT_UPDATE_REQUEST = "MENURIGHT_UPDATE_REQUEST";
export const MENURIGHT_UPDATE_SUCCESS = "MENURIGHT_UPDATE_SUCCESS";
export const MENURIGHT_UPDATE_FAILURE = "MENURIGHT_UPDATE_FAILURE";

export const ADMINUSERLIST_REQUEST = "ADMINUSERLIST_REQUEST";
export const ADMINUSERLIST_SUCCESS = "ADMINUSERLIST_SUCCESS";
export const ADMINUSERLIST_FAILURE = "ADMINUSERLIST_FAILURE";

export const ADMINUSERRIGHT_HISTORY_REQUEST = "ADMINUSERRIGHT_HISTORY_REQUEST";
export const ADMINUSERRIGHT_HISTORY_SUCCESS = "ADMINUSERRIGHT_HISTORY_SUCCESS";
export const ADMINUSERRIGHT_HISTORY_FAILURE = "ADMINUSERRIGHT_HISTORY_FAILURE";
//
export const ADMINUSER_EXITTRUE_REQUEST = "ADMINUSER_EXITTRUE_REQUEST";
export const ADMINUSER_EXITTRUE_SUCCESS = "ADMINUSER_EXITTRUE_SUCCESS";
export const ADMINUSER_EXITTRUE_FAILURE = "ADMINUSER_EXITTRUE_FAILURE";
//
export const ADMINUSER_EXITFALSE_REQUEST = "ADMINUSER_EXITFALSE_REQUEST";
export const ADMINUSER_EXITFALSE_SUCCESS = "ADMINUSER_EXITFALSE_SUCCESS";
export const ADMINUSER_EXITFALSE_FAILURE = "ADMINUSER_EXITFALSE_FAILURE";
//
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
//
export const MODIFYPASS_SEND_REQUEST = "MODIFYPASS_SEND_REQUEST";
export const MODIFYPASS_SEND_SUCCESS = "MODIFYPASS_SEND_SUCCESS";
export const MODIFYPASS_SEND_FAILURE = "MODIFYPASS_SEND_FAILURE";
//
export const MODIFYPASS_CHECKED_REQUEST = "MODIFYPASS_CHECKED_REQUEST";
export const MODIFYPASS_CHECKED_SUCCESS = "MODIFYPASS_CHECKED_SUCCESS";
export const MODIFYPASS_CHECKED_FAILURE = "MODIFYPASS_CHECKED_FAILURE";
//
export const MODIFYPASS_UPDATE_REQUEST = "MODIFYPASS_UPDATE_REQUEST";
export const MODIFYPASS_UPDATE_SUCCESS = "MODIFYPASS_UPDATE_SUCCESS";
export const MODIFYPASS_UPDATE_FAILURE = "MODIFYPASS_UPDATE_FAILURE";
//
export const ADMIN_UPDATE_REQUEST = "ADMIN_UPDATE_REQUEST";
export const ADMIN_UPDATE_SUCCESS = "ADMIN_UPDATE_SUCCESS";
export const ADMIN_UPDATE_FAILURE = "ADMIN_UPDATE_FAILURE";
//
export const ME_UPDATE_REQUEST = "ME_UPDATE_REQUEST";
export const ME_UPDATE_SUCCESS = "ME_UPDATE_SUCCESS";
export const ME_UPDATE_FAILURE = "ME_UPDATE_FAILURE";
//
export const INSERT_XLSX_REQUEST = "INSERT_XLSX_REQUEST";
export const INSERT_XLSX_SUCCESS = "INSERT_XLSX_SUCCESS";
export const INSERT_XLSX_FAILURE = "INSERT_XLSX_FAILURE";
//
export const ADMIN_BANNER_REQUEST = "ADMIN_BANNER_REQUEST";
export const ADMIN_BANNER_SUCCESS = "ADMIN_BANNER_SUCCESS";
export const ADMIN_BANNER_FAILURE = "ADMIN_BANNER_FAILURE";

export const UPDATE_MODAL_OPEN_REQUEST = "UPDATE_MODAL_OPEN_REQUEST";
export const UPDATE_MODAL_CLOSE_REQUEST = "UPDATE_MODAL_CLOSE_REQUEST";

export const CURRENT_ADMINMENU_STATUS = "CURRENT_ADMINMENU_STATUS";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MY_INFO_REQUEST:
        console.log("GET SERVER SIDE PROPS ACTION");

        draft.st_loadMyInfoLoading = true;
        draft.st_loadMyInfoError = null;
        draft.st_loadMyInfoDone = false;
        break;

      case LOAD_MY_INFO_SUCCESS:
        draft.st_loadMyInfoLoading = false;
        draft.st_loadMyInfoDone = true;
        draft.me = action.data;
        break;

      case LOAD_MY_INFO_FAILURE:
        draft.st_loadMyInfoLoading = false;
        draft.st_loadMyInfoDone = false;
        draft.st_loadMyInfoError = action.error;
        break;

      ///////////////////////////////////////////////////////

      case LOGIN_REQUEST: {
        draft.st_loginLoading = true;
        draft.st_loginDone = null;
        draft.st_loginError = false;
        break;
      }
      case LOGIN_SUCCESS: {
        draft.st_loginLoading = false;
        draft.st_loginDone = true;
        draft.me = action.data;
        break;
      }
      case LOGIN_FAILURE: {
        draft.st_loginLoading = false;
        draft.st_loginDone = false;
        draft.st_loginError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case LOGIN_ADMIN_REQUEST: {
        draft.st_loginAdminLoading = true;
        draft.st_loginAdminDone = null;
        draft.st_loginAdminError = false;
        break;
      }
      case LOGIN_ADMIN_SUCCESS: {
        draft.st_loginAdminLoading = false;
        draft.st_loginAdminDone = true;
        draft.me = action.data;
        break;
      }
      case LOGIN_ADMIN_FAILURE: {
        draft.st_loginAdminLoading = false;
        draft.st_loginAdminDone = false;
        draft.st_loginAdminError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case SIGNUP_REQUEST: {
        draft.st_signUpLoading = true;
        draft.st_signUpDone = null;
        draft.st_signUpError = false;
        break;
      }
      case SIGNUP_SUCCESS: {
        draft.st_signUpLoading = false;
        draft.st_signUpDone = true;
        break;
      }
      case SIGNUP_FAILURE: {
        draft.st_signUpLoading = false;
        draft.st_signUpDone = false;
        draft.st_signUpError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case USERLIST_REQUEST: {
        draft.st_userListLoading = true;
        draft.st_userListDone = false;
        draft.st_userListError = null;
        break;
      }
      case USERLIST_SUCCESS: {
        draft.st_userListLoading = false;
        draft.st_userListDone = true;
        draft.st_userListError = null;
        draft.users = action.data.list;
        draft.lastPages = action.data.lastPage;
        break;
      }
      case USERLIST_FAILURE: {
        draft.st_userListLoading = false;
        draft.st_userListDone = false;
        draft.st_userListError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case USER_CHECK_USERID_REQUEST: {
        draft.st_userCheckUserIdLoading = true;
        draft.st_userCheckUserIdDone = false;
        draft.st_userCheckUserIdError = null;
        break;
      }
      case USER_CHECK_USERID_SUCCESS: {
        draft.st_userCheckUserIdLoading = false;
        draft.st_userCheckUserIdDone = true;
        draft.st_userCheckUserIdError = null;
        break;
      }
      case USER_CHECK_USERID_FAILURE: {
        draft.st_userCheckUserIdLoading = false;
        draft.st_userCheckUserIdDone = false;
        draft.st_userCheckUserIdError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case USER_FIND_USERID_REQUEST: {
        draft.st_userFindUserIdLoading = true;
        draft.st_userFindUserIdDone = false;
        draft.st_userFindUserIdError = null;
        break;
      }
      case USER_FIND_USERID_SUCCESS: {
        draft.st_userFindUserIdLoading = false;
        draft.st_userFindUserIdDone = true;
        draft.st_userFindUserIdError = null;
        draft.findUserId = action.data.userId;
        break;
      }
      case USER_FIND_USERID_FAILURE: {
        draft.st_userFindUserIdLoading = false;
        draft.st_userFindUserIdDone = false;
        draft.st_userFindUserIdError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case ADMINUSERLIST_REQUEST: {
        draft.st_adminUserListLoading = true;
        draft.st_adminUserListDone = null;
        draft.st_adminUserListError = false;
        break;
      }
      case ADMINUSERLIST_SUCCESS: {
        draft.st_adminUserListLoading = false;
        draft.st_adminUserListDone = true;
        draft.users = action.data;
        break;
      }
      case ADMINUSERLIST_FAILURE: {
        draft.st_adminUserListLoading = false;
        draft.st_adminUserListDone = false;
        draft.st_adminUserListError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case USERLIST_UPDATE_REQUEST: {
        draft.st_userListUpdateLoading = true;
        draft.st_userListUpdateDone = null;
        draft.st_userListUpdateError = false;
        break;
      }
      case USERLIST_UPDATE_SUCCESS: {
        draft.st_userListUpdateLoading = false;
        draft.st_userListUpdateDone = true;
        break;
      }
      case USERLIST_UPDATE_FAILURE: {
        draft.st_userListUpdateLoading = false;
        draft.st_userListUpdateDone = false;
        draft.st_userListUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case KAKAO_LOGIN_REQUEST: {
        draft.st_kakaoLoginLoading = true;
        draft.st_kakaoLoginDone = null;
        draft.st_kakaoLoginError = false;
        break;
      }
      case KAKAO_LOGIN_SUCCESS: {
        draft.st_kakaoLoginLoading = false;
        draft.st_kakaoLoginDone = true;
        draft.st_kakaoLoginError = null;
        break;
      }
      case KAKAO_LOGIN_FAILURE: {
        draft.st_kakaoLoginLoading = false;
        draft.st_kakaoLoginDone = false;
        draft.st_kakaoLoginError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case USER_HISTORY_REQUEST: {
        draft.st_userHistoryLoading = true;
        draft.st_userHistoryDone = false;
        draft.st_userHistoryError = null;
        break;
      }
      case USER_HISTORY_SUCCESS: {
        draft.st_userHistoryLoading = false;
        draft.st_userHistoryDone = true;
        draft.st_userHistoryError = null;
        draft.userHistory = action.data;
        break;
      }
      case USER_HISTORY_FAILURE: {
        draft.st_userHistoryLoading = false;
        draft.st_userHistoryDone = false;
        draft.st_userHistoryError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case MENURIGHT_UPDATE_REQUEST: {
        draft.st_menuRightUpdateLoading = true;
        draft.st_menuRightUpdateDone = null;
        draft.st_menuRightUpdateError = false;
        break;
      }
      case MENURIGHT_UPDATE_SUCCESS: {
        draft.st_menuRightUpdateLoading = false;
        draft.st_menuRightUpdateDone = true;
        draft.st_menuRightUpdateError = null;
        break;
      }
      case MENURIGHT_UPDATE_FAILURE: {
        draft.st_menuRightUpdateLoading = false;
        draft.st_menuRightUpdateDone = false;
        draft.st_menuRightUpdateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case ADMINUSERRIGHT_HISTORY_REQUEST: {
        draft.st_adminUserRightHistoryLoading = true;
        draft.st_adminUserRightHistoryDone = false;
        draft.st_adminUserRightHistoryError = null;
        break;
      }
      case ADMINUSERRIGHT_HISTORY_SUCCESS: {
        draft.st_adminUserRightHistoryLoading = false;
        draft.st_adminUserRightHistoryDone = true;
        draft.st_adminUserRightHistoryError = null;
        draft.adminUserRightHistory = action.data;
        break;
      }
      case ADMINUSERRIGHT_HISTORY_FAILURE: {
        draft.st_adminUserRightHistoryLoading = false;
        draft.st_adminUserRightHistoryDone = false;
        draft.st_adminUserRightHistoryError = action.error;
        break;
      }
      //////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case ADMINUSER_EXITTRUE_REQUEST: {
        draft.st_adminUserExitTrueLoading = true;
        draft.st_adminUserExitTrueDone = false;
        draft.st_adminUserExitTrueError = null;
        break;
      }
      case ADMINUSER_EXITTRUE_SUCCESS: {
        draft.st_adminUserExitTrueLoading = false;
        draft.st_adminUserExitTrueDone = true;
        draft.st_adminUserExitTrueError = null;
        draft.adminUserExitTrue = action.data;
        break;
      }
      case ADMINUSER_EXITTRUE_FAILURE: {
        draft.st_adminUserExitTrueLoading = false;
        draft.st_adminUserExitTrueDone = false;
        draft.st_adminUserExitTrueError = action.error;
        break;
      }
      //////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case ADMINUSER_EXITFALSE_REQUEST: {
        draft.st_adminUserExitFalseLoading = true;
        draft.st_adminUserExitFalseDone = false;
        draft.st_adminUserExitFalseError = null;
        break;
      }
      case ADMINUSER_EXITFALSE_SUCCESS: {
        draft.st_adminUserExitFalseLoading = false;
        draft.st_adminUserExitFalseDone = true;
        draft.st_adminUserExitFalseError = null;
        draft.adminUserExitFalse = action.data;
        break;
      }
      case ADMINUSER_EXITFALSE_FAILURE: {
        draft.st_adminUserExitFalseLoading = false;
        draft.st_adminUserExitFalseDone = false;
        draft.st_adminUserExitFalseError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case LOGOUT_REQUEST: {
        draft.st_logoutLoading = true;
        draft.st_logoutDone = false;
        draft.st_logoutError = null;
        break;
      }
      case LOGOUT_SUCCESS: {
        draft.st_logoutLoading = false;
        draft.st_logoutDone = true;
        draft.st_logoutError = null;
        break;
      }
      case LOGOUT_FAILURE: {
        draft.st_logoutLoading = false;
        draft.st_logoutDone = false;
        draft.st_logoutError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case MODIFYPASS_SEND_REQUEST: {
        draft.st_modifyPassSendLoading = true;
        draft.st_modifyPassSendDone = false;
        draft.st_modifyPassSendError = null;
        break;
      }
      case MODIFYPASS_SEND_SUCCESS: {
        draft.st_modifyPassSendLoading = false;
        draft.st_modifyPassSendDone = true;
        draft.st_modifyPassSendError = null;
        break;
      }
      case MODIFYPASS_SEND_FAILURE: {
        draft.st_modifyPassSendLoading = false;
        draft.st_modifyPassSendDone = false;
        draft.st_modifyPassSendError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case MODIFYPASS_CHECKED_REQUEST: {
        draft.st_modifyPassCheckedLoading = true;
        draft.st_modifyPassCheckedDone = false;
        draft.st_modifyPassCheckedError = null;
        break;
      }
      case MODIFYPASS_CHECKED_SUCCESS: {
        draft.st_modifyPassCheckedLoading = false;
        draft.st_modifyPassCheckedDone = true;
        draft.st_modifyPassCheckedError = null;
        break;
      }
      case MODIFYPASS_CHECKED_FAILURE: {
        draft.st_modifyPassCheckedLoading = false;
        draft.st_modifyPassCheckedDone = false;
        draft.st_modifyPassCheckedError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case MODIFYPASS_UPDATE_REQUEST: {
        draft.st_modifyPassUpdateLoading = true;
        draft.st_modifyPassUpdateDone = false;
        draft.st_modifyPassUpdateError = null;
        break;
      }
      case MODIFYPASS_UPDATE_SUCCESS: {
        draft.st_modifyPassUpdateLoading = false;
        draft.st_modifyPassUpdateDone = true;
        draft.st_modifyPassUpdateError = null;
        break;
      }
      case MODIFYPASS_UPDATE_FAILURE: {
        draft.st_modifyPassUpdateLoading = false;
        draft.st_modifyPassUpdateDone = false;
        draft.st_modifyPassUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case ADMIN_UPDATE_REQUEST: {
        draft.st_adminUpdateLoading = true;
        draft.st_adminUpdateDone = false;
        draft.st_adminUpdateError = null;
        break;
      }
      case ADMIN_UPDATE_SUCCESS: {
        draft.st_adminUpdateLoading = false;
        draft.st_adminUpdateDone = true;
        draft.st_adminUpdateError = null;
        break;
      }
      case ADMIN_UPDATE_FAILURE: {
        draft.st_adminUpdateLoading = false;
        draft.st_adminUpdateDone = false;
        draft.st_adminUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case ME_UPDATE_REQUEST: {
        draft.st_meUpdateLoading = true;
        draft.st_meUpdateDone = false;
        draft.st_meUpdateError = null;
        break;
      }
      case ME_UPDATE_SUCCESS: {
        draft.st_meUpdateLoading = false;
        draft.st_meUpdateDone = true;
        draft.st_meUpdateError = null;
        break;
      }
      case ME_UPDATE_FAILURE: {
        draft.st_meUpdateLoading = false;
        draft.st_meUpdateDone = false;
        draft.st_meUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case INSERT_XLSX_REQUEST: {
        draft.st_insertXlsxLoading = true;
        draft.st_insertXlsxDone = false;
        draft.st_insertXlsxError = null;
        break;
      }
      case INSERT_XLSX_SUCCESS: {
        draft.st_insertXlsxLoading = false;
        draft.st_insertXlsxDone = true;
        draft.st_insertXlsxError = null;
        break;
      }
      case INSERT_XLSX_FAILURE: {
        draft.st_insertXlsxLoading = false;
        draft.st_insertXlsxDone = false;
        draft.st_insertXlsxError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case ADMIN_BANNER_REQUEST: {
        draft.st_adminBannerLoading = true;
        draft.st_adminBannerDone = false;
        draft.st_adminBannerError = null;
        break;
      }
      case ADMIN_BANNER_SUCCESS: {
        draft.st_adminBannerLoading = false;
        draft.st_adminBannerDone = true;
        draft.st_adminBannerError = null;
        draft.adminBanner = action.data;
        break;
      }
      case ADMIN_BANNER_FAILURE: {
        draft.st_adminBannerLoading = false;
        draft.st_adminBannerDone = false;
        draft.st_adminBannerError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case CURRENT_ADMINMENU_STATUS: {
        const exist = draft.currentAdminMenu.filter(
          (data) => data === action.data.key
        );

        if (exist.length > 0) {
          draft.currentAdminMenu = draft.currentAdminMenu.filter(
            (data) => data !== action.data.key
          );
        } else {
          draft.currentAdminMenu = [...draft.currentAdminMenu, action.data.key];
        }

        break;
      }

      //////////////////////////////////////////////

      case UPDATE_MODAL_OPEN_REQUEST:
        draft.updateModal = true;
        break;

      case UPDATE_MODAL_CLOSE_REQUEST:
        draft.updateModal = false;
        break;

      default:
        break;
    }
  });

export default reducer;
