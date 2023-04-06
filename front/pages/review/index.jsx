import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import useInput from "../../hooks/useInput";
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
  CustomPage,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import { BANNER_LIST_REQUEST } from "../../reducers/banner";
import { REVIEW_LIST_REQUEST } from "../../reducers/review";
import { Empty } from "antd";
import { useRouter } from "next/router";

const HoverWrapper = styled(Wrapper)`
  flex-direction: row;
  padding: 30px 0;
  font-size: 20px;
  border-bottom: 1px solid ${(props) => props.theme.lightGrey4_C};

  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.lightGrey2_C};
  }

  @media (max-width: 700px) {
    font-size: 18px;
    padding: 10px 0;
  }
`;

const Home = ({}) => {
  ////// GLOBAL STATE //////
  const { bannerList } = useSelector((state) => state.banner);

  const { reviewList, reviewLastPage } = useSelector((state) => state.review);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////

  // 페이지 이동
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  // 페이지 이동
  const otherPageCall = useCallback(
    (page) => {
      setCurrentPage(page);

      dispatch({
        type: REVIEW_LIST_REQUEST,
        data: {
          page,
        },
      });
    },
    [currentPage]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>친절한 영어교실 | 수강후기</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper
            margin={width < 700 ? `40px 0 20px` : `100px 0 80px`}
            padding={width < 1280 ? `0` : `0 210px`}
          >
            <Wrapper al={`flex-start`}>
              <Text
                color={Theme.grey5_C}
                fontSize={`23px !important`}
                margin={width < 700 ? `0 0 0 20px` : `0`}
              >
                친절한 영어교실 수강생분들의 생생후기
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

            <Wrapper dr={`row`} ju={`flex-end`}>
              <CommonButton
                kindOf={`basic`}
                width={`114px`}
                height={`40px`}
                fontSize={`16px`}
                onClick={() => moveLinkHandler("/review/write")}
              >
                글쓰기
              </CommonButton>
            </Wrapper>

            <Wrapper
              dr={`row`}
              padding={width < 700 ? `10px 0` : `28px 0`}
              margin={`30px 0 0`}
              fontSize={width < 700 ? `20px` : `22px`}
              color={Theme.grey3_C}
              bgColor={Theme.lightGrey2_C}
              borderTop={`1px solid ${Theme.grey2_C}`}
              borderBottom={`1px solid ${Theme.lightGrey4_C}`}
            >
              <Wrapper width={width < 700 ? `60px` : `120px`}>번호</Wrapper>
              <Wrapper
                width={
                  width < 700
                    ? `calc(100% - 60px - 80px - 100px)`
                    : `calc(100% - 120px - 150px - 180px)`
                }
              >
                제목
              </Wrapper>
              <Wrapper width={width < 700 ? `80px` : `150px`}>닉네임</Wrapper>
              <Wrapper width={width < 700 ? `100px` : `180px`}>작성일</Wrapper>
            </Wrapper>
            <Wrapper>
              {reviewList &&
                (reviewList.length === 0 ? (
                  <Wrapper margin={`40px 0`}>
                    <Empty description="수강후기가 없습니다." />
                  </Wrapper>
                ) : (
                  reviewList.map((data, idx) => {
                    return (
                      <HoverWrapper
                        key={idx}
                        onClick={() =>
                          moveLinkHandler(`/review/detail/${data.id}`)
                        }
                      >
                        <Wrapper
                          width={width < 700 ? `60px` : `120px`}
                          color={Theme.grey3_C}
                        >
                          {data.num}
                        </Wrapper>
                        <Wrapper
                          width={
                            width < 700
                              ? `calc(100% - 60px - 80px - 100px)`
                              : `calc(100% - 120px - 150px - 180px)`
                          }
                          padding={`0 18px`}
                        >
                          <Text width={`100%`} isEllipsis>
                            {data.title}
                          </Text>
                        </Wrapper>
                        <Wrapper width={width < 700 ? `80px` : `150px`}>
                          <Text width={`100%`} isEllipsis textAlign={`center`}>
                            {data.username}
                          </Text>
                        </Wrapper>
                        <Wrapper
                          width={width < 700 ? `100px` : `180px`}
                          color={Theme.grey3_C}
                        >
                          <Text width={`100%`} isEllipsis textAlign={`center`}>
                            {data.viewCreatedAt}
                          </Text>
                        </Wrapper>
                      </HoverWrapper>
                    );
                  })
                ))}
            </Wrapper>

            <Wrapper margin={width < 700 ? `20px 0 0` : `40px 0 0`}>
              <CustomPage
                defaultCurrent={1}
                current={parseInt(currentPage)}
                total={reviewLastPage * 10}
                pageSize={10}
                onChange={(page) => otherPageCall(page)}
              />
            </Wrapper>
          </RsWrapper>

          {bannerList &&
            (bannerList.length === 0 ? (
              <Wrapper height={`100vh`}>
                <Empty description="수강후기 베너가 없습니다." />
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
        type: 3,
        useYn: 1,
      },
    });

    context.store.dispatch({
      type: REVIEW_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Home;
