import produce from "../util/produce";

export const initailState = {
  logos: [],
  logoHistory: [],
  //
  st_logoGetLoading: false,
  st_logoGetDone: false,
  st_logoGetError: null,

  //
  st_logoHeaderImageLoading: false,
  st_logoHeaderImageGetDone: false,
  st_logoHeaderImageGetError: null,

  //
  st_logoFooterImageLoading: false,
  st_logoFooterImageGetDone: false,
  st_logoFooterImageGetError: null,

  //
  st_historyListLoading: false,
  st_historyListDone: false,
  st_historyListError: null,
};

export const LOGO_GET_REQUEST = "LOGO_GET_REQUEST";
export const LOGO_GET_SUCCESS = "LOGO_GET_SUCCESS";
export const LOGO_GET_FAILURE = "LOGO_GET_FAILURE";

export const LOGO_HEADER_IMAGE_REQUEST = "LOGO_HEADER_IMAGE_REQUEST";
export const LOGO_HEADER_IMAGE_SUCCESS = "LOGO_HEADER_IMAGE_SUCCESS";
export const LOGO_HEADER_IMAGE_FAILURE = "LOGO_HEADER_IMAGE_FAILURE";

export const LOGO_FOOTER_IMAGE_REQUEST = "LOGO_FOOTER_IMAGE_REQUEST";
export const LOGO_FOOTER_IMAGE_SUCCESS = "LOGO_FOOTER_IMAGE_SUCCESS";
export const LOGO_FOOTER_IMAGE_FAILURE = "LOGO_FOOTER_IMAGE_FAILURE";

export const LOGO_HISTORY_REQUEST = "LOGO_HISTORY_REQUEST";
export const LOGO_HISTORY_SUCCESS = "LOGO_HISTORY_SUCCESS";
export const LOGO_HISTORY_FAILURE = "LOGO_HISTORY_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOGO_GET_REQUEST: {
        draft.st_logoGetLoading = true;
        draft.st_logoGetDone = false;
        draft.st_logoGetError = null;
        break;
      }
      case LOGO_GET_SUCCESS: {
        draft.st_logoGetLoading = false;
        draft.st_logoGetDone = true;
        draft.st_logoGetError = null;
        draft.logos = action.data;
        break;
      }
      case LOGO_GET_FAILURE: {
        draft.st_logoGetLoading = false;
        draft.st_logoGetDone = false;
        draft.st_logoGetError = action.data;
        break;
      }
      ///////////////////////////////////////////////////////

      case LOGO_HEADER_IMAGE_REQUEST: {
        draft.st_logoHeaderImageLoading = true;
        draft.st_logoHeaderImageGetDone = false;
        draft.st_logoHeaderImageGetError = null;
        break;
      }
      case LOGO_HEADER_IMAGE_SUCCESS: {
        draft.st_logoHeaderImageLoading = false;
        draft.st_logoHeaderImageGetDone = true;
        draft.st_logoHeaderImageGetError = null;
        break;
      }
      case LOGO_HEADER_IMAGE_FAILURE: {
        draft.st_logoHeaderImageLoading = false;
        draft.st_logoHeaderImageGetDone = false;
        draft.st_logoHeaderImageGetError = action.data;
        break;
      }
      ///////////////////////////////////////////////////////

      case LOGO_FOOTER_IMAGE_REQUEST: {
        draft.st_logoFooterImageLoading = true;
        draft.st_logoFooterImageGetDone = false;
        draft.st_logoFooterImageGetError = null;
        break;
      }
      case LOGO_FOOTER_IMAGE_SUCCESS: {
        draft.st_logoFooterImageLoading = false;
        draft.st_logoFooterImageGetDone = true;
        draft.st_logoFooterImageGetError = null;
        break;
      }
      case LOGO_FOOTER_IMAGE_FAILURE: {
        draft.st_logoFooterImageLoading = false;
        draft.st_logoFooterImageGetDone = false;
        draft.st_logoFooterImageGetError = action.data;
        break;
      }
      ///////////////////////////////////////////////////////

      case LOGO_HISTORY_REQUEST: {
        draft.st_historyListLoading = true;
        draft.st_historyListDone = false;
        draft.st_historyListError = null;
        break;
      }
      case LOGO_HISTORY_SUCCESS: {
        draft.st_historyListLoading = false;
        draft.st_historyListDone = true;
        draft.st_historyListError = null;
        draft.logoHistory = action.data;
        break;
      }
      case LOGO_HISTORY_FAILURE: {
        draft.st_historyListLoading = false;
        draft.st_historyListDone = false;
        draft.st_historyListError = action.data;
        break;
      }
      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
