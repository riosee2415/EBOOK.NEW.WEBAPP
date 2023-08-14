import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  Button,
  Table,
  Form,
  Input,
  Select,
  message,
  Switch,
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
  ModalBtn,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import {
  NOTICE_LIST_REQUEST,
  NOTICE_UPDATE_REQUEST,
  NOTICE_FILE_REQUEST,
  NOTICE_FILE_INFO_REQUEST,
  UPLOAD_PATH_INIT,
  NOTICE_CREATE_REQUEST,
  NOTICE_DELETE_REQUEST,
} from "../../../reducers/notice";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  HomeOutlined,
  RightOutlined,
  EyeOutlined,
  AlertOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { saveAs } from "file-saver";

import dynamic from "next/dynamic";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function comp({ forwardedRef, ...props }) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);
import "react-quill/dist/quill.snow.css";

const QuillWrapper = styled(ReactQuill)`
  & .ql-container {
    min-height: 400px;
  }

  & .ql-toolbar.ql-snow {
    border-radius: 5px 5px 0 0;
  }
  & .ql-toolbar.ql-snow + .ql-container.ql-snow {
    border-radius: 0 0 5px 5px;
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
  color: ${(props) => props.theme.subTheme_C};
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.subTheme_C : props.theme.lightGrey_C};
`;

