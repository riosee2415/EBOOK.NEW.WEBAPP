import { all, fork } from "redux-saga/effects";
import bannerSaga from "./banner";
import userSaga from "./user";
import popupSaga from "./popup";
import companySaga from "./company";
import noticeSage from "./notice";
import gallerySage from "./gallery";
import questionSage from "./question";
import acceptSaga from "./accept";
import editSaga from "./editor";
import logoSaga from "./logo";
import faqSaga from "./faq";
import lectureSaga from "./lecture";
import mediaSaga from "./media";
import reviewSaga from "./review";
import referenceSaga from "./reference";
import boughtLectureSaga from "./boughtLecture";
import enjoySaga from "./enjoy";
//
import axios from "axios";
import backURL from "../config/config";

axios.defaults.baseURL = backURL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(bannerSaga),
    fork(userSaga),
    fork(popupSaga),
    fork(companySaga),
    fork(noticeSage),
    fork(gallerySage),
    fork(questionSage),
    fork(acceptSaga),
    fork(editSaga),
    fork(logoSaga),
    fork(faqSaga),
    fork(lectureSaga),
    fork(mediaSaga),
    fork(reviewSaga),
    fork(referenceSaga),
    fork(boughtLectureSaga),
    fork(enjoySaga),
    //
  ]);
}
