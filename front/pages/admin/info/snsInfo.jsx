import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Image,
  Popover,
  Switch,
  Table,
  message,
  Button,
  Modal,
  Form,
  Input,
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
  SNS_INFO_LIST_REQUEST,
  SNS_SORT_UPDATE_REQUEST,
  SNS_USE_UPDATE_REQUEST,
  SNS_IMAGE_REQUEST,
  SNS_NEW_REQUEST,
  SET_IMAGE_PATH,
  SNS_UPDATE_REQUEST,
  SNS_DELETE_REQUEST,
} from "../../../reducers/company";

const SnsImage = styled(Image)`
  width: 40px;
  height: 40px;
  object-fit: cover;
`;

const SnsInfo = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    snsInfos,
    st_snsSortUpdateDone,
    st_snsSortUpdateError,
    st_snsUseUpdateDone,
    st_snsUseUpdateError,
    st_snsNewDone,
    st_snsNewError,
    snsImagePath,
    st_snsImageLoading,
    st_snsUpdateDone,
    st_snsUpdateError,
    st_snsDeleteDone,
    st_snsDeleteError,
  } = useSelector((state) => state.company);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("홈정보관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  const createImageInput = useRef();

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
    if (st_snsDeleteDone) {
      dispatch({
        type: SNS_INFO_LIST_REQUEST,
      });

      return message.success("SNS정보가 삭제되었습니다.");
    }
  }, [st_snsDeleteDone]);

  useEffect(() => {
    if (st_snsSortUpdateDone) {
      dispatch({
        type: SNS_INFO_LIST_REQUEST,
      });

      return message.success("우선순위가 변경되었습니다.");
    }
  }, [st_snsSortUpdateDone]);

  useEffect(() => {
    if (st_snsUpdateDone) {
      dispatch({
        type: SNS_INFO_LIST_REQUEST,
      });
      updateModalToggleHandler();

      return message.success("기존 SNS정보가 수정되었습니다.");
    }
  }, [st_snsUpdateDone]);

  useEffect(() => {
    if (st_snsNewDone) {
      dispatch({
        type: SNS_INFO_LIST_REQUEST,
      });

      createModalToggleHandler();
      createForm.resetFields();

      return message.success("새로운 SNS정보가 등록되었습니다.");
    }
  }, [st_snsNewDone]);

  useEffect(() => {
    if (st_snsUseUpdateDone) {
      dispatch({
        type: SNS_INFO_LIST_REQUEST,
      });

      return message.success("사용여부가 변경되었습니다.");
    }
  }, [st_snsUseUpdateDone]);

  useEffect(() => {
    if (st_snsUseUpdateError) {
      dispatch({
        type: SNS_INFO_LIST_REQUEST,
      });

      return message.success(st_snsUseUpdateError);
    }
  }, [st_snsUseUpdateError]);

  useEffect(() => {
    if (st_snsNewError) {
      dispatch({
        type: SNS_INFO_LIST_REQUEST,
      });

      return message.success(st_snsNewError);
    }
  }, [st_snsNewError]);

  useEffect(() => {
    if (st_snsDeleteError) {
      dispatch({
        type: SNS_INFO_LIST_REQUEST,
      });

      return message.success(st_snsDeleteError);
    }
  }, [st_snsDeleteError]);

  useEffect(() => {
    if (st_snsUpdateError) {
      dispatch({
        type: SNS_INFO_LIST_REQUEST,
      });

      return message.success(st_snsUpdateError);
    }
  }, [st_snsUpdateError]);

  useEffect(() => {
    if (st_snsSortUpdateError) {
      dispatch({
        type: SNS_INFO_LIST_REQUEST,
      });

      return message.success(st_snsSortUpdateError);
    }
  }, [st_snsSortUpdateError]);

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

  const deleteHandler = useCallback((data) => {
    dispatch({
      type: SNS_DELETE_REQUEST,
      data: {
        id: data.id,
        name: data.name,
      },
    });
  }, []);

  const updateSnsInfoHandler = useCallback(
    (data) => {
      if (!snsImagePath) {
        return message.error("SNS 이미지를 선택해주세요.");
      }

      dispatch({
        type: SNS_UPDATE_REQUEST,
        data: {
          id: currentId,
          image: snsImagePath,
          name: data.name,
          link: data.link,
        },
      });
    },
    [currentId, snsImagePath]
  );

  const newSnsInfoHandler = useCallback(
    (data) => {
      if (!snsImagePath) {
        return message.error("SNS 이미지를 선택해주세요.");
      }

      dispatch({
        type: SNS_NEW_REQUEST,
        data: {
          image: snsImagePath,
          name: data.name,
          link: data.link,
        },
      });
    },
    [snsImagePath]
  );

  const clickImageUpload = useCallback(() => {
    createImageInput.current.click();
  }, [createImageInput.current]);

  const onChangeImages = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: SNS_IMAGE_REQUEST,
      data: formData,
    });
  });

  const createModalToggleHandler = useCallback(() => {
    setCreateModal((prev) => !prev);
  }, [createModal]);

  const updateModalToggleHandler = useCallback(
    (data) => {
      if (data) {
        setCurrentId(data.id);

        updateForm.setFieldsValue({
          name: data.name,
          link: data.link,
        });

        dispatch({
          type: SET_IMAGE_PATH,
          data: {
            value: data.imageURL,
          },
        });
      }

      setUpdateModal((prev) => !prev);
    },
    [updateModal, currentId]
  );

  const useYnClickHandler = useCallback((data) => {
    const sendData = {
      id: data.id,
      nextFlag: data.useYn === 1 ? 0 : 1,
      name: data.name,
    };

    dispatch({
      type: SNS_USE_UPDATE_REQUEST,
      data: sendData,
    });
  }, []);

  const sortUpdateHandler = useCallback((data, type) => {
    if (type === 1) {
      if (data["sort"] === 1) {
        return message.error("더 이상 우선순위를 높게 할 수 없습니다.");
      }

      dispatch({
        type: SNS_SORT_UPDATE_REQUEST,
        data: {
          id: data.id,
          nextSort: parseInt(data.sort) - 1,
          name: data.name,
        },
      });
    } else {
      dispatch({
        type: SNS_SORT_UPDATE_REQUEST,
        data: {
          id: data.id,
          nextSort: parseInt(data.sort) + 1,
          name: data.name,
        },
      });
    }
  }, []);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const col = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "이미지",
      render: (data) => <SnsImage src={data.imageURL} />,
    },
    {
      title: "SNS",
      dataIndex: "name",
    },
    {
      title: "연결링크",
      dataIndex: "link",
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
      title: "최근작업자",
      dataIndex: "username",
    },
    {
      title: "정보 생성일",
      dataIndex: "createdAt",
    },
    {
      title: "최근작업자",
      dataIndex: "username",
    },
    {
      title: "최근 수정일",
      dataIndex: "updatedAt",
    },
    {
      title: "사용여부",
      render: (data) => (
        <Switch checked={data.useYn} onClick={() => useYnClickHandler(data)} />
      ),
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
          title={"정말 삭제하시겠습니까?"}
          onConfirm={() => deleteHandler(data)}
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
            {level2}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>
            SNS정보는 이름, 이미지 그리고 연결된 링크로 구성됩니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            이미지는 픽셀기준 100 x 100 사이즈로 업로드해주세요. 이미지 크기가
            상이할 경우 화면에 비정상적으로 보일 수 있습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* CONTENT */}

      <Wrapper padding={`0px 50px`}>
        <Wrapper al={`flex-end`} margin={`0px 0px 5px 0px`}>
          <Button
            size="small"
            type="primary"
            onClick={() => createModalToggleHandler()}
          >
            SNS추가
          </Button>
        </Wrapper>

        <Table
          size="small"
          rowKey="id"
          columns={col}
          dataSource={snsInfos ? snsInfos : []}
          style={{ width: "100%" }}
        />
      </Wrapper>

      {/* CREATE FORM */}
      <Modal
        width={`680px`}
        footer={null}
        title={`신규 SNS정보`}
        visible={createModal}
        onCancel={() => createModalToggleHandler()}
      >
        <GuideUl>
          <GuideLi>
            최초등록 사용여부는 'Y'로 등록됩니다. 홈페이지에 즉시 반영되오니
            데이터를 한번 더 확인해주세요.
          </GuideLi>
          <GuideLi isImpo={true}>
            이미지는 픽셀기준 200 x 200 사이즈로 업로드해주세요. 이미지가 상이한
            경우 화면에 상이하게 보일 수 있습니다.
          </GuideLi>
        </GuideUl>

        <Wrapper margin={`0px 0px 10px 0px`} al={`flex-start`}>
          {snsImagePath === null ? (
            <>
              <div>등록된 이미지가 없습니다. 이미지를 등록해주세요.</div>
              <input
                type="file"
                name="image"
                accept=".png, .jpg"
                // multiple
                hidden
                ref={createImageInput}
                onChange={onChangeImages}
              />
              <Button
                size="small"
                type="primary"
                onClick={clickImageUpload}
                loading={st_snsImageLoading}
              >
                이미지 업로드
              </Button>
            </>
          ) : (
            <>
              <Wrapper margin={`0px 0px 10px 0px`} al={`flex-start`}>
                <Image
                  src={snsImagePath}
                  width="200px"
                  height="200px"
                  style={{ objectFit: "cover" }}
                />
              </Wrapper>
              <input
                type="file"
                name="image"
                accept=".png, .jpg"
                // multiple
                hidden
                ref={createImageInput}
                onChange={onChangeImages}
              />
              <Button
                size="small"
                type="primary"
                onClick={clickImageUpload}
                loading={st_snsImageLoading}
              >
                이미지 변경
              </Button>
            </>
          )}
        </Wrapper>

        <Form
          form={createForm}
          wrapperCol={{ span: 21 }}
          labelCol={{ span: 3 }}
          onFinish={newSnsInfoHandler}
        >
          <Form.Item
            label="SNS이름"
            name="name"
            rules={[{ required: true, message: "SNS이름은 필수입니다." }]}
          >
            <Input size="small" allowClear />
          </Form.Item>

          <Form.Item
            label="연동 URL"
            name="link"
            rules={[{ required: true, message: "연동URL은 필수입니다." }]}
          >
            <Input size="small" allowClear />
          </Form.Item>

          <Wrapper al={`flex-end`}>
            <Button size="small" type="primary" htmlType="submit">
              등록
            </Button>
          </Wrapper>
        </Form>
      </Modal>

      {/* UPDATE FORM */}
      <Modal
        width={`680px`}
        footer={null}
        title={`SNS정보 수정`}
        visible={updateModal}
        onCancel={() => updateModalToggleHandler(null)}
      >
        <GuideUl>
          <GuideLi>
            최초등록 사용여부는 'Y'로 등록됩니다. 홈페이지에 즉시 반영되오니
            데이터를 한번 더 확인해주세요.
          </GuideLi>
          <GuideLi isImpo={true}>
            이미지는 픽셀기준 200 x 200 사이즈로 업로드해주세요. 이미지가 상이한
            경우 화면에 상이하게 보일 수 있습니다.
          </GuideLi>
        </GuideUl>

        <Wrapper margin={`0px 0px 10px 0px`} al={`flex-start`}>
          <>
            <Wrapper margin={`0px 0px 10px 0px`} al={`flex-start`}>
              <Image
                src={snsImagePath}
                width="200px"
                height="200px"
                style={{ objectFit: "cover" }}
              />
            </Wrapper>
            <input
              type="file"
              name="image"
              accept=".png, .jpg"
              // multiple
              hidden
              ref={createImageInput}
              onChange={onChangeImages}
            />
            <Button
              size="small"
              type="primary"
              onClick={clickImageUpload}
              loading={st_snsImageLoading}
            >
              이미지 변경
            </Button>
          </>
        </Wrapper>

        <Form
          form={updateForm}
          wrapperCol={{ span: 21 }}
          labelCol={{ span: 3 }}
          onFinish={updateSnsInfoHandler}
        >
          <Form.Item
            label="SNS이름"
            name="name"
            rules={[{ required: true, message: "SNS이름은 필수입니다." }]}
          >
            <Input size="small" allowClear />
          </Form.Item>

          <Form.Item
            label="연동 URL"
            name="link"
            rules={[{ required: true, message: "연동URL은 필수입니다." }]}
          >
            <Input size="small" allowClear />
          </Form.Item>

          <Wrapper al={`flex-end`}>
            <Button size="small" type="primary" htmlType="submit">
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
      type: SNS_INFO_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(SnsInfo);
