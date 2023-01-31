import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Popconfirm,
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
  DelBtn,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  HomeOutlined,
  RightOutlined,
  EyeOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import {
  FAQTYPE_DELETE_REQUEST,
  FAQTYPE_LIST_REQUEST,
  FAQTYPE_ADD_REQUEST,
} from "../../../reducers/faq";

const Faqbtn = styled(Button)`
  margin: 0px 5px 5px 0px;
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.subTheme5_C : props.theme.lightGrey_C};
`;

const TypeTable = styled(Table)`
  width: 100%;
  margin: 5px !important;
`;

const Logo = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    typeList,
    st_faqTypeDeleteDone,
    st_faqTypeDeleteError,
    st_faqTypeAddDone,
    st_faqTypeAddError,
  } = useSelector((state) => state.faq);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("고객지원관리");
  const [level2, setLevel2] = useState("");
  const [currentData, setCurrentData] = useState(null);
  const [sameDepth, setSameDepth] = useState([]);

  const [createModal, setCreateModal] = useState(false);
  const [createForm] = Form.useForm();

  const [tab, setTab] = useState(-1);

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

  // *************** FAQ TYPE DELETE 후처리 ***************

  //modal 유형데이터 관리
  useEffect(() => {
    if (st_faqTypeAddDone) {
      message.info("자주묻는질문 유형데이터가 추가되었습니다.");

      dispatch({
        type: FAQTYPE_LIST_REQUEST,
      });
    }
  }, [st_faqTypeAddDone]);

  useEffect(() => {
    if (st_faqTypeAddError) {
      return message.error(st_faqTypeAddError);
    }
  }, [st_faqTypeAddError]);

  useEffect(() => {
    if (st_faqTypeDeleteDone) {
      message.info("자주묻는질문 유형데이터가 삭제되었습니다.");

      dispatch({
        type: FAQTYPE_LIST_REQUEST,
      });
    }
  }, [st_faqTypeDeleteDone]);

  // 유형데이터 삭제
  useEffect(() => {
    if (st_faqTypeDeleteError) {
      return message.error(st_faqTypeDeleteError);
    }
  }, [st_faqTypeDeleteError]);

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight6)) {
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
  const typeListAddHandler = useCallback((data) => {
    dispatch({
      type: FAQTYPE_ADD_REQUEST,
      data: {
        value: data.type,
      },
    });
  }, []);

  const tabClickHandler = useCallback(
    (v) => {
      setTab(v);
    },
    [tab]
  );

  const createModalToggleHandler = useCallback(() => {
    setCreateModal((prev) => !prev);
  }, [createModal]);

  const typeDeleteClickHandler = useCallback((data) => {
    dispatch({
      type: FAQTYPE_DELETE_REQUEST,
      data: {
        value: data.value,
        faqTypeId: data.id,
      },
    });
  }, []);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const col = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "유형명",
      dataIndex: "value",
    },
    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "상태창",
      render: (data) => (
        <>
          <ViewStatusIcon
            active={
              parseInt(data.id) === (currentData && parseInt(currentData.id))
            }
          />
        </>
      ),
    },
    {
      title: "삭제",
      render: (data) => (
        <Popconfirm
          placement="topRight"
          title={"정말 삭제하시겠습니까?"}
          okText="삭제"
          cancelText="취소"
          onConfirm={() => typeDeleteClickHandler(data)}
        >
          <DelBtn />
        </Popconfirm>
      ),
    },
  ];

  const modalcol = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "유형명",
      dataIndex: "value",
    },
    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "업데이터",
      dataIndex: "username",
    },
    {
      title: "삭제",
      render: (data) => (
        <Popconfirm
          placement="topRight"
          title={"정말 삭제하시겠습니까?"}
          okText="삭제"
          cancelText="취소"
          onConfirm={() => typeDeleteClickHandler(data)}
        >
          <DelBtn />
        </Popconfirm>
      ),
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
        shadow={`2px 2px 6px  ${Theme.adminTheme_2}`}
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
          <GuideLi>자주묻는 질문의 유형과 데이터를 관리할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            해당 페이지의 데이터는 화면에 즉시 적용되오니, 신중한 처리가
            필요합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* CONTENT */}

      <Wrapper dr="row" padding="0px 50px" al="flex-start">
        <Wrapper
          width="50%"
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper al={`flex-end`} margin={`0px 0px 5px 0px`}>
            <Button
              size="small"
              type="primary"
              onClick={() => createModalToggleHandler()}
            >
              유형관리
            </Button>
          </Wrapper>

          <Wrapper dr={`row`} ju={`flex-start`} margin={`0px 0px 10px 0px`}>
            <Faqbtn
              size="small"
              onClick={() => tabClickHandler(-1)}
              type={tab === -1 ? "primary" : "default"}
            >
              전체
            </Faqbtn>

            <Faqbtn
              size="small"
              onClick={() => tabClickHandler(0)}
              type={tab === 0 ? "primary" : "default"}
            >
              유형1
            </Faqbtn>
            <Faqbtn
              size="small"
              onClick={() => tabClickHandler(1)}
              type={tab === 1 ? "primary" : "default"}
            >
              유형2
            </Faqbtn>
            <Faqbtn
              size="small"
              onClick={() => tabClickHandler(2)}
              type={tab === 2 ? "primary" : "default"}
            >
              유형3
            </Faqbtn>
          </Wrapper>

          <Table
            size="small"
            rowKey="id"
            columns={col}
            style={{ width: "100%" }}
            dataSource={typeList}
          />
        </Wrapper>

        <Wrapper
          width="50%"
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper padding={`50px 0px`} dr="row">
            <AlertOutlined
              style={{
                fontSize: "20px",
                color: Theme.red_C,
                marginRight: "5px",
              }}
            />
            좌측 데이터를 선택하여 상세정보를 확인하세요.
          </Wrapper>
        </Wrapper>
      </Wrapper>

      {/* CREATE FORM */}

      <Modal
        width={`680px`}
        footer={null}
        title={`유형관리`}
        visible={createModal}
        onCancel={() => createModalToggleHandler()}
      >
        <GuideUl>
          <GuideLi>가이드 멘트</GuideLi>
        </GuideUl>

        <Form
          form={createForm}
          wrapperCol={{ span: 21 }}
          labelCol={{ span: 3 }}
          onFinish={typeListAddHandler}
        >
          <Form.Item
            label="유형"
            name="type"
            rules={[{ required: true, message: "유형은 필수입니다." }]}
          >
            <Wrapper dr={`row`} ju={`flex-start`}>
              <Input style={{ width: "90%" }} size="small" allowClear />

              <Button size="small" type="primary" htmlType="submit">
                등록
              </Button>
            </Wrapper>
          </Form.Item>
        </Form>

        <TypeTable
          size="small"
          rowKey="id"
          columns={modalcol}
          style={{ width: "100%", margin: "0px" }}
          dataSource={typeList}
        />
      </Modal>
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
      type: FAQTYPE_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Logo);
