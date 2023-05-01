import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { Empty, Input, Modal, message } from "antd";
import {
  SearchOutlined,
  CaretRightOutlined,
  PlusCircleOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  MEDIA_ALL_LIST_REQUEST,
  MEDIA_DETAIL_REQUEST,
} from "../../reducers/media";
import { useRouter } from "next/router";
import {
  BOUGHT_ME_DETAIL_REQUEST,
  BOUGHT_RECENTLY_UPDATE_REQUEST,
} from "../../reducers/boughtLecture";
import {
  ENJOY_CREATE_REQUEST,
  ENJOY_ME_LIST_REQUEST,
} from "../../reducers/enjoy";

const Video = styled.video`
  width: 100%;
  border-top: 3px solid ${(props) => props.theme.basicTheme_C};
  padding: 20px 0 0;
  border-bottom: 1px solid ${(props) => props.theme.grey5_C};
`;

const MediaDetail = () => {
  const { me } = useSelector((state) => state.user);
  const { boughtMeDetail } = useSelector((state) => state.boughtLecture);

  const { mediaAllList, mediaDetail } = useSelector((state) => state.media);

  const { enjoyMeList } = useSelector((state) => state.enjoy);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const videoRef = useRef();

  const [videoSpeed, setVideoSpeed] = useState(1.0);

  const [aModal, setAModal] = useState(false);

  ////// USEEFFECT //////

  useEffect(() => {
    if (!me) {
      message.error("로그인 후 이용해주세요.");
      return router.push("/user/login");
    }
  }, [me]);

  useEffect(() => {
    if (router.query) {
      dispatch({
        type: MEDIA_DETAIL_REQUEST,
        data: {
          id: router.query.id,
        },
      });

      setTimeout(() => {
        const currentVideo = document.getElementById("videoTag");

        if (currentVideo && router.query.recentlyTime) {
          currentVideo.currentTime = router.query.recentlyTime;
        }
      }, 3000);
    }
  }, [router.query]);

  useEffect(() => {
    if (boughtMeDetail && router.query) {
      if (boughtMeDetail.recentlyTurn) {
        if (parseInt(router.query.id) !== boughtMeDetail.recentlyTurn) {
          setAModal(true);
        }
      }
    }
  }, [boughtMeDetail, router.query]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSpeed;

      if (videoRef.current.playbackRate < 0.25) {
        setVideoSpeed(0.25);
      }
      if (videoRef.current.playbackRate > 2) {
        setVideoSpeed(2);
      }
    }
  }, [videoSpeed]);

  ////// HANDLER //////

  // 페이지 변경
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const speedUnitHandler = useCallback((data) => {
    setVideoSpeed(data);
  }, []);

  // 수강 기록 생성
  const enjoyMediaCreateHandler = useCallback(() => {
    dispatch({
      type: ENJOY_CREATE_REQUEST,
      data: {
        id: router.query.id,
      },
    });
  }, [router.query]);
  // 일시정지
  const recentlySaveHandler = useCallback(
    (data) => {
      const currentVideo = document.getElementById("videoTag");

      dispatch({
        type: BOUGHT_RECENTLY_UPDATE_REQUEST,
        data: {
          id: boughtMeDetail.id,
          recentlyTurn: router.query.id,
          recentlyTime: currentVideo.currentTime,
        },
      });
    },
    [boughtMeDetail, router.query]
  );

  return (
    <>
      <Head>
        <title>친절한 영어교실 | 마이페이지</title>
      </Head>
      <ClientLayout>
        <WholeWrapper>
          <RsWrapper
            margin={width < 700 ? `40px 0` : `100px 0`}
            padding={width < 1280 ? `0` : `0 210px`}
          >
            {/* <Wrapper
              fontSize={width < 700 ? `30px` : `36px`}
              fontWeight={`700`}
              color={Theme.basicTheme_C}
            >
              {router.query &&
                (router.query.isSample === "1" ? (
                  <Text>샘플강의 보기</Text>
                ) : (
                  <Text>강의 보기</Text>
                ))}
            </Wrapper> */}

            {/* <Wrapper
              height={`1px`}
              bgColor={Theme.lightGrey4_C}
              margin={width < 700 ? `15px 0 10px` : `40px 0 36px`}
            /> */}

            <Wrapper
              padding={width < 700 ? `22px 0` : `44px 0`}
              dr={`row`}
              borderBottom={`1px solid ${Theme.lightGrey4_C}`}
            >
              <Wrapper al={`flex-start`}>
                <Wrapper dr={`row`} ju={`flex-start`}>
                  <Text
                    fontSize={`20px`}
                    fontWeight={`700`}
                    color={Theme.basicTheme_C}
                  >
                    {router.query &&
                      mediaAllList &&
                      mediaAllList.find(
                        (data) => data.id === parseInt(router.query.id)
                      ) &&
                      `${
                        mediaAllList.find(
                          (data) => data.id === parseInt(router.query.id)
                        ).num < 100
                          ? `0`
                          : ``
                      }${
                        mediaAllList.find(
                          (data) => data.id === parseInt(router.query.id)
                        ).num < 10
                          ? `0`
                          : ``
                      }${
                        mediaAllList.find(
                          (data) => data.id === parseInt(router.query.id)
                        ).num
                      }`}
                  </Text>
                  <Wrapper
                    width={`4px`}
                    height={`4px`}
                    margin={`0 10px`}
                    borderRadius={`100%`}
                    bgColor={Theme.lightGrey4_C}
                  />
                  <Text
                    fontSize={`20px`}
                    fontWeight={`700`}
                    color={Theme.grey_C}
                  >
                    {router.query &&
                      mediaAllList &&
                      mediaAllList.find(
                        (data) => data.id === parseInt(router.query.id)
                      ) &&
                      mediaAllList.find(
                        (data) => data.id === parseInt(router.query.id)
                      ).type}
                  </Text>
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-start`}>
                  <Wrapper
                    width={`4px`}
                    height={`4px`}
                    borderRadius={`100%`}
                    color={Theme.black2_C}
                  />

                  <Text fontSize={`30px`} fontWeight={`600`}>
                    {router.query &&
                      mediaAllList &&
                      mediaAllList.find(
                        (data) => data.id === parseInt(router.query.id)
                      ) &&
                      mediaAllList.find(
                        (data) => data.id === parseInt(router.query.id)
                      ).title}
                  </Text>
                </Wrapper>

                {mediaDetail && router.query && (
                  <Video
                    onContextMenu={(e) => e.preventDefault()}
                    onSelectCapture={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    id={"videoTag"}
                    ref={videoRef}
                    src={
                      router.query.isSample === "1"
                        ? mediaDetail.sampleMediaPath
                        : mediaDetail.mediaPath
                    }
                    onPlay={
                      router.query.isSample === "0"
                        ? enjoyMediaCreateHandler
                        : null
                    }
                    onPause={recentlySaveHandler}
                    playbackRate
                    playsInline
                    controls
                    autoplay
                    controlsList="nodownload"
                  />
                )}

                <Wrapper
                  padding={`23px 30px`}
                  dr={`row`}
                  ju={`flex-end`}
                  bgColor={Theme.lightGrey2_C}
                >
                  <Text
                    fontSize={`22px`}
                    fontWeight={`600`}
                    margin={`0 16px 0 0 `}
                  >
                    재생속도
                  </Text>
                  <Wrapper width={`auto`} dr={`row`}>
                    <Wrapper
                      width={`auto`}
                      padding={`5px`}
                      bgColor={Theme.lightGrey4_C}
                      color={Theme.grey3_C}
                      radius={`100%`}
                      cursor={`pointer`}
                      onClick={() => speedUnitHandler(videoSpeed - 0.25)}
                    >
                      <MinusOutlined />
                    </Wrapper>
                    <Text
                      width={width < 700 ? `80px` : `100px`}
                      textAlign={`center`}
                      fontSize={width < 700 ? `18px` : `20px`}
                      fontWeight={`700`}
                    >
                      {videoSpeed}
                    </Text>
                    <Wrapper
                      width={`auto`}
                      padding={`5px`}
                      bgColor={Theme.lightGrey4_C}
                      color={Theme.grey3_C}
                      radius={`100%`}
                      cursor={`pointer`}
                      onClick={() => speedUnitHandler(videoSpeed + 0.25)}
                    >
                      <PlusOutlined />
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            {/* MEDIA LIST */}
            <Wrapper borderTop={`1px solid ${Theme.lightGrey4_C}`}>
              {mediaAllList &&
                (mediaAllList.length === 0 ? (
                  <Wrapper height={`50vh`}>
                    <Empty description="강의가 없습니다." />
                  </Wrapper>
                ) : (
                  mediaAllList.map((data, idx) => {
                    return (
                      <Wrapper
                        key={idx}
                        padding={`30px 0`}
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
                              color={Theme.basicTheme_C}
                            >
                              {data.num < 100 ? `0` : ``}
                              {data.num < 10 ? `0` : ``}
                              {data.num}
                            </Text>
                            <Wrapper
                              width={`4px`}
                              height={`4px`}
                              margin={`0 10px`}
                              borderRadius={`100%`}
                              bgColor={Theme.lightGrey4_C}
                            />
                            <Text
                              fontSize={`20px`}
                              fontWeight={`700`}
                              color={Theme.grey_C}
                            >
                              {data.type}
                            </Text>
                          </Wrapper>
                          <Wrapper dr={`row`} ju={`flex-start`}>
                            <Wrapper
                              width={`4px`}
                              height={`4px`}
                              borderRadius={`100%`}
                              color={Theme.black2_C}
                            />
                            <Text
                              fontSize={width < 700 ? `24px` : `26px`}
                              fontWeight={"700"}
                            >
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
                                  <Text fontWeight={`600`}>샘플강의 보기</Text>

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
                            ) : boughtMeDetail && boughtMeDetail.isPay ? (
                              <CommonButton
                                kindOf={
                                  enjoyMeList.find(
                                    (value) => value.MediumId === data.id
                                  )
                                    ? `checked`
                                    : `subTheme`
                                }
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
                                  <Text fontWeight={`600`}>
                                    {enjoyMeList.find(
                                      (value) => value.MediumId === data.id
                                    )
                                      ? `강의 다시보기`
                                      : `강의 시청하기`}
                                  </Text>

                                  <Wrapper
                                    width={`auto`}
                                    padding={`6px`}
                                    bgColor={Theme.white_C}
                                    color={
                                      enjoyMeList.find(
                                        (value) => value.MediumId === data.id
                                      ) && Theme.subTheme6_C
                                    }
                                    radius={`100%`}
                                  >
                                    <CaretRightOutlined />
                                  </Wrapper>
                                </Wrapper>
                              </CommonButton>
                            ) : (
                              ""
                            )}
                          </Wrapper>
                        </Wrapper>
                      </Wrapper>
                    );
                  })
                ))}
            </Wrapper>
          </RsWrapper>
        </WholeWrapper>
        <Modal visible={aModal} footer={null} onCancel={() => setAModal(false)}>
          <Wrapper>
            <Text fontSize={`25px`} fontWeight={"600"}>
              {mediaAllList &&
                mediaAllList.length > 0 &&
                mediaAllList.find(
                  (data) => data.id === boughtMeDetail.recentlyTurn
                )?.num}
              번 강의&nbsp;
              {parseInt(parseInt(boughtMeDetail.recentlyTime) / 60) < 10
                ? `0${parseInt(parseInt(boughtMeDetail.recentlyTime) / 60)}`
                : parseInt(parseInt(boughtMeDetail.recentlyTime) / 60)}
              :
              {parseInt(parseInt(boughtMeDetail.recentlyTime) % 60) < 10
                ? `0${parseInt(parseInt(boughtMeDetail.recentlyTime) % 60)}`
                : parseInt(parseInt(boughtMeDetail.recentlyTime) % 60)}
              부터
            </Text>
            <Text fontSize={`25px`} fontWeight={"600"}>
              강의를 이어보시겠습니까?
            </Text>

            {boughtMeDetail && (
              <CommonButton
                kindOf={`subTheme`}
                width={width < 700 ? `100%` : `186px`}
                height={`52px`}
                fontSize={`20px`}
                margin={`20px 0 0`}
                onClick={() => {
                  moveLinkHandler(
                    `/mypage/${boughtMeDetail.recentlyTurn}?isSample=0&recentlyTime=${boughtMeDetail.recentlyTime}`
                  );
                  setAModal(false);
                }}
              >
                이어보기
              </CommonButton>
            )}
          </Wrapper>
        </Modal>
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
      type: MEDIA_ALL_LIST_REQUEST,
    });

    context.store.dispatch({
      type: ENJOY_ME_LIST_REQUEST,
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

export default MediaDetail;
