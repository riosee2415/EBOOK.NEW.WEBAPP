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
  ModalBtn,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  HomeOutlined,
  RightOutlined,
  EyeOutlined,
  AlertOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {
  MEDIA_CREATE_REQUEST,
  MEDIA_FILE_RESET,
  MEDIA_FILE_UPLOAD_REQUEST,
  MEDIA_ADMIN_LIST_REQUEST,
  MEDIA_UPDATE_REQUEST,
} from "../../../reducers/media";

const InfoTitle = styled.div`
  font-size: 19px;
  margin: 15px 0px 5px 0px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding-left: 15px;
  color: ${(props) => props.theme.subTheme5_C};
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.subTheme5_C : props.theme.lightGrey_C};
`;

const Video = styled.video`
  display: none;
`;

const Media = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("강의관리");
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
    mediaAdminList,

    mediaPath,
    //
    st_mediaFileUploadLoading,
    st_mediaFileUploadError,
    //
    st_mediaCreateLoading,
    st_mediaCreateDone,
    st_mediaCreateError,
    //
    st_mediaUpdateLoading,
    st_mediaUpdateDone,
    st_mediaUpdateError,
    //
    st_mediaDeleteLoading,
    st_mediaDeleteDone,
    st_mediaDeleteError,
  } = useSelector((state) => state.media);

  const [cForm] = Form.useForm();
  const [infoForm] = Form.useForm();

  const fileRef = useRef();

  const [cModal, setCModal] = useState(false);

  const [mediaDuration, setMediaDuration] = useState(null);

  const [serachTitle, setSearchTitle] = useState(null);

  const [currentData, setCurrentData] = useState(null);
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

  // 업로드
  useEffect(() => {
    if (mediaPath) {
      const video = document.getElementById("video-js");

      if (video) {
        video.addEventListener("loadedmetadata", () => {
          setMediaDuration(String(video.duration));
        });
      }
    }
  }, [mediaPath, mediaDuration]);

  useEffect(() => {
    if (st_mediaFileUploadError) {
      return message.error(st_mediaFileUploadError);
    }
  }, [st_mediaFileUploadError]);

  // 검색
  useEffect(() => {
    dispatch({
      type: MEDIA_ADMIN_LIST_REQUEST,
      data: {
        title: serachTitle,
      },
    });
  }, [serachTitle]);

  // 영상 생성
  useEffect(() => {
    if (st_mediaCreateDone) {
      dispatch({
        type: MEDIA_ADMIN_LIST_REQUEST,
        data: {
          title: serachTitle,
        },
      });

      cModalToggle();
      return message.success("영상을 생성했습니다.");
    }

    if (st_mediaCreateError) {
      return message.error(st_mediaCreateError);
    }
  }, [st_mediaCreateDone, st_mediaCreateError]);

  // 영상 수정
  useEffect(() => {
    if (st_mediaUpdateDone) {
      dispatch({
        type: MEDIA_ADMIN_LIST_REQUEST,
        data: {
          title: serachTitle,
        },
      });

      return message.success("영상을 수정했습니다.");
    }

    if (st_mediaUpdateError) {
      return message.error(st_mediaUpdateError);
    }
  }, [st_mediaUpdateDone, st_mediaUpdateError]);

  ////// TOGGLE //////
  const cModalToggle = useCallback(() => {
    setCModal((prev) => !prev);

    cForm.resetFields();

    setMediaDuration(null);
    setCurrentData(null);
    dispatch({
      type: MEDIA_FILE_RESET,
      data: {
        mediaPath: null,
      },
    });
  }, [cModal]);

  ////// HANDLER //////

  // 검색
  const serachTitleHandler = useCallback(
    (data) => {
      setSearchTitle(data.title);
    },
    [serachTitle]
  );

  // 파일 업로드
  const fileRefClickHandler = useCallback(() => {
    fileRef.current.click();
  }, []);

  const fileUploadHandler = useCallback(
    (e) => {
      const formData = new FormData();

      [].forEach.call(e.target.files, (file) => {
        setMediaDuration(null);
        if (currentData) {
          infoForm.setFieldsValue({
            mediaOriginName: file.name,
          });
        } else {
          cForm.setFieldsValue({
            mediaOriginName: file.name,
          });
        }
        formData.append("file", file);
      });

      dispatch({
        type: MEDIA_FILE_UPLOAD_REQUEST,
        data: formData,
      });
    },
    [currentData]
  );

  // 선택
  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);
      setMediaDuration(record.duration);

      dispatch({
        type: MEDIA_FILE_RESET,
        data: {
          mediaPath: record.mediaPath,
        },
      });

      infoForm.setFieldsValue({
        title: record.title,
        mediaOriginName: record.mediaOriginName,
        viewCreatedAt: record.viewCreatedAt,
        viewUpdatedAt: record.viewUpdatedAt,
      });
    },
    [currentData]
  );

  // 상품 등록
  const mediaCreateHandler = useCallback(
    (data) => {
      if (!mediaPath) {
        return message.info("잠시 후 다시 시도해주세요.");
      }
      if (!mediaDuration) {
        return message.info("잠시 후 다시 시도해주세요.");
      }

      dispatch({
        type: MEDIA_CREATE_REQUEST,
        data: {
          title: data.title,
          mediaOriginName: data.mediaOriginName,
          mediaPath: mediaPath,
          duration: mediaDuration,
        },
      });
    },
    [mediaPath, mediaDuration]
  );

  // 상품 업로드
  const mediaUpdateHandler = useCallback(
    (data) => {
      if (!mediaPath) {
        return message.info("잠시 후 다시 시도해주세요.");
      }
      if (!mediaDuration) {
        return message.info("잠시 후 다시 시도해주세요.");
      }

      dispatch({
        type: MEDIA_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          title: data.title,
          mediaOriginName: data.mediaOriginName,
          mediaPath: mediaPath,
          duration: mediaDuration,
        },
      });
    },
    [currentData, mediaPath, mediaDuration]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const columns = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "강의이름",
      dataIndex: "title",
    },
    {
      title: "강의파일이름",
      dataIndex: "mediaOriginName",
    },
    {
      title: "생성일",
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
          <GuideLi>영상을 관리할 수 있습니다.</GuideLi>
          <GuideLi>강의이름으로 검색할 수 있습니다.</GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 20px" al="flex-start">
        <Wrapper
          width={`calc(50% - 10px)`}
          margin="5px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper dr={`row`} ju={`space-between`}>
            <Wrapper width={`auto`} dr={`row`}>
              <Form
                style={{ display: "flex" }}
                layout="inline"
                onFinish={serachTitleHandler}
              >
                <Form.Item style={{ width: `300px`, margin: `0` }} name="title">
                  <Input
                    width={`100%`}
                    size="small"
                    placeholder="강의이름으로 검색할 수 있습니다."
                  />
                </Form.Item>
                <Button
                  size="small"
                  type="primary"
                  style={{ margin: `4px 0 0` }}
                  htmlType="submit"
                >
                  검색
                </Button>
              </Form>
            </Wrapper>
            <Button size="small" type="primary" onClick={cModalToggle}>
              상품 생성
            </Button>
          </Wrapper>
          <Table
            size="small"
            dataSource={mediaAdminList}
            columns={columns}
            rowKey="num"
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
          {currentData && (
            <>
              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  강의영상 상세정보
                </InfoTitle>
              </Wrapper>

              <Form
                form={infoForm}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                style={{ width: "100%", paddingRight: "20px" }}
                onFinish={mediaUpdateHandler}
              >
                <Form.Item
                  label="강의이름"
                  name="title"
                  rules={[
                    { required: true, message: "강의이름은 필수 입니다." },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>

                <input
                  type="file"
                  hidden
                  accept=".mp4"
                  ref={fileRef}
                  onChange={fileUploadHandler}
                />

                <Wrapper width={`auto`} dr={`row`}>
                  <Form.Item
                    label="영상 파일"
                    name="mediaOriginName"
                    rules={[
                      { required: true, message: "영상 파일은 필수 입니다." },
                    ]}
                    style={{ width: `calc(100% - 100px)` }}
                  >
                    <Input
                      size="small"
                      width={`100%`}
                      readOnly
                      placeholder="영상을 업로드해주세요."
                    />
                  </Form.Item>
                  <Button
                    style={{ width: `100px`, margin: `0 0 23px` }}
                    size="small"
                    type="primary"
                    onClick={fileRefClickHandler}
                    loading={st_mediaFileUploadLoading}
                  >
                    업로드
                  </Button>
                </Wrapper>

                <Wrapper margin={`0 0 40px`}>
                  <video
                    id={`video-js`}
                    controls={true}
                    width={`700px`}
                    src={mediaPath}
                  />
                </Wrapper>

                <Wrapper dr={`row`} ju="flex-end">
                  <Popconfirm
                    title="해당 상품을 삭제하시겠습니까?"
                    okText="삭제"
                    cancelText="취소"
                    // onConfirm={lectureDeleteHandler}
                  >
                    <ModalBtn
                      size="small"
                      type="danger"
                      loading={st_mediaDeleteLoading}
                    >
                      강의 삭제
                    </ModalBtn>
                  </Popconfirm>
                  <ModalBtn
                    type="primary"
                    size="small"
                    htmlType="submit"
                    loading={st_mediaUpdateLoading}
                  >
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
            </>
          )}
        </Wrapper>
      </Wrapper>

      {/* CREATE MODEL */}
      <Modal
        width={`800px`}
        title="영상 생성"
        visible={cModal}
        onCancel={cModalToggle}
        footer={null}
      >
        <Form form={cForm} onFinish={mediaCreateHandler}>
          <Form.Item
            label="영상 제목"
            name="title"
            rules={[{ required: true, message: "영상 제목은 필수 입니다." }]}
          >
            <Input size="small" placeholder="영상 제목을 입력해주세요." />
          </Form.Item>
          <input
            type="file"
            hidden
            accept=".mp4"
            ref={fileRef}
            onChange={fileUploadHandler}
          />
          <Wrapper width={`auto`} dr={`row`}>
            <Form.Item
              label="영상 파일"
              name="mediaOriginName"
              rules={[{ required: true, message: "영상 파일은 필수 입니다." }]}
              style={{ width: `calc(100% - 100px)` }}
            >
              <Input
                size="small"
                width={`100%`}
                readOnly
                placeholder="영상을 업로드해주세요."
              />
            </Form.Item>
            <Button
              style={{ width: `100px`, margin: `0 0 23px` }}
              size="small"
              type="primary"
              onClick={fileRefClickHandler}
              loading={st_mediaFileUploadLoading}
            >
              업로드
            </Button>
          </Wrapper>

          <Video id={`video-js`} src={mediaPath} />

          <Wrapper dr={`row`} ju={`flex-end`}>
            <ModalBtn size="small" onClick={cModalToggle}>
              취소
            </ModalBtn>
            <ModalBtn
              size="small"
              type="primary"
              htmlType="submit"
              loading={st_mediaCreateLoading}
            >
              생성
            </ModalBtn>
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
      type: MEDIA_ADMIN_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Media);
