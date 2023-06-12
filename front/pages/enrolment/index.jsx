import React, { useCallback, useEffect } from "react";
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
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import Head from "next/head";
import { Empty, message } from "antd";
import { LECTURE_LIST_REQUEST } from "../../reducers/lecture";
import { useRouter } from "next/router";
import { numberWithCommas } from "../../components/commonUtils";
import { BOUGHT_ME_DETAIL_REQUEST } from "../../reducers/boughtLecture";
import Fade from "react-reveal/Fade";

const Home = ({}) => {
  ////// GLOBAL STATE //////
  const { lectureList } = useSelector((state) => state.lecture);
  const { boughtMeDetail } = useSelector((state) => state.boughtLecture);

  console.log(boughtMeDetail);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (router.query) {
      dispatch({
        type: LECTURE_LIST_REQUEST,
        data: {
          searchType: router.query.isVoucher ? [5] : [1, 2, 3, 4, 6, 7],
        },
      });
    }
  }, [router.query]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>친절한 영어교실 | 수강신청</title>
      </Head>

      <ClientLayout>
        <Fade>
          <WholeWrapper>
            <RsWrapper
              margin={width < 800 ? `40px 0` : `100px 0 `}
              padding={width < 1280 ? `0` : `0 210px`}
            >
              <Wrapper al={`flex-start`}>
                <Text
                  color={Theme.grey5_C}
                  fontSize={width < 700 ? `20px` : `23px !important`}
                  margin={width < 700 ? `0 0 0 20px` : `0`}
                >
                  원하시는 수강 기간을 선택해주세요
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

              {lectureList &&
                (lectureList.length === 0 ? (
                  <Wrapper height={`50vh`}>
                    <Empty description="수강신청목록이 없습니다." />
                  </Wrapper>
                ) : (
                  lectureList.map((data, idx) => {
                    return (
                      <Wrapper
                        key={idx}
                        dr={width < 800 ? `column` : `row`}
                        ju={`space-between`}
                        al={`flex-start`}
                        margin={`0 0 100px`}
                      >
                        <Wrapper
                          width={width < 800 ? `100%` : `calc(100% / 2 - 25px)`}
                        >
                          <Image src={data.thumbnail} radius={`15px`} />

                          <Wrapper
                            dr={`row`}
                            ju={`space-between`}
                            margin={`14px 0 0`}
                          >
                            {data.tags.map((data) => {
                              return (
                                <Wrapper
                                  width={`auto`}
                                  fontSize={`17px`}
                                  padding={
                                    width < 800 ? `8px 10px` : `8px 15px`
                                  }
                                  border={`1px solid ${Theme.lightGrey4_C}`}
                                  color={Theme.subTheme7_C}
                                  radius={`30px`}
                                >
                                  #{data.value}
                                </Wrapper>
                              );
                            })}
                          </Wrapper>
                        </Wrapper>
                        <Wrapper
                          width={width < 800 ? `100%` : `calc(100% / 2 - 25px)`}
                          al={`flex-start`}
                          margin={width < 800 && `20px 0`}
                        >
                          <Text
                            fontSize={`20px`}
                            fontWeight={`600`}
                            color={Theme.grey2_C}
                          >
                            친절한 영어교실
                          </Text>
                          <Text
                            fontSize={`26px`}
                            color={Theme.black2_C}
                            // margin={`18px 0 0`}
                          >
                            {data.title}
                          </Text>
                          {data.discountPrice && (
                            <Wrapper dr={`row`} ju={`flex-start`}>
                              <Text
                                textDecoration={"line-through"}
                                fontSize={`24px`}
                                color={Theme.lightGrey5_C}
                                margin={`0 10px 0 0`}
                              >
                                {data.viewPrice}
                              </Text>
                              <Text
                                fontSize={`17px`}
                                bgColor={Theme.red3_C}
                                padding={`0 5px`}
                                radius={`5px`}
                                color={Theme.white_C}
                              >
                                {data.viewLecturePrice}원 즉시 할인
                              </Text>
                            </Wrapper>
                          )}

                          <Wrapper
                            dr={`row`}
                            ju={`flex-start`}
                            al={`flex-end`}
                            margin={width < 800 ? `10px 0` : `3px 0 0`}
                          >
                            <Text
                              fontSize={`38px`}
                              fontWeight={`600`}
                              lineHeight={`1`}
                              margin={`0 6px 0 0`}
                            >
                              {data.discountPrice
                                ? data.viewDiscountPrice
                                : data.viewPrice}
                            </Text>
                            <Text fontSize={`22px`} color={Theme.darkGrey2_C}>
                              원/{data.viewFrontType}
                            </Text>
                          </Wrapper>
                          <Wrapper
                            dr={`row`}
                            ju={`flex-start`}
                            al={`flex-end`}
                            margin={width < 800 ? `10px 0` : `33px 0 10px`}
                          >
                            {data.installmentText &&
                              data.installmentText.trim().length > 0 && (
                                <>
                                  <Text
                                    fontSize={`38px`}
                                    fontWeight={`600`}
                                    lineHeight={`1`}
                                    margin={`0 6px 0 0`}
                                  >
                                    월&nbsp;
                                    {data.type === 1 ||
                                    data.type === 2 ||
                                    data.type === 3
                                      ? data.discountPrice
                                        ? numberWithCommas(
                                            parseInt(
                                              data.discountPrice /
                                                (12 * data.type)
                                            )
                                          )
                                        : numberWithCommas(
                                            parseInt(
                                              data.price / (12 * data.type)
                                            )
                                          )
                                      : data.discountPrice
                                      ? numberWithCommas(
                                          parseInt(data.discountPrice / 12)
                                        )
                                      : numberWithCommas(
                                          parseInt(data.price / 12)
                                        )}
                                  </Text>
                                  <Text
                                    fontSize={`22px`}
                                    color={Theme.darkGrey2_C}
                                  >
                                    {data.installmentText}
                                  </Text>
                                </>
                              )}
                            {/* {data.type &&
                              (data.type === 1 ||
                                data.type === 2 ||
                                data.type === 3) && (
                                <>
                                  <Text
                                    fontSize={`38px`}
                                    fontWeight={`600`}
                                    lineHeight={`1`}
                                    margin={`0 6px 0 0`}
                                  >
                                    월&nbsp;
                                    {data.discountPrice
                                      ? numberWithCommas(
                                          parseInt(
                                            data.discountPrice /
                                              (12 * data.type)
                                          )
                                        )
                                      : numberWithCommas(
                                          parseInt(
                                            data.price / (12 * data.type)
                                          )
                                        )}
                                  </Text>
                                  <Text
                                    fontSize={`22px`}
                                    color={Theme.darkGrey2_C}
                                  >
                                    원/{data.viewFrontType} 무이자 시
                                  </Text>
                                </>
                              )} */}
                          </Wrapper>

                          <CommonButton
                            width={`100%`}
                            height={`70px`}
                            fontSize={`25px`}
                            kindOf={`basic`}
                            onClick={() =>
                              boughtMeDetail
                                ? data.type === 7
                                  ? moveLinkHandler(`/enrolment/buy/${data.id}`)
                                  : message.error(
                                      "이미 구매한 강의가 있습니다."
                                    )
                                : moveLinkHandler(`/enrolment/buy/${data.id}`)
                            }
                          >
                            구매하기
                          </CommonButton>
                        </Wrapper>
                      </Wrapper>
                    );
                  })
                ))}
            </RsWrapper>
          </WholeWrapper>
        </Fade>
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
export default Home;
