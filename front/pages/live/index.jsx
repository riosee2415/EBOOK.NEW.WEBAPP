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
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_1.jpg",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%80%E1%85%AA_m_1.jpg",
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_2.jpg",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%80%E1%85%AA_m_2.jpg",
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_3.jpg",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%80%E1%85%AA_m_3.jpg",
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_4.jpg",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%80%E1%85%AA_m_4.jpg",
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_5.jpg",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%80%E1%85%AA_m_5.jpg",
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_6.jpg",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%80%E1%85%AA_m_6.jpg",
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_7.jpg",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%80%E1%85%AA_m_7.jpg",
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_8.jpg",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%80%E1%85%AA_m_8.jpg",
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_9.jpg",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%80%E1%85%AA_m_9.jpg",
    },
    {
      url: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/live_10.jpg",
      mobileUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/assets/images/live/%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%80%E1%85%AA_m_10.jpg",
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
              />
            );
          })}

          <RsWrapper dr={`row`} ju={`space-between`}>
            <CommonButton
              width={`47%`}
              height={`70px`}
              fontSize={`25px`}
              kindOf={`basic`}
            >
              수강신청하기
            </CommonButton>
            <CommonButton
              width={`47%`}
              height={`70px`}
              fontSize={`25px`}
              kindOf={`basic`}
              onClick={() => movelinkHandler(`/survey`)}
            >
              레벨테스트하기
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
