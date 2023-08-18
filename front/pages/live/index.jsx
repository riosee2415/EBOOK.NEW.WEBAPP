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
  WholeWrapper,
} from "../../components/commonComponents";
import { useRouter } from "next/router";

const Live = () => {
  ////// GLOBAL STATE //////
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
  const datum = [
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_1.png",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_m_1.png",
      link: null,
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_2.png",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_m_2.png",
      link: null,
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_3.png",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_m_3.png",
      link: null,
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_4.png",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_m_4.png",
      link: "/live/zoom",
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_5.png",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_m_5.png",
      link: null,
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_6.png",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_m_6.png",
      link: null,
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_7.png",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_m_7.png",
      link: null,
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_8.png",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_m_8.png",
      link: null,
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_9.png",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_m_9.png",
      link: "/live/zoom",
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_10.png",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_m_10.png",
      link: null,
    },
  ];

  return (
    <>
      <Head>
        <title>친절한 영어교실 | 실시간수업</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          {datum.map((data, idx) => {
            return (
              <Image
                key={idx}
                alt="이미지"
                src={width < 700 ? data.mobileUrl : data.url}
                cursor={data.link ? `pointer` : `auto`}
                onClick={data.link ? () => movelinkHandler(`/live/zoom`) : null}
              />
            );
          })}

          <RsWrapper>
            <CommonButton
              width={`47%`}
              height={`70px`}
              fontSize={`25px`}
              kindOf={`basic`}
              onClick={() => movelinkHandler(`/live/zoom`)}
            >
              수강신청하기
            </CommonButton>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Live;
