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
import Popup from "../../../components/popup/popup";
import { Empty, Form, message, Radio, Modal, Select } from "antd";
import {
  PlusCircleOutlined,
  PauseCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { LECTURE_DETAIL_REQUEST } from "../../../reducers/lecture";
import DaumPostcode from "react-daum-postcode";
import { numberWithCommas } from "../../../components/commonUtils";
import moment from "moment";
import {
  BOUGHT_CREATE_REQUEST,
  BOUGHT_ME_DETAIL_REQUEST,
} from "../../../reducers/boughtLecture";

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

const CustomPlusCircleOutlined = styled(PlusCircleOutlined)`
  font-size: 30px;
  color: ${(porps) => porps.theme.basicTheme_C};
  @media (max-width: 700px) {
    font-size: 14px;
    margin: 0 1px;
  }
`;
const CustomPauseCircleOutlined = styled(PauseCircleOutlined)`
  font-size: 30px;
  color: ${(porps) => porps.theme.basicTheme_C};
  transform: rotate(90deg);

  @media (max-width: 700px) {
    font-size: 14px;
    margin: 0 1px;
  }
`;

const CustomArrowRightOutlined = styled(ArrowRightOutlined)`
  font-size: 20px;
  color: ${(porps) => porps.theme.basicTheme_C};
  margin: 0 10px;
  @media (max-width: 700px) {
    font-size: 14px;
    margin: 0 5px;
  }
`;

const CustomSelect = styled(Select)`
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.lightGrey4_C};
  font-size: 18px;
  margin: 0 0 10px;

  &:not(.ant-select-customize-input) .ant-select-selector {
    height: 54px !important;
    display: flex;
    flex-direction: row;
    justify-content: center;

    align-items: center;
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
  const { lectureDetail, st_lectureDetailError } = useSelector(
    (state) => state.lecture
  );
  const {
    boughtCreateId,
    boughtMeDetail,
    //
    st_boughtCreateLoading,
    st_boughtCreateDone,
    st_boughtCreateError,
  } = useSelector((state) => state.boughtLecture);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [infoForm] = Form.useForm();

  const [addressData, setAddressData] = useState(null);
  const [aModal, setAModal] = useState(false);

  const [isBuyBook, setIsBuyBook] = useState(
    lectureDetail && !lectureDetail.isBookPay ? 2 : 1
  );
  const [isBuyType, setIsBuyType] = useState(null);
  const [isOverseas, setIsOverseas] = useState(false);
  const [overAddress, setOverAddress] = useState(false);

  const dataArr = [
    {
      id: 1,
      title: "미국 캐나다 북미 남미 아프리카",
      price: 100000,
      viewPrice: "100,000원",
    },
    {
      id: 2,
      title: "일본 베트남 아시아",
      price: 40000,
      viewPrice: "40,000원",
    },
    {
      id: 3,
      title: "유럽 오세아니아",
      price: 80000,
      viewPrice: "80,000원",
    },
  ];

  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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

  useEffect(() => {
    if (boughtMeDetail) {
      if (lectureDetail && lectureDetail.type !== 7) {
        message.error("이미 구매한 강의가 있습니다.");
        return router.push("/enrolment");
      }
      if (!boughtMeDetail.isPay) {
        if (lectureDetail && lectureDetail.type === 7) {
          message.error("수강중인 강의가 없습니다.");
          return router.push("/enrolment");
        }
      }
    } else {
      if (lectureDetail && lectureDetail.type === 7) {
        message.error("수강중인 강의가 없습니다.");
        return router.push("/enrolment");
      }
    }
  }, [boughtMeDetail, lectureDetail]);

  useEffect(() => {
    if (lectureDetail) {
      setIsBuyBook(!lectureDetail.isBookPay ? 2 : 1);
    }
  }, [lectureDetail]);

  useEffect(() => {
    if (!me) {
      router.push("/user/login");
      return message.error("로그인 후 이용해주세요.");
    } else {
      infoForm.setFieldsValue({
        username: me.username,
        receiver: me.username,
        zoneCode: me.zoneCode,
        address: me.address,
        detailAddress: me.detailAddress,
        mobile: me.mobile,
      });

      setAddressData({
        zonecode: me.zoneCode,
      });
    }
  }, [me]);

  // useEffect(() => {
  //   if (st_lectureDetailError) {
  //     message.error(st_lectureDetailError);
  //     return router.push("/enrolment");
  //   }
  // }, [st_lectureDetailError]);

  // 결제 후처리
  useEffect(() => {
    if (st_boughtCreateDone) {
      if (isBuyType === "nobank" && boughtCreateId) {
        message.success("결제되었습니다.");
        return router.push(`/enrolment/buy/finish/${boughtCreateId}`);
      } else {
        message.success("결제되었습니다.");
        return router.push("/mypage");
      }
    }

    if (st_boughtCreateError) {
      return message.error(st_boughtCreateError);
    }
  }, [st_boughtCreateDone, st_boughtCreateError]);
  ////// TOGGLE //////

  // 주소 모달
  const aModalToggle = useCallback(() => {
    setAModal((prev) => !prev);
  }, [aModal]);

  ////// HANDLER //////

  // 해외 여부
  const isOverseasChangeHandler = useCallback(
    (data) => {
      setIsOverseas(data);

      setIsBuyType(null);
      if (!data) {
        infoForm.setFieldsValue({
          username: me.username,
          receiver: me.username,
          zoneCode: me.zoneCode,
          address: me.address,
          detailAddress: me.detailAddress,
          mobile: me.mobile,
        });

        setAddressData({
          zonecode: me.zoneCode,
        });
      }
    },
    [isOverseas]
  );

  // 교재 구매
  const isBuyBookChangeHandler = useCallback(
    (data) => {
      setIsBuyBook(data.target.value);
    },
    [isBuyBook]
  );

  // 결제 방법
  const isBuyTypeChangeHandler = useCallback(
    (data) => {
      setIsBuyType(data.target.value);
    },
    [isBuyType]
  );

  // 해외 주소 변경
  const overAddressChange = useCallback(
    (data) => {
      setOverAddress(data);
    },
    [overAddress]
  );

  // 환율 계산 함수
  const dollarChange = useCallback(async (inputDollar) => {
    // const res = await fetch(
    //   "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD"
    // );
    // const result = await res.json();
    // const exchangeRate = result[0].basePrice;
    // const exchangedWon = inputDollar / exchangeRate;
    // return exchangedWon;
  }, []);

  // 결제
  const buyHandler = useCallback(
    async (data) => {
      if (!isBuyType) {
        return message.error("결제 방법을 선택해주세요.");
      }

      if (st_boughtCreateDone) {
        return message.error("이미 결제되었습니다.");
      }

      const IMP = window.IMP;

      const address = isOverseas
        ? isBuyBook === 1
          ? dataArr.find((value) => value.id === data.overAddress).title +
            " / " +
            (data.detailAddress ? data.detailAddress : "") +
            " " +
            (data.detailAddress2 ? data.detailAddress2 : "") +
            " " +
            (data.detailAddress3 ? data.detailAddress3 : "")
          : data.address
        : data.address;

      const orderPK = "ORD" + moment().format("YYYYMMDDHHmmssms");

      let paypalPay = null;

      // 금액 계산 순선
      // 할인 가격 :
      //  ⭕️ 할인 가격 +
      //  ❌ 정상 가격 +
      // 해외 + 책 구매시
      //  ⭕️ 해외 추가금액
      //  ❌ 0원
      // 책 구매시
      //  ⭕️ 책 할인 날짜 지났거나 null이 아닐때
      //        ⭕️ 할인 가격 :
      //                    ⭕️ 할인 가격 +
      //                    ❌ 정상 가격 +
      //        ❌ 정상 가격
      //  ❌ 0
      const buyPay =
        (lectureDetail.discountPrice
          ? lectureDetail.discountPrice
          : lectureDetail.price) +
        (isBuyBook === 1 && overAddress
          ? dataArr.find((data) => data.id === overAddress).price
          : 0) +
        (isBuyBook === 1
          ? lectureDetail.bookEndDate
            ? lectureDetail.bookDiscountPrice
              ? lectureDetail.bookDiscountPrice
              : lectureDetail.bookPrice
            : lectureDetail.bookPrice
          : 0);

      // await dollarChange(
      //   buyPay
      //   // 10000
      // ).then((data) => {
      //   paypalPay = data;
      // });

      IMP.init("imp20437848");

      if (isBuyType === "nobank") {
        // 무통장입금
        // 무통장입금
        // 무통장입금
        dispatch({
          type: BOUGHT_CREATE_REQUEST,
          data: {
            mobile: data.mobile,
            receiver: data.receiver,
            zoneCode: data.zoneCode,
            address: address,
            detailAddress: isOverseas ? "-" : data.detailAddress,
            payType: isBuyType,
            pay: buyPay,
            lectureType: lectureDetail.type,
            name: data.name,
            impUid: "-",
            merchantUid: "-",
            isBuyBook: isBuyBook === 1 ? 1 : 0,
            bookPrice:
              isBuyBook === 1
                ? lectureDetail.bookEndDate
                  ? lectureDetail.bookDiscountPrice
                  : lectureDetail.bookPrice
                : 0,
            lectureId: router.query.id,
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
            name: lectureDetail && lectureDetail.title,
            buyer_name: me.username,
            biz_num: me.mobile,
            // amount: 150,
            amount:
              (lectureDetail.discountPrice
                ? lectureDetail.discountPrice
                : lectureDetail.price) +
              (isBuyBook === 1 && overAddress
                ? dataArr.find((data) => data.id === overAddress).price
                : 0) +
              (isBuyBook === 1
                ? lectureDetail.bookEndDate
                  ? lectureDetail.bookDiscountPrice
                  : lectureDetail.bookPrice
                : 0),
          },
          async (rsp) => {
            if (rsp.success) {
              dispatch({
                type: BOUGHT_CREATE_REQUEST,
                data: {
                  mobile: data.mobile,
                  receiver: data.receiver,
                  zoneCode: data.zoneCode,
                  address: address,
                  detailAddress: isOverseas ? "-" : data.detailAddress,
                  payType: isBuyType,
                  pay: buyPay,
                  lectureType: lectureDetail.type,
                  name: "-",
                  impUid: rsp.imp_uid,
                  merchantUid: rsp.merchant_uid,
                  isBuyBook: isBuyBook === 1 ? 1 : 0,
                  bookPrice:
                    isBuyBook === 1
                      ? lectureDetail.bookEndDate
                        ? lectureDetail.bookDiscountPrice
                        : lectureDetail.bookPrice
                      : 0,
                  lectureId: router.query.id,
                },
              });
            }
          }
        );
      }
    },
    [isBuyType, lectureDetail, isBuyBook, overAddress, st_boughtCreateDone]
  );

  // else if (isBuyType === "paypal") {
  //   // 해외 결제
  //   // 해외 결제
  //   // 해외 결제

  //   await dollarChange(
  //     buyPay
  //     // 10000
  //   ).then((data) => {
  //     paypalPay = data;
  //   });
  //   IMP.request_pay(
  //     {
  //       pg: `${isBuyType}`,
  //       pay_method: "card",
  //       merchant_uid: orderPK,
  //       name: lectureDetail && lectureDetail.title,
  //       currency: "USD",
  //       amount: paypalPay,
  //       // amount: 0.12,
  //       m_redirect_url: `http://localhost:3000/enrolment/buy/paypal?amount=${
  //         lectureDetail &&
  //         lectureDetail.discountPrice +
  //           (isBuyBook === 1 && overAddress
  //             ? dataArr.find((data) => data.id === overAddress).price
  //             : 0) +
  //           (isBuyBook === 1
  //             ? lectureDetail.bookEndDate
  //               ? lectureDetail.bookDiscountPrice
  //               : lectureDetail.bookPrice
  //             : 0)
  //       }&address=${address}&mobile=${data.mobile}&receiver=${
  //         data.receiver
  //       }&payType=${isBuyType}&lectureId=${router.query.id}&pay=${
  //         lectureDetail &&
  //         lectureDetail.discountPrice +
  //           (isBuyBook === 1 && overAddress
  //             ? dataArr.find((data) => data.id === overAddress).price
  //             : 0) +
  //           (isBuyBook === 1
  //             ? lectureDetail.bookEndDate
  //               ? lectureDetail.bookDiscountPrice
  //               : lectureDetail.bookPrice
  //             : 0)
  //       }&type=${
  //         lectureDetail && lectureDetail.type
  //       }&isBuyBook=${isBuyBook}&bookPrice=${
  //         isBuyBook === 1
  //           ? lectureDetail.bookEndDate
  //             ? lectureDetail.bookDiscountPrice
  //             : lectureDetail.bookPrice
  //           : 0
  //       }`,
  //     },
  //     async (rsp) => {
  //       if (rsp.success) {
  //         dispatch({
  //           type: BOUGHT_CREATE_REQUEST,
  //           data: {
  //             mobile: data.mobile,
  //             receiver: data.receiver,
  //             zoneCode: data.zoneCode,
  //             address: address,
  //             detailAddress: isOverseas ? "-" : data.detailAddress,
  //             payType: isBuyType,
  //             pay: buyPay,
  //             lectureType: lectureDetail.type,
  //             name: "-",
  //             impUid: rsp.imp_uid,
  //             merchantUid: rsp.merchant_uid,
  //             isBuyBook: isBuyBook === 1 ? 1 : 0,
  //             bookPrice:
  //               isBuyBook === 1
  //                 ? lectureDetail.bookEndDate
  //                   ? lectureDetail.bookDiscountPrice
  //                   : lectureDetail.bookPrice
  //                 : 0,
  //             lectureId: router.query.id,
  //           },
  //         });
  //       } else {
  //         if (rsp.error_msg !== "사용자가 결제를 취소하셨습니다") {
  //           message.error(
  //             "결제가 정상적으로 처리되지 못했습니다. 다시 시도해주세요."
  //           );
  //         }
  //       }
  //     }
  //   );
  // }

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
                    width={width < 700 ? `90px` : `110px`}
                    height={width < 700 ? `38px` : `44px`}
                    fontSize={`20px`}
                    fontWeight={`600`}
                    kindOf={!isOverseas && `basic`}
                    margin={`0 8px 0 0`}
                    onClick={() => isOverseasChangeHandler(false)}
                  >
                    국내
                  </CommonButton>
                  <CommonButton
                    width={width < 700 ? `90px` : `110px`}
                    height={width < 700 ? `38px` : `44px`}
                    fontSize={`20px`}
                    fontWeight={`600`}
                    kindOf={isOverseas && `basic`}
                    onClick={() => isOverseasChangeHandler(true)}
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
                    상품명
                  </Text>
                  <Text fontSize={width < 700 ? `28px` : `32px`}>
                    {lectureDetail && lectureDetail.subTitle}
                    {lectureDetail && isBuyBook === 1
                      ? ` + ${lectureDetail.bookTitle}`
                      : ``}
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`auto`}
                  dr={`row`}
                  fontSize={width < 700 ? `28px` : `32px`}
                >
                  {lectureDetail &&
                    (lectureDetail.subPrice > 0 ? (
                      <>
                        <SpanText
                          fontWeight={`700`}
                          color={Theme.basicTheme_C}
                          margin={`0 4px 0 0`}
                        >
                          {lectureDetail && lectureDetail.viewSubPrice}
                        </SpanText>
                        원
                      </>
                    ) : (
                      ""
                    ))}
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

                {isOverseas ? (
                  <Form.Item
                    label="배송지"
                    name="overAddress"
                    colon={false}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                    rules={[
                      {
                        required: isBuyBook === 1,
                        message: "배송지는 필수 입니다.",
                      },
                    ]}
                  >
                    <CustomSelect
                      onChange={overAddressChange}
                      placeholder="해외 배송지를 선택해주세요."
                      disabled={isBuyBook === 2}
                    >
                      {dataArr.map((data, idx) => {
                        return (
                          <Select.Option key={idx} value={data.id}>
                            {data.title} - {data.viewPrice}
                          </Select.Option>
                        );
                      })}
                    </CustomSelect>
                  </Form.Item>
                ) : (
                  <>
                    <Wrapper dr={`row`}>
                      <Form.Item
                        label="배송지"
                        name="zoneCode"
                        rules={[
                          { required: true, message: "배송지는 필수 입니다." },
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
                          value={addressData && addressData.zonecode}
                          readOnly={!isOverseas}
                        />
                        <CommonButton
                          width={`140px`}
                          height={`54px`}
                          fontSize={`21px`}
                          padding={`0`}
                          onClick={aModalToggle}
                        >
                          우편번호 검색
                        </CommonButton>
                      </Form.Item>
                    </Wrapper>

                    <Form.Item
                      name="address"
                      colon={false}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <TextInput
                        readOnly={!isOverseas}
                        width={`100%`}
                        height={`54px`}
                        radius={`5px`}
                        border={`1px solid ${Theme.lightGrey4_C}`}
                        fontSize={`18px`}
                        placeholder="-"
                        margin={`0 0 10px`}
                      />
                    </Form.Item>
                  </>
                )}

                {isOverseas ? (
                  isBuyBook === 1 && (
                    <Form.Item
                      name="detailAddress"
                      colon={false}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <TextInput
                        width={`100%`}
                        height={`54px`}
                        radius={`5px`}
                        border={`1px solid ${Theme.lightGrey4_C}`}
                        fontSize={`18px`}
                        placeholder={
                          isOverseas
                            ? "주소지를  입력해주세요"
                            : "상세주소를 입력해주세요."
                        }
                        margin={`0 0 10px`}
                      />
                    </Form.Item>
                  )
                ) : (
                  <Form.Item
                    name="detailAddress"
                    colon={false}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <TextInput
                      width={`100%`}
                      height={`54px`}
                      radius={`5px`}
                      border={`1px solid ${Theme.lightGrey4_C}`}
                      fontSize={`18px`}
                      placeholder={
                        isOverseas
                          ? "주소지를  입력해주세요"
                          : "상세주소를 입력해주세요."
                      }
                      margin={`0 0 10px`}
                    />
                  </Form.Item>
                )}
                {isOverseas && isBuyBook === 1 && (
                  <>
                    <Form.Item
                      name="detailAddress2"
                      colon={false}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <TextInput
                        width={`100%`}
                        height={`54px`}
                        radius={`5px`}
                        border={`1px solid ${Theme.lightGrey4_C}`}
                        fontSize={`18px`}
                        placeholder="주소지를 입력해주세요."
                        margin={`0 0 10px`}
                      />
                    </Form.Item>
                    <Form.Item
                      name="detailAddress3"
                      colon={false}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <TextInput
                        width={`100%`}
                        height={`54px`}
                        radius={`5px`}
                        border={`1px solid ${Theme.lightGrey4_C}`}
                        fontSize={`18px`}
                        placeholder="주소지를 입력해주세요."
                        margin={`0 0 10px`}
                      />
                    </Form.Item>
                  </>
                )}
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
                {/* 교재구매 */}
                {lectureDetail ? (
                  <>
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
                      margin={width < 700 ? `25px 0` : `25px 0 44px`}
                      height={`1px`}
                      bgColor={Theme.lightGrey4_C}
                    />
                    <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                      <Radio.Group
                        value={isBuyBook}
                        onChange={isBuyBookChangeHandler}
                        size="large"
                      >
                        {lectureDetail.isBookPay && (
                          <CustomRadio
                            value={1}
                            style={{
                              width: width < 700 ? `100%` : `auto`,
                              margin:
                                width < 700 ? `0 90px 20px 0` : `0 90px 0 0`,
                            }}
                          >
                            구매
                          </CustomRadio>
                        )}

                        {/* isBuyTypeChangeHandler */}
                        {lectureDetail.isBookNoPay && (
                          <CustomRadio
                            value={2}
                            style={{ width: width < 700 ? `100%` : `auto` }}
                          >
                            구매 안 함
                          </CustomRadio>
                        )}
                      </Radio.Group>
                    </Wrapper>

                    {isBuyBook === 1 ? (
                      lectureDetail &&
                      (!lectureDetail.bookEndDate ||
                      !lectureDetail.viewBookDiscountPrice ? (
                        <Wrapper dr={`row`} ju={`flex-start`}>
                          <Text
                            fontSize={width < 700 ? `16px` : `22px`}
                            color={Theme.grey3_C}
                            margin={`0 10px 0 0`}
                          >
                            {lectureDetail && lectureDetail.viewBookPrice}원이
                            추가 결제됩니다.
                          </Text>
                        </Wrapper>
                      ) : (
                        <Wrapper dr={`row`} ju={`flex-start`}>
                          <Text
                            textDecoration={"line-through"}
                            fontSize={width < 700 ? `16px` : `22px`}
                            color={Theme.grey3_C}
                          >
                            {lectureDetail && lectureDetail.viewBookPrice}원
                          </Text>
                          <CustomArrowRightOutlined />
                          <Text
                            fontSize={width < 700 ? `16px` : `22px`}
                            margin={`0 10px 0 0`}
                          >
                            {lectureDetail &&
                              lectureDetail.viewBookDiscountPrice}
                            원
                          </Text>
                          <Text
                            fontSize={width < 700 ? `16px` : `22px`}
                            color={Theme.grey3_C}
                          >
                            ( {lectureDetail && lectureDetail.bookEndDate} )
                          </Text>
                        </Wrapper>
                      ))
                    ) : (
                      <>
                        <Text
                          fontSize={width < 700 ? `14px` : `16px`}
                          color={Theme.grey2_C}
                        >
                          {lectureDetail && lectureDetail.bookNotEtc}
                        </Text>
                      </>
                    )}
                    <Wrapper
                      margin={width < 700 ? `25px 0 80px` : `30px 0 80px`}
                      height={`1px`}
                      bgColor={Theme.lightGrey4_C}
                    />
                  </>
                ) : (
                  ""
                )}
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
                    {isOverseas && (
                      <CustomRadio value={"paypal"}>PayPal(페이팔)</CustomRadio>
                    )}
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
                    width={
                      width < 700
                        ? `calc(100% / 3 - 12px)`
                        : `calc(100% / 3 - 30px)`
                    }
                    fontWeight={`600`}
                    color={Theme.grey2_C}
                  >
                    {lectureDetail &&
                      (lectureDetail.discountPrice
                        ? numberWithCommas(
                            lectureDetail.discountPrice +
                              (isBuyBook === 1 && overAddress
                                ? dataArr.find(
                                    (data) => data.id === overAddress
                                  ).price
                                : 0)
                          )
                        : numberWithCommas(
                            lectureDetail.price +
                              (isBuyBook === 1 && overAddress
                                ? dataArr.find(
                                    (data) => data.id === overAddress
                                  ).price
                                : 0)
                          ))}
                    원
                  </Wrapper>
                  <CustomPlusCircleOutlined />
                  <Wrapper
                    width={
                      width < 700
                        ? `calc(100% / 3 - 12px)`
                        : `calc(100% / 3 - 30px)`
                    }
                    fontWeight={`600`}
                    color={Theme.grey2_C}
                  >
                    {isBuyBook === 1
                      ? lectureDetail &&
                        (lectureDetail.bookEndDate
                          ? lectureDetail.viewBookDiscountPrice
                          : lectureDetail.viewBookPrice)
                      : 0}
                    원
                  </Wrapper>
                  <CustomPauseCircleOutlined />
                  <Wrapper
                    width={
                      width < 700
                        ? `calc(100% / 3 - 12px)`
                        : `calc(100% / 3 - 30px)`
                    }
                    fontWeight={`600`}
                    color={Theme.grey4_C}
                  >
                    {lectureDetail &&
                      numberWithCommas(
                        (lectureDetail.discountPrice
                          ? lectureDetail.discountPrice
                          : lectureDetail.price) +
                          (isBuyBook === 1 && overAddress
                            ? dataArr.find((data) => data.id === overAddress)
                                .price
                            : 0) +
                          (isBuyBook === 1
                            ? lectureDetail.bookEndDate
                              ? lectureDetail.bookDiscountPrice
                              : lectureDetail.bookPrice
                            : 0)
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
                  loading={st_boughtCreateLoading}
                >
                  결제하기
                </CommonButton>
              </BuyForm>

              {/* ADDRESS MODAL */}
              <Modal
                title="주소 검색"
                visible={aModal}
                onCancel={aModalToggle}
                footer={null}
              >
                <DaumPostcode
                  onComplete={(data) => {
                    setAddressData(data);
                    setAModal(false);
                    infoForm.setFieldsValue({
                      address: data.address,
                    });
                  }}
                  width={`100%`}
                  height={`450px`}
                  animation
                />
              </Modal>
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
