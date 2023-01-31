import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Table, DatePicker } from "antd";
import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  Wrapper,
  Text,
  HomeText,
  PopWrapper,
  OtherMenu,
  GuideUl,
  GuideLi,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import { KAKAOCH_HISTORY_REQUEST } from "../../../reducers/company";

const Kakaoch = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const { kakaochHistory } = useSelector((state) => state.company);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("기록관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const [datePick, setDatePick] = useState("");

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

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

  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight7)) {
        message.error("접근권한이 없는 페이지 입니다.");
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);

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
    dispatch({
      type: KAKAOCH_HISTORY_REQUEST,
      data: {
        datePick,
      },
    });
  }, [datePick]);

  ////// HANDLER //////
  const dateChange = useCallback(
    (date, dateString) => {
      setDatePick(dateString);
    },
    [datePick]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////
  const col = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "유형",
      dataIndex: "content",
    },
    {
      title: "작업자",
      dataIndex: "username",
    },
    {
      title: "이력 발생일",
      dataIndex: "createdAt",
    },
  ];

  return (
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
        // shadow={`2px 2px 6px  ${Theme.adminTheme_2}`}
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
          <HomeText margin={`3px 20px 0px 20px`}>{level2} </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>카카오톡 채널톡 변경이력을 확인할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            전체조회가 기본이지만, 특정날짜를 선택하여 조회할 수 있습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper
        al={`flex-start`}
        margin={`0px 0px 10px 0px`}
        padding={`0px 50px`}
      >
        <DatePicker onChange={dateChange} />
      </Wrapper>

      <Wrapper padding={`0px 50px`}>
        <Table
          style={{ width: "100%" }}
          rowKey="id"
          columns={col}
          dataSource={kakaochHistory ? kakaochHistory : []}
          size="small"
        />
      </Wrapper>
    </AdminLayout>
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
      type: KAKAOCH_HISTORY_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Kakaoch);
