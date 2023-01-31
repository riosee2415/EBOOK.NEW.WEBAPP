import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
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
  SortView,
  UpBtn,
  DownBtn,
  SettingBtn,
  DelBtn,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import {
  COMPANY_GET_REQUEST,
  COMPANY_CREATE_REQUEST,
  COMPANY_SORT_UPDATE_REQUEST,
  COMPANY_DELETE_REQUEST,
  COMPANY_UPDATE_REQUEST,
} from "../../../reducers/company";

const BusinessInfomation = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    companys,
    st_companyCreateDone,
    st_companyCreateError,
    st_companySortUpdateDone,
    st_companySortUpdateError,
    st_companyDeleteDone,
    st_companyDeleteError,
    st_companyUpdateDone,
    st_companyUpdateError,
  } = useSelector((state) => state.company);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("기초정보관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

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
    if (st_companyCreateDone) {
      message.success(
        "새로운 사업자 정보가 추가되었습니다. 데이터를 재조회 합니다."
      );
      dispatch({
        type: COMPANY_GET_REQUEST,
      });

      createModalToggleHandler();
    }
  }, [st_companyCreateDone]);

  useEffect(() => {
    if (st_companyUpdateDone) {
      message.success(
        "기존 사업자 정보가 수정되었습니다. 데이터를 재조회 합니다."
      );
      dispatch({
        type: COMPANY_GET_REQUEST,
      });

      updateModalToggleHandler();
    }
  }, [st_companyUpdateDone]);

  useEffect(() => {
    if (st_companyDeleteDone) {
      message.success("사업자 정보를 삭제했습니다. 데이터를 재조회 합니다.");
      dispatch({
        type: COMPANY_GET_REQUEST,
      });
    }
  }, [st_companyDeleteDone]);

  useEffect(() => {
    if (st_companySortUpdateDone) {
      message.success(
        "데이터의 우선순위가 변경되었습니다. 데이터를 재조회 합니다."
      );
      dispatch({
        type: COMPANY_GET_REQUEST,
      });
    }
  }, [st_companySortUpdateDone]);

  useEffect(() => {
    if (st_companyCreateError) {
      message.success(st_companyCreateError);
      dispatch({
        type: COMPANY_GET_REQUEST,
      });
    }
  }, [st_companyCreateError]);

  useEffect(() => {
    if (st_companyUpdateError) {
      message.success(st_companyUpdateError);
      dispatch({
        type: COMPANY_GET_REQUEST,
      });
    }
  }, [st_companyUpdateError]);

  useEffect(() => {
    if (st_companyDeleteError) {
      message.success(st_companyDeleteError);
      dispatch({
        type: COMPANY_GET_REQUEST,
      });
    }
  }, [st_companyDeleteError]);

  useEffect(() => {
    if (st_companySortUpdateError) {
      message.success(st_companySortUpdateError);
      dispatch({
        type: COMPANY_GET_REQUEST,
      });
    }
  }, [st_companySortUpdateError]);

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight2)) {
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
  const createModalToggleHandler = useCallback(() => {
    setCreateModal((prev) => !prev);
  }, [createModal]);

  const updateModalToggleHandler = useCallback(
    (data = null) => {
      setUpdateModal((prev) => !prev);

      if (data) {
        updateForm.setFieldsValue({
          id: data.id,
          name: data.name,
          value: data.value,
        });
      }
    },
    [updateModal, updateForm]
  );

  const createFormFinish = useCallback((data) => {
    dispatch({
      type: COMPANY_CREATE_REQUEST,
      data: {
        name: data.name,
        value: data.value,
      },
    });

    createForm.resetFields();
  }, []);

  const updateFormFinish = useCallback((data) => {
    dispatch({
      type: COMPANY_UPDATE_REQUEST,
      data: {
        id: data.id,
        name: data.name,
        value: data.value,
      },
    });
  }, []);

  const sortUpdateHandler = useCallback((data, type) => {
    if (type === 1) {
      if (data["sort"] === 1) {
        return message.error("더 이상 우선순위를 높게 할 수 없습니다.");
      }

      dispatch({
        type: COMPANY_SORT_UPDATE_REQUEST,
        data: {
          id: data.id,
          nextSort: parseInt(data.sort) - 1,
          name: data.name,
          value: data.value,
        },
      });
    } else {
      dispatch({
        type: COMPANY_SORT_UPDATE_REQUEST,
        data: {
          id: data.id,
          nextSort: parseInt(data.sort) + 1,
          name: data.name,
          value: data.value,
        },
      });
    }
  }, []);

  const deleteConfirm = (data) => {
    dispatch({
      type: COMPANY_DELETE_REQUEST,
      data: {
        id: data.id,
        name: data.name,
        value: data.value,
      },
    });
  };

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////
  const col = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "정보이름",
      dataIndex: "name",
    },
    {
      title: "해당 데이터",
      dataIndex: "value",
    },
    {
      title: "우선순위",
      render: (data) => (
        <Wrapper dr="row" ju="flex-start" al="center">
          <UpBtn onClick={() => sortUpdateHandler(data, 1)} />
          <SortView>{data.sort}</SortView>
          <DownBtn onClick={() => sortUpdateHandler(data, 2)} />
        </Wrapper>
      ),
    },
    {
      title: "정보 생성일",
      dataIndex: "createdAt",
    },
    {
      title: "최근 수정일",
      dataIndex: "updatedAt",
    },
    {
      title: "정보수정",
      render: (data) => (
        <SettingBtn onClick={() => updateModalToggleHandler(data)} />
      ),
    },
    {
      title: "삭제",
      render: (data) => (
        <Popconfirm
          placement="topRight"
          title="정말 삭제하시겠습니까?"
          onConfirm={() => deleteConfirm(data)}
          okText="삭제"
          cancelText="취소"
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
            사업자정보는 웹사이트 및 어플리케이션 하단에 표기되는 정보 입니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            추가/수정/삭제되는 정보는 즉시 반영되오니 신중한 처리를 요구합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper padding={`0px 50px`}>
        <Wrapper al="flex-end" margin={`0px 0px 10px 0px`}>
          <Button
            type="primary"
            size="small"
            onClick={createModalToggleHandler}
          >
            새 정보 입력
          </Button>
        </Wrapper>

        <Table
          style={{ width: "100%" }}
          rowKey="id"
          columns={col}
          dataSource={companys ? companys : []}
          size="small"
        />
      </Wrapper>

      {/* CREATE MODAL */}
      <Modal
        width="680px"
        title="사업자정보 추가"
        visible={createModal}
        footer={null}
        onCancel={createModalToggleHandler}
      >
        <GuideUl>
          <GuideLi isImpo={true}>
            새롭게 입력되는 데이터의 정렬번호는 1번으로 설정됩니다.
          </GuideLi>
        </GuideUl>
        <Form
          onFinish={createFormFinish}
          form={createForm}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Form.Item
            label="정보이름"
            name="name"
            rules={[
              {
                required: true,
                message: "사업자정보 이름은 필수 입력사항 입니다.",
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>

          <Form.Item
            label="해당 데이터"
            name="value"
            rules={[
              {
                required: true,
                message: "해당 데이터는 필수 입력사항 입니다.",
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>

          <Wrapper al="flex-end">
            <Button type="primary" htmlType="submit" size="small">
              등록
            </Button>
          </Wrapper>
        </Form>
      </Modal>

      {/* UPDATE MODAL */}
      <Modal
        width="680px"
        title="사업자정보 수정 "
        visible={updateModal}
        footer={null}
        onCancel={updateModalToggleHandler}
      >
        <Form
          onFinish={updateFormFinish}
          form={updateForm}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Form.Item name="id">
            <Input size="small" hidden />
          </Form.Item>

          <Form.Item
            label="정보이름"
            name="name"
            rules={[
              {
                required: true,
                message: "사업자정보 이름은 필수 입력사항 입니다.",
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>

          <Form.Item
            label="해당 데이터"
            name="value"
            rules={[
              {
                required: true,
                message: "해당 데이터는 필수 입력사항 입니다.",
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>

          <Wrapper al="flex-end">
            <Button type="primary" htmlType="submit" size="small">
              등록
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
      type: COMPANY_GET_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(BusinessInfomation);
