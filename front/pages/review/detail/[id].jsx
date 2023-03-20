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
import { Empty, Form, message, Modal } from "antd";
import { useRouter } from "next/router";
import {
  REVIEW_DELETE_REQUEST,
  REVIEW_DETAIL_REQUEST,
} from "../../../reducers/review";
import { NOTICE_DETAIL_REQUEST } from "../../../reducers/notice";

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

const ReviewDetail = ({}) => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);

  const {
    reviewDetail,
    reviewNext,
    reviewPrev,
    //
    st_reviewDetailError,
    //
    st_reviewDeleteLoading,
    st_reviewDeleteDone,
    st_reviewDeleteError,
  } = useSelector((state) => state.review);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [dModal, setDModal] = useState(false);
  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (router.query) {
      dispatch({
        type: REVIEW_DETAIL_REQUEST,
        data: {
          id: router.query.id,
        },
      });
    }
  }, [router.query]);

  useEffect(() => {
    if (st_reviewDetailError) {
      return message.error(st_reviewDetailError);
    }
  }, [st_reviewDetailError]);

  // 삭제 후처리
  useEffect(() => {
    if (st_reviewDeleteDone) {
      router.push("/review");
      return message.success("해당 후기가 삭제되었습니다.");
    }
    if (st_reviewDeleteError) {
      return message.error(st_reviewDeleteError);
    }
  }, [st_reviewDeleteDone, st_reviewDeleteError]);

  ////// TOGGLE //////

  const rModalToggle = useCallback(() => {
    setDModal((prev) => !prev);
  }, [dModal]);

  ////// HANDLER //////

  // 페이지 이동
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  // 삭제
  const deleteHandler = useCallback(() => {
    dispatch({
      type: REVIEW_DELETE_REQUEST,
      data: {
        id: router.query && router.query.id,
      },
    });
  }, [router.query]);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>친절한 영어교실 | 수강후기</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper
            margin={width < 700 ? `40px 0` : `100px 0`}
            padding={width < 1280 ? `0` : `0 210px`}
          >
            <Wrapper al={`flex-start`}>
              <Text fontSize={width < 700 ? `36px` : `40px`} fontWeight={`700`}>
                {reviewDetail && reviewDetail.title}
              </Text>
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`25px 0 0`}>
              <Text
                fontSize={width < 700 ? `18px` : `20px`}
                fontWeight={`700`}
                margin={`0 20px 0 0`}
              >
                {reviewDetail && reviewDetail.username}
              </Text>
              <Text fontSize={width < 700 ? `18px` : `20px`}>
                {reviewDetail && reviewDetail.viewCreatedAt}
              </Text>
            </Wrapper>

            <Wrapper height={`2px`} bgColor={Theme.grey4_C} margin={`20px 0`} />

            <Wrapper
              ju={`flex-start`}
              al={`flex-start`}
              minHeight={`300px`}
              fontSize={width < 700 ? `18px` : `20px`}
            >
              <Text>{reviewDetail && reviewDetail.content}</Text>
            </Wrapper>

            {reviewDetail && me && reviewDetail.UserId === me.id && (
              <Wrapper dr={`row`} ju={`flex-end`} margin={`20px 0`}>
                <CommonButton
                  width={`120px`}
                  height={`40px`}
                  fontSize={`18px`}
                  kindOf={`delete`}
                  margin={`0 5px 0 0`}
                  onClick={rModalToggle}
                >
                  삭제하기
                </CommonButton>
                <CommonButton
                  width={`120px`}
                  height={`40px`}
                  fontSize={`18px`}
                  kindOf={`basic`}
                  onClick={() =>
                    moveLinkHandler(`/review/write?updateId=${reviewDetail.id}`)
                  }
                >
                  수정하기
                </CommonButton>
              </Wrapper>
            )}

            <Wrapper>
              <CommonButton
                width={`140px`}
                height={`54px`}
                fontSize={`18px`}
                onClick={() => moveLinkHandler("/review")}
              >
                목록으로
              </CommonButton>
            </Wrapper>

            <Wrapper
              margin={`100px 0 0`}
              borderTop={`3px solid ${Theme.grey4_C}`}
            >
              {reviewNext && (
                <HoverWrapper
                  dr={`row`}
                  fontSize={`20px`}
                  padding={`20px 0`}
                  borderBottom={`1px solid ${Theme.lightGrey_C}`}
                  onClick={() =>
                    moveLinkHandler(`/review/detail/${reviewNext.id}`)
                  }
                >
                  <Wrapper
                    width={`150px`}
                    al={`flex-start`}
                    padding={`0 10px 0`}
                  >
                    다음 글
                  </Wrapper>
                  <Wrapper
                    width={`calc(100% - 150px)`}
                    fontWeight={`700`}
                    al={`flex-start`}
                    padding={`0 10px 0`}
                  >
                    {reviewNext.title}
                  </Wrapper>
                </HoverWrapper>
              )}
              {reviewPrev && (
                <HoverWrapper
                  dr={`row`}
                  fontSize={`20px`}
                  padding={`20px 0`}
                  borderBottom={`1px solid ${Theme.lightGrey_C}`}
                  onClick={() =>
                    moveLinkHandler(`/review/detail/${reviewPrev.id}`)
                  }
                >
                  <Wrapper
                    width={`150px`}
                    al={`flex-start`}
                    padding={`0 10px 0`}
                  >
                    이전 글
                  </Wrapper>
                  <Wrapper
                    width={`calc(100% - 150px)`}
                    fontWeight={`700`}
                    al={`flex-start`}
                    padding={`0 10px 0`}
                  >
                    {reviewPrev.title}
                  </Wrapper>
                </HoverWrapper>
              )}
            </Wrapper>
          </RsWrapper>

          <Modal visible={dModal} footer={null} closable={false}>
            <Wrapper>
              <Wrapper fontSize={`30px`} fontWeight={`700`}>
                <Text>정말 후기를 삭제하시겠습니까?</Text>
              </Wrapper>
              <Text fontSize={`20px`} margin={`10px 0 30px`}>
                삭제시 해당 후기는 복구할 수 없습니다.
              </Text>

              <Wrapper dr={`row`}>
                <CommonButton
                  width={`120px`}
                  height={`40px`}
                  fontSize={`18px`}
                  margin={`0 5px 0 0`}
                  onClick={rModalToggle}
                >
                  취소
                </CommonButton>
                <CommonButton
                  width={`120px`}
                  height={`40px`}
                  fontSize={`18px`}
                  kindOf={`delete`}
                  onClick={deleteHandler}
                  loading={st_reviewDeleteLoading}
                >
                  삭제
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Modal>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default ReviewDetail;
