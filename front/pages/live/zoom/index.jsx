import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  CommonButton,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import Theme from "../../../components/Theme";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ZOOM_LEC_LIST_REQUEST } from "../../../reducers/level";
import { Empty, message } from "antd";

const Zoom = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const { zoomLecList } = useSelector((state) => state.level);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// USEEFFECT //////

  useEffect(() => {
    if (!me) {
      router.push("/user/login");
      return message.error("로그인 후 이용해주세요.");
    }
  }, [me]);

  useEffect(() => {
    if (router.query) {
      dispatch({
        type: ZOOM_LEC_LIST_REQUEST,
        data: {
          level: router.query.type,
        },
      });
    }
  }, [router.query]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((data) => {
    if (data.cnt === 6) {
      return message.error("더 이상 구매할 수 없습니다.");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push(`/live/zoom/${data.id}`);
  }, []);

  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>친절한 영어교실 | 실시간수업</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper
            margin={width < 700 ? `45px 0 40px` : `120px 0 100px`}
            padding={width < 1280 ? `0` : `0 210px`}
          >
            <Wrapper ju={`space-between`} dr={`row`}>
              <Text
                color={Theme.grey5_C}
                fontSize={width < 700 ? `20px` : `23px !important`}
                margin={width < 700 ? `0 0 0 20px` : `0`}
              >
                원하시는 레벨의 수정과 수업을 선택해주세요.
              </Text>
              <CommonButton
                width={`186px`}
                height={`50px`}
                fontSize={`20px`}
                kindOf={`basic`}
                onClick={() => movelinkHandler(`/survey`)}
              >
                레벨테스트하기
              </CommonButton>
              <Wrapper
                dr={`row`}
                height={`2px`}
                bgColor={Theme.lightSubTheme2_C}
                ju={`flex-start`}
                margin={`10px 0 50px`}
              >
                <Wrapper
                  height={`100%`}
                  bgColor={Theme.subTheme7_C}
                  width={`30px`}
                ></Wrapper>
              </Wrapper>
            </Wrapper>

            {/* level1 */}
            {zoomLecList &&
              zoomLecList.map((data) => {
                return (
                  data.levelValue === "LEVEL1" && (
                    <Wrapper
                      key={data.id}
                      padding={`30px 0 50px`}
                      dr={`row`}
                      borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                    >
                      <Wrapper
                        width={width < 700 ? `100%` : `70%`}
                        al={`flex-start`}
                      >
                        <Wrapper dr={`row`} ju={`flex-start`}>
                          <Text
                            fontSize={`24px`}
                            fontWeight={`600`}
                            color={Theme.grey_C}
                          >
                            {data.levelValue}
                          </Text>
                          <Wrapper
                            width={`4px`}
                            height={`4px`}
                            margin={`0 10px`}
                            borderRadius={`100%`}
                            bgColor={Theme.lightGrey4_C}
                          />
                          <Text
                            fontSize={`24px`}
                            fontWeight={`600`}
                            color={Theme.basicTheme_C}
                          >
                            {data.terms} ({data.days})
                          </Text>
                        </Wrapper>
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          margin={width < 700 && `10px 0 20px`}
                        >
                          <Wrapper
                            width={`4px`}
                            height={`4px`}
                            borderRadius={`100%`}
                            color={Theme.black2_C}
                          />
                          <Text
                            fontSize={width < 700 ? `22px` : `26px`}
                            fontWeight={"700"}
                          >
                            가격 :{" "}
                            {String(data.price).replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                            원
                          </Text>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        width={width < 700 ? `100%` : `30%`}
                        al={`flex-end`}
                      >
                        <Wrapper dr={`row`} ju={`flex-end`}>
                          <CommonButton
                            kindOf={data.cnt === 6 ? `delete` : `basic`}
                            width={width < 700 ? `100%` : `186px`}
                            height={`52px`}
                            fontSize={`20px`}
                            onClick={() => moveLinkHandler(data)}
                          >
                            {data.cnt === 6 ? `구매불가` : `구매하기`}
                          </CommonButton>
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  )
                );
              })}

            {/* level2 */}
            {zoomLecList &&
              zoomLecList.map((data) => {
                return (
                  data.levelValue === "LEVEL2" && (
                    <Wrapper
                      key={data.id}
                      padding={`30px 0 50px`}
                      dr={`row`}
                      borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                    >
                      <Wrapper
                        width={width < 700 ? `100%` : `70%`}
                        al={`flex-start`}
                      >
                        <Wrapper dr={`row`} ju={`flex-start`}>
                          <Text
                            fontSize={`24px`}
                            fontWeight={`600`}
                            color={Theme.grey_C}
                          >
                            {data.levelValue}
                          </Text>
                          <Wrapper
                            width={`4px`}
                            height={`4px`}
                            margin={`0 10px`}
                            borderRadius={`100%`}
                            bgColor={Theme.lightGrey4_C}
                          />
                          <Text
                            fontSize={`24px`}
                            fontWeight={`600`}
                            color={Theme.basicTheme_C}
                          >
                            {data.terms} ({data.days})
                          </Text>
                        </Wrapper>
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          margin={width < 700 && `10px 0 20px`}
                        >
                          <Wrapper
                            width={`4px`}
                            height={`4px`}
                            borderRadius={`100%`}
                            color={Theme.black2_C}
                          />
                          <Text
                            fontSize={width < 700 ? `22px` : `26px`}
                            fontWeight={"700"}
                          >
                            가격 :{" "}
                            {String(data.price).replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                            원
                          </Text>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        width={width < 700 ? `100%` : `30%`}
                        al={`flex-end`}
                      >
                        <Wrapper dr={`row`} ju={`flex-end`}>
                          <CommonButton
                            kindOf={data.cnt === 6 ? `delete` : `basic`}
                            width={width < 700 ? `100%` : `186px`}
                            height={`52px`}
                            fontSize={`20px`}
                            onClick={() => moveLinkHandler(data)}
                          >
                            {data.cnt === 6 ? `구매불가` : `구매하기`}
                          </CommonButton>
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  )
                );
              })}

            {/* level3 */}
            {zoomLecList &&
              zoomLecList.map((data) => {
                return (
                  data.levelValue === "LEVEL3" && (
                    <Wrapper
                      key={data.id}
                      padding={`30px 0 50px`}
                      dr={`row`}
                      borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                    >
                      <Wrapper
                        width={width < 700 ? `100%` : `70%`}
                        al={`flex-start`}
                      >
                        <Wrapper dr={`row`} ju={`flex-start`}>
                          <Text
                            fontSize={`24px`}
                            fontWeight={`600`}
                            color={Theme.grey_C}
                          >
                            {data.levelValue}
                          </Text>
                          <Wrapper
                            width={`4px`}
                            height={`4px`}
                            margin={`0 10px`}
                            borderRadius={`100%`}
                            bgColor={Theme.lightGrey4_C}
                          />
                          <Text
                            fontSize={`24px`}
                            fontWeight={`600`}
                            color={Theme.basicTheme_C}
                          >
                            {data.terms} ({data.days})
                          </Text>
                        </Wrapper>
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          margin={width < 700 && `10px 0 20px`}
                        >
                          <Wrapper
                            width={`4px`}
                            height={`4px`}
                            borderRadius={`100%`}
                            color={Theme.black2_C}
                          />
                          <Text
                            fontSize={width < 700 ? `22px` : `26px`}
                            fontWeight={"700"}
                          >
                            가격 :{" "}
                            {String(data.price).replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                            원
                          </Text>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        width={width < 700 ? `100%` : `30%`}
                        al={`flex-end`}
                      >
                        <Wrapper dr={`row`} ju={`flex-end`}>
                          <CommonButton
                            kindOf={data.cnt === 6 ? `delete` : `basic`}
                            width={width < 700 ? `100%` : `186px`}
                            height={`52px`}
                            fontSize={`20px`}
                            onClick={() => moveLinkHandler(data)}
                          >
                            {data.cnt === 6 ? `구매불가` : `구매하기`}
                          </CommonButton>
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  )
                );
              })}

            {/* level4 */}
            {zoomLecList &&
              zoomLecList.map((data) => {
                return (
                  data.levelValue === "LEVEL4" && (
                    <Wrapper
                      key={data.id}
                      padding={`30px 0 50px`}
                      dr={`row`}
                      borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                    >
                      <Wrapper
                        width={width < 700 ? `100%` : `70%`}
                        al={`flex-start`}
                      >
                        <Wrapper dr={`row`} ju={`flex-start`}>
                          <Text
                            fontSize={`24px`}
                            fontWeight={`600`}
                            color={Theme.grey_C}
                          >
                            {data.levelValue}
                          </Text>
                          <Wrapper
                            width={`4px`}
                            height={`4px`}
                            margin={`0 10px`}
                            borderRadius={`100%`}
                            bgColor={Theme.lightGrey4_C}
                          />
                          <Text
                            fontSize={`24px`}
                            fontWeight={`600`}
                            color={Theme.basicTheme_C}
                          >
                            {data.terms} ({data.days})
                          </Text>
                        </Wrapper>
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          margin={width < 700 && `10px 0 20px`}
                        >
                          <Wrapper
                            width={`4px`}
                            height={`4px`}
                            borderRadius={`100%`}
                            color={Theme.black2_C}
                          />
                          <Text
                            fontSize={width < 700 ? `22px` : `26px`}
                            fontWeight={"700"}
                          >
                            가격 :{" "}
                            {String(data.price).replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                            원
                          </Text>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        width={width < 700 ? `100%` : `30%`}
                        al={`flex-end`}
                      >
                        <Wrapper dr={`row`} ju={`flex-end`}>
                          <CommonButton
                            kindOf={data.cnt === 6 ? `delete` : `basic`}
                            width={width < 700 ? `100%` : `186px`}
                            height={`52px`}
                            fontSize={`20px`}
                            onClick={() => moveLinkHandler(data)}
                          >
                            {data.cnt === 6 ? `구매불가` : `구매하기`}
                          </CommonButton>
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  )
                );
              })}

            {/* level5 */}
            {zoomLecList &&
              zoomLecList.map((data) => {
                return (
                  data.levelValue === "LEVEL5" && (
                    <Wrapper
                      key={data.id}
                      padding={`30px 0 50px`}
                      dr={`row`}
                      borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                    >
                      <Wrapper
                        width={width < 700 ? `100%` : `70%`}
                        al={`flex-start`}
                      >
                        <Wrapper dr={`row`} ju={`flex-start`}>
                          <Text
                            fontSize={`24px`}
                            fontWeight={`600`}
                            color={Theme.grey_C}
                          >
                            {data.levelValue}
                          </Text>
                          <Wrapper
                            width={`4px`}
                            height={`4px`}
                            margin={`0 10px`}
                            borderRadius={`100%`}
                            bgColor={Theme.lightGrey4_C}
                          />
                          <Text
                            fontSize={`24px`}
                            fontWeight={`600`}
                            color={Theme.basicTheme_C}
                          >
                            {data.terms} ({data.days})
                          </Text>
                        </Wrapper>
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          margin={width < 700 && `10px 0 20px`}
                        >
                          <Wrapper
                            width={`4px`}
                            height={`4px`}
                            borderRadius={`100%`}
                            color={Theme.black2_C}
                          />
                          <Text
                            fontSize={width < 700 ? `22px` : `26px`}
                            fontWeight={"700"}
                          >
                            가격 :{" "}
                            {String(data.price).replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                            원
                          </Text>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        width={width < 700 ? `100%` : `30%`}
                        al={`flex-end`}
                      >
                        <Wrapper dr={`row`} ju={`flex-end`}>
                          <CommonButton
                            kindOf={data.cnt === 6 ? `delete` : `basic`}
                            width={width < 700 ? `100%` : `186px`}
                            height={`52px`}
                            fontSize={`20px`}
                            onClick={() => moveLinkHandler(data)}
                          >
                            {data.cnt === 6 ? `구매불가` : `구매하기`}
                          </CommonButton>
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  )
                );
              })}

            {/* level6 */}
            {zoomLecList &&
              zoomLecList.map((data) => {
                return (
                  data.levelValue === "LEVEL6" && (
                    <Wrapper
                      key={data.id}
                      padding={`30px 0 50px`}
                      dr={`row`}
                      borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                    >
                      <Wrapper
                        width={width < 700 ? `100%` : `70%`}
                        al={`flex-start`}
                      >
                        <Wrapper dr={`row`} ju={`flex-start`}>
                          <Text
                            fontSize={`24px`}
                            fontWeight={`600`}
                            color={Theme.grey_C}
                          >
                            {data.levelValue}
                          </Text>
                          <Wrapper
                            width={`4px`}
                            height={`4px`}
                            margin={`0 10px`}
                            borderRadius={`100%`}
                            bgColor={Theme.lightGrey4_C}
                          />
                          <Text
                            fontSize={`24px`}
                            fontWeight={`600`}
                            color={Theme.basicTheme_C}
                          >
                            {data.terms} ({data.days})
                          </Text>
                        </Wrapper>
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          margin={width < 700 && `10px 0 20px`}
                        >
                          <Wrapper
                            width={`4px`}
                            height={`4px`}
                            borderRadius={`100%`}
                            color={Theme.black2_C}
                          />
                          <Text
                            fontSize={width < 700 ? `22px` : `26px`}
                            fontWeight={"700"}
                          >
                            가격 :{" "}
                            {String(data.price).replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                            원
                          </Text>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        width={width < 700 ? `100%` : `30%`}
                        al={`flex-end`}
                      >
                        <Wrapper dr={`row`} ju={`flex-end`}>
                          <CommonButton
                            kindOf={data.cnt === 6 ? `delete` : `basic`}
                            width={width < 700 ? `100%` : `186px`}
                            height={`52px`}
                            fontSize={`20px`}
                            onClick={() => moveLinkHandler(data)}
                          >
                            {data.cnt === 6 ? `구매불가` : `구매하기`}
                          </CommonButton>
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  )
                );
              })}

            {/* level7 */}
            {zoomLecList &&
              zoomLecList.map((data) => {
                return (
                  data.levelValue === "LEVEL7" && (
                    <Wrapper
                      key={data.id}
                      padding={`30px 0 50px`}
                      dr={`row`}
                      borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                    >
                      <Wrapper
                        width={width < 700 ? `100%` : `70%`}
                        al={`flex-start`}
                      >
                        <Wrapper dr={`row`} ju={`flex-start`}>
                          <Text
                            fontSize={`24px`}
                            fontWeight={`600`}
                            color={Theme.grey_C}
                          >
                            {data.levelValue}
                          </Text>
                          <Wrapper
                            width={`4px`}
                            height={`4px`}
                            margin={`0 10px`}
                            borderRadius={`100%`}
                            bgColor={Theme.lightGrey4_C}
                          />
                          <Text
                            fontSize={`24px`}
                            fontWeight={`600`}
                            color={Theme.basicTheme_C}
                          >
                            {data.terms} ({data.days})
                          </Text>
                        </Wrapper>
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          margin={width < 700 && `10px 0 20px`}
                        >
                          <Wrapper
                            width={`4px`}
                            height={`4px`}
                            borderRadius={`100%`}
                            color={Theme.black2_C}
                          />
                          <Text
                            fontSize={width < 700 ? `22px` : `26px`}
                            fontWeight={"700"}
                          >
                            가격 :{" "}
                            {String(data.price).replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                            원
                          </Text>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        width={width < 700 ? `100%` : `30%`}
                        al={`flex-end`}
                      >
                        <Wrapper dr={`row`} ju={`flex-end`}>
                          <CommonButton
                            kindOf={data.cnt === 6 ? `delete` : `basic`}
                            width={width < 700 ? `100%` : `186px`}
                            height={`52px`}
                            fontSize={`20px`}
                            onClick={() => moveLinkHandler(data)}
                          >
                            {data.cnt === 6 ? `구매불가` : `구매하기`}
                          </CommonButton>
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  )
                );
              })}
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
      type: ZOOM_LEC_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Zoom;
