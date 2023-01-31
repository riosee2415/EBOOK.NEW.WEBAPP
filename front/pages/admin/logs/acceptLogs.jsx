import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { Tabs, Popover, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { ACCEPT_LOG_REQUEST } from "../../../reducers/accept";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import { items } from "../../../components/AdminLayout";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  HomeText,
  Text,
  GuideUl,
  OtherMenu,
  GuideLi,
  Wrapper,
  PopWrapper,
} from "../../../components/commonComponents";
import Theme from "../../../components/Theme";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import useWidth from "../../../hooks/useWidth";

const { TabPane } = Tabs;

const TabWrapper = styled(Wrapper)`
  width: 1800px;

  @media (max-width: 1850px) {
    width: 1700px;
  }

  @media (max-width: 1750px) {
    width: 1600px;
  }

  @media (max-width: 1650px) {
    width: 1500px;
  }

  @media (max-width: 1550px) {
    width: 1400px;
  }
`;

const CustomChart = styled(Chart)`
  width: 1800px;

  @media (max-width: 1850px) {
    width: 1700px;
  }

  @media (max-width: 1750px) {
    width: 1600px;
  }

  @media (max-width: 1650px) {
    width: 1500px;
  }

  @media (max-width: 1550px) {
    width: 1400px;
  }
`;

const AcceptLogs = () => {
  ////// HOOKS //////

  const { me, st_loadMyInfoDone } = useSelector((state) => state.user);
  const { acceptList } = useSelector((state) => state.accept);

  const width = useWidth();
  const router = useRouter();

  const [dataList, setDataList] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const [chartConfig, setChartConfig] = useState(null);
  const [sameDepth, setSameDepth] = useState([]);
  const [level1, setLevel1] = useState("통계관리");
  const [level2, setLevel2] = useState("");

  const content = (
    <PopWrapper>
      {sameDepth.map((data) => {
        if (data.name === level2) return;
        if (!data.useYn) return;

        return (
          <OtherMenu key={data.link} onClick={() => moveLinkHandler(data.link)}>
            {data.name}
          </OtherMenu>
        );
      })}
    </PopWrapper>
  );

  ////// USEEFFECT //////

  useEffect(() => {
    const currentMenus = items[level1];

    setSameDepth(currentMenus);

    currentMenus.map((data) => {
      if (data.link === router.pathname) {
        setLevel2(data.name);
      }
    });
  }, []);

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight1)) {
        message.error("접근권한이 없는 페이지 입니다.");
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);

  useEffect(() => {
    if (acceptList) {
      setDataList(acceptList.map((data) => data.count));
      setCategoryList(acceptList.map((data) => data.date));
    }
  }, [acceptList]);

  useEffect(() => {
    if (dataList && categoryList) {
      setChartConfig({
        series: [
          {
            name: "AcceptLogs",
            data: dataList,
          },
        ],
        options: {
          chart: {
            type: "line",
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: "Accpet Logs",
            align: "left",
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: categoryList,
          },
        },
      });
    }
  }, [dataList, categoryList]);

  ////// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  return (
    <>
      <AdminLayout>
        {/* MENU TAB */}
        <Wrapper
          height={`30px`}
          bgColor={Theme.lightGrey_C}
          dr={`row`}
          ju={`flex-start`}
          al={`center`}
          padding={`0px 15px`}
          color={Theme.grey_C}
        >
          <HomeText
            margin={`3px 20px 0px 20px`}
            onClick={() => moveLinkHandler("/admin")}
          >
            <HomeOutlined style={{ fontSize: "15px", marginRight: "5px" }} />
            메인
          </HomeText>
          <RightOutlined />
          <Text margin={`3px 20px 0px 20px`}>{level1} </Text>
          <RightOutlined />
          <Popover content={content}>
            <HomeText cur={true} margin={`3px 20px 0px 20px`}>
              {level2}
            </HomeText>
          </Popover>
        </Wrapper>

        {/* GUIDE */}
        <Wrapper margin={`10px 0px 0px 10px`}>
          <GuideUl>
            <GuideLi isImpo={true}>
              해당 메뉴에서 홈페이지에 접속하 회원의 통계를 확인 할 수 있습니다.
            </GuideLi>
            <GuideLi isImpo={true}>
              30일 이전의 통계를 원하실 시 개발사에 문의해주세요.
            </GuideLi>
          </GuideUl>
        </Wrapper>

        <Wrapper padding="0px 20px">
          <TabWrapper al={`flex-start`}>
            <Tabs type="card">
              <TabPane tab="최근 30일" key="1"></TabPane>
            </Tabs>
          </TabWrapper>
          {me && me.menuRight1 && chartConfig ? (
            <CustomChart
              options={chartConfig.options}
              series={chartConfig.series}
              type="line"
              height="550"
            />
          ) : (
            <LoadingOutlined spin />
          )}
        </Wrapper>
      </AdminLayout>
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
      type: ACCEPT_LOG_REQUEST,
      data: { typeId: "2" },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default AcceptLogs;
