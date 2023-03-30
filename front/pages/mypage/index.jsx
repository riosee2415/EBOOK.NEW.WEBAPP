import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import ClientLayout from "../../components/ClientLayout";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import {
  CommonButton,
  Image,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
  TextInput,
  CustomPage,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import { Empty, Form, Input, message, Slider } from "antd";
import { SearchOutlined, CaretRightOutlined } from "@ant-design/icons";
import { MEDIA_LIST_REQUEST } from "../../reducers/media";
import { useRouter } from "next/router";
import { BOUGHT_ME_DETAIL_REQUEST } from "../../reducers/boughtLecture";
import { ENJOY_ME_LIST_REQUEST } from "../../reducers/enjoy";

const MypageIndex = ({}) => {
  ////// GLOBAL STATE //////

  const { me } = useSelector((state) => state.user);
  const { boughtMeDetail } = useSelector((state) => state.boughtLecture);

  const { mediaList, lastPage } = useSelector((state) => state.media);
  const { enjoyMeList } = useSelector((state) => state.enjoy);

  console.log(enjoyMeList);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const CustomSlider = styled(Slider)`
    width: 200px;

    & .ant-slider-handle {
      display: none;
      width: 13px;
      height: 13px;
      margin-top: -1px;
    }

    & .ant-slider-step,
    & .ant-slider-track,
    & .ant-slider-rail {
      height: 10px;
    }

    @media (max-width: 700px) {
      width: 100%;
    }
  `;

  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (!me) {
      message.error("로그인 후 이용해주세요.");
      return router.push("/user/login");
    }
  }, [me]);

  useEffect(() => {
    dispatch({
      type: MEDIA_LIST_REQUEST,
      data: {
        page: currentPage,
        type: boughtMeDetail && boughtMeDetail.lectureType === 5 ? 2 : 1,
      },
    });

    window.scrollTo(0, 0);
  }, [currentPage]);

  ////// TOGGLE //////
  ////// HANDLER //////

  const otherPageCall = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [currentPage]
  );

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const onSearchHandler = useCallback(
    (type) => {
      if (type.search) {
        const data = document.getElementById(
          `lecture-${parseInt(type.search) % 30}`
        );
        let page = Math.ceil(parseInt(type.search) / 30);

        if (data) {
          window.scrollTo(0, data.offsetTop - 300);
        }

        setCurrentPage(parseInt(page));
      } else {
        window.scrollTo(0);
      }
    },
    [currentPage]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>친절한 영어교실 | 마이페이지</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper
            margin={width < 700 ? `45px 0 40px` : `120px 0 100px`}
            padding={width < 1280 ? `0` : `0 210px`}
          >
            <Wrapper dr={`row`} ju={`space-between`}>
              <Text fontSize={width < 700 ? `30px` : `36px`} fontWeight={`700`}>
                안녕하세요. {me && me.username}님!
              </Text>
              <CommonButton
                margin={width < 700 && `20px 0 0`}
                kindOf={`basic`}
                width={`154px`}
                height={`40px`}
                fontSize={`18px`}
                onClick={() => moveLinkHandler(`/mypage/update`)}
              >
                내정보 수정
              </CommonButton>
            </Wrapper>

            <Wrapper
              padding={width < 700 ? `20px` : `40px`}
              radius={`10px`}
              border={`1px solid ${Theme.lightGrey4_C}`}
              margin={width < 700 ? `35px 0 0` : `35px 0 0`}
              al={`flex-start`}
            >
              <Text
                fontSize={`18px`}
                fontWeight={`700`}
                color={Theme.basicTheme_C}
              >
                나의 이용권
              </Text>

              {boughtMeDetail ? (
                boughtMeDetail.payType === "nobank" && !boughtMeDetail.isPay ? (
                  <>
                    <Wrapper dr={`row`} ju={`flex-start`}>
                      <Text
                        fontSize={width < 700 ? `20px` : `28px`}
                        width={`120px`}
                        fontWeight={`600`}
                      >
                        금액
                      </Text>
                      <Text
                        fontSize={width < 700 ? `20px` : `28px`}
                        width={`calc(100% - 120px)`}
                      >
                        {boughtMeDetail.viewPay}원
                      </Text>
                    </Wrapper>
                    <Wrapper dr={`row`} ju={`flex-start`}>
                      <Text
                        fontSize={width < 700 ? `20px` : `28px`}
                        width={`120px`}
                        fontWeight={`600`}
                      >
                        은행명
                      </Text>
                      <Text
                        fontSize={width < 700 ? `20px` : `28px`}
                        width={`calc(100% - 120px)`}
                      >
                        국민은행
                      </Text>
                    </Wrapper>
                    <Wrapper dr={`row`} ju={`flex-start`}>
                      <Text
                        fontSize={width < 700 ? `20px` : `28px`}
                        width={`120px`}
                        fontWeight={`600`}
                      >
                        계좌번호
                      </Text>
                      <Text
                        fontSize={width < 700 ? `20px` : `28px`}
                        width={`calc(100% - 120px)`}
                      >
                        054901-04-229757
                      </Text>
                    </Wrapper>
                    <Wrapper dr={`row`} ju={`flex-start`}>
                      <Text
                        fontSize={width < 700 ? `20px` : `28px`}
                        width={`120px`}
                        fontWeight={`600`}
                      >
                        예금주명
                      </Text>
                      <Text
                        fontSize={width < 700 ? `20px` : `28px`}
                        width={`calc(100% - 120px)`}
                      >
                        친절한대학 주식회사
                      </Text>
                    </Wrapper>
                    <Wrapper>
                      <Text fontSize={width < 700 ? `20px` : `28px`}>
                        위 계좌로 금액 입금해주시기 바랍니다.
                      </Text>
                    </Wrapper>
                  </>
                ) : boughtMeDetail.lectureType === 4 ? (
                  <Text fontSize={width < 700 ? `20px` : `28px`}>
                    평생수강 가능합니다.
                  </Text>
                ) : (
                  <Text fontSize={width < 700 ? `20px` : `28px`}>
                    {boughtMeDetail.viewStateDate}부터&nbsp;~&nbsp;
                    {boughtMeDetail.viewEndDate}까지 이용할 수 있습니다.
                  </Text>
                )
              ) : (
                <Text fontSize={width < 700 ? `24px` : `32px`}>
                  수강 중인 강의가 없습니다.
                </Text>
              )}
            </Wrapper>
            <Wrapper
              al={`flex-end`}
              margin={width < 700 ? `0 0 35px` : `0 0 90px`}
            >
              {boughtMeDetail &&
              boughtMeDetail &&
              boughtMeDetail.recentlyTurn ? (
                <CommonButton
                  kindOf={`basic`}
                  width={`154px`}
                  height={`40px`}
                  fontSize={`18px`}
                  onClick={() =>
                    moveLinkHandler(
                      `/mypage/${boughtMeDetail.recentlyTurn}?isSample=0`
                    )
                  }
                >
                  강의 이어보기
                </CommonButton>
              ) : (
                ""
              )}
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 34px`}>
              <Text fontSize={width < 700 ? `30px` : `36px`} fontWeight={`700`}>
                강의 목차
              </Text>
              <Form onFinish={onSearchHandler} layout="inline">
                <Form.Item name="search">
                  <Input
                    type="number"
                    style={{
                      width: width < 700 ? `100%` : `300px`,
                      height: `54px`,
                      borderRadius: `5px`,
                      fontSize: `18px`,
                    }}
                    placeholder="숫자만 입력해주세요."
                    suffix={
                      <Text color={Theme.basicTheme_C} fontWeight={`600`}>
                        검색
                        <SearchOutlined style={{ margin: `0 0 0 5px` }} />
                      </Text>
                    }
                  />
                </Form.Item>
              </Form>
            </Wrapper>
            {boughtMeDetail && enjoyMeList && (
              <Wrapper dr={`row`} ju={`flex-end`}>
                <CustomSlider
                  disabled
                  min={0}
                  max={
                    boughtMeDetail.lectureType === "5"
                      ? 118
                      : enjoyMeList.length
                  }
                  value={
                    boughtMeDetail.lectureType === "5"
                      ? enjoyMeList.length > 118
                        ? 118
                        : enjoyMeList.length
                      : enjoyMeList.length
                  }
                />

                <Wrapper fontSize={`14px`} width={`auto`}>
                  {boughtMeDetail.lectureType === "5"
                    ? 118
                    : enjoyMeList.length}
                  강
                </Wrapper>
              </Wrapper>
            )}
            <Wrapper position={`relative`}>
              <Wrapper position={`sticky`} top={`50px`} left={`0`} zIndex={`5`}>
                <CustomPage
                  margin={`0 0 10px`}
                  defaultCurrent={1}
                  current={parseInt(currentPage)}
                  total={lastPage * 30}
                  pageSize={30}
                  onChange={(page) => otherPageCall(page)}
                />
              </Wrapper>

              <Wrapper height={`1px`} bgColor={Theme.lightGrey4_C}></Wrapper>
              {mediaList &&
                (mediaList.length === 0 ? (
                  <Wrapper height={`50vh`}>
                    <Empty description="강의가 없습니다." />
                  </Wrapper>
                ) : (
                  mediaList
                    .filter((data) => data.sort <= 118)
                    .map((data, idx) => {
                      return (
                        <Wrapper
                          id={`lecture-${idx}`}
                          key={idx}
                          padding={`44px 0`}
                          dr={`row`}
                          borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                        >
                          <Wrapper
                            width={width < 700 ? `100%` : `50%`}
                            al={`flex-start`}
                          >
                            <Wrapper dr={`row`} ju={`flex-start`}>
                              <Text
                                fontSize={`20px`}
                                fontWeight={`700`}
                                color={Theme.grey3_C}
                              >
                                {data.num < 100 ? `0` : ``}
                                {data.num < 10 ? `0` : ``}
                                {data.num}
                              </Text>
                              {/* <Wrapper
                              width={`4px`}
                              height={`4px`}
                              margin={`0 10px`}
                              borderRadius={`100%`}
                              bgColor={Theme.lightGrey4_C}
                            /> */}
                            </Wrapper>
                            <Wrapper dr={`row`} ju={`flex-start`}>
                              <Wrapper
                                width={`4px`}
                                height={`4px`}
                                borderRadius={`100%`}
                                color={Theme.black2_C}
                              />
                              <Text fontSize={width < 700 ? `26px` : `30px`}>
                                {data.title}
                              </Text>
                            </Wrapper>
                          </Wrapper>
                          <Wrapper
                            width={width < 700 ? `100%` : `50%`}
                            al={`flex-end`}
                          >
                            <Wrapper dr={`row`} ju={`flex-end`}>
                              {(!boughtMeDetail || !boughtMeDetail.isPay) &&
                              data.isSample ? (
                                <CommonButton
                                  kindOf={`subTheme`}
                                  width={width < 700 ? `100%` : `186px`}
                                  height={`52px`}
                                  fontSize={`20px`}
                                  onClick={() =>
                                    moveLinkHandler(
                                      `/mypage/${data.id}?isSample=1`
                                    )
                                  }
                                >
                                  <Wrapper dr={`row`} ju={`space-between`}>
                                    <Text fontWeight={`600`}>
                                      샘플강의 보기
                                    </Text>

                                    <Wrapper
                                      width={`auto`}
                                      padding={`6px`}
                                      bgColor={Theme.white_C}
                                      radius={`100%`}
                                    >
                                      <CaretRightOutlined />
                                    </Wrapper>
                                  </Wrapper>
                                </CommonButton>
                              ) : (
                                boughtMeDetail &&
                                boughtMeDetail.isPay && (
                                  <CommonButton
                                    kindOf={`subTheme`}
                                    width={width < 700 ? `100%` : `186px`}
                                    height={`52px`}
                                    fontSize={`20px`}
                                    onClick={() =>
                                      moveLinkHandler(
                                        `/mypage/${data.id}?isSample=0`
                                      )
                                    }
                                  >
                                    <Wrapper dr={`row`} ju={`space-between`}>
                                      <Text fontWeight={`600`}>강의 보기</Text>

                                      <Wrapper
                                        width={`auto`}
                                        padding={`6px`}
                                        bgColor={Theme.white_C}
                                        radius={`100%`}
                                      >
                                        <CaretRightOutlined />
                                      </Wrapper>
                                    </Wrapper>
                                  </CommonButton>
                                )
                              )}
                            </Wrapper>
                          </Wrapper>
                        </Wrapper>
                      );
                    })
                ))}
            </Wrapper>
            {/* <CustomPage
              defaultCurrent={1}
              current={parseInt(currentPage)}
              total={lastPage * 30}
              pageSize={30}
              onChange={(page) => otherPageCall(page)}
            /> */}
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
      type: MEDIA_LIST_REQUEST,
      data: {
        page: 1,
      },
    });

    context.store.dispatch({
      type: BOUGHT_ME_DETAIL_REQUEST,
    });

    context.store.dispatch({
      type: ENJOY_ME_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default MypageIndex;
