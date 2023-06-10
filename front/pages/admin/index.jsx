import React, { useCallback, useEffect, useState } from "react";
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

// import { CSVLink } from "react-csv";

const AdminHome = () => {
  const dispatch = useDispatch();

  const {
    me,
    //
    st_loginAdminError,
  } = useSelector((state) => state.user);

  const inputId = useInput("");
  const inputPw = useInput("");

  // const [xlsxData, setXlsxData] = useState(null);

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

  // const readXlsxHandler = useCallback((e) => {
  //   let input = e.target;
  //   let reader = new FileReader();

  //   reader.onload = function () {
  //     let data = reader.result;
  //     let workBook = XLSX.read(data, { type: "binary" });
  //     workBook.SheetNames.forEach(function (sheetName) {
  //       console.log("SheetName: " + sheetName);
  //       let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
  //       let testArr = [];

  //       rows.map((data) =>
  //         JSON.parse(data.enjoyMedia).map((value) =>
  //           testArr.push({
  //             previousUserId: data._id,
  //             previousMediaId: value.$oid,
  //           })
  //         )
  //       );
  //       console.log(testArr);

  //       setXlsxData(testArr);
  //     });
  //   };

  //   reader.readAsBinaryString(input.files[0]);
  // }, []);

  // const headers = [
  //   { label: "previousUserId", key: "previousUserId" },
  //   { label: "previousMediaId", key: "previousMediaId" },
  // ];

  return (
    <>
      {me && me.level > 3 ? (
        <AdminLayout>dddd</AdminLayout>
      ) : (
        <>
          <Wrapper dr={`row`} height={`100vh`}>
            {/* <input type="file" onChange={readXlsxHandler} />
            {xlsxData && (
              <CSVLink filename={`수강기록`} headers={headers} data={xlsxData}>
                test
              </CSVLink>
            )} */}
            <Wrapper
              width={`50%`}
              height={`100%`}
              bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/original/5137894.jpg")`}
            >
              <Image
                width={`300px`}
                alt="logo"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/original/4leafsoftware_logo_LW.png`}
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
