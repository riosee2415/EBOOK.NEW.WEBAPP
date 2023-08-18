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
  LEVEL_REQUEST,
  LEVEL_TOGGLE_REQUEST,
  LEVEL_UPDATE_REQUEST,
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
    levelList,
    st_levelUpdateDone,
    st_levelUpdateError,
    st_levelToggleDone,
    st_levelToggleError,
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
    if (st_levelUpdateDone) {
      dispatch({
        type: LEVEL_REQUEST,
      });

      setCurrentData(null);

      return message.success("설문 내용이 수정되었습니다.");
    }

    if (st_levelUpdateError) {
      return message.error(st_levelUpdateError);
    }
  }, [st_levelUpdateDone, st_levelUpdateError]);

  useEffect(() => {
    if (st_levelToggleDone) {
      dispatch({
        type: LEVEL_REQUEST,
      });

      setCurrentData(null);

      return message.success("사용여부가 수정되었습니다.");
    }

    if (st_levelToggleError) {
      return message.error(st_levelToggleError);
    }
  }, [st_levelToggleDone, st_levelToggleError]);

  ////// HANDLER //////

  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);

      infoForm.setFieldsValue({
        id: record.id,
        value: record.value,
      });
    },
    [currentData, infoForm]
  );

  const infoFormFinish = useCallback(
    (data) => {
      dispatch({
        type: LEVEL_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          nextValue: data.value.replace(/\'/gi, `''`, /\"/gi, `""`),
        },
      });
    },
    [currentData]
  );

  const dataToggleUpdate = useCallback((e, row) => {
    const nextFlag = e ? 1 : 0;

    dispatch({
      type: LEVEL_TOGGLE_REQUEST,
      data: {
        id: row.id,
        nextFlag,
      },
    });
  }, []);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const col = [
    {
      title: "번호",
      dataIndex: "number",
    },
    {
      title: "설문 내용",
      render: (data) => (
        <Text width={`400px`} isEllipsis>
          {data.value}
        </Text>
      ),
      width: "60%",
    },
    {
      title: "사용여부",
      render: (row) => (
        <Switch
          checked={row.isHide}
          onChange={(e) => dataToggleUpdate(e, row)}
        />
      ),
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
          <GuideLi>설문지를 수정 할 수 있습니다.</GuideLi>
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
            dataSource={levelList}
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
                  설문조사 내용
                </InfoTitle>
              </Wrapper>

              <Form
                form={infoForm}
                style={{ width: `100%` }}
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 22 }}
                onFinish={infoFormFinish}
              >
                <Form.Item name="id" hidden></Form.Item>
                <Form.Item
                  label="내용"
                  name="value"
                  rules={[
                    { required: true, message: "내용은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input.TextArea rows={10} />
                </Form.Item>

                <Wrapper al="flex-end">
                  <Button type="primary" size="small" htmlType="submit">
                    정보 업데이트
                  </Button>
                </Wrapper>
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
      type: LEVEL_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Survey);
