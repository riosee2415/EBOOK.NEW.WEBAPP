import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, ME_UPDATE_REQUEST } from "../../reducers/user";
import useInput from "../../hooks/useInput";
import ClientLayout from "../../components/ClientLayout";
import axios from "axios";
import wrapper from "../../store/configureStore";
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
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import { Form, message, Modal } from "antd";
import DaumPostcode from "react-daum-postcode";
import { useRouter } from "next/router";

const CustomForm = styled(Form)`
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  & .ant-form-item {
    width: 100%;
  }
`;

const Home = ({}) => {
  ////// GLOBAL STATE //////
  const { me, st_meUpdateLoading, st_meUpdateDone, st_meUpdateError } =
    useSelector((state) => state.user);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [uForm] = Form.useForm();

  const [aModal, setAModal] = useState(false);

  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (st_meUpdateDone) {
      message.success("내 정보가 수정되었습니다.");
      return router.push("/mypage");
    }

    if (st_meUpdateError) {
      return message.error(st_meUpdateError);
    }
  }, [st_meUpdateDone, st_meUpdateError]);

  useEffect(() => {
    if (!me) {
      message.error("로그인 후 이용해주세요.");
      return router.push("/user/login");
    } else {
      uForm.setFieldsValue({
        userId: me.userId,
        username: me.username,
        mobile: me.mobile,
        birth: me.birth,
        zoneCode: me.zoneCode,
        address: me.address,
        detailAddress: me.detailAddress,
      });
    }
  }, [me]);

  ////// TOGGLE //////

  // 주소 모달
  const aModalToggle = useCallback(() => {
    setAModal((prev) => !prev);
  }, [aModal]);

  // 회원 수정
  const meUpdateHandler = useCallback(
    (data) => {
      if (data.password && data.password !== data.rePassword) {
        return message.error("비밀번호가 같지 않습니다.");
      }

      dispatch({
        type: ME_UPDATE_REQUEST,
        data: {
          password: data.password,
          mobile: data.mobile,
          username: data.username,
          address: data.address,
          zoneCode: data.zoneCode,
          detailAddress: data.detailAddress,
        },
      });
    },
    [me]
  );
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>친절한 영어교실 | 내정보 수정</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper margin={`120px 0 100px`}>
            <Wrapper al={`flex-start`}>
              <Text fontSize={`36px`} fontWeight={`700`}>
                내 정보 수정
              </Text>
            </Wrapper>
            <Wrapper
              margin={`35px 0 80px`}
              height={`1px`}
              bgColor={Theme.lightGrey4_C}
            />
            <Wrapper padding={width < 1280 ? `0` : `0 210px`}>
              <CustomForm form={uForm} onFinish={meUpdateHandler}>
                <Text fontSize={`20px`}>아이디</Text>
                <Form.Item name="userId">
                  <TextInput
                    width={`100%`}
                    height={`54px`}
                    radius={`5px`}
                    border={`1px solid ${Theme.lightGrey4_C}`}
                    fontSize={`18px`}
                    placeholder="아이디를 입력해주세요."
                    margin={`0 0 10px`}
                    disabled
                  />
                </Form.Item>
                <Text fontSize={`20px`}>
                  <SpanText color={Theme.basicTheme_C}>*</SpanText>
                  비밀번호 확인
                </Text>
                <Form.Item name="password">
                  <TextInput
                    width={`100%`}
                    height={`54px`}
                    radius={`5px`}
                    border={`1px solid ${Theme.lightGrey4_C}`}
                    fontSize={`18px`}
                    placeholder="비밀번호를 입력해주세요."
                    margin={`0 0 10px`}
                    type="password"
                  />
                </Form.Item>
                <Form.Item name="rePassword">
                  <TextInput
                    width={`100%`}
                    height={`54px`}
                    radius={`5px`}
                    border={`1px solid ${Theme.lightGrey4_C}`}
                    fontSize={`18px`}
                    placeholder="비밀번호를 다시 입력해주세요."
                    margin={`0 0 10px`}
                    type="password"
                  />
                </Form.Item>
                <Text fontSize={`20px`}>
                  <SpanText color={Theme.basicTheme_C}>*</SpanText>
                  이름
                </Text>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: "이름은 필수 입니다." }]}
                >
                  <TextInput
                    width={`100%`}
                    height={`54px`}
                    radius={`5px`}
                    border={`1px solid ${Theme.lightGrey4_C}`}
                    fontSize={`18px`}
                    placeholder="이름을 입력해주세요."
                    margin={`0 0 10px`}
                  />
                </Form.Item>
                <Text fontSize={`20px`}>
                  <SpanText color={Theme.basicTheme_C}>*</SpanText>
                  연락처
                </Text>
                <Form.Item
                  name="mobile"
                  rules={[{ required: true, message: "연락처는 필수 입니다." }]}
                >
                  <TextInput
                    width={`100%`}
                    height={`54px`}
                    radius={`5px`}
                    border={`1px solid ${Theme.lightGrey4_C}`}
                    fontSize={`18px`}
                    placeholder="연락처를 입력해주세요."
                    margin={`0 0 10px`}
                  />
                </Form.Item>

                <Text fontSize={`20px`} margin={`0 0 12px`}>
                  성별
                </Text>

                <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 24px`}>
                  {me && me.gender === "여성" ? (
                    <CommonButton
                      width={`108px`}
                      height={`54px`}
                      radius={`100px`}
                      fontSize={`20px`}
                    >
                      여성
                    </CommonButton>
                  ) : (
                    <CommonButton
                      width={`108px`}
                      height={`54px`}
                      radius={`100px`}
                      fontSize={`20px`}
                    >
                      남성
                    </CommonButton>
                  )}
                </Wrapper>

                <Text fontSize={`20px`}>출생년도</Text>
                <Form.Item name="birth">
                  <TextInput
                    width={`100%`}
                    height={`54px`}
                    radius={`5px`}
                    border={`1px solid ${Theme.lightGrey4_C}`}
                    fontSize={`18px`}
                    placeholder="출생년도를 입력해주세요."
                    margin={`0 0 10px`}
                    disabled
                  />
                </Form.Item>

                <Text fontSize={`20px`} margin={`0 0 12px`}>
                  주소
                </Text>

                <Wrapper>
                  <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 7px`}>
                    <Wrapper width={`calc(100% - 146px)`}>
                      <Form.Item name="zoneCode" style={{ margin: `0 0 10px` }}>
                        <TextInput
                          width={`100%`}
                          height={`54px`}
                          radius={`5px`}
                          border={`1px solid ${Theme.lightGrey4_C}`}
                          fontSize={`18px`}
                          placeholder="주소를 검색해주세요."
                          readOnly
                        />
                      </Form.Item>
                    </Wrapper>
                    <CommonButton
                      width={`140px`}
                      height={`54px`}
                      margin={`0 0 10px`}
                      onClick={aModalToggle}
                    >
                      우편번호 검색
                    </CommonButton>

                    <Form.Item name="address" style={{ margin: `0 0 10px` }}>
                      <TextInput
                        width={`100%`}
                        height={`54px`}
                        radius={`5px`}
                        border={`1px solid ${Theme.lightGrey4_C}`}
                        fontSize={`18px`}
                        placeholder="주소를 검색해주세요."
                        readOnly
                      />
                    </Form.Item>

                    <Form.Item name="detailAddress">
                      <TextInput
                        width={`100%`}
                        height={`54px`}
                        radius={`5px`}
                        border={`1px solid ${Theme.lightGrey4_C}`}
                        fontSize={`18px`}
                        placeholder="상세주소를 입력해주세요."
                      />
                    </Form.Item>
                  </Wrapper>
                </Wrapper>

                <CommonButton
                  kindOf={`basic`}
                  width={`100%`}
                  height={`54px`}
                  fontSize={`20px`}
                  htmlType="submit"
                  loading={st_meUpdateLoading}
                >
                  정보수정
                </CommonButton>
              </CustomForm>

              {/* ADDRESS MODAL */}
              <Modal
                title="주소 검색"
                visible={aModal}
                onCancel={aModalToggle}
                footer={null}
              >
                <DaumPostcode
                  onComplete={(data) => {
                    uForm.setFieldsValue({
                      zoneCode: data.zonecode,
                      address: data.address,
                    });
                    setAModal(false);
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Home;
