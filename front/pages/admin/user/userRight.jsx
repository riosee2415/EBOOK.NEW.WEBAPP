import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  Table,
  Modal,
  Button,
  Input,
  Drawer,
  Form,
  message,
} from "antd";
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
  SearchForm,
  SearchFormItem,
  SpanText,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  HomeOutlined,
  RightOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {
  ADMINUSERLIST_REQUEST,
  MENURIGHT_UPDATE_REQUEST,
} from "../../../reducers/user";

const BoxText = styled.div`
  min-width: 80%;
  font-size: 17px;
`;

const NewText = styled.span`
  background-color: ${Theme.lightRed_C};
  margin-left: 5px;
  font-size: 10px;
  padding: 3px;
  color: ${Theme.white_C};
  border-radius: 20%;
`;

const CustomModal = styled(Modal)`
  & .ant-modal-header {
    background-color: ${Theme.subTheme6_C};
  }

  & .ant-modal-title,
  & .ant-modal-close-x {
    color: ${Theme.white_C};
  }
`;

const BoxIcon = styled(Wrapper)`
  width: 24px;
  height: 24px;
  background: ${(props) => props.theme.grey2_C};
  border-radius: 100%;
  color: ${(props) => props.theme.lightGrey_C2};
  font-size: 13px;
`;

const HeadButton = styled.div`
  background-color: ${(props) => props.theme.lightGrey_C};
  color: ${(props) => props.theme.black_C};

  cursor: pointer;
  width: 150px;
  height: 50px;
  border-radius: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 15px;

  margin: 10px;

  transition: 0.6s;

  background-color: ${(props) => props.isChecked && props.theme.subTheme_C};
  color: ${(props) => props.isChecked && props.theme.white_C};

  ${(props) =>
    props.isChecked &&
    `
    & ${BoxIcon} {
      color: ${Theme.subTheme_C};
      background: ${Theme.white_C};
    }

  `};

  &:hover {
    background-color: ${(props) => props.theme.subTheme_C};
    color: ${(props) => props.theme.white_C};

    & ${BoxIcon} {
      color: ${Theme.subTheme_C};
      background: ${Theme.white_C};
    }
  }
`;

const CustomCloseBtn = styled(CloseOutlined)`
  color: ${(props) => props.theme.grey_C};
  font-size: 16px;
  margin-right: 10px;
  cursor: pointer;
  padding: 3px;

  transition: 0.45s;

  &:hover {
    color: ${(props) => props.theme.red_C};
  }
`;

const PointText = styled.div`
  color: ${(props) => props.theme.adminTheme_4};
`;

const NameView = styled.div`
  font-weight: 700;
  color: ${(props) => props.theme.subTheme5_C};

  cursor: pointer;
  transition: 0.4s;

  &:hover {
    color: ${(props) => props.theme.subTheme_C};
  }
`;

const DrawerTitle = styled.article`
  font-size: 22px;
  margin-bottom: 35px;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #ddd;
`;

