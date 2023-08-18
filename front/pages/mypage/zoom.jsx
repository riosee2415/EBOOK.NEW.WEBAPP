import React, { useCallback } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CommonButton,
  Image,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import { useRouter } from "next/router";
import Theme from "../../components/Theme";
import { useSelector } from "react-redux";
import { ZOOM_LEC_MY_REQUEST } from "../../reducers/level";
import { Empty } from "antd";

const Zoom = () => {
  ////// GLOBAL STATE //////
  const { myZoomList } = useSelector((state) => state.level);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>친절한 영어교실 | 수정과관리</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper margin={`120px 0 100px`}>
            <Wrapper
              al={`flex-start`}
              borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              padding={`0 0 35px`}
              margin={`0 0 35px`}
            >
              <Text fontSize={`36px`} fontWeight={`700`}>
                수정과관리
              </Text>
            </Wrapper>

            {myZoomList && myZoomList.length === 0 ? (
              <Wrapper margin={`100px 0`}>
                <Empty description={"수정과 / 수강 중인 강의가 없습니다."} />
              </Wrapper>
            ) : (
              myZoomList &&
              myZoomList.map((data) => {
                return (
                  <Wrapper
                    key={data.id}
                    padding={width < 700 ? `20px 0` : `30px 0 50px`}
                    dr={`row`}
                    borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                  >
                    <Wrapper al={`flex-start`}>
                      <Wrapper dr={`row`} ju={`flex-start`}>
                        <Text fontSize={`24px`} fontWeight={`600`}>
                          {data.tName}
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
                      <Wrapper dr={`row`} ju={`flex-start`}>
                        <Text
                          fontSize={width < 700 ? `22px` : `26px`}
                          fontWeight={"700"}
                        >
                          수업시간 : {data.startTime} ~ {data.endTime}
                        </Text>
                      </Wrapper>
                      <Wrapper dr={`row`} ju={`flex-start`}>
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
                  </Wrapper>
                );
              })
            )}
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
      type: ZOOM_LEC_MY_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Zoom;
