import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Popover,
  Select,
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
  SortView,
  UpBtn,
  DownBtn,
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
  BANNER_CREATE_REQUEST,
  BANNER_DELETE_REQUEST,
  BANNER_IMAGE_RESET,
  BANNER_LIST_REQUEST,
  BANNER_MOBILE_UPLOAD_REQUEST,
  BANNER_SORT_UPDATE_REQUEST,
  BANNER_UPDATE_REQUEST,
  BANNER_UPLOAD_REQUEST,
} from "../../../reducers/banner";

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

const Banner = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    bannerList,

    imagePath,
    mobileImagePath,

    st_bannerCreateLoading,
    st_bannerCreateDone,
    st_bannerCreateError,
    //
    st_bannerSortUpdateDone,
    st_bannerSortUpdateError,
    //
    st_bannerUploadLoading,
    st_bannerMobileUploadLoading,
    //
    st_bannerUpdateLoading,
    st_bannerUpdateDone,
    st_bannerUpdateError,
    //
    st_bannerDeleteLoading,
    st_bannerDeleteDone,
    st_bannerDeleteError,
  } = useSelector((state) => state.banner);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("배너관리");
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

  const [cForm] = Form.useForm();
  const [infoForm] = Form.useForm();

  const imageRef = useRef();
  const mobileImageRef = useRef();

  const [currentData, setCurrentData] = useState(null);

  const [cModal, setCModal] = useState(false);

  const [serachType, setSearchType] = useState(null);

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight3)) {
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
      type: BANNER_LIST_REQUEST,
      data: {
        type: serachType,
      },
    });
  }, [serachType]);

  // 배너 생성 후처리
  useEffect(() => {
    if (st_bannerCreateDone) {
      dispatch({
        type: BANNER_LIST_REQUEST,
        data: {
          type: serachType,
        },
      });

      cModalToggle();

      return message.success("베너가 생성되었습니다.");
    }

    if (st_bannerCreateError) {
      return message.error(st_bannerCreateError);
    }
  }, [st_bannerCreateDone, st_bannerCreateError]);

  // 배너 순서변경 후처리
  useEffect(() => {
    if (st_bannerSortUpdateDone) {
      dispatch({
        type: BANNER_LIST_REQUEST,
        data: {
          type: serachType,
        },
      });

      return message.success("베너의 순서가 변경되었습니다.");
    }

    if (st_bannerSortUpdateError) {
      return message.error(st_bannerSortUpdateError);
    }
  }, [st_bannerSortUpdateDone, st_bannerSortUpdateError]);

  // 배너 수정 후처리
  useEffect(() => {
    if (st_bannerUpdateDone) {
      dispatch({
        type: BANNER_LIST_REQUEST,
        data: {
          type: serachType,
        },
      });

      return message.success("베너의 정보가 수정되었습니다.");
    }

    if (st_bannerUpdateError) {
      return message.error(st_bannerUpdateError);
    }
  }, [st_bannerUpdateDone, st_bannerUpdateError]);

  // 배너 삭제 후처리
  useEffect(() => {
    if (st_bannerDeleteDone) {
      dispatch({
        type: BANNER_LIST_REQUEST,
        data: {
          type: serachType,
        },
      });

      setCurrentData(null);

      return message.success("베너가 삭제되었습니다.");
    }

    if (st_bannerDeleteError) {
      return message.error(st_bannerDeleteError);
    }
  }, [st_bannerDeleteDone, st_bannerDeleteError]);

  ////// TOGGLE //////
  const cModalToggle = useCallback(() => {
    cForm.resetFields();
    setCModal((prev) => !prev);
  }, [cModal]);

  ////// HANDLER //////

  // 검색
  const serachTypeHandler = useCallback(
    (type) => {
      setSearchType(type);
    },
    [serachType]
  );

  // 배너 생성
  const bannerCreateHandler = useCallback((data) => {
    dispatch({
      type: BANNER_CREATE_REQUEST,
      data: {
        type: data.type,
      },
    });
  }, []);

  // 순서변경
  const sortUpdateHandler = useCallback((data, type) => {
    if (type === 1) {
      if (data["sort"] === 1) {
        return message.error("더 이상 우선순위를 높게 할 수 없습니다.");
      }

      dispatch({
        type: BANNER_SORT_UPDATE_REQUEST,
        data: {
          id: data.id,
          sort: parseInt(data.sort) - 1,
          type: data.type,
        },
      });
    } else {
      dispatch({
        type: BANNER_SORT_UPDATE_REQUEST,
        data: {
          id: data.id,
          sort: parseInt(data.sort) + 1,
          type: data.type,
        },
      });
    }
  }, []);

  // 선택
  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);

      dispatch({
        type: BANNER_IMAGE_RESET,
        data: {
          imagePath: record.imagePath,
          mobileImagePath: record.mobileImagePath,
        },
      });

      infoForm.setFieldsValue({
        sort: record.sort,
        type: record.type,
        createdAt: record.viewCreatedAt,
        updatedAt: record.viewUpdatedAt,
      });
    },
    [currentData]
  );

  // 파일 업로드
  const imageRefClickHandler = useCallback(() => {
    imageRef.current.click();
  }, []);

  const imageUploadHandler = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: BANNER_UPLOAD_REQUEST,
      data: formData,
    });
  }, []);

  const mobileImageRefClickHandler = useCallback(() => {
    mobileImageRef.current.click();
  }, []);

  const mobileImageUploadHandler = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: BANNER_MOBILE_UPLOAD_REQUEST,
      data: formData,
    });
  }, []);

  const bannerUpdateHandler = useCallback(
    (data) => {
      dispatch({
        type: BANNER_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          type: data.type,
          imagePath: imagePath,
          mobileImagePath: mobileImagePath,
        },
      });
    },
    [currentData, imagePath, mobileImagePath]
  );

  const bannerDeleteHandler = useCallback(() => {
    dispatch({
      type: BANNER_DELETE_REQUEST,
      data: {
        id: currentData.id,
        type: currentData.type,
      },
    });
  }, [currentData]);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const columns = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "유형",
      dataIndex: "viewType",
    },
    {
      title: "베너",
      render: (data) =>
        data.imagePath ? (
          <Image width={`300px`} src={data.imagePath} />
        ) : (
          "등록된 이미지가 없습니다."
        ),
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

  const typeArr = [
    { type: 1, name: "메인" },
    { type: 2, name: "큐레이션" },
    { type: 3, name: "수강후기" },
    { type: 4, name: "고객센터" },
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
          <GuideLi>홈페이지의 베너를 관리할 수 있습니다.</GuideLi>
          <GuideLi>유형에따라 화면에 나오는 베너가 달라집니다.</GuideLi>
          <GuideLi isImpo={true}>
            PC 이미지는 width 1920px, 모바일 이미지는 width 700px을 기준으로
            합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* CONTENT */}

      <Wrapper dr="row" padding="0px 20px" al="flex-start">
        <Wrapper
          width={`calc(50% - 10px)`}
          margin="5px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper dr={`row`} ju={`space-between`}>
            <Wrapper width={`auto`} dr={`row`}>
              <Button
                size="small"
                type={!serachType && "primary"}
                onClick={() => serachTypeHandler(null)}
              >
                전체
              </Button>
              {typeArr &&
                typeArr.map((data, idx) => {
                  return (
                    <Button
                      size="small"
                      key={idx}
                      type={serachType === data.type && "primary"}
                      onClick={() => serachTypeHandler(data.type)}
                    >
                      {data.name}
                    </Button>
                  );
                })}
            </Wrapper>
            <Button
              size="small"
              type="primary"
              onClick={cModalToggle}
              loading={st_bannerCreateLoading}
            >
              베너 생성
            </Button>
          </Wrapper>
          <Table
            size="small"
            dataSource={bannerList}
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
          {currentData ? (
            <>
              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  베너 PC 이미지
                </InfoTitle>
              </Wrapper>

              {imagePath ? (
                <Image width={`100%`} src={imagePath} alt="imagePath" />
              ) : (
                "등록된 이미지가 없습니다."
              )}

              <Wrapper al={`flex-end`} padding={`0 20px`}>
                <input
                  type="file"
                  accept=".jpg, .png"
                  hidden
                  ref={imageRef}
                  onChange={imageUploadHandler}
                />
                <Button
                  size="small"
                  type="primary"
                  onClick={imageRefClickHandler}
                  loading={st_bannerUploadLoading}
                >
                  업로드
                </Button>
              </Wrapper>

              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  베너 모바일 이미지
                </InfoTitle>
              </Wrapper>

              {mobileImagePath ? (
                <Image
                  width={`100%`}
                  src={mobileImagePath}
                  alt="mobileImagePath"
                />
              ) : (
                "등록된 이미지가 없습니다."
              )}

              <Wrapper al={`flex-end`} padding={`0 20px`}>
                <input
                  type="file"
                  accept=".jpg, .png"
                  hidden
                  ref={mobileImageRef}
                  onChange={mobileImageUploadHandler}
                />
                <Button
                  size="small"
                  type="primary"
                  onClick={mobileImageRefClickHandler}
                  loading={st_bannerMobileUploadLoading}
                >
                  업로드
                </Button>
              </Wrapper>

              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  베너 상세정보
                </InfoTitle>
              </Wrapper>

              <Form
                form={infoForm}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                style={{ width: "100%", paddingRight: "20px" }}
                onFinish={bannerUpdateHandler}
              >
                <Form.Item label="유형" name="type">
                  <Select placeholder="유형을 선택해주세요." size="small">
                    {typeArr &&
                      typeArr.map((data, idx) => {
                        return (
                          <Select.Option value={data.type} key={idx}>
                            {data.name}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>

                <Form.Item label="우선순위" name="sort">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="생성일" name="createdAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="최근수정일" name="updatedAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Wrapper dr={`row`} ju="flex-end">
                  <Popconfirm
                    title="해당 베너를 삭제하시겠습니까?"
                    okText="삭제"
                    cancelText="취소"
                    onConfirm={bannerDeleteHandler}
                  >
                    <ModalBtn
                      size="small"
                      type="danger"
                      loading={st_bannerDeleteLoading}
                    >
                      베너 삭제
                    </ModalBtn>
                  </Popconfirm>
                  <ModalBtn
                    type="primary"
                    size="small"
                    htmlType="submit"
                    loading={st_bannerUpdateLoading}
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

      {/* CREATE MODAL */}
      <Modal
        title="베너 생성"
        visible={cModal}
        onCancel={cModalToggle}
        footer={null}
      >
        <Form form={cForm} onFinish={bannerCreateHandler}>
          <Form.Item
            label="유형"
            name="type"
            rules={[{ required: true, message: "유형은 필수 입니다." }]}
          >
            <Select placeholder="유형을 선택해주세요." size="small">
              {typeArr &&
                typeArr.map((data, idx) => {
                  return (
                    <Select.Option value={data.type} key={idx}>
                      {data.name}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Wrapper dr={`row`} ju={`flex-end`}>
            <ModalBtn size="small" onClick={cModalToggle}>
              취소
            </ModalBtn>
            <ModalBtn
              size="small"
              type="primary"
              htmlType="submit"
              loading={st_bannerCreateLoading}
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
      type: BANNER_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Banner);
