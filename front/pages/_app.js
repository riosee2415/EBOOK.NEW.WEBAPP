import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { ThemeProvider } from "styled-components";
import Theme from "../components/Theme";
import GlobalStyles from "../components/GlobalStyles";
import WidthProvider from "../components/WidthProvider";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { ACCEPT_LOG_CREATE_REQUEST } from "../reducers/accept";
import wrapper from "../store/configureStore";
import { LOGIN_REQUEST } from "../reducers/user";

const Fourleaf = ({ Component }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const getIpClient = useCallback(async () => {
    const isCheck = sessionStorage.getItem("QSIDSPDSDQDAQSTEFA");

    if (!isCheck && router.pathname.indexOf("admin") === -1) {
      try {
        const ipData = await fetch("https://geolocation-db.com/json/");
        const locationIp = await ipData.json();

        sessionStorage.setItem(
          "QSIDSPDSDQDAQSTEFA",
          "ISDGSAWDCASDHERGEKIJCSDMK"
        );

        dispatch({
          type: ACCEPT_LOG_CREATE_REQUEST,
          data: {
            ip: locationIp.IPv4,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    let localData = localStorage.getItem("ebook_login")
      ? JSON.parse(localStorage.getItem("ebook_login"))
      : null;

    if (localData) {
      dispatch({
        type: LOGIN_REQUEST,
        data: {
          userId: localData.userId,
          password: localData.password,
        },
      });
    }
  }, []);

  useEffect(() => {
    getIpClient();
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Head>
        <title>[[**4LEAF GEAR SAMPLE**]] | administrator</title>

        <meta name="author" content="4LEAF SOFTWARE <4leaf.ysh@gmail.com>" />
        {/* <!-- OG tag  --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://friendlyuni2.com" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image" content="./og_img.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="canonical" href="https://friendlyuni2.com" />

        <meta name="keywords" content="친절한 영어교실" />
        <meta property="og:keywords" content="친절한 영어교실" />

        <meta
          property="og:description"
          content="유튜브 100만 구독자가 선택한 최고의 수업 영어 신생아를 위한 가장 쉽고 친절한 영어수업"
        />
        <meta
          name="description"
          content="유튜브 100만 구독자가 선택한 최고의 수업 영어 신생아를 위한 가장 쉽고 친절한 영어수업"
        />
        {/* 프리텐다드 폰트 */}
        <link
          href="https://webfontworld.github.io/pretendard/Pretendard.css"
          rel="stylesheet"
        />

        {/* 아임포트 */}
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>

        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.1.8.js"
        ></script>
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
        />

        <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.5/xlsx.full.min.js"></script>
        <script type="text/javascript" src="../customScript.js"></script>
      </Head>
      <Component />
    </ThemeProvider>
  );
};
Fourleaf.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Fourleaf);
