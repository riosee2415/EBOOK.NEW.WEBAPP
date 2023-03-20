import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import useInput from "../../../hooks/useInput";
import ClientLayout from "../../../components/ClientLayout";
import axios from "axios";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import {
  CommonButton,
  Image,
  RsWrapper,
  SpanText,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import Popup from "../../../components/popup/popup";
import { Empty, Form, Radio } from "antd";
import { useRouter } from "next/router";
import { LECTURE_DETAIL_REQUEST } from "../../../reducers/lecture";

const BuyForm = styled(Form)`
  width: 100%;

  & .ant-form-item-label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 0 10px;
  }

  & .ant-form-item-label label::before {
    font-size: 24px !important;
    color: ${(props) => props.theme.basicTheme_C} !important;
  }

  & .ant-form-item-label label {
    font-size: 24px;
    font-weight: 400;
  }
`;

const CustomRadioGroup = styled(Radio.Group)`
  & .ant-radio-wrapper {
    font-size: 24px !important;
  }
`;

const Home = ({}) => {
  ////// GLOBAL STATE //////

  const { lectureDetail } = useSelector((state) => state.lecture);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();
  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (router.query) {
      dispatch({
        type: LECTURE_DETAIL_REQUEST,
        data: {
          id: router.query.id,
        },
      });
    }
  }, [router.query]);
  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>친절한 영어교실 | 구매하기</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper
            margin={`120px 0 100px`}
            padding={width < 1280 ? `0` : `0 210px`}
          >
            <Wrapper>
              <Wrapper dr={`row`} ju={`space-between`}>
                <Text
                  fontSize={width < 700 ? `30px` : `36px`}
                  fontWeight={`700`}
                  color={Theme.basicTheme_C}
                >
                  결제 진행
                </Text>
                <Wrapper width={`auto`} dr={`row`}>
                  <CommonButton
                    width={`110px`}
                    height={`44px`}
                    fontSize={`20px`}
                    fontWeight={`600`}
                    kindOf={`basic`}
                    margin={`0 8px 0 0`}
                  >
                    국내
                  </CommonButton>
                  <CommonButton
                    width={`110px`}
                    height={`44px`}
                    fontSize={`20px`}
                    fontWeight={`600`}
                  >
                    해외
                  </CommonButton>
                </Wrapper>
              </Wrapper>

              <Wrapper
                margin={`36px 0 60px`}
                height={`1px`}
                bgColor={Theme.lightGrey4_C}
              />

              <Wrapper al={`flex-start`}>
                <Text
                  fontSize={`26px`}
                  fontWeight={`bold`}
                  color={Theme.grey4_C}
                >
                  주문 상품
                </Text>
              </Wrapper>

              <Wrapper
                padding={`40px`}
                radius={`10px`}
                border={`1px solid ${Theme.lightGrey4_C}`}
                margin={`25px 0 80px`}
                dr={`row`}
                ju={`space-between`}
              >
                <Wrapper width={`auto`} al={`flex-start`}>
                  <Text
                    fontSize={`18px`}
                    fontWeight={`700`}
                    color={Theme.basicTheme_C}
                    margin={`0 0 20px`}
                  >
                    상품명
                  </Text>
                  <Text fontSize={`32px`}>
                    {lectureDetail && lectureDetail.subTitle}
                  </Text>
                </Wrapper>
                <Wrapper width={`auto`} dr={`row`} fontSize={`32px`}>
                  <SpanText
                    fontWeight={`700`}
                    color={Theme.basicTheme_C}
                    margin={`0 4px 0 0`}
                  >
                    {lectureDetail && lectureDetail.viewLecturePrice}
                  </SpanText>
                  원
                </Wrapper>
              </Wrapper>

              <Wrapper al={`flex-start`}>
                <Text
                  fontSize={`26px`}
                  fontWeight={`bold`}
                  color={Theme.grey4_C}
                >
                  책 배송정보
                </Text>
              </Wrapper>

              <Wrapper
                margin={`30px 0 42px`}
                height={`1px`}
                bgColor={Theme.lightGrey4_C}
              />

              <BuyForm labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                <Form.Item
                  label="회원명"
                  name="username"
                  rules={[{ required: true, message: "회원명은 필수 입니다." }]}
                  colon={false}
                >
                  <TextInput
                    width={`100%`}
                    height={`54px`}
                    radius={`5px`}
                    border={`none`}
                    fontSize={`18px`}
                    margin={`0 0 10px`}
                    readOnly
                  />
                </Form.Item>
                <Form.Item
                  label="수령인"
                  name="receiver"
                  rules={[{ required: true, message: "수령인은 필수 입니다." }]}
                  colon={false}
                >
                  <TextInput
                    width={width < 700 ? `100%` : `420px`}
                    height={`54px`}
                    radius={`5px`}
                    border={`1px solid ${Theme.lightGrey4_C}`}
                    fontSize={`18px`}
                    placeholder="성함을 입력해주세요."
                    margin={`0 0 10px`}
                  />
                </Form.Item>
                <Wrapper dr={`row`}>
                  <Form.Item
                    label="배송지"
                    name="receiver"
                    rules={[
                      { required: true, message: "수령인은 필수 입니다." },
                    ]}
                    colon={false}
                    style={{
                      width: "100%",
                    }}
                  >
                    <TextInput
                      width={
                        width < 700
                          ? `calc(100% - 140px)`
                          : `calc(420px - 140px)`
                      }
                      height={`54px`}
                      radius={`5px`}
                      border={`1px solid ${Theme.lightGrey4_C}`}
                      fontSize={`18px`}
                      placeholder="우편번호를 검색해주세요."
                      margin={`0 0 10px`}
                    />
                    <CommonButton
                      width={`140px`}
                      height={`54px`}
                      fontSize={`21px`}
                      padding={`0`}
                    >
                      우편번호 검색
                    </CommonButton>
                  </Form.Item>
                </Wrapper>
                <Form.Item
                  name="receiver"
                  colon={false}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <TextInput
                    width={`100%`}
                    height={`54px`}
                    radius={`5px`}
                    border={`1px solid ${Theme.lightGrey4_C}`}
                    fontSize={`18px`}
                    placeholder="-"
                    margin={`0 0 10px`}
                  />
                </Form.Item>
                <Form.Item
                  name="receiver"
                  colon={false}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <TextInput
                    width={`100%`}
                    height={`54px`}
                    radius={`5px`}
                    border={`1px solid ${Theme.lightGrey4_C}`}
                    fontSize={`18px`}
                    placeholder="상세주소를 입력해주세요."
                    margin={`0 0 10px`}
                  />
                </Form.Item>
                <Form.Item
                  label="연락처"
                  name="mobile"
                  rules={[{ required: true, message: "연락처는 필수 입니다." }]}
                  colon={false}
                >
                  <TextInput
                    width={width < 700 ? `100%` : `420px`}
                    height={`54px`}
                    radius={`5px`}
                    border={`1px solid ${Theme.lightGrey4_C}`}
                    fontSize={`18px`}
                    placeholder="'-'를 제외한 연락처를 입력해주세요."
                    margin={`0 0 10px`}
                  />
                </Form.Item>

                <Wrapper
                  margin={`30px 0 80px`}
                  height={`1px`}
                  bgColor={Theme.lightGrey4_C}
                />

                {/* 교제구매 */}
                <Wrapper al={`flex-start`}>
                  <Text
                    fontSize={`26px`}
                    fontWeight={`bold`}
                    color={Theme.grey4_C}
                  >
                    교재 구매
                  </Text>
                </Wrapper>

                <Wrapper
                  margin={`25px 0 44px`}
                  height={`1px`}
                  bgColor={Theme.lightGrey4_C}
                />

                <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                  <CustomRadioGroup onChange={console.log} size="large">
                    <Radio
                      value={1}
                      style={{
                        width: width < 700 ? `100%` : `auto`,
                        margin: `0 90px 0 0`,
                      }}
                    >
                      구매
                    </Radio>
                    <Radio
                      value={2}
                      style={{ width: width < 700 ? `100%` : `auto` }}
                    >
                      구매 안 함
                    </Radio>
                  </CustomRadioGroup>
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-start`}>
                  <Text
                    textDecoration={"line-through"}
                    fontSize={`22px`}
                    color={Theme.grey3_C}
                    margin={`0 10px 0 0`}
                  >
                    122,500원
                  </Text>
                  <Text fontSize={`22px`} margin={`0 10px 0 0`}>
                    49,900원
                  </Text>
                  <Text fontSize={`22px`} color={Theme.grey3_C}>
                    ( 23년 01월 31일까지 )
                  </Text>
                </Wrapper>

                <Wrapper
                  margin={`30px 0 80px`}
                  height={`1px`}
                  bgColor={Theme.lightGrey4_C}
                />

                {/* 결제방법 */}
                <Wrapper al={`flex-start`}>
                  <Text
                    fontSize={`26px`}
                    fontWeight={`bold`}
                    color={Theme.grey4_C}
                  >
                    결제 방법
                  </Text>
                </Wrapper>

                <Wrapper
                  margin={`25px 0 44px`}
                  height={`1px`}
                  bgColor={Theme.lightGrey4_C}
                />

                <Wrapper al={`flex-start`}>
                  <CustomRadioGroup onChange={console.log}>
                    <Radio value={"card"} style={{ margin: `0 90px 0 0` }}>
                      카드결제
                    </Radio>
                    <Radio value={"nobank"}>무통장입금(계좌이체)</Radio>
                  </CustomRadioGroup>
                </Wrapper>

                <Wrapper
                  margin={`30px 0 80px`}
                  height={`1px`}
                  bgColor={Theme.lightGrey4_C}
                />

                <Wrapper
                  dr={`row`}
                  bgColor={Theme.lightGrey2_C}
                  padding={`20px 0`}
                  fontSize={width < 700 ? `18px` : `20px`}
                >
                  <Wrapper
                    width={`calc(100% / 3)`}
                    fontWeight={`600`}
                    color={Theme.grey2_C}
                  >
                    주문 금액
                  </Wrapper>
                  <Wrapper
                    width={`calc(100% / 3)`}
                    fontWeight={`600`}
                    color={Theme.grey2_C}
                  >
                    교재 금액
                  </Wrapper>
                  <Wrapper
                    width={`calc(100% / 3)`}
                    fontWeight={`600`}
                    color={Theme.grey4_C}
                  >
                    최종결제금액
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  bgColor={Theme.lightGrey2_C}
                  padding={`48px 0`}
                  fontSize={width < 700 ? `18px` : `28px`}
                  margin={`0 0 20px`}
                >
                  <Wrapper
                    width={`calc(100% / 3)`}
                    fontWeight={`600`}
                    color={Theme.grey2_C}
                  >
                    588,900원
                  </Wrapper>
                  <Wrapper
                    width={`calc(100% / 3)`}
                    fontWeight={`600`}
                    color={Theme.grey2_C}
                  >
                    588,900원
                  </Wrapper>
                  <Wrapper
                    width={`calc(100% / 3)`}
                    fontWeight={`600`}
                    color={Theme.grey4_C}
                  >
                    588,900원
                  </Wrapper>
                </Wrapper>

                <CommonButton
                  width={`100%`}
                  height={`54px`}
                  fontSize={`20px`}
                  kindOf={`basic`}
                >
                  결제하기
                </CommonButton>
              </BuyForm>
            </Wrapper>
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
export default Home;
