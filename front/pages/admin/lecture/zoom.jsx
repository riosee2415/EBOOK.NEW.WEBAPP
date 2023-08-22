import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  Popover,
  Select,
  Table,
  message,
  Modal,
  Popconfirm,
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
  ZOOM_LEC_CREATE_REQUEST,
  ZOOM_LEC_DELETE_REQUEST,
  ZOOM_LEC_DETAIL_REQUEST,
  ZOOM_LEC_LIST_REQUEST,
  ZOOM_LEC_MOVE_REQUEST,
  ZOOM_LEC_UPDATE_REQUEST,
  ZOOM_DELETE_REQUEST,
} from "../../../reducers/level";
import { CSVLink } from "react-csv";

const DownloadBtn = styled(CSVLink)`
  width: 200px;
  height: 25px;
  margin: 0 0 0 10px;
  border-radius: 3px;

  background: ${(props) => props.theme.basicTheme_C};
  color: ${(props) => props.theme.white_C};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  transition: 0.4s;

  &:hover {
    color: ${(props) => props.theme.basicTheme_C};
    background: ${(props) => props.theme.white_C};
    border: 1px solid ${(props) => props.theme.basicTheme_C};
  }
`;

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

const Zoom = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    zoomLecList,
    zoomDetail,

    st_zoomLecCreateDone,
    st_zoomLecCreateError,

    st_zoomLecUpdateDone,
    st_zoomLecUpdateError,

    st_zoomLecMoveDone,
    st_zoomLecMoveError,

    st_zoomLecDeleteLoading,
    st_zoomLecDeleteDone,
    st_zoomLecDeleteError,

    st_zoomDeleteDone,
    st_zoomDeleteError,
  } = useSelector((state) => state.level);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("수정과관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [deData, setDeData] = useState(null);
  const [isModal, setIsModal] = useState(null);
  const [mModal, setMModal] = useState(false);

  const [infoForm] = Form.useForm();
  const [moveForm] = Form.useForm();

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

  const [zoomLevel, setZoomLevel] = useState("");

  const [scvData, setScvData] = useState(null);

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
    dispatch({
      type: ZOOM_LEC_LIST_REQUEST,
      data: {
        level: zoomLevel,
      },
    });
  }, [zoomLevel]);

  ////////////////////// 수정과 삭제 후처리 //////////////////////
  useEffect(() => {
    if (st_zoomDeleteDone) {
      dispatch({
        type: ZOOM_LEC_LIST_REQUEST,
      });

      return message.success("수정과가 생성되었습니다.");
    }

    if (st_zoomDeleteError) {
      return message.error(st_zoomDeleteError);
    }
  }, [st_zoomDeleteDone, st_zoomDeleteError]);

  ////////////////////// 수정과 생성후처리 //////////////////////
  useEffect(() => {
    if (st_zoomLecCreateDone) {
      dispatch({
        type: ZOOM_LEC_LIST_REQUEST,
      });

      return message.success("수정과가 생성되었습니다.");
    }

    if (st_zoomLecCreateError) {
      return message.error(st_zoomLecCreateError);
    }
  }, [st_zoomLecCreateDone, st_zoomLecCreateError]);

  ////////////////////// 수정과 수정후처리 //////////////////////
  useEffect(() => {
    if (st_zoomLecUpdateDone) {
      dispatch({
        type: ZOOM_LEC_LIST_REQUEST,
      });

      return message.success("수정과가 수정되었습니다.");
    }

    if (st_zoomLecUpdateError) {
      return message.error(st_zoomLecUpdateError);
    }
  }, [st_zoomLecUpdateDone, st_zoomLecUpdateError]);

  ////////////////////// 수정과 이동후처리 //////////////////////
  useEffect(() => {
    if (st_zoomLecMoveDone) {
      dispatch({
        type: ZOOM_LEC_LIST_REQUEST,
        data: {
          level: zoomLevel,
        },
      });

      modalToggle(null);
      moveModalToggle(null);
      moveForm.resetFields();

      return message.success("수강생이 이동되었습니다.");
    }

    if (st_zoomLecMoveError) {
      return message.error(st_zoomLecMoveError);
    }
  }, [st_zoomLecMoveDone, st_zoomLecMoveError]);

  ////////////////////// 수강인원 삭제 후처리 //////////////////////
  useEffect(() => {
    if (st_zoomLecDeleteDone) {
      dispatch({
        type: ZOOM_LEC_LIST_REQUEST,
        data: {
          level: zoomLevel,
        },
      });

      modalToggle(null);

      return message.success("수강생이 삭제되었습니다.");
    }

    if (st_zoomLecDeleteError) {
      return message.error(st_zoomLecDeleteError);
    }
  }, [st_zoomLecDeleteDone, st_zoomLecDeleteError]);

  //엑셀
  useEffect(() => {
    if (zoomLecList) {
      const scvData = [];

      zoomLecList &&
        zoomLecList.map((data) => {
          if (data.levelValue === zoomLevel) {
            scvData.push({
              level: data.levelValue,
              day: data.days,
              price: data.price,
              month: data.month,
              teacher: data.tName,
              startTime: data.startTime,
              endTime: data.endTime,
              term: data.terms,
              degree: data.degree,
            });
          }
        });

      setScvData(scvData);
    }
  }, [zoomLecList, zoomLevel]);

  ////// TOGGLE //////
  const modalToggle = useCallback(
    (data) => {
      setIsModal((prev) => !prev);

      if (data) {
        dispatch({
          type: ZOOM_LEC_DETAIL_REQUEST,
          data: {
            ZoomId: data.id,
          },
        });
      }
    },
    [isModal]
  );

  const moveModalToggle = useCallback(
    (data) => {
      setMModal((p) => !p);

      setDeData(data);
    },
    [mModal]
  );

  ////// HANDLER //////

  const zoomDelHandler = useCallback((id) => {
    dispatch({
      type: ZOOM_DELETE_REQUEST,
      data: {
        targetId: id,
      },
    });
  }, []);

  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);

      infoForm.setFieldsValue({
        levelValue: record.levelValue,
        days: record.days,
        price: record.price,
        month: record.month,
        tName: record.tName,
        startTime: record.startTime,
        endTime: record.endTime,
        terms: record.terms,
        zoomRink: "-",
        degree: record.degree,
        createdAt: record.viewCreatedAt,
      });
    },
    [currentData, infoForm]
  );

  const createHandler = useCallback(() => {
    dispatch({
      type: ZOOM_LEC_CREATE_REQUEST,
    });
  }, []);

  const updateHandler = useCallback(
    (data) => {
      dispatch({
        type: ZOOM_LEC_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          days: data.days,
          startTime: data.startTime,
          endTime: data.endTime,
          levelValue: data.levelValue,
          terms: data.terms,
          tName: data.tName,
          price: data.price,
          month: data.month,
          degree: data.degree,
          zoomRink: "-",
        },
      });
    },
    [currentData]
  );

  const lectureMoveHandler = useCallback(
    (data) => {
      dispatch({
        type: ZOOM_LEC_MOVE_REQUEST,
        data: {
          ZoomId: currentData.id,
          UserId: deData.UserId,
          MoveZoomId: data.lecId,
        },
      });
    },
    [deData, currentData]
  );

  const zoomPeopleDeleteHandler = useCallback((data) => {
    dispatch({
      type: ZOOM_LEC_DELETE_REQUEST,
      data: {
        targetId: data.id,
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
      title: "차수",
      dataIndex: "degree",
    },
    {
      title: "레벨",
      dataIndex: "levelValue",
    },
    {
      title: "요일",
      dataIndex: "days",
    },
    {
      title: "가격",
      dataIndex: "viewPrice",
    },
    {
      title: "개월",
      dataIndex: "month",
    },
    {
      title: "선생님",
      dataIndex: "tName",
    },
    {
      title: "수업시간",
      render: (data) => (
        <Text>
          {data.startTime} ~ {data.endTime}
        </Text>
      ),
    },
    {
      title: "수강생수",
      render: (data) => (
        <Button type="primary" size="small" onClick={() => modalToggle(data)}>
          {data.cnt}명
        </Button>
      ),
    },
    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "삭제",
      render: (row) => (
        <Popconfirm
          title="정말 삭제하시겠습니까?"
          okText="삭제"
          cancelText="취소"
          onConfirm={() => zoomDelHandler(row.id)}
        >
          <Button type="danger" size="small">
            삭제
          </Button>
        </Popconfirm>
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

  const col2 = [
    {
      title: "이름",
      dataIndex: "username",
    },
    {
      title: "생년월일",
      dataIndex: "birth",
    },
    {
      title: "성별",
      dataIndex: "gender",
    },

    {
      title: "연락처",
      dataIndex: "mobile",
    },
    {
      title: "이메일",
      dataIndex: "email",
    },
    {
      title: "강의 이동",
      render: (data) => (
        <Button
          type="primary"
          size="small"
          onClick={() => moveModalToggle(data)}
        >
          이동
        </Button>
      ),
    },
    {
      title: "인원 삭제",
      render: (data) => (
        <Popconfirm
          title={"삭제시 데이터 복구가 불가능합니다."}
          okText="삭제"
          cancelText="취소"
          onConfirm={() => zoomPeopleDeleteHandler(data)}
        >
          <Button size="small" type="danger" loading={st_zoomLecDeleteLoading}>
            삭제
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const headers = [
    { label: "차수", key: "degree" },
    { label: "레벨", key: "level" },
    { label: "선생님", key: "teacher" },
    { label: "요일", key: "day" },
    { label: "가격", key: "price" },
    { label: "개월", key: "month" },
    { label: "시작시간", key: "startTime" },
    { label: "종료시간", key: "endTime" },
    { label: "수강기간", key: "term" },
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
          <GuideLi>
            수정과를 추가 / 수정 / 삭제 등 관리를 할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            삭제처리 된 수정과는 복구가 불가능합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* TAB */}
      <Wrapper padding={`10px`} dr={`row`} ju="flex-start">
        <Button
          type={zoomLevel === "" ? "primary" : "default"}
          size="small"
          style={{ marginRight: "5px" }}
          onClick={() => setZoomLevel("")}
        >
          전체
        </Button>
        <Button
          type={zoomLevel === "LEVEL1" ? "primary" : "default"}
          size="small"
          style={{ marginRight: "5px" }}
          onClick={() => setZoomLevel("LEVEL1")}
        >
          LEVEL1
        </Button>
        <Button
          type={zoomLevel === "LEVEL2" ? "primary" : "default"}
          size="small"
          style={{ marginRight: "5px" }}
          onClick={() => setZoomLevel("LEVEL2")}
        >
          LEVEL2
        </Button>
        <Button
          type={zoomLevel === "LEVEL3" ? "primary" : "default"}
          size="small"
          style={{ marginRight: "5px" }}
          onClick={() => setZoomLevel("LEVEL3")}
        >
          LEVEL3
        </Button>
        <Button
          type={zoomLevel === "LEVEL4" ? "primary" : "default"}
          size="small"
          style={{ marginRight: "5px" }}
          onClick={() => setZoomLevel("LEVEL4")}
        >
          LEVEL4
        </Button>
        <Button
          type={zoomLevel === "LEVEL5" ? "primary" : "default"}
          size="small"
          style={{ marginRight: "5px" }}
          onClick={() => setZoomLevel("LEVEL5")}
        >
          LEVEL5
        </Button>
        <Button
          type={zoomLevel === "LEVEL6" ? "primary" : "default"}
          size="small"
          style={{ marginRight: "5px" }}
          onClick={() => setZoomLevel("LEVEL6")}
        >
          LEVEL6
        </Button>
        <Button
          type={zoomLevel === "LEVEL7" ? "primary" : "default"}
          size="small"
          style={{ marginRight: "5px" }}
          onClick={() => setZoomLevel("LEVEL7")}
        >
          LEVEL7
        </Button>
      </Wrapper>

      <Wrapper dr="row" padding="0px 20px" al="flex-start" ju={`space-between`}>
        <Wrapper
          width={`calc(60% - 10px)`}
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper dr={`row`} ju="flex-end" margin={`0px 0px 5px 0px`}>
            {zoomLevel !== "" && scvData && (
              <DownloadBtn
                filename={zoomLevel}
                headers={headers}
                data={scvData}
              >
                엑셀 다운로드
              </DownloadBtn>
            )}

            <Button
              style={{ marginLeft: "10px" }}
              size="small"
              type="primary"
              onClick={createHandler}
            >
              설문지 생성
            </Button>
          </Wrapper>
          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={col}
            dataSource={zoomLecList}
            size="small"
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          />
        </Wrapper>

        <Wrapper
          width={`calc(40% - 10px)`}
          padding="5px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          {currentData ? (
            <Wrapper>
              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  수정과 기본정보
                </InfoTitle>
              </Wrapper>

              <Form
                form={infoForm}
                style={{ width: `100%` }}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                onFinish={updateHandler}
              >
                <Form.Item
                  label="레벨"
                  name="levelValue"
                  rules={[
                    { required: true, message: "레벨은 필수 입력사항 입니다." },
                  ]}
                >
                  <Select size="small">
                    <Select.Option value={"LEVEL1"}>LEVEL1</Select.Option>
                    <Select.Option value={"LEVEL2"}>LEVEL2</Select.Option>
                    <Select.Option value={"LEVEL3"}>LEVEL3</Select.Option>
                    <Select.Option value={"LEVEL4"}>LEVEL4</Select.Option>
                    <Select.Option value={"LEVEL5"}>LEVEL5</Select.Option>
                    <Select.Option value={"LEVEL6"}>LEVEL6</Select.Option>
                    <Select.Option value={"LEVEL7"}>LEVEL7</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="요일"
                  name="days"
                  rules={[
                    { required: true, message: "요일은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>

                <Form.Item
                  label="가격"
                  name="price"
                  rules={[
                    { required: true, message: "가격은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input size="small" type="number" />
                </Form.Item>

                <Form.Item
                  label="개월"
                  name="month"
                  rules={[
                    { required: true, message: "개월은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input size="small" type="number" />
                </Form.Item>

                <Form.Item
                  label="선생님"
                  name="tName"
                  rules={[
                    {
                      required: true,
                      message: "선생님은 필수 입력사항 입니다.",
                    },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>

                <Form.Item
                  label="시작시간"
                  name="startTime"
                  rules={[
                    {
                      required: true,
                      message: "시작시간은 필수 입력사항 입니다.",
                    },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>

                <Form.Item
                  label="종료시간"
                  name="endTime"
                  rules={[
                    {
                      required: true,
                      message: "종료시간은 필수 입력사항 입니다.",
                    },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>

                <Form.Item
                  label="수강기간"
                  name="terms"
                  rules={[
                    {
                      required: true,
                      message: "수강기간은 필수 입력사항 입니다.",
                    },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>

                <Form.Item
                  label="차수"
                  name="degree"
                  rules={[
                    {
                      required: true,
                      message: "차수은 필수 입력사항 입니다.",
                    },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>

                {/* <Form.Item
                  label="수정과링크"
                  name="zoomRink"
                  rules={[
                    {
                      required: true,
                      message: "수정과링크은 필수 입력사항 입니다.",
                    },
                  ]}
                >
                  <Input size="small" />
                </Form.Item> */}

                <Form.Item label="작성일" name="createdAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
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

      <Modal
        onCancel={modalToggle}
        visible={isModal}
        footer={null}
        width={`700px`}
      >
        <GuideUl>
          <GuideLi isImpo={true}>
            삭제처리 된 수강인원는 복구가 불가능합니다.
          </GuideLi>
        </GuideUl>

        <Wrapper padding={`20px 0`}>
          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={col2}
            dataSource={zoomDetail}
            size="small"
          />
        </Wrapper>
      </Modal>

      <Modal
        onCancel={() => moveModalToggle(null)}
        visible={mModal}
        footer={null}
        width={`500px`}
        title={"강의 이동"}
      >
        <Form
          form={moveForm}
          style={{ width: `100%` }}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          onFinish={lectureMoveHandler}
        >
          <Form.Item
            label="수정과"
            name="lecId"
            rules={[
              { required: true, message: "수정과는 필수 입력사항 입니다." },
            ]}
          >
            <Select size="small">
              {zoomLecList &&
                zoomLecList.map((data) => {
                  return (
                    <Select.Option key={data.id} value={data.id}>
                      {data.levelValue} ({data.days}) ({data.startTime} ~{" "}
                      {data.endTime})
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>

          <Wrapper al="flex-end">
            <Button type="primary" size="small" htmlType="submit">
              강의 이동하기
            </Button>
          </Wrapper>
        </Form>
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
      type: ZOOM_LEC_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Zoom);
