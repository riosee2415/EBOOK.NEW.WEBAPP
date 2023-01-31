import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Table, Button } from "antd";
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
import { GALLERY_LIST_REQUEST } from "../../../reducers/gallery";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined, EyeOutlined } from "@ant-design/icons";

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.subTheme5_C : props.theme.lightGrey_C};
`;

const Logo = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const { gallerys } = useSelector((state) => state.gallery);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("게시판관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

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

      if (!(me && me.menuRight4)) {
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

  ////// HANDLER //////

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const leftCol = [
    {
      title: "번호",
      dataIndex: "id",
      width: "10%",
    },
    {
      title: "제목",
      dataIndex: "title",
    },
    {
      title: "상태",
      render: () => <ViewStatusIcon />,
      width: "10%",
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
          <HomeText cur={true} margin={`3px 20px 0px 20px`}>
            {level2}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>겔러리 게시판의 게시글을 관리할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            썸네일은 1:1비율로 업로드해주세요. 이미지비율이 상이할 경우 화면에
            비정상적으로 보일 수 있습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* CONTENT */}

      <Wrapper padding="0px 20px" dr="row">
        <Wrapper
          width="calc(30% - 10px)"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
          margin="5px"
        >
          <Table
            size="small"
            columns={leftCol}
            style={{ width: "100%" }}
            rowKey="id"
            dataSource={gallerys}
          />
        </Wrapper>
        <Wrapper
          width="calc(70% - 10px)"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
          margin="5px"
        >
          zxzcvzxcvzv
        </Wrapper>
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
      type: GALLERY_LIST_REQUEST,
      data: {
        searchTitle: "",
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Logo);
