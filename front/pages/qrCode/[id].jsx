import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, ME_UPDATE_REQUEST } from "../../reducers/user";
import useInput from "../../hooks/useInput";
import ClientLayout from "../../components/ClientLayout";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import { WholeWrapper } from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import { Form, message, Modal, Spin } from "antd";
import { useRouter } from "next/router";
import { BOUGHT_ME_DETAIL_REQUEST } from "../../reducers/boughtLecture";
import { MEDIA_ALL_LIST_REQUEST } from "../../reducers/media";

const Home = ({}) => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);

  const { boughtMeDetail } = useSelector((state) => state.boughtLecture);

  const { mediaAllList } = useSelector((state) => state.media);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();
  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (!me) {
      message.error("로그인 후 이용해주세요.");
      return router.push("/user/login");
    }

    if (!boughtMeDetail) {
      message.error("구매 후 사용해주세요.");
      return router.push("/user/login");
    }

    let isCheck = false;
    for (let i = 0; i < mediaAllList.length; i++) {
      const data = mediaAllList[i].previousId;

      if (data === parseInt(router.query.id)) {
        router.push(`/mypage?id=${data}?isSample=0`);
        isCheck = true;

        break;
      }
    }

    if (!isCheck) {
      message.error("잘못된 코드입니다.");
      router.push("/");
    }
  }, [me, boughtMeDetail, mediaAllList, router.query]);

  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>친절한 영어교실 | QR</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Spin />
        </WholeWrapper>
      </ClientLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch({
      type: BOUGHT_ME_DETAIL_REQUEST,
    });

    context.store.dispatch({
      type: MEDIA_ALL_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Home;
