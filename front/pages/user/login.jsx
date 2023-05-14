import React, { useCallback, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { Input, Button, Form, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_REQUEST, SIGNUP_REQUEST } from "../../reducers/user";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
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

const LoginFormWrapper = styled(Wrapper)`
  flex-direction: row;
  align-items: normal;
  margin: 5px 0 20px;
  height: 45px;
  border-radius: 5px;
`;

const LoginIconWrapper = styled(Wrapper)`
  width: 50px;
  height: 100%;
  font-size: 20px;
  background: #f2f2f2;
`;

const LoginInputWrapper = styled(Wrapper)`
  width: calc(100% - 50px);
`;

const LoginInput = styled(TextInput)`
  width: 100%;
  height: 45px;
  padding: 0 10px;
  letter-spacing: 0.5px;
  border: 1px solid #dedede;
`;

const LoginForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    width: 100%;
  }
`;

const Login = () => {
  ////// GLOBAL STATE //////
  const { st_loginLoading, st_loginDone, st_loginError } = useSelector(
    (state) => state.user
  );
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();
  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (st_loginDone) {
      router.push("/");
      return message.success("로그인되었습니다.");
    }

    if (st_loginError) {
      return message.error(st_loginError);
    }
  }, [st_loginDone, st_loginError]);

  ////// TOGGLE //////
  ////// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const loginHandler = useCallback((data) => {
    dispatch({
      type: LOGIN_REQUEST,
      data: {
        userId: data.userId,
        password: data.password,
      },
    });
  }, []);
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>친절한 영어교실 | 로그인</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper
              maxWidth={`420px`}
              margin={width < 700 ? `80px 0` : `120px 0`}
            >
              <Text
                fontSize={width < 700 ? `30px` : `36px`}
                fontWeight={`800`}
                margin={`0 0 40px`}
              >
                LOG IN
              </Text>
              <LoginForm layout="inline" onFinish={loginHandler}>
                {/* <Wrapper dr={`row`} al={`flex-start`}>
                  <Wrapper
                    width={`80px`}
                    height={`52px`}
                    fontSize={`20px`}
                    bgColor={Theme.grey2_C}
                  >
                    <UserOutlined />
                  </Wrapper>
                  <Form.Item
                    name="userId"
                    rules={[
                      { required: true, message: "아이디를 입력해주세요." },
                    ]}
                  >
                    <TextInput
                      width={`100%`}
                      height={`54px`}
                      radius={`5px`}
                      border={`1px solid ${Theme.lightGrey4_C}`}
                      fontSize={`18px`}
                      placeholder="아이디를 입력해주세요."
                      margin={`0 0 10px`}
                    />
                  </Form.Item>
                </Wrapper>
                <Wrapper dr={`row`} al={`flex-start`}>
                  <Wrapper
                    width={`80px`}
                    height={`52px`}
                    fontSize={`20px`}
                    bgColor={Theme.grey2_C}
                  >
                    <LockOutlined />
                  </Wrapper>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "비밀번호를 입력해주세요." },
                    ]}
                  >
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
                </Wrapper> */}

                <LoginFormWrapper>
                  <LoginIconWrapper>
                    <UserOutlined />
                  </LoginIconWrapper>

                  <LoginInputWrapper>
                    <Form.Item
                      name="userId"
                      rules={[
                        { required: true, message: "아이디를 입력해주세요." },
                      ]}
                    >
                      <LoginInput placeholder="아이디를 입력해주세요." />
                    </Form.Item>
                  </LoginInputWrapper>
                </LoginFormWrapper>

                <LoginFormWrapper>
                  <LoginIconWrapper>
                    <LockOutlined />
                  </LoginIconWrapper>

                  <LoginInputWrapper>
                    <Form.Item
                      name="password"
                      rules={[
                        { required: true, message: "비밀번호를 입력해주세요." },
                      ]}
                    >
                      <LoginInput
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                      />
                    </Form.Item>
                  </LoginInputWrapper>
                </LoginFormWrapper>

                <Wrapper>
                  <CommonButton
                    width={`100%`}
                    height={`54px`}
                    fontSize={`20px`}
                    fontWeight={`600`}
                    kindOf={`basic`}
                    margin={`0 0 10px`}
                    htmlType="submit"
                    loading={st_loginLoading}
                  >
                    로그인
                  </CommonButton>
                  <CommonButton
                    width={`100%`}
                    height={`54px`}
                    fontSize={`20px`}
                    fontWeight={`600`}
                    margin={`0 0 10px`}
                    onClick={() => moveLinkHandler("/user/signup")}
                  >
                    회원가입
                  </CommonButton>
                  {/* <CommonButton
                    width={`100%`}
                    height={`54px`}
                    fontSize={`20px`}
                    fontWeight={`600`}
                    kindOf={`gray`}
                    onClick={() => moveLinkHandler("/user/find")}
                  >
                    아이디 / 비밀번호 찾기
                  </CommonButton> */}
                </Wrapper>
              </LoginForm>
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

export default Login;
