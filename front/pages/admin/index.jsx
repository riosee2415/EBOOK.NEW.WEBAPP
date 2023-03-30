import React, { useEffect } from "react";
import { Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/AdminLayout";
import {
  Wrapper,
  Image,
  CommonButton,
} from "../../components/commonComponents";
import useInput from "../../hooks/useInput";
import { LOAD_MY_INFO_REQUEST, LOGIN_ADMIN_REQUEST } from "../../reducers/user";
import Theme from "../../components/Theme";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";

const AdminHome = () => {
  const dispatch = useDispatch();

  const {
    me,
    //
    st_loginAdminError,
  } = useSelector((state) => state.user);

  const inputId = useInput("");
  const inputPw = useInput("");

  const onLoginHandler = () => {
    dispatch({
      type: LOGIN_ADMIN_REQUEST,
      data: { userId: inputId.value, password: inputPw.value },
    });
  };

  useEffect(() => {
    if (st_loginAdminError) {
      return message.error(
        st_loginAdminError.reason
          ? st_loginAdminError.reason
          : "로그인을 실패하였습니다."
      );
    }
  }, [st_loginAdminError]);

  return (
    <>
      {me && me.level > 3 ? (
        <AdminLayout>dddd</AdminLayout>
      ) : (
        <>
          <Wrapper dr={`row`} height={`100vh`}>
            <Wrapper
              width={`50%`}
              height={`100%`}
              bgImg={`url("https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/4leaf%2F5137894.jpg?alt=media&token=99858357-4602-44aa-b32a-e6c9867788ff")`}
            >
              <Image
                width={`300px`}
                alt="logo"
                src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/4leaf%2Flogo%2F4leafsoftware_logo_LW.png?alt=media&token=bc68284c-e82a-42ee-b4c4-a95e0ebc699e`}
              />
              <Wrapper
                color={Theme.white_C}
                margin={`15px 0 0`}
                fontSize={`1.1rem`}
              >
                관리자페이지에 오신걸 환영합니다.
              </Wrapper>
            </Wrapper>
            <Wrapper width={`50%`}>
              <Wrapper width={`50%`}>
                <Wrapper
                  fontSize={`2rem`}
                  fontWeight={`bold`}
                  margin={`0 0 30px`}
                  al={`flex-start`}
                >
                  Log in
                </Wrapper>
                <Wrapper al={`flex-start`}>아이디</Wrapper>
                <Wrapper>
                  <Input
                    {...inputId}
                    onKeyDown={(e) => e.keyCode === 13 && onLoginHandler()}
                  />
                </Wrapper>
                <Wrapper al={`flex-start`} margin={`15px 0 0`}>
                  비밀번호
                </Wrapper>
                <Wrapper margin={`0 0 15px`}>
                  <Input
                    {...inputPw}
                    type={`password`}
                    onKeyDown={(e) => e.keyCode === 13 && onLoginHandler()}
                  />
                </Wrapper>
                <CommonButton width={`100%`} onClick={onLoginHandler}>
                  로그인
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </>
      )}
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

export default AdminHome;
