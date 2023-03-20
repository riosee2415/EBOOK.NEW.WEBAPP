import React, { useCallback, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { Input, Button, Form, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGIN_REQUEST,
  MODIFYPASS_CHECKED_REQUEST,
  MODIFYPASS_SEND_REQUEST,
  MODIFYPASS_UPDATE_REQUEST,
  SIGNUP_REQUEST,
} from "../../reducers/user";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import {
  LOAD_MY_INFO_REQUEST,
  USER_FIND_USERID_REQUEST,
} from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import {
  CommonButton,
  RsWrapper,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import styled from "styled-components";
import Theme from "../../components/Theme";
import useWidth from "../../hooks/useWidth";

const CustomInput = styled(TextInput)`
  width: 100%;
  height: 54px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.lightGrey4_C};
  font-size: 18px;
  margin: 0 0 10px;
`;

const CustomTitle = styled(Text)`
  font-size: 36px;
  font-weight: 700;

  @media (max-width: 1100px) {
    font-size: 30px;
  }
`;

const CustomSubTitle = styled(Text)`
  font-size: 16px;
  color: ${(props) => props.theme.grey4_C};
  margin: 10px 0 40px;

  @media (max-width: 1100px) {
    font-size: 16px;
  }
`;

const CustomForm = styled(Form)`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .ant-form-item {
    width: 100%;
  }
`;

const Find = () => {
  ////// GLOBAL STATE //////
  const {
    findUserId,
    //
    st_userFindUserIdLoading,
    st_userFindUserIdDone,
    st_userFindUserIdError,
    //
    st_modifyPassSendLoading,
    st_modifyPassSendDone,
    st_modifyPassSendError,
    //
    st_modifyPassCheckedLoading,
    st_modifyPassCheckedDone,
    st_modifyPassCheckedError,
    //
    st_modifyPassUpdateLoading,
    st_modifyPassUpdateDone,
    st_modifyPassUpdateError,
  } = useSelector((state) => state.user);
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [idForm] = Form.useForm();
  const [pwForm] = Form.useForm();

  const [currentTab, setCurrentTab] = useState(1);

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_userFindUserIdDone) {
      if (findUserId) {
        setCurrentTab(2);
        return message.success("아이디를 찾았습니다.");
      } else {
        return message.error("아이디를 찾지 못했습니다.");
      }
    }

    if (st_userFindUserIdError) {
      return message.error("아이디를 찾지 못했습니다.");
    }
  }, [st_userFindUserIdDone, st_userFindUserIdError, findUserId]);

  useEffect(() => {
    if (st_modifyPassSendDone) {
      setCurrentTab(3);
      return;
    }

    if (st_modifyPassSendError) {
      return message.error(st_modifyPassSendError);
    }
  }, [st_modifyPassSendDone, st_modifyPassSendError]);

  useEffect(() => {
    if (st_modifyPassCheckedDone) {
      setCurrentTab(4);
      return message.success("인증번호가 인증되었습니다.");
      return;
    }

    if (st_modifyPassCheckedError) {
      return message.error(st_modifyPassCheckedError);
    }
  }, [st_modifyPassCheckedDone, st_modifyPassCheckedError]);

  useEffect(() => {
    if (st_modifyPassUpdateDone) {
      router.push("/user/login");
      return message.success("비밀번호가 변경되었습니다.");
    }

    if (st_modifyPassUpdateError) {
      return message.error(st_modifyPassUpdateError);
    }
  }, [st_modifyPassUpdateDone, st_modifyPassUpdateError]);
  ////// TOGGLE //////
  ////// HANDLER //////
  const findUserIdHandler = useCallback((data) => {
    dispatch({
      type: USER_FIND_USERID_REQUEST,
      data: {
        username: data.username,
        mobile: data.mobile,
      },
    });
  }, []);

  const tabChangeHadnler = useCallback((tab) => {
    setCurrentTab(tab);
    idForm.resetFields();
    pwForm.resetFields();
  }, []);

  const findPwHandler = useCallback((data) => {
    dispatch({
      type: MODIFYPASS_SEND_REQUEST,
      data: {
        mobile: data.mobile,
        email: data.email,
      },
    });
  }, []);

  const findCheckedHandler = useCallback((data) => {
    dispatch({
      type: MODIFYPASS_CHECKED_REQUEST,
      data: {
        mobile: data.mobile,
        email: data.email,
        secret: data.checkCode,
      },
    });
  }, []);

  const modifyPasswordHandler = useCallback((data) => {
    if (data.password !== data.rePassword) {
      return message.error("비밀번호가 일치하지 않습니다.");
    }

    dispatch({
      type: MODIFYPASS_UPDATE_REQUEST,
      data: {
        email: data.email,
        mobile: data.mobile,
        secret: data.checkCode,
        password: data.password,
      },
    });
  }, []);

  return (
    <>
      <Head>
        <title>친절한 영어교실 | 아이디 / 비밀번호</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            {currentTab === 1 && (
              <Wrapper margin={`120px 0`} dr={`row`} ju={`space-between`}>
                <Wrapper
                  padding={width < 1100 ? `30px 15px` : `80px 60px`}
                  width={width < 1100 ? `100%` : `calc(100% / 2 - 35px)`}
                  border={`1px solid ${Theme.lightGrey4_C}`}
                  radius={`10px`}
                  margin={width < 1100 && `0 0 20px`}
                >
                  <CustomForm onFinish={findUserIdHandler} form={idForm}>
                    <CustomTitle>아이디 찾기</CustomTitle>
                    <CustomSubTitle>
                      회원가입 시 입력하신 정보로 확인할 수 있습니다.
                    </CustomSubTitle>
                    <Form.Item name="username">
                      <CustomInput placeholder="이름" />
                    </Form.Item>
                    <Form.Item name="mobile">
                      <CustomInput placeholder="연락처" type="number" />
                    </Form.Item>
                    <CommonButton
                      width={`100%`}
                      height={`54px`}
                      fontSize={`20px`}
                      fontWeight={`600`}
                      kindOf={`basic`}
                      htmlType="submit"
                      loading={st_userFindUserIdLoading}
                    >
                      아이디 찾기
                    </CommonButton>
                  </CustomForm>
                </Wrapper>
                <Wrapper
                  padding={width < 1100 ? `20px 10px` : `80px 60px`}
                  width={width < 1100 ? `100%` : `calc(100% / 2 - 35px)`}
                  border={`1px solid ${Theme.lightGrey4_C}`}
                  radius={`10px`}
                >
                  <CustomForm form={pwForm} onFinish={findPwHandler}>
                    <CustomTitle>비밀번호 찾기</CustomTitle>
                    <CustomSubTitle>
                      회원가입 시 입력하신 정보로 확인할 수 있습니다.
                    </CustomSubTitle>
                    <Form.Item name="mobile">
                      <CustomInput placeholder="연락처" type="number" />
                    </Form.Item>
                    <Form.Item name="email">
                      <CustomInput placeholder="이메일" type="email" />
                    </Form.Item>
                    <CommonButton
                      width={`100%`}
                      height={`54px`}
                      fontSize={`20px`}
                      fontWeight={`600`}
                      kindOf={`basic`}
                      htmlType="submit"
                      loading={st_modifyPassSendLoading}
                    >
                      비밀번호 찾기
                    </CommonButton>
                  </CustomForm>
                </Wrapper>
              </Wrapper>
            )}
            {/* findUserId */}
            {currentTab === 2 && (
              <Wrapper margin={`120px 0`} dr={`row`}>
                <Wrapper
                  padding={width < 1100 ? `30px 15px` : `80px 60px`}
                  width={width < 1100 ? `100%` : `calc(100% / 2 - 35px)`}
                  border={`1px solid ${Theme.lightGrey4_C}`}
                  radius={`10px`}
                  margin={width < 1100 && `0 0 20px`}
                >
                  <CustomTitle>아이디 찾기</CustomTitle>
                  <Text margin={`30px 0 20px`} fontSize={`18px`}>
                    아이디: {findUserId.replace(/.{3}$/, "***")}
                  </Text>

                  <Wrapper width={`100%`} dr={`row`} ju={`space-between`}>
                    <CommonButton
                      width={`calc(100% / 2 - 5px)`}
                      height={`54px`}
                      fontSize={`20px`}
                      fontWeight={`600`}
                      kindOf={`basic`}
                      onClick={() => tabChangeHadnler(1)}
                    >
                      비밀번호 찾기
                    </CommonButton>

                    <CommonButton
                      width={`calc(100% / 2 - 5px)`}
                      height={`54px`}
                      fontSize={`20px`}
                      fontWeight={`600`}
                    >
                      로그인
                    </CommonButton>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            )}

            {(currentTab === 2 || currentTab === 3 || currentTab === 4) && (
              <Wrapper margin={`120px 0`} dr={`row`}>
                <Wrapper
                  padding={width < 1100 ? `20px 10px` : `80px 60px`}
                  width={width < 1100 ? `100%` : `calc(100% / 2 - 35px)`}
                  border={`1px solid ${Theme.lightGrey4_C}`}
                  radius={`10px`}
                >
                  <CustomForm
                    form={pwForm}
                    onFinish={
                      currentTab === 3
                        ? findCheckedHandler
                        : currentTab === 4
                        ? modifyPasswordHandler
                        : findPwHandler
                    }
                  >
                    <CustomTitle>비밀번호 찾기</CustomTitle>
                    <CustomSubTitle>
                      회원가입 시 입력하신 정보로 확인할 수 있습니다.
                    </CustomSubTitle>
                    <Form.Item
                      name="mobile"
                      rules={[
                        { required: true, message: "연락처를 입력해주세요." },
                      ]}
                    >
                      <CustomInput
                        placeholder="연락처"
                        type="number"
                        readOnly={currentTab >= 3}
                      />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: "이메일을 입력해주세요." },
                      ]}
                    >
                      <CustomInput
                        placeholder="이메일"
                        type="email"
                        readOnly={currentTab >= 3}
                      />
                    </Form.Item>
                    {currentTab >= 3 && (
                      <Form.Item
                        name="checkCode"
                        rules={[
                          {
                            required: true,
                            message: "인증번호를 입력해주세요.",
                          },
                        ]}
                        readOnly={currentTab >= 4}
                      >
                        <CustomInput placeholder="인증번호" />
                      </Form.Item>
                    )}
                    {currentTab >= 4 && (
                      <>
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "비밀번호를 입력해주세요.",
                            },
                          ]}
                        >
                          <CustomInput placeholder="변경할 비밀번호" />
                        </Form.Item>
                        <Form.Item
                          name="rePassword"
                          rules={[
                            {
                              required: true,
                              message: "비밀번호를 재 입력해주세요.",
                            },
                          ]}
                        >
                          <CustomInput placeholder="변경할 비밀번호 재입력" />
                        </Form.Item>
                      </>
                    )}
                    <CommonButton
                      width={`100%`}
                      height={`54px`}
                      fontSize={`20px`}
                      fontWeight={`600`}
                      kindOf={`basic`}
                      htmlType="submit"
                      loading={
                        st_modifyPassSendLoading ||
                        st_modifyPassCheckedLoading ||
                        st_modifyPassUpdateLoading
                      }
                    >
                      {currentTab === 3
                        ? "인증번호 인증"
                        : currentTab === 4
                        ? "비밀번호 변경"
                        : "비밀번호 찾기"}
                    </CommonButton>
                  </CustomForm>
                </Wrapper>
              </Wrapper>
            )}
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

export default Find;
