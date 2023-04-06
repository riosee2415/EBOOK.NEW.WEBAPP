import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import useInput from "../../../hooks/useInput";
import ClientLayout from "../../../components/ClientLayout";
import axios from "axios";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import {
  CommonButton,
  Image,
  RsWrapper,
  SpanText,
  Text,
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import { BANNER_LIST_REQUEST } from "../../../reducers/banner";
import { Empty, Form, message, Modal } from "antd";
import { useRouter } from "next/router";
import {
  REVIEW_CREATE_REQUEST,
  REVIEW_DELETE_REQUEST,
  REVIEW_DETAIL_REQUEST,
} from "../../../reducers/review";
import { NOTICE_DETAIL_REQUEST } from "../../../reducers/notice";
import "react-quill/dist/quill.core.css";

const HoverWrapper = styled(Wrapper)`
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.lightGrey2_C};
  }

  @media (max-width: 700px) {
    font-size: 18px;
    padding: 10px 0;
  }
`;

export const CustomHtmlWrapper = styled(Wrapper)`
  & img {
    max-width: 100%;
  }
  & p {
    margin: 0;
  }
  & h1 {
    font-size: 28px;
    font-weight: bold;
  }
  & h2 {
    font-size: 24px;
    font-weight: bold;
  }
  & h3 {
    font-size: 20px;
  }
  & h4 {
    font-size: 16px;
  }
  & h5 {
    font-size: 12px;
  }
  & h6 {
    font-size: 8px;
  }
`;

const ReviewDetail = ({}) => {
  ////// GLOBAL STATE //////
  const {
    noticeDetail,
    //
    st_noticeDetailError,
  } = useSelector((state) => state.notice);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (router.query) {
      dispatch({
        type: NOTICE_DETAIL_REQUEST,
        data: {
          id: router.query.id,
        },
      });
    }
  }, [router.query]);

  useEffect(() => {
    if (st_noticeDetailError) {
      return message.error(st_noticeDetailError);
    }
  }, [st_noticeDetailError]);

  ////// TOGGLE //////

  ////// HANDLER //////

  // 페이지 이동
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>친절한 영어교실 | 공지사항</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper margin={width < 700 ? `40px 0` : `100px 0`}>
            <Wrapper>
              <Text
                fontSize={width < 700 ? `30px` : `36px`}
                fontWeight={`700`}
                color={Theme.basicTheme_C}
              >
                공지사항
              </Text>
            </Wrapper>

            <Wrapper
              height={`1px`}
              bgColor={Theme.lightGrey4_C}
              margin={`40px 0 0`}
            />

            <Wrapper al={`flex-start`} padding={`35px 30px`}>
              <Text fontSize={width < 700 ? `20px` : `26px`}>
                {noticeDetail && noticeDetail.title}
              </Text>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              bgColor={Theme.lightGrey2_C}
              padding={`14px 30px`}
              color={Theme.grey3_C}
              margin={`0 0 60px`}
            >
              <Text fontSize={width < 700 ? `18px` : `20px`}>
                {noticeDetail && noticeDetail.author}
              </Text>

              <Wrapper
                width={`4px`}
                height={`4px`}
                radius={`100%`}
                margin={`0 10px`}
                bgColor={Theme.lightGrey4_C}
              />

              <Text fontSize={width < 700 ? `18px` : `20px`}>
                {noticeDetail && noticeDetail.viewCreatedAt}
              </Text>
            </Wrapper>

            {noticeDetail && (
              <div
                className="view ql-editor"
                style={{ minHeight: `300px`, width: `100%` }}
                dangerouslySetInnerHTML={{
                  __html: noticeDetail.content,
                }}
              ></div>
            )}

            {/* <Quill></ */}

            <Wrapper
              height={`1px`}
              bgColor={Theme.lightGrey4_C}
              margin={`60px 0 40px`}
            />

            <Wrapper>
              <CommonButton
                width={`140px`}
                height={`54px`}
                fontSize={`18px`}
                onClick={() => moveLinkHandler("/center")}
              >
                목록으로
              </CommonButton>
            </Wrapper>
          </RsWrapper>
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
      type: BANNER_LIST_REQUEST,
      data: {
        type: 3,
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default ReviewDetail;
