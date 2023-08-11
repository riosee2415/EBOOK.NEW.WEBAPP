import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Popover,
  Table,
  message,
  Switch,
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
  AlertOutlined,
  CheckOutlined,
  EyeOutlined,
  HomeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  ZOOM_LEC_HISTORY_DELETE_REQUEST,
  ZOOM_LEC_HISTORY_REQUEST,
} from "../../../reducers/level";

const InfoTitle = styled.div`
  font-size: 19px;
  margin: 15px 0px 5px 0px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding-left: 15px;
  color: ${(props) => props.theme.basicTheme_C};
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.basicTheme_C : props.theme.lightGrey_C};
`;

const Survey = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    zoomHistory,

    st_zoomLecHistoryDelDone,
    st_zoomLecHistoryDelError,
  } = useSelector((state) => state.level);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("줌수업관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [currentData, setCurrentData] = useState(null);

  const [infoForm] = Form.useForm();

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

      if (!(me && me.menuRight8)) {
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
    if (st_zoomLecHistoryDelDone) {
      dispatch({
        type: ZOOM_LEC_HISTORY_REQUEST,
      });
      setCurrentData(null);

      return message.success("결제내역이 삭제되었습니다.");
    }

    if (st_zoomLecHistoryDelError) {
      return message.error(st_zoomLecHistoryDelError);
    }
  }, [st_zoomLecHistoryDelDone, st_zoomLecHistoryDelError]);

  ////// HANDLER //////

  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);

      infoForm.setFieldsValue({
        id: record.id,
        userId: record.userId,
        username: record.username,
        birth: record.birth,
        mobile: record.mobile,
        levelValue: record.levelValue,
        viewPrice: record.viewPrice,
        viewCreatedAt: record.viewCreatedAt,
      });
    },
    [currentData, infoForm]
  );

  const deleteHandler = useCallback((data) => {
    dispatch({
      type: ZOOM_LEC_HISTORY_DELETE_REQUEST,
      data: {
        id: data.id,
      },
    });
  }, []);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const col = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "회원 ID",
      dataIndex: "userId",
    },
    {
      title: "레벨",
      dataIndex: "levelValue",
    },
    {
      title: "가격",
      dataIndex: "viewPrice",
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
      width: "10%",
      align: "center",
      title: "삭제하기",
      render: (data) => (
        <Popconfirm
          title="해당 자료를 삭제하시겠습니까?"
          okText="삭제"
          cancelText="취소"
          onConfirm={() => deleteHandler(data)}
        >
          <Button size="small" type="danger">
            삭제하기
          </Button>
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
            {level2}{" "}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>결제내역을 조회 / 수정 할 수 있습니다.</GuideLi>
          <GuideLi isImpo>수정된 내역은 복구할 수 없습니다.</GuideLi>
        </GuideUl>
      </Wrapper>

      {/* TAB */}

      <Wrapper dr="row" padding="0px 20px" al="flex-start" ju={`space-between`}>
        <Wrapper
          width={`calc(50% - 10px)`}
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Table
            style={{ width: "100%" }}
            rowKey="num"
            columns={col}
            dataSource={zoomHistory}
            size="small"
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          />
        </Wrapper>

        <Wrapper
          width={`calc(50% - 10px)`}
          padding="5px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          {currentData ? (
            <Wrapper>
              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  결제내역
                </InfoTitle>
              </Wrapper>

              <Form
                form={infoForm}
                style={{ width: `100%` }}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                <Form.Item name="id" hidden></Form.Item>
                <Form.Item label="회원아이디" name="userId">
                  <Input size="small" />
                </Form.Item>
                <Form.Item label="회원 이름" name="username">
                  <Input size="small" />
                </Form.Item>
                <Form.Item label="생년월일" name="birth">
                  <Input size="small" />
                </Form.Item>
                <Form.Item label="전화번호" name="mobile">
                  <Input size="small" />
                </Form.Item>
                <Form.Item label="레벨" name="levelValue">
                  <Input size="small" />
                </Form.Item>
                <Form.Item label="가격" name="viewPrice">
                  <Input size="small" />
                </Form.Item>
                <Form.Item label="생성일" name="viewCreatedAt">
                  <Input size="small" />
                </Form.Item>
              </Form>

              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey_C}
                margin={`30px 0px`}
              ></Wrapper>
            </Wrapper>
          ) : (
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
          )}
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
      type: ZOOM_LEC_HISTORY_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Survey);