const Notice = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    notices,
    //
    st_noticeUpdateDone,
    st_noticeUpdateError,
    //
    uploadFilePath,
    //
    st_noticeFileLoading,
    st_noticeFileDone,
    //
    st_noticeFileInfoDone,
    st_noticeFileInfoError,
    //
    st_noticeCreateDone,
    st_noticeCreateError,
    //
    st_noticeDeleteLoading,
    st_noticeDeleteDone,
    st_noticeDeleteError,
  } = useSelector((state) => state.notice);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("게시판관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const [currentData, setCurrentData] = useState(null);
  const [currentTop, setCurrentTop] = useState(false);
  const [tab, setTab] = useState(0);
  const [createModal, setCreateModal] = useState(false);

  const [infoForm] = Form.useForm();

  const fileRef = useRef();
  const quillRef = useRef();

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
    if (uploadFilePath) {
      // setCurrentData((prev) => {
      //   return {
      //     ...prev,
      //     file: uploadFilePath,
      //   };
      // });

      // return message.success(
      //   "파일이 업로드되었습니다. 적용하기 버튼을 눌러주세요."
      // );

      // S3 Presigned URL로 업로드하고 image url 받아오기

      // 현재 커서 위치에 이미지를 삽입하고 커서 위치를 +1 하기
      if (quillRef.current) {
        const range = quillRef.current.getEditorSelection();
        quillRef.current
          .getEditor()
          .insertEmbed(range.index, "image", uploadFilePath);
        quillRef.current.getEditor().setSelection(range.index + 1);
        document.body.querySelector(":scope > input").remove();
      }
    }
  }, [uploadFilePath, quillRef]);

  // ********************** 공지사항 생성 후처리 *************************
  useEffect(() => {
    if (st_noticeCreateDone) {
      message.success("정보가 업데이트 되었습니다.");

      let sendType = "";

      switch (tab) {
        case 0:
          sendType = "";
          break;

        case 1:
          sendType = "공지사항";
          break;

        case 2:
          sendType = "새소식";
          break;

        default:
          break;
      }

      dispatch({
        type: NOTICE_LIST_REQUEST,
        data: {
          type: sendType,
        },
      });
    }
  }, [st_noticeCreateDone]);

  useEffect(() => {
    if (st_noticeCreateError) {
      return message.error(st_noticeCreateError);
    }
  }, [st_noticeCreateError]);

  // ********************** 공지사항 수정 *************************
  useEffect(() => {
    if (st_noticeUpdateDone) {
      message.success("정보가 업데이트 되었습니다.");

      let sendType = "";

      switch (tab) {
        case 0:
          sendType = "";
          break;

        case 1:
          sendType = "공지사항";
          break;

        case 2:
          sendType = "새소식";
          break;

        default:
          break;
      }

      dispatch({
        type: NOTICE_LIST_REQUEST,
        data: {
          type: sendType,
        },
      });
    }
  }, [st_noticeUpdateDone]);

  useEffect(() => {
    if (st_noticeUpdateError) {
      return message.error(st_noticeUpdateError);
    }
  }, [st_noticeUpdateError]);

  // ********************** 공지사항 삭제 *************************
  useEffect(() => {
    if (st_noticeDeleteDone) {
      message.success("정보가 삭제 되었습니다.");

      let sendType = "";

      switch (tab) {
        case 0:
          sendType = "";
          break;

        case 1:
          sendType = "공지사항";
          break;

        case 2:
          sendType = "새소식";
          break;

        default:
          break;
      }

      dispatch({
        type: NOTICE_LIST_REQUEST,
        data: {
          type: sendType,
        },
      });
    }
  }, [st_noticeDeleteDone]);

  useEffect(() => {
    if (st_noticeDeleteError) {
      return message.error(st_noticeDeleteError);
    }
  }, [st_noticeDeleteError]);

  // ********************** 공지사항 파일정보 적용 *************************
  useEffect(() => {
    if (st_noticeFileInfoDone) {
      return message.success("정보가 업데이트 되었습니다.");
    }
  }, [st_noticeFileInfoDone]);

  useEffect(() => {
    if (st_noticeFileInfoError) {
      return message.error(st_noticeFileInfoError);
    }
  }, [st_noticeFileInfoError]);

  useEffect(() => {
    setCurrentData(null);
    let sendType = "";

    switch (tab) {
      case 0:
        sendType = "";
        break;

      case 1:
        sendType = "공지사항";
        break;

      case 2:
        sendType = "새소식";
        break;

      default:
        break;
    }

    dispatch({
      type: NOTICE_LIST_REQUEST,
      data: {
        type: sendType,
      },
    });
  }, [tab]);

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

  const createWithTypeHandler = useCallback((typeValue) => {
    dispatch({
      type: NOTICE_CREATE_REQUEST,
      data: {
        type: typeValue,
      },
    });

    createModalToggle();
  }, []);

  const createModalToggle = useCallback(() => {
    setCreateModal((prev) => !prev);
  }, [createModal]);

  const clickFileUpload = useCallback(() => {
    fileRef.current.click();
  }, [fileRef.current]);

  const onChangeFiles = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("file", file);
    });

    dispatch({
      type: NOTICE_FILE_REQUEST,
      data: formData,
    });
  });

  const fileDownloadHandler = useCallback(async (filepath) => {
    const filename = "web_notice_file";
    const ext = filepath.split(".");
    const _ext = ext[ext.length - 1];

    const finalFilename = `${filename}.${_ext}`;

    let blob = await fetch(filepath).then((r) => r.blob());

    const element = document.createElement("a");
    const file = new Blob([blob]);

    saveAs(file, finalFilename);
  }, []);

  const onTypeChange = useCallback(
    (value) => {
      infoForm.setFieldsValue({
        type: value,
      });
    },
    [infoForm]
  );

  const beforeSetDataHandler = useCallback(
    (record) => {
      dispatch({
        type: UPLOAD_PATH_INIT,
      });

      setCurrentData(record);
      setCurrentTop(record.isTop);

      infoForm.setFieldsValue({
        title: record.title,
        type: record.type,
        content: record.content,
        hit: record.hit,
        isUpdate: record.isUpdate,
        createdAt: record.viewCreatedAt,
        updatedAt: record.viewUpdatedAt,
        updator: record.updator,
      });
    },
    [currentData, infoForm, currentTop]
  );

  const infoFormFinish = useCallback(
    (data) => {
      dispatch({
        type: NOTICE_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          title: data.title.replace(/\'/gi, `''`, /\"/gi, `""`),
          content: data.content.replace(/\'/gi, `''`, /\"/gi, `""`),
          type: data.type,
          isUpdate: data.isUpdate ? 1 : 0,
        },
      });
    },
    [currentData]
  );

  const deleteNoticeHandler = useCallback(() => {
    dispatch({
      type: NOTICE_DELETE_REQUEST,
      data: {
        noticeId: currentData.id,
      },
    });
  }, [currentData]);

  const applyFileHandler = useCallback(() => {
    dispatch({
      type: NOTICE_FILE_INFO_REQUEST,
      data: {
        id: currentData.id,
        filepath: uploadFilePath,
        title: currentData.title,
      },
    });
  }, [uploadFilePath, currentData]);

  ////// DATAVIEW //////

  const imageHandler = useCallback((data) => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("hidden", true);
    input.setAttribute("accept", "image/*");
    document.body.appendChild(input);

    input.click();

    input.onchange = async () => {
      const [file] = input.files;

      const formData = new FormData();

      formData.append("file", file);

      dispatch({
        type: NOTICE_FILE_REQUEST,
        data: formData,
      });
    };
  }, []);

  // useMemo를 사용한 이유는 modules가 렌더링마다 변하면 에디터에서 입력이 끊기는 버그가 발생
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: { image: imageHandler },
      },
    }),
    []
  );

  ////// DATA COLUMNS //////

  const noticeCol = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "유형",
      dataIndex: "type",
    },
    {
      title: "공지사항 제목",
      dataIndex: "title",
      width: "50%",
    },
    {
      title: "작성일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "상태창",
      render: (data) => (
        <ViewStatusIcon
          active={
            parseInt(data.id) === (currentData && parseInt(currentData.id))
          }
        />
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
            {level2}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>
            공지사항을 추가 / 수정 / 삭제 등 관리를 할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>업데이트 시 회원에게 보일수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            삭제처리 된 공지사항은 복구가 불가능합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* TAB */}
      <Wrapper padding={`10px`} dr={`row`} ju="flex-start">
        <Button
          type={tab === 0 ? "primary" : "default"}
          size="small"
          onClick={() => setTab(0)}
        >
          전체
        </Button>
        <Button
          type={tab === 1 ? "primary" : "default"}
          size="small"
          onClick={() => setTab(1)}
        >
          공지사항
        </Button>
        <Button
          type={tab === 2 ? "primary" : "default"}
          size="small"
          onClick={() => setTab(2)}
        >
          새소식
        </Button>
      </Wrapper>

      {/* CONTENT */}

      <Wrapper dr="row" padding="0px 20px" al="flex-start">
        <Wrapper
          width={`calc(50% - 10px)`}
          margin="5px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper al="flex-end">
            <Button size="small" type="primary" onClick={createModalToggle}>
              공지사항 생성
            </Button>
          </Wrapper>
          <Table
            size="small"
            dataSource={notices}
            columns={noticeCol}
            rowKey="id"
            style={{ width: "100%" }}
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          ></Table>
        </Wrapper>
        <Wrapper
          width={`calc(50% - 10px)`}
          margin="5px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          {currentData ? (
            <>
              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  공지사항 기본정보
                </InfoTitle>
              </Wrapper>

              <Form
                form={infoForm}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                style={{ width: "100%", paddingRight: "20px" }}
                onFinish={infoFormFinish}
              >
                <Form.Item
                  label="제목"
                  name="title"
                  rules={[
                    { required: true, message: "제목은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>

                <Form.Item
                  label="유형"
                  name="type"
                  rules={[
                    { required: true, message: "유형은 필수 선택사항 입니다." },
                  ]}
                >
                  <Select onChange={onTypeChange} size="small">
                    <Option value="새소식">새소식</Option>
                    <Option value="공지사항">공지사항</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="내용"
                  name="content"
                  rules={[
                    { required: true, message: "내용은 필수 입력사항 입니다." },
                  ]}
                >
                  <QuillWrapper
                    forwardedRef={quillRef}
                    style={{ width: `100%`, height: `100%` }}
                    theme="snow"
                    modules={modules}
                  />
                </Form.Item>

                <Form.Item
                  label="보임여부"
                  name="isUpdate"
                  valuePropName="checked"
                >
                  <Switch size="small" />
                </Form.Item>

                <Form.Item label="조회수" name="hit">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="작성일" name="createdAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="수정일" name="updatedAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="최근작업자" name="updator">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Wrapper dr={`row`} ju="flex-end">
                  <Popconfirm
                    title="삭제하시겠습니까?"
                    okText="삭제"
                    cancelText="취소"
                    onConfirm={deleteNoticeHandler}
                  >
                    <ModalBtn type="danger" size="small">
                      삭제
                    </ModalBtn>
                  </Popconfirm>
                  <ModalBtn type="primary" size="small" htmlType="submit">
                    정보 업데이트
                  </ModalBtn>
                </Wrapper>
              </Form>

              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey_C}
                margin={`30px 0px`}
              ></Wrapper>
              {/* 
              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  공지사항 파일정보
                </InfoTitle>
              </Wrapper> */}

              {/* <Wrapper padding="0px 20px">
                {currentData.file ? (
                  <Wrapper al="flex-start">
                    <Text>등록된 파일이 1개 있습니다.</Text>
                    <Wrapper dr="row" ju="flex-start">
                      <Button
                        type="defalut"
                        size="small"
                        onClick={() => fileDownloadHandler(currentData.file)}
                      >
                        다운로드
                      </Button>

                      <input
                        type="file"
                        name="file"
                        // accept=".png, .jpg"
                        // multiple
                        hidden
                        ref={fileRef}
                        onChange={onChangeFiles}
                      />

                      <Button
                        type="danger"
                        size="small"
                        onClick={clickFileUpload}
                        loading={st_noticeFileLoading}
                      >
                        수정하기
                      </Button>

                      {uploadFilePath && (
                        <Button
                          type="primary"
                          size="small"
                          style={{ marginLeft: "10px" }}
                          onClick={applyFileHandler}
                        >
                          적용하기
                        </Button>
                      )}
                    </Wrapper>
                  </Wrapper>
                ) : (
                  <Wrapper al="flex-start">
                    <Text>등록된 파일이 없습니다.</Text>

                    <Wrapper ju="flex-start" dr="row">
                      <input
                        type="file"
                        name="file"
                        // accept=".png, .jpg"
                        // multiple
                        hidden
                        ref={fileRef}
                        onChange={onChangeFiles}
                      />

                      <Button
                        type="danger"
                        size="small"
                        onClick={clickFileUpload}
                        loading={st_noticeFileLoading}
                      >
                        등록하기
                      </Button>
                    </Wrapper>
                  </Wrapper>
                )}
              </Wrapper>

              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey_C}
                margin={`30px 0px`}
              ></Wrapper> */}
            </>
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
        visible={createModal}
        title="새로운 공지사항 유형선택"
        footer={null}
        width="250px"
        onCancel={createModalToggle}
      >
        <Wrapper dr="row" ju="space-around">
          <Button
            type="primary"
            style={{ margin: "5px" }}
            onClick={() => createWithTypeHandler("공지사항")}
          >
            공지사항
          </Button>
          <Button
            type="primary"
            style={{ margin: "5px" }}
            onClick={() => createWithTypeHandler("새소식")}
          >
            새소식
          </Button>
        </Wrapper>
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
      type: NOTICE_LIST_REQUEST,
      data: {
        title: "",
        type: "",
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Notice);
