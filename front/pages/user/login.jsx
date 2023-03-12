import React, { useCallback, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { Input, Button, Form, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import useInput from "../../hooks/useInput";
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
        <title></title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper maxWidth={`420px`} margin={`120px 0`}>
              <Text fontSize={`36px`} fontWeight={`700`} margin={`0 0 40px`}>
                로그인
              </Text>
              <LoginForm layout="inline" onFinish={loginHandler}>
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
                  <CommonButton
                    width={`100%`}
                    height={`54px`}
                    fontSize={`20px`}
                    fontWeight={`600`}
                    kindOf={`gray`}
                  >
                    아이디 / 비밀번호 찾기
                  </CommonButton>
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
