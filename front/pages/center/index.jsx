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
  ATag,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import { BANNER_LIST_REQUEST } from "../../reducers/banner";
import { Empty } from "antd";
import { useRouter } from "next/router";
import { NOTICE_PAGE_LIST_REQUEST } from "../../reducers/notice";
import { REFERENCE_LIST_REQUEST } from "../../reducers/reference";
import { DownloadOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";

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

const KakaoBtn = styled(Wrapper)`
  width: 440px;
  height: 75px;
  border-radius: 5px;
  border: 2px solid ${Theme.kakao_C};
  background: ${Theme.kakao_C};
  color: ${Theme.kakaoTitle_C};
  flex-direction: row;
  cursor: pointer;

  &:hover {
    background: ${Theme.white_C};
  }

  @media (max-width: 700px) {
    width: 100%;
    height: 55px;
    padding: 0 20px;
  }
`;

const Home = ({}) => {
  ////// GLOBAL STATE //////
  const { bannerList } = useSelector((state) => state.banner);

  const { noticeList, noticeLastPage } = useSelector((state) => state.notice);
  const { referenceList } = useSelector((state) => state.reference);

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
        type: NOTICE_PAGE_LIST_REQUEST,
        data: {
          page,
        },
      });
    },
    [currentPage]
  );

  const fileDownloadHandler = useCallback(async (data) => {
    const ext = data.file.split(".");
    const _ext = ext[ext.length - 1];

    const finalFilename = data.title + ".pdf";

    let blob = await fetch(data.file).then((r) => r.blob());

    const element = document.createElement("a");
    const file = new Blob([blob]);

    saveAs(file, finalFilename);
  }, []);
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>친절한 영어교실 | 고객센터</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper
            margin={width < 700 ? `40px 0 20px` : `100px 0 80px`}
            padding={width < 1280 ? `0` : `0 210px`}
          >
            {/* 공지사항 */}
            <Wrapper al={`flex-start`}>
              <Text
                color={Theme.grey5_C}
                fontSize={width < 700 ? `20px` : `23px !important`}
                margin={width < 700 ? `0 0 0 20px` : `0`}
              >
                공지사항
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

            <Wrapper
              dr={`row`}
              padding={width < 700 ? `10px 0` : `28px 0`}
              margin={`20px 0 0`}
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
                    ? `calc(100% - 60px - 120px)`
                    : `calc(100% - 120px - 180px)`
                }
              >
                제목
              </Wrapper>
              <Wrapper width={width < 700 ? `120px` : `180px`}>작성일</Wrapper>
            </Wrapper>
            <Wrapper>
              {noticeList &&
                (noticeList.length === 0 ? (
                  <Wrapper margin={`40px 0`}>
                    <Empty description="공지사항이 없습니다." />
                  </Wrapper>
                ) : (
                  noticeList.map((data, idx) => {
                    return (
                      <HoverWrapper
                        key={idx}
                        onClick={() =>
                          moveLinkHandler(`/center/detail/${data.id}`)
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
                              ? `calc(100% - 60px - 120px)`
                              : `calc(100% - 120px - 180px)`
                          }
                          padding={`0 18px`}
                        >
                          <Text width={`100%`} isEllipsis>
                            [{data.type}]&nbsp;{data.title}
                          </Text>
                        </Wrapper>
                        <Wrapper
                          width={width < 700 ? `120px` : `180px`}
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
                total={noticeLastPage * 10}
                pageSize={10}
                onChange={(page) => otherPageCall(page)}
              />
            </Wrapper>

            {/* 카카오톡 문의 */}
            <Wrapper al={`flex-start`}>
              <Text
                color={Theme.grey5_C}
                fontSize={width < 700 ? `20px` : `23px !important`}
                margin={width < 700 ? `0 0 0 20px` : `0`}
              >
                온라인 상담
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

            <Wrapper
              padding={width < 700 ? `0 20px` : `0`}
              al={width < 700 ? `center` : `flex-start`}
              margin={`0 0 100px`}
            >
              <ATag
                target="_blank"
                href="http://pf.kakao.com/_zxhxaxdb/chat"
                width={`auto`}
              >
                <KakaoBtn>
                  <Image
                    width={width < 700 ? `30px` : `50px`}
                    margin={width < 700 ? `0 5px 0 0` : `0 0 0 0`}
                    src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fassets%2Fimages%2Fconsulting_modify%2Ficon_kakao.png?alt=media&token=f356fc4d-625a-4942-aa14-fedacb37e9b5`}
                  />
                  <Text
                    fontSize={width < 700 ? `20px !important` : `32px`}
                    fontWeight={`600`}
                  >
                    1:1 카카오톡 상담 바로가기
                  </Text>
                </KakaoBtn>
              </ATag>

              <Text
                margin={`25px 0 0`}
                color={Theme.subBlack2_C}
                fontSize={width < 700 ? `14px` : `18px`}
              >
                {width < 700
                  ? "친절한 영어교실 카카오 채널을 추가 하시면"
                  : "친절한 영어교실 카카오 채널을 추가 하시면 더 많은 정보를 받아보실 수 있습니다."}
              </Text>
              <Text
                color={Theme.subBlack2_C}
                fontSize={width < 700 ? `14px` : `18px`}
              >
                {width < 700 ? "더 많은 정보를 받아보실 수 있습니다." : ""}
              </Text>
            </Wrapper>

            {/* 자료실 */}
            <Wrapper al={`flex-start`}>
              <Text
                color={Theme.grey5_C}
                fontSize={width < 700 ? `20px` : `23px !important`}
                margin={width < 700 ? `0 0 0 20px` : `0`}
              >
                자료실
              </Text>
              <Wrapper
                dr={`row`}
                height={`2px`}
                bgColor={Theme.lightSubTheme2_C}
                ju={`flex-start`}
                margin={`10px 0 0`}
              >
                <Wrapper
                  height={`100%`}
                  bgColor={Theme.subTheme7_C}
                  width={`30px`}
                ></Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper margin={`10px 0 0`}>
              {referenceList &&
                (referenceList.length === 0 ? (
                  <Wrapper margin={`0 0 40px`}>
                    <Empty description="자료가 없습니다." />
                  </Wrapper>
                ) : (
                  referenceList.map((data, idx) => {
                    return (
                      <HoverWrapper key={idx}>
                        <Wrapper
                          width={width < 700 ? `60px` : `120px`}
                          color={Theme.grey3_C}
                        >
                          {data.num}
                        </Wrapper>
                        <Wrapper
                          width={
                            width < 700
                              ? `calc(100% - 60px - 150px)`
                              : `calc(100% - 120px - 180px)`
                          }
                          padding={`0 18px`}
                        >
                          <Text width={`100%`} isEllipsis>
                            {data.title}
                          </Text>
                        </Wrapper>
                        <Wrapper
                          width={width < 700 ? `150px` : `180px`}
                          color={Theme.grey3_C}
                        >
                          {/* <ATag href={data.file}> */}
                          {/* <a> */}
                          <CommonButton
                            width={`110px`}
                            height={`40px`}
                            fontSize={`16px`}
                            padding={`0`}
                            onClick={() => fileDownloadHandler(data)}
                          >
                            <DownloadOutlined />
                            다운로드
                          </CommonButton>
                          {/* </a> */}
                          {/* </ATag> */}
                        </Wrapper>
                      </HoverWrapper>
                    );
                  })
                ))}
            </Wrapper>

            {/* 상담문의 */}

            <Wrapper al={`flex-start`} margin={`100px 0`}>
              <Text fontSize={width < 700 ? `26px` : `32px`} fontWeight={`700`}>
                상담 문의
              </Text>
              <Wrapper
                margin={`34px 0 46px`}
                height={`1px`}
                bgColor={Theme.lightGrey4_C}
              />

              <Wrapper padding={width < 700 ? `0 20px` : `0`} al={`flex-start`}>
                <ATag href="tel:0263750300" width={`auto`}>
                  <Text
                    color={Theme.basicTheme_C}
                    fontSize={width < 700 ? `30px !important` : `36px`}
                    fontWeight={`600`}
                  >
                    02.6375.0300~1
                  </Text>
                </ATag>
                <Text
                  color={Theme.grey4_C}
                  fontSize={width < 700 ? `18px !important` : `22px`}
                >
                  평일 09:00-17:00 (주말 및 공휴일 휴무)
                </Text>
              </Wrapper>
            </Wrapper>
          </RsWrapper>

          {bannerList &&
            (bannerList.length === 0 ? (
              <Wrapper height={`100vh`}>
                <Empty description="고객센터 베너가 없습니다." />
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
        type: 4,
        useYn: 1,
      },
    });

    context.store.dispatch({
      type: NOTICE_PAGE_LIST_REQUEST,
    });

    context.store.dispatch({
      type: REFERENCE_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Home;
