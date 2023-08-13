import React, { useCallback, useEffect, useState } from "react";
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
import { Empty, Form, message, Radio, Modal, Select } from "antd";
import { useRouter } from "next/router";
import moment from "moment";
import { BOUGHT_ME_DETAIL_REQUEST } from "../../../reducers/boughtLecture";
import {
  ZOOM_DETAIL_REQUEST,
  ZOOM_LEC_ADD_PEOPLE_REQUEST,
  ZOOM_LEC_HISTORY_ADD_REQUEST,
} from "../../../reducers/level";

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

  @media (max-width: 700px) {
    & .ant-form-item-label label {
      font-size: 20px;
    }
  }
`;

const CustomRadio = styled(Radio)`
  & span {
    font-size: 24px;
  }

  & .ant-radio {
    top: 0.1em;
  }

  & .ant-radio-checked,
  & .ant-radio-inner {
    width: 20.5px;
    height: 20.5px;
  }

  & .ant-radio-inner::after {
    display: none;
  }
  & .ant-radio-checked .ant-radio-inner,
  &:hover .ant-radio-inner {
    border: 6px solid ${(props) => props.theme.basicTheme_C};
  }

  @media (max-width: 700px) {
    & span {
      font-size: 20px;
    }

    & .ant-radio-checked,
    & .ant-radio-inner {
      width: 18.5px;
      height: 18.5px;
    }
  }
