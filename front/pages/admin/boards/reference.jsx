import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Popover,
  Table,
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
import {
  REFERENCE_CREATE_REQUEST,
  REFERENCE_DELETE_REQUEST,
  REFERENCE_FILE_RESET,
  REFERENCE_LIST_REQUEST,
  REFERENCE_UPLOAD_REQUEST,
} from "../../../reducers/reference";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";

const Reference = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);

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

  const {
    referenceList,
    filepath,
    //
    st_referenceCreateLoading,
    st_referenceCreateDone,
    st_referenceCreateError,
    //
    st_referenceDeleteLoading,
    st_referenceDeleteDone,
    st_referenceDeleteError,
    //
    st_referenceUploadLoading,
    st_referenceUploadDone,
    st_referenceUploadError,
    //
  } = useSelector((state) => state.reference);

  const [infoForm] = Form.useForm();

  const fileRef = useRef();

  const [infoModal, setInfoModal] = useState(false);

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

  // 자료 업로드 후처리
  useEffect(() => {
    if (st_referenceUploadDone) {
      return message.success("자료가 정상적으로 등록되었습니다.");
    }

    if (st_referenceUploadError) {
      return message.error(st_referenceUploadError);
    }
  }, [st_referenceUploadDone, st_referenceUploadError]);

  // 자료 삭제 후처리
  useEffect(() => {
    if (st_referenceDeleteDone) {
      dispatch({
        type: REFERENCE_LIST_REQUEST,
      });

      return message.success("자료가 삭제되었습니다.");
    }

    if (st_referenceDeleteError) {
      return message.error(st_referenceUploadError);
    }
  }, [st_referenceDeleteDone, st_referenceDeleteError]);

  // 자료 생성 후처리
  useEffect(() => {
    if (st_referenceCreateDone) {
      dispatch({
        type: REFERENCE_LIST_REQUEST,
      });

      infoModalToggle();

      return message.success("자료가 생성되었습니다.");
    }

    if (st_referenceCreateError) {
      return message.error(st_referenceCreateError);
    }
  }, [st_referenceCreateDone, st_referenceCreateError]);

  ////// TOGGLE //////
  const infoModalToggle = useCallback(() => {
    dispatch({
      type: REFERENCE_FILE_RESET,
      data: {
        filepath: null,
      },
    });

    infoForm.resetFields();

    setInfoModal((prev) => !prev);
  }, [infoModal]);

  ////// HANDLER //////

  // 파일 등록
  const clickFileUpload = useCallback(() => {
    fileRef.current.click();
  }, [fileRef.current]);

  const onChangeFiles = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      infoForm.setFieldsValue({ filename: file.name });

      formData.append("file", file);
    });

    dispatch({
      type: REFERENCE_UPLOAD_REQUEST,
      data: formData,
    });
  });

  // 자료생성
  const createHandler = useCallback(
    (data) => {
      dispatch({
        type: REFERENCE_CREATE_REQUEST,
        data: {
          title: data.title,
          filename: data.filename,
          file: filepath,
        },
      });
    },
    [filepath]
  );

  // 자료삭제
  const deleteHandler = useCallback((data) => {
    dispatch({
      type: REFERENCE_DELETE_REQUEST,
      data: {
        id: data.id,
      },
    });
  }, []);

  const fileDownloadHandler = useCallback(async (data) => {
    const ext = data.file.split(".");
    const _ext = ext[ext.length - 1];

    const finalFilename = `${data.filename}.${_ext}`;

    let blob = await fetch(data.file).then((r) => r.blob());

    const element = document.createElement("a");
    const file = new Blob([blob]);

    saveAs(file, finalFilename);
  }, []);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const columns = [
    {
      align: "center",
      width: "10%",
      title: "번호",
      dataIndex: "num",
    },
    {
      width: "30%",
      title: "제목",
      dataIndex: "title",
    },
    {
      width: "25%",
      title: "파일이름",
      dataIndex: "filename",
    },
    {
      width: "10%",
      align: "center",
      title: "파일",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          onClick={() => fileDownloadHandler(data)}
        >
          다운로드
        </Button>
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
          <Button
            size="small"
            type="danger"
            loading={st_referenceDeleteLoading}
          >
            삭제하기
          </Button>
        </Popconfirm>
      ),
    },
    {
      width: "15%",
      title: "생성일",
      dataIndex: "viewCreatedAt",
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
          <GuideLi>고객센터의 자료실을 생성, 삭제할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            자료는 최대 10개까지 등록할 수 있습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 20px" al="flex-start">
        <Wrapper al={`flex-end`} margin={`10px 0`}>
          <Button size="small" type="primary" onClick={infoModalToggle}>
            자료 생성
          </Button>
        </Wrapper>
        <Table
          size="small"
          dataSource={referenceList}
          columns={columns}
          rowKey="num"
          style={{ width: "100%" }}
        ></Table>
      </Wrapper>

      <Modal
        width={`700px`}
        title="자료 생성"
        visible={infoModal}
        footer={null}
        onCancel={infoModalToggle}
      >
        <Form form={infoForm} onFinish={createHandler}>
          <Form.Item
            label="제목"
            name="title"
            rules={[{ required: true, message: "제목은 필수 입니다." }]}
          >
            <Input size="small" placeholder="제목을 입력해주세요." />
          </Form.Item>

          <Wrapper dr={`row`} ju={`space-between`}>
            <Form.Item
              label="파일"
              name="filename"
              rules={[{ required: true, message: "파일은 필수 입니다." }]}
              style={{ width: `calc(100% - 100px)` }}
            >
              <Input size="small" readOnly placeholder="파일을 등록해주세요." />
            </Form.Item>
            <input type="file" hidden ref={fileRef} onChange={onChangeFiles} />
            <Button
              style={{ width: `100px`, margin: `0 0 23px` }}
              size="small"
              type="primary"
              onClick={clickFileUpload}
              loading={st_referenceUploadLoading}
            >
              자료 선택
            </Button>
          </Wrapper>

          <Wrapper dr={`row`} ju={`flex-end`}>
            <Button size="small" onClick={infoModalToggle}>
              취소
            </Button>
            <Button
              size="small"
              type="primary"
              htmlType="submit"
              loading={st_referenceCreateLoading}
            >
              생성
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
      type: REFERENCE_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Reference);
