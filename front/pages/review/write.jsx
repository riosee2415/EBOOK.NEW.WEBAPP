import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import ClientLayout from "../../components/ClientLayout";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import {
  CommonButton,
  RsWrapper,
  SpanText,
  Text,
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import { Form, message } from "antd";
import { useRouter } from "next/router";
import {
  REVIEW_CREATE_REQUEST,
  REVIEW_DETAIL_REQUEST,
  REVIEW_UPDATE_REQUEST,
} from "../../reducers/review";
import { BOUGHT_ME_DETAIL_REQUEST } from "../../reducers/boughtLecture";

const WriteForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    width: 100%;
  }
`;

const ReviewWrite = ({}) => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const {
    reviewDetail,
    //
    st_reviewCreateLoading,
    st_reviewCreateDone,
    st_reviewCreateError,
    //
    st_reviewUpdateLoading,
    st_reviewUpdateDone,
    st_reviewUpdateError,
  } = useSelector((state) => state.review);
  const { boughtMeDetail } = useSelector((state) => state.boughtLecture);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [rForm] = Form.useForm();
  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (!me) {
      router.push("/user/login");
      return message.error("로그인 후 이용해주세요.");
    }
  }, [me]);

  useEffect(() => {
    if (boughtMeDetail) {
      router.push("/review");
      return message.error("구매한 강의가 없습니다.");
    }
  }, [boughtMeDetail]);

  useEffect(() => {
    if (router.query && router.query.updateId) {
      dispatch({
        type: REVIEW_DETAIL_REQUEST,
        data: {
          id: router.query.updateId,
        },
      });
    }
  }, [router.query]);

  useEffect(() => {
    if (reviewDetail) {
      rForm.setFieldsValue({
        title: reviewDetail.title,
        content: reviewDetail.content,
      });
    }
  }, [reviewDetail]);

  // 작성 후처리
  useEffect(() => {
    if (st_reviewCreateDone) {
      router.push("/review");
      return message.success("작성되었습니다.");
    }

    if (st_reviewCreateError) {
      return message.error(st_reviewCreateError);
    }
  }, [st_reviewCreateDone, st_reviewCreateError]);

  // 수정 후처리
  useEffect(() => {
    if (st_reviewUpdateDone) {
      router.push(`/review/detail/${router.query && router.query.updateId}`);
      return message.success("수정되었습니다.");
    }

    if (st_reviewUpdateError) {
      return message.error(st_reviewUpdateError);
    }
  }, [st_reviewUpdateDone, st_reviewUpdateError]);
  ////// TOGGLE //////
  ////// HANDLER //////

  // 페이지 이동
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  // 수강후기 작성
  const writeHandler = useCallback((data) => {
    dispatch({
      type: REVIEW_CREATE_REQUEST,
      data: {
        title: data.title,
        content: data.content,
      },
    });
  }, []);

  // 수강후기 수정
  const updateHandler = useCallback(
    (data) => {
      dispatch({
        type: REVIEW_UPDATE_REQUEST,
        data: {
          id: router.query.updateId,
          title: data.title,
          content: data.content,
        },
      });
    },
    [router.query]
  );
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>친절한 영어교실 | 수강후기작성</title>
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
                {reviewDetail ? "수강후기 수정" : "수강후기 작성"}
              </Text>
            </Wrapper>

            <Wrapper
              height={`1px`}
              bgColor={Theme.lightGrey4_C}
              margin={`40px 0 60px`}
            />

            <WriteForm
              form={rForm}
              onFinish={reviewDetail ? updateHandler : writeHandler}
            >
              <Text fontSize={`20px`} margin={`0 0 12px`}>
                <SpanText color={Theme.basicTheme_C}>*</SpanText>
                제목
              </Text>
              <Form.Item
                name="title"
                rules={[{ required: true, message: "제목은 필수 입니다." }]}
              >
                <TextInput
                  name="title"
                  width={`100%`}
                  height={`54px`}
                  radius={`5px`}
                  border={`1px solid ${Theme.lightGrey4_C}`}
                  fontSize={`18px`}
                  placeholder="제목을 입력해주세요."
                />
              </Form.Item>

              <Text fontSize={`20px`} margin={`0 0 12px`}>
                <SpanText color={Theme.basicTheme_C}>*</SpanText>
                내용
              </Text>
              <Form.Item
                name="content"
                rules={[{ required: true, message: "내용은 필수 입니다." }]}
              >
                <TextArea
                  width={`100%`}
                  height={`188px`}
                  radius={`5px`}
                  border={`1px solid ${Theme.lightGrey4_C}`}
                  fontSize={`18px`}
                  placeholder="수강후기를 입력해주세요."
                />
              </Form.Item>

              <Wrapper al={`flex-start`}>
                <Text color={Theme.grey2_C}>
                  관리자 승인 후 등록되며, 유튜브 영상에서 소개될 수 있습니다.
                </Text>
              </Wrapper>

              <Wrapper dr={`row`} margin={`60px 0 0`}>
                <CommonButton
                  fontSize={`18px`}
                  width={`140px`}
                  height={`54px`}
                  margin={`0 8px 0 0`}
                  onClick={() => moveLinkHandler("/review")}
                >
                  취소
                </CommonButton>
                <CommonButton
                  fontSize={`18px`}
                  width={`140px`}
                  height={`54px`}
                  kindOf={`basic`}
                  htmlType="submit"
                  loading={st_reviewCreateLoading || st_reviewUpdateLoading}
                >
                  {reviewDetail ? "수정" : "등록"}
                </CommonButton>
              </Wrapper>
            </WriteForm>
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
      type: BOUGHT_ME_DETAIL_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default ReviewWrite;