const UserRight = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);

  const [userInfo, setUserInfo] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const { users, st_menuRightUpdateLoading, st_menuRightUpdateDone } =
    useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수

  const [level1, setLevel1] = useState("회원관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const [sForm] = Form.useForm();

  const [sData, setSData] = useState("");

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
    if (st_menuRightUpdateDone) {
      message.success("해당 운영자의 권한이 변경되었습니다.");
    }
  }, [st_menuRightUpdateDone]);

  useEffect(() => {
    dispatch({
      type: ADMINUSERLIST_REQUEST,
      data: {
        username: sData,
      },
    });
  }, [sData]);

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 4) {
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

  const searchHandler = useCallback(
    (data) => {
      setSData(data.sData);
    },
    [sForm, sData]
  );

  const rightChangeUpdateHandler = useCallback(
    (data, type) => {
      if (data.level === "시스템관리자") {
        return;
      }

      const flag = data[`menuRight${type}`];

      const status = flag === 1 ? 0 : 1;

      dispatch({
        type: MENURIGHT_UPDATE_REQUEST,
        data: {
          userId: data.id,
          type: type,
          status: status,
        },
      });

      const rightUpdate = {
        createdAt: currentUser.createdAt,
        email: currentUser.email,
        id: currentUser.id,
        level: currentUser.level,
        menuRight1:
          parseInt(type) === 1
            ? currentUser.menuRight1 === 1
              ? 0
              : 1
            : currentUser.menuRight1,
        menuRight2:
          parseInt(type) === 2
            ? currentUser.menuRight2 === 1
              ? 0
              : 1
            : currentUser.menuRight2,
        menuRight3:
          parseInt(type) === 3
            ? currentUser.menuRight3 === 1
              ? 0
              : 1
            : currentUser.menuRight3,
        menuRight4:
          parseInt(type) === 4
            ? currentUser.menuRight4 === 1
              ? 0
              : 1
            : currentUser.menuRight4,
        menuRight5:
          parseInt(type) === 5
            ? currentUser.menuRight5 === 1
              ? 0
              : 1
            : currentUser.menuRight5,
        menuRight6:
          parseInt(type) === 6
            ? currentUser.menuRight6 === 1
              ? 0
              : 1
            : currentUser.menuRight6,
        menuRight7:
          parseInt(type) === 7
            ? currentUser.menuRight7 === 1
              ? 0
              : 1
            : currentUser.menuRight7,
        menuRight8:
          parseInt(type) === 8
            ? currentUser.menuRight8 === 1
              ? 0
              : 1
            : currentUser.menuRight8,
        menuRight9:
          parseInt(type) === 9
            ? currentUser.menuRight9 === 1
              ? 0
              : 1
            : currentUser.menuRight9,
        menuRight10:
          parseInt(type) === 10
            ? currentUser.menuRight10 === 1
              ? 0
              : 1
            : currentUser.menuRight10,
        menuRight11:
          parseInt(type) === 11
            ? currentUser.menuRight11 === 1
              ? 0
              : 1
            : currentUser.menuRight11,
        menuRight12:
          parseInt(type) === 12
            ? currentUser.menuRight12 === 1
              ? 0
              : 1
            : currentUser.menuRight12,
        username: currentUser.username,
      };

      setCurrentUser(rightUpdate);
    },
    [currentUser]
  );

  ////// TOGGLE //////

  const userInfoToggle = useCallback(
    (snap) => {
      setUserInfo((prev) => !prev);
      setCurrentUser(snap);

      dispatch({
        type: ADMINUSERLIST_REQUEST,
      });
    },
    [userInfo, currentUser]
  );

  ////// DATAVIEW //////

  const columns = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "이름",
      render: (snap) => (
        <NameView onClick={() => userInfoToggle(snap)}>
          {snap.username}
        </NameView>
      ),
    },
    {
      title: "이메일",
      dataIndex: "email",
    },
    {
      title: "전화번호",
      dataIndex: "mobile",
    },
    {
      title: "접수일",
      dataIndex: "viewCreatedAt",
    },
  ];

  ////// DATA COLUMNS //////

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
            {level2}{" "}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>운영자 리스트 목록 입니다.</GuideLi>
          <GuideLi isImpo={true}>
            권한분류과 이름으로 검색이 가능합니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            권한설정에서 사용자의 권한부여가 가능합니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            권한이 없을 시에 해당 관리페이지를 사용할 수 없습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper padding="0px 20px">
        {/* SEARCH FORM */}
        <SearchForm
          layout="inline"
          style={{ width: "100%" }}
          form={sForm}
          onFinish={searchHandler}
        >
          <SearchFormItem name="sData" style={{ margin: `0px 0px 0px 5px` }}>
            <Input
              size="small"
              style={{ width: "320px" }}
              placeholder={`운영자 이름을 입력해주세요.`}
            />
          </SearchFormItem>

          <SearchFormItem>
            <Button size="small" type="primary" htmlType="submit">
              검색
            </Button>
          </SearchFormItem>
        </SearchForm>
      </Wrapper>

      {/*  */}

      <Wrapper overflow={`auto`} padding="0px 20px">
        <Wrapper minWidth={`900px`}>
          <Table
            style={{ width: `100%` }}
            rowKey="id"
            columns={columns}
            dataSource={users}
            size="small"
          />
        </Wrapper>
      </Wrapper>

      {/* ///// MODAL ///// */}

      <Drawer
        visible={userInfo}
        width="400px"
        onClose={() => userInfoToggle(null)}
      >
        <DrawerTitle>관리자 정보</DrawerTitle>

        {/* 유저 정보 영역 */}
        <Wrapper padding={`20px`} margin={`15px 0px 0px 0px`}>
          <Wrapper al={`flex-start`} margin={`0px 0px 20px 0px`}>
            <SpanText
              fontSize={`13px`}
              color={Theme.grey_C}
              margin={`0px 0px 4px 0px`}
            >
              이름
            </SpanText>
            <SpanText fontSize={`15.5px`}>
              {currentUser && currentUser.username}
            </SpanText>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 20px 0px`}>
            <SpanText
              fontSize={`13px`}
              color={Theme.grey_C}
              margin={`0px 0px 4px 0px`}
            >
              이메일
            </SpanText>
            <SpanText fontSize={`15.5px`}>
              {currentUser && currentUser.email}
            </SpanText>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 20px 0px`}>
            <SpanText
              fontSize={`13px`}
              color={Theme.grey_C}
              margin={`0px 0px 4px 0px`}
            >
              권한
            </SpanText>
            <SpanText fontSize={`15.5px`}>운영자</SpanText>
          </Wrapper>
        </Wrapper>

        {/* 관리자 권한 메뉴 */}
        <Wrapper dr={`row`}>
          <HeadButton
            type="primary"
            isChecked={currentUser && currentUser.menuRight1}
            onClick={() => rightChangeUpdateHandler(currentUser, 1)}
          >
            <BoxText>통계관리</BoxText>
            <BoxIcon>
              <CheckOutlined />
            </BoxIcon>
          </HeadButton>

          <HeadButton
            type="primary"
            isChecked={currentUser && currentUser.menuRight2}
            onClick={() => rightChangeUpdateHandler(currentUser, 2)}
          >
            <BoxText>기초정보관리</BoxText>
            <BoxIcon>
              <CheckOutlined />
            </BoxIcon>
          </HeadButton>
        </Wrapper>

        <Wrapper dr={`row`}>
          <HeadButton
            type="primary"
            isChecked={currentUser && currentUser.menuRight3}
            onClick={() => rightChangeUpdateHandler(currentUser, 3)}
          >
            <BoxText>배너관리</BoxText>
            <BoxIcon>
              <CheckOutlined />
            </BoxIcon>
          </HeadButton>

          <HeadButton
            type="primary"
            isChecked={currentUser && currentUser.menuRight4}
            onClick={() => rightChangeUpdateHandler(currentUser, 4)}
          >
            <BoxText>게시판관리</BoxText>
            <BoxIcon>
              <CheckOutlined />
            </BoxIcon>
          </HeadButton>
        </Wrapper>

        <Wrapper dr={`row`}>
          <HeadButton
            type="primary"
            isChecked={currentUser && currentUser.menuRight5}
            onClick={() => rightChangeUpdateHandler(currentUser, 5)}
          >
            <BoxText>회원관리</BoxText>
            <BoxIcon>
              <CheckOutlined />
            </BoxIcon>
          </HeadButton>
          <HeadButton
            type="primary"
            isChecked={currentUser && currentUser.menuRight6}
            onClick={() => rightChangeUpdateHandler(currentUser, 6)}
          >
            <BoxText>고객지원관리</BoxText>
            <BoxIcon>
              <CheckOutlined />
            </BoxIcon>
          </HeadButton>
        </Wrapper>

        <Wrapper dr={`row`}>
          <HeadButton
            type="primary"
            isChecked={currentUser && currentUser.menuRight7}
            onClick={() => rightChangeUpdateHandler(currentUser, 7)}
          >
            <BoxText>기록관리</BoxText>
            <BoxIcon>
              <CheckOutlined />
            </BoxIcon>
          </HeadButton>
          <HeadButton
            type="primary"
            isChecked={currentUser && currentUser.menuRight8}
            onClick={() => rightChangeUpdateHandler(currentUser, 8)}
          >
            <BoxText>강의관리</BoxText>
            <BoxIcon>
              <CheckOutlined />
            </BoxIcon>
          </HeadButton>
        </Wrapper>

        {/* 운영자 관리 권한 메뉴 추가 (최대 12개) */}
        {/* <HeadButton
          type="primary"
          isChecked={currentUser && currentUser.menuRight5}
          onClick={() => rightChangeUpdateHandler(currentUser, 9)}
        >
          <BoxText>DIY관리</BoxText>
          <BoxIcon>
            <CheckOutlined />
          </BoxIcon>
        </HeadButton>

        <HeadButton
          type="primary"
          isChecked={currentUser && currentUser.menuRight5}
          onClick={() => rightChangeUpdateHandler(currentUser, 10)}
        >
          <BoxText>DIY관리</BoxText>
          <BoxIcon>
            <CheckOutlined />
          </BoxIcon>
        </HeadButton>

        <HeadButton
          type="primary"
          isChecked={currentUser && currentUser.menuRight5}
          onClick={() => rightChangeUpdateHandler(currentUser, 11)}
        >
          <BoxText>DIY관리</BoxText>
          <BoxIcon>
            <CheckOutlined />
          </BoxIcon>
        </HeadButton>

        <HeadButton
          type="primary"
          isChecked={currentUser && currentUser.menuRight5}
          onClick={() => rightChangeUpdateHandler(currentUser, 12)}
        >
          <BoxText>DIY관리</BoxText>
          <BoxIcon>
            <CheckOutlined />
          </BoxIcon>
        </HeadButton> */}
      </Drawer>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(UserRight);