`;

const Home = ({}) => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const {
    zoomLecDetail,

    zoomBoughtId,

    st_zoomLecHistoryAddLoading,
    st_zoomLecHistoryAddDone,
    st_zoomLecHistoryAddError,
  } = useSelector((state) => state.level);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [infoForm] = Form.useForm();

  const [isBuyType, setIsBuyType] = useState(null);

  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (router.query) {
      dispatch({
        type: ZOOM_DETAIL_REQUEST,
        data: {
          id: router.query.id,
        },
      });
    }
  }, [router.query]);

  useEffect(() => {
    if (!me) {
      router.push("/user/login");
      return message.error("로그인 후 이용해주세요.");
    } else {
      infoForm.setFieldsValue({
        username: me.username,
        mobile: me.mobile,
      });
    }
  }, [me]);

  // 결제 후처리
  useEffect(() => {
    if (st_zoomLecHistoryAddDone) {
      dispatch({
        type: ZOOM_LEC_ADD_PEOPLE_REQUEST,
        data: {
          ZoomId: router.query.id,
          UserId: me.id,
        },
      });

      if (isBuyType === "nobank" && zoomBoughtId) {
        message.success("결제되었습니다.");
        return router.push(`/live/zoom/finish/${zoomBoughtId}`);
      } else {
        message.success("결제되었습니다.");
        return router.push("/mypage");
      }
    }

    if (st_zoomLecHistoryAddError) {
      return message.error(st_zoomLecHistoryAddError);
    }
  }, [st_zoomLecHistoryAddDone, st_zoomLecHistoryAddError]);
  ////// TOGGLE //////

  ////// HANDLER //////

  // 결제 방법
  const isBuyTypeChangeHandler = useCallback(
    (data) => {
      setIsBuyType(data.target.value);
    },
    [isBuyType]
  );

  // 결제
  const buyHandler = useCallback(
    async (data) => {
      if (!isBuyType) {
        return message.error("결제 방법을 선택해주세요.");
      }

      const IMP = window.IMP;

      const orderPK = "ORD" + moment().format("YYYYMMDDHHmmssms");

      const buyPay = zoomLecDetail.price;

      IMP.init("imp20437848");

      if (isBuyType === "nobank") {
        // 무통장입금
        // 무통장입금
        // 무통장입금
        dispatch({
          type: ZOOM_LEC_HISTORY_ADD_REQUEST,
          data: {
            payment: buyPay,
            UserId: me.id,
            ZoomLectureId: router.query.id,
            payType: isBuyType,
            name: data.name,
            impUid: "-",
            merchantUid: "-",
          },
        });
      } else {
        // 신용카드 결제
        // 신용카드 결제
        // 신용카드 결제
        IMP.request_pay(
          {
            pg: "danal_tpay.A010052124",
            pay_method: isBuyType,
            merchant_uid: orderPK,
            name: zoomLecDetail && zoomLecDetail.levelValue,
            buyer_name: me.username,
            biz_num: me.mobile,
            // amount: 150,
            amount: zoomLecDetail.price,
          },
          async (rsp) => {
            if (rsp.success) {
              dispatch({
                type: ZOOM_LEC_HISTORY_ADD_REQUEST,
                data: {
                  payment: buyPay,
                  UserId: me.id,
                  ZoomLectureId: router.query.id,
                  payType: isBuyType,
                  impUid: rsp.imp_uid,
                  merchantUid: rsp.merchant_uid,
                  name: me.username,
                },
              });
            }
          }
        );
      }
    },
    [isBuyType, zoomLecDetail, st_zoomLecHistoryAddDone, me, router.query]
  );

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
                padding={width < 700 ? `20px` : `40px`}
                radius={`10px`}
                border={`1px solid ${Theme.lightGrey4_C}`}
                margin={`25px 0 80px`}
                dr={width < 700 ? `column` : `row`}
                ju={`space-between`}
                al={width < 700 && `flex-start`}
              >
                <Wrapper width={`auto`} al={`flex-start`}>
                  <Text
                    fontSize={`18px`}
                    fontWeight={`700`}
                    color={Theme.basicTheme_C}
                    margin={`0 0 20px`}
                  >
                    {zoomLecDetail && zoomLecDetail.levelValue}
                  </Text>
                  <Text fontSize={width < 700 ? `28px` : `32px`}>
                    {zoomLecDetail && zoomLecDetail.terms}(
                    {zoomLecDetail && zoomLecDetail.days})
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`auto`}
                  dr={`row`}
                  fontSize={width < 700 ? `28px` : `32px`}
                >
                  {String(zoomLecDetail && zoomLecDetail.price).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )}
                  원
                </Wrapper>
              </Wrapper>

              <BuyForm
                form={infoForm}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                onFinish={buyHandler}
              >
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
                <Wrapper
                  al={`flex-start`}
                  margin={isBuyType === "nobank" && "0 0 20px"}
                >
                  <Radio.Group
                    value={isBuyType}
                    onChange={isBuyTypeChangeHandler}
                  >
                    <CustomRadio
                      value={"card"}
                      style={{
                        margin: width < 700 ? `0 90px 20px 0` : `0 90px 0 0`,
                      }}
                    >
                      카드결제
                    </CustomRadio>
                    <CustomRadio
                      value={"nobank"}
                      style={{
                        margin: width < 700 ? `0 90px 20px 0` : `0 90px 0 0`,
                      }}
                    >
                      무통장입금(계좌이체)
                    </CustomRadio>
                  </Radio.Group>
                </Wrapper>

                {isBuyType === "nobank" && (
                  <Form.Item
                    name="name"
                    colon={false}
                    label="입금자명"
                    rules={[
                      { required: true, message: "입금자명은 필수 입니다." },
                    ]}
                  >
                    <TextInput
                      width={`100%`}
                      height={`54px`}
                      radius={`5px`}
                      border={`1px solid ${Theme.lightGrey4_C}`}
                      fontSize={`18px`}
                      placeholder="입금자명을 입력해주세요."
                    />
                  </Form.Item>
                )}
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
                    width={`calc(100% / 2)`}
                    fontWeight={`600`}
                    color={Theme.grey2_C}
                  >
                    주문 금액
                  </Wrapper>

                  <Wrapper
                    width={`calc(100% / 2)`}
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
                    width={
                      width < 700
                        ? `calc(100% / 3 - 12px)`
                        : `calc(100% / 3 - 30px)`
                    }
                    fontWeight={`600`}
                    color={Theme.grey2_C}
                  >
                    {String(zoomLecDetail && zoomLecDetail.price).replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )}
                    원
                  </Wrapper>
                </Wrapper>
                <CommonButton
                  width={`100%`}
                  height={`54px`}
                  fontSize={`20px`}
                  kindOf={`basic`}
                  htmlType="submit"
                  loading={st_zoomLecHistoryAddLoading}
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
