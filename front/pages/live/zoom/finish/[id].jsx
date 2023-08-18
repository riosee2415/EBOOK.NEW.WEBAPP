import React, { useCallback, useEffect } from "react";
import {
  Image,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
  CommonButton,
} from "../../../../components/commonComponents";
import axios from "axios";
import wrapper from "../../../../store/configureStore";
import { END } from "redux-saga";
import { LOAD_MY_INFO_REQUEST } from "../../../../reducers/user";
import useWidth from "../../../../hooks/useWidth";
import Theme from "../../../../components/Theme";
import ClientLayout from "../../../../components/ClientLayout";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ZOOM_LEC_HISTORY_DETAIL_REQUEST } from "../../../../reducers/level";

const NobankFinish = () => {
  const { me } = useSelector((state) => state.user);
  const { zoomHistoryDetail } = useSelector((state) => state.level);

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  useEffect(() => {
    if (router.query) {
      window.scrollTo(0, 0);
      dispatch({
        type: ZOOM_LEC_HISTORY_DETAIL_REQUEST,
        data: {
          ZoomBoughtHistoryId: router.query.id,
        },
      });
    }
  }, [router.query]);

  return (
    <ClientLayout>
      <WholeWrapper margin={width < 700 ? `92px 0 0` : `26px 0 0`}>
        <RsWrapper padding={width < 700 ? `50px 0` : `100px 0`}>
          {/* <Text
            fontSize={`30px !important`}
            fontWeight={`700`}
            color={Theme.basicTheme_C}
            margin={`50px 0 20px`}
          >
            무통장 입금
          </Text> */}

          <Wrapper
            padding={width < 700 ? `50px 20px` : `50px`}
            bgColor={Theme.lightBasicTheme_c}
            border={`5px dashed ${Theme.basicTheme_C}`}
          >
            <Wrapper dr={`row`} margin={`0 0 20px`} al={`flex-end`}>
              <Image
                width={`300px`}
                margin={`0 10px 0 0`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/original/p2.png`}
              />

              <Text
                fontWeight={`700`}
                fontSize={width < 700 ? `30px !important` : `40px`}
                color={Theme.basicTheme_C}
              >
                무통장입금 계좌
              </Text>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              width={width < 700 ? `100%` : `70%`}
            >
              <Text
                fontSize={width < 700 ? `20px !important` : `35px`}
                fontWeight={`700`}
              >
                금액
              </Text>
              <Text fontSize={width < 700 ? `20px !important` : `35px`}>
                {zoomHistoryDetail && zoomHistoryDetail.viewPrice}
              </Text>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              width={width < 700 ? `100%` : `70%`}
            >
              <Text
                fontSize={width < 700 ? `20px !important` : `35px`}
                fontWeight={`700`}
              >
                은행명
              </Text>
              <Text fontSize={width < 700 ? `20px !important` : `35px`}>
                국민은행
              </Text>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              width={width < 700 ? `100%` : `70%`}
            >
              <Text
                fontSize={width < 700 ? `20px !important` : `35px`}
                fontWeight={`700`}
              >
                계좌번호
              </Text>
              <Text fontSize={width < 700 ? `20px !important` : `35px`}>
                054901-04-229757
              </Text>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              width={width < 700 ? `100%` : `70%`}
            >
              <Text
                fontSize={width < 700 ? `20px !important` : `35px`}
                fontWeight={`700`}
              >
                예금주명
              </Text>
              <Text fontSize={width < 700 ? `20px !important` : `35px`}>
                친절한대학 주식회사
              </Text>
            </Wrapper>
          </Wrapper>

          <Text
            fontSize={`33px !important`}
            textAlign={`center`}
            fontWeight={`700`}
            color={Theme.basicTheme_C}
            margin={`50px 0 0`}
          >
            입금 확인 후
          </Text>
          <Text
            fontSize={`33px !important`}
            textAlign={`center`}
            fontWeight={`700`}
            color={Theme.basicTheme_C}
          >
            강의 수강 가능합니다.
          </Text>
          <Text
            fontSize={`20px !important`}
            textAlign={`center`}
            fontWeight={`700`}
          >
            평일(09:00~17:00) 기준 입금 후 확인까지 평균 1시간 소요 예정입니다.
          </Text>
          <Text
            fontSize={`20px !important`}
            textAlign={`center`}
            fontWeight={`700`}
          >
            (주말 및 야간 입금시 입금확인까지 1일 소요 예정입니다.)
          </Text>

          <CommonButton
            kindOf={`basic`}
            margin={`50px 0 0`}
            width={`300px`}
            height={`70px`}
            fontWeight={`700`}
            fontSize={`30px`}
            onClick={() => {
              moveLinkHandler("/");
            }}
          >
            홈으로
          </CommonButton>
        </RsWrapper>
      </WholeWrapper>
    </ClientLayout>
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
export default NobankFinish;
