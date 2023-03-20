import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import useInput from "../../hooks/useInput";
import ClientLayout from "../../components/ClientLayout";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import {
  Image,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import Popup from "../../components/popup/popup";
import { BANNER_LIST_REQUEST } from "../../reducers/banner";
import { Empty } from "antd";
// import Mainslider from "../components/slide/MainSlider";
// import CC02 from "../components/common/CC02";

const Home = ({}) => {
  ////// GLOBAL STATE //////
  const { bannerList } = useSelector((state) => state.banner);

  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>친절한 영어교실 | 커리큘럼</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          {/* <Mainslider />
          <CC02 /> */}

          {bannerList &&
            (bannerList.length === 0 ? (
              <Wrapper height={`100vh`}>
                <Empty description="커리큘럼 베너가 없습니다." />
              </Wrapper>
            ) : (
              bannerList.map((data) => {
                return (
                  <Image
                    width={`100%`}
                    height={`auto`}
                    src={width < 700 ? data.mobileImagePath : data.imagePath}
                    alt="bannerImage"
                  />
                );
              })
            ))}

          <Popup />
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
        type: 2,
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Home;
