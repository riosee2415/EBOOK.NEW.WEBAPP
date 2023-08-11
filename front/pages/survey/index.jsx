import React from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CommonButton,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { useCallback } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { LEVEL_REQUEST } from "../../reducers/level";
import Link from "next/dist/client/link";

const Intro = () => {
  ////// GLOBAL STATE //////
  const { levelList } = useSelector((state) => state.level);
  const [currentTab, setCurrentTab] = useState(0);

  const [viewLv, setViewLv] = useState(1);
  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////

  const suv = useCallback(() => {
    if (currentTab === 6) {
      setViewLv((p) => p + 1);
      setCurrentTab(99);
    } else {
      setCurrentTab((p) => p + 1);
      setViewLv((p) => p + 1);
    }
  }, [currentTab, viewLv]);

  const suvv = useCallback(() => {
    if (currentTab === 6) {
      setCurrentTab(99);
    } else {
      setCurrentTab((p) => p + 1);
    }
  }, [currentTab]);

  return (
    <>
      <Head>
        <title>친절한 영어교실 | 설문조사</title>
      </Head>

      <ClientLayout>
        <WholeWrapper minHeight={`100vh`} padding={`100px 0`} ju={`flex-start`}>
          <RsWrapper padding={width < 1280 ? `0` : `0 210px`}>
            <Wrapper al={`flex-start`}>
              <Text
                color={Theme.grey5_C}
                fontSize={width < 700 ? `20px` : `23px !important`}
                margin={width < 700 ? `0 0 0 20px` : `0`}
              >
                친절한 영어교실의 레벨테스트
              </Text>
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

            {currentTab !== 99 ? (
              <Wrapper
                border={`1px solid ${Theme.lightSubTheme2_C}`}
                padding={`50px 20px`}
              >
                <Text
                  fontSize={`30px`}
                  fontWeight={`bold`}
                  margin={`0 0 20px`}
                  color={Theme.basicTheme_C}
                >
                  {currentTab + 1}번
                </Text>
                <Text textAlign={`center`} fontSize={`22px`}>
                  {levelList &&
                    levelList[currentTab] &&
                    levelList[currentTab].value}
                </Text>

                <Wrapper dr={`row`} margin={`25px 0 0`}>
                  <CommonButton
                    width={`150px`}
                    height={`50px`}
                    fontSize={`18px`}
                    kindOf={`basic`}
                    onClick={suv}
                  >
                    네.
                  </CommonButton>
                  <CommonButton
                    width={`150px`}
                    height={`50px`}
                    fontSize={`18px`}
                    kindOf={`basic`}
                    margin={`0 10px`}
                    onClick={() => setCurrentTab(99)}
                  >
                    아니오.
                  </CommonButton>
                  <CommonButton
                    width={`150px`}
                    height={`50px`}
                    fontSize={`18px`}
                    kindOf={`basic`}
                    onClick={suvv}
                  >
                    잘 모르겠어요.
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            ) : (
              <Wrapper
                border={`1px solid ${Theme.lightSubTheme2_C}`}
                padding={`50px 20px`}
              >
                <Text
                  fontSize={`30px`}
                  fontWeight={`bold`}
                  margin={`0 0 20px`}
                  color={Theme.basicTheme_C}
                >
                  귀하는 Level{viewLv - 1 === 0 ? 1 : viewLv - 1} 과정 수강을
                  권장드립니다.
                </Text>
                <Wrapper dr={`row`}>
                  <Link href={`/live/zoom`}>
                    <a>
                      <CommonButton
                        width={`150px`}
                        height={`50px`}
                        fontSize={`18px`}
                        margin={`10px 5px`}
                        kindOf={`basic`}
                      >
                        레벨1신청
                      </CommonButton>
                    </a>
                  </Link>
                  <CommonButton
                    width={`150px`}
                    height={`50px`}
                    fontSize={`18px`}
                    margin={`10px 5px`}
                    kindOf={`basic`}
                  >
                    레벨2신청
                  </CommonButton>
                  <CommonButton
                    width={`150px`}
                    height={`50px`}
                    fontSize={`18px`}
                    margin={`10px 5px`}
                    kindOf={`basic`}
                  >
                    레벨3신청
                  </CommonButton>
                </Wrapper>
                <Wrapper dr={`row`}>
                  <CommonButton
                    width={`150px`}
                    height={`50px`}
                    fontSize={`18px`}
                    margin={`10px 5px`}
                    kindOf={`basic`}
                  >
                    레벨4신청
                  </CommonButton>
                  <CommonButton
                    width={`150px`}
                    height={`50px`}
                    fontSize={`18px`}
                    margin={`10px 5px`}
                    kindOf={`basic`}
                  >
                    레벨5신청
                  </CommonButton>
                  <CommonButton
                    width={`150px`}
                    height={`50px`}
                    fontSize={`18px`}
                    margin={`10px 5px`}
                    kindOf={`basic`}
                  >
                    레벨6신청
                  </CommonButton>
                  <CommonButton
                    width={`150px`}
                    height={`50px`}
                    fontSize={`18px`}
                    margin={`10px 5px`}
                    kindOf={`basic`}
                  >
                    레벨7신청
                  </CommonButton>
                </Wrapper>
              </Wrapper>
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
      type: LEVEL_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Intro;
