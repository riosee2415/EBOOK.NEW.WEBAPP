import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  Table,
  message,
  Form,
  Input,
  Button,
  Image,
  Modal,
  Popconfirm,
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
  SortView,
  UpBtn,
  DownBtn,
  DelBtn,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import {
  MAIN_BANNER_REQUEST,
  BANNER_SORT_UPDATE_REQUEST,
  BANNER_UPDATE_REQUEST,
  BANNER_UPLOAD_REQUEST,
  UPLOAD_BANNER_INIT_REQUEST,
  BANNER_ONLY_IMAGE_REQUEST,
  BANNER_USE_YN_REQUEST,
  BANNER_DELETE_REQUEST,
  BANNER_FAST_CREATE_REQUEST,
} from "../../../reducers/banner";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  HomeOutlined,
  RightOutlined,
  AlertOutlined,
  EyeOutlined,
  CheckOutlined,
} from "@ant-design/icons";

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

const FlagText = styled.div`
  width: 120px;
  margin: 0px 20px 0px 0px;
`;

const BannerImage = styled(Image)`
  width: 100%;
  height: 240px;
  object-fit: cover;
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.subTheme5_C : props.theme.lightGrey_C};
`;

const MainBanner = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    banners,
    st_bannerSortUpdateDone,
    st_bannerSortUpdateError,
    st_bannerUpdateDone,
    st_bannerUpdateError,
    st_bannerUploadLoading,
    uploadBannerPath,
    st_bannerOnlyImageUpdateDone,
    st_bannerOnlyImageUpdateError,
    st_bannerUseYnDone,
    st_bannerUseYnError,
    st_bannerDeleteDone,
    st_bannerDeleteError,
    st_bannerFastCreateDone,
    st_bannerFastCreateError,
  } = useSelector((state) => state.banner);

  const router = useRouter();
  const dispatch = useDispatch();

  const bannerInageRef = useRef();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("배너관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [dataIssueModal, setDataIssueModal] = useState(false);

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
    if (st_bannerDeleteDone) {
      dispatch({
        type: MAIN_BANNER_REQUEST,
      });

      message.success("메인베너 데이터가 완전히 삭제되었습니다.");
      setCurrentData(null);
      dispatch({
        type: UPLOAD_BANNER_INIT_REQUEST,
      });
    }
  }, [st_bannerDeleteDone]);

  useEffect(() => {
    if (st_bannerUseYnDone) {
      dispatch({
        type: MAIN_BANNER_REQUEST,
      });

      message.success("사용여부가 변경되었습니다.");
    }
  }, [st_bannerUseYnDone]);

  useEffect(() => {
    if (st_bannerSortUpdateDone) {
      dispatch({
        type: MAIN_BANNER_REQUEST,
      });

      message.success("우선순위가 수정되었습니다.");
    }
  }, [st_bannerSortUpdateDone]);

  useEffect(() => {
    if (st_bannerFastCreateDone) {
      dispatch({
        type: MAIN_BANNER_REQUEST,
      });

      message.success("새로운 배너가 생성되었습니다.");
    }
  }, [st_bannerFastCreateDone]);

  useEffect(() => {
    if (st_bannerOnlyImageUpdateDone) {
      dispatch({
        type: MAIN_BANNER_REQUEST,
      });

      message.success("이미지가 수정되었습니다.");
    }
  }, [st_bannerOnlyImageUpdateDone]);

  useEffect(() => {
    if (st_bannerUpdateDone) {
      dispatch({
        type: MAIN_BANNER_REQUEST,
      });

      message.success("메인베너 기본정보가 변경되었습니다.");
    }
  }, [st_bannerUpdateDone]);

  useEffect(() => {
    if (st_bannerSortUpdateError) {
      return message.error(st_bannerSortUpdateError);
    }
  }, [st_bannerSortUpdateError]);

  useEffect(() => {
    if (st_bannerUseYnError) {
      return message.error(st_bannerUseYnError);
    }
  }, [st_bannerUseYnError]);

  useEffect(() => {
    if (st_bannerDeleteError) {
      return message.error(st_bannerDeleteError);
    }
  }, [st_bannerDeleteError]);

  useEffect(() => {
    if (st_bannerUpdateError) {
      return message.error(st_bannerUpdateError);
    }
  }, [st_bannerUpdateError]);

  useEffect(() => {
    if (st_bannerOnlyImageUpdateError) {
      return message.error(st_bannerOnlyImageUpdateError);
    }
  }, [st_bannerOnlyImageUpdateError]);

  useEffect(() => {
    if (st_bannerFastCreateError) {
      return message.error(st_bannerFastCreateError);
    }
  }, [st_bannerFastCreateError]);

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

  ////// HANDLER //////

  const applyImageUpdate = useCallback(() => {
    setCurrentData((prev) => {
      return {
        ...currentData,
        imageURL: uploadBannerPath,
      };
    });

    dispatch({
      type: BANNER_ONLY_IMAGE_REQUEST,
      data: {
        id: currentData.id,
        title: currentData.title,
        imageURL: uploadBannerPath,
      },
    });
  }, [currentData, uploadBannerPath]);

  const beforeSetDataHandler = useCallback(
    (record) => {
      if (parseInt(record.id) === (currentData && parseInt(currentData.id))) {
        return null;
      }

      let flag = true;

      if (uploadBannerPath) {
        flag = confirm(
          "적용되지 않은 이미지가 있습니다. 다른 정보로 이동하시겠습니까?"
        );
      }

      if (flag) {
        dispatch({
          type: UPLOAD_BANNER_INIT_REQUEST,
        });

        return setDataHandler(record);
      } else {
        return;
      }
    },
    [dataIssueModal, uploadBannerPath, currentData]
  );

  const useYnUpdateHandler = useCallback(
    (compareValue) => {
      switch (parseInt(compareValue)) {
        case 1:
          dispatch({
            type: BANNER_USE_YN_REQUEST,
            data: {
              id: currentData.id,
              title: currentData.title,
              nextFlag: parseInt(currentData.titleUseYn) === 0 ? 1 : 0,
              type: compareValue,
            },
          });
          setCurrentData(() => {
            return {
              ...currentData,
              titleUseYn: parseInt(currentData.titleUseYn) === 0 ? 1 : 0,
            };
          });
          break;

        case 2:
          dispatch({
            type: BANNER_USE_YN_REQUEST,
            data: {
              id: currentData.id,
              title: currentData.title,
              nextFlag: parseInt(currentData.contentUseYn) === 0 ? 1 : 0,
              type: compareValue,
            },
          });
          setCurrentData(() => {
            return {
              ...currentData,
              contentUseYn: parseInt(currentData.contentUseYn) === 0 ? 1 : 0,
            };
          });
          break;

        case 3:
          dispatch({
            type: BANNER_USE_YN_REQUEST,
            data: {
              id: currentData.id,
              title: currentData.title,
              nextFlag: parseInt(currentData.linkUseYn) === 0 ? 1 : 0,
              type: compareValue,
            },
          });
          setCurrentData(() => {
            return {
              ...currentData,
              linkUseYn: parseInt(currentData.linkUseYn) === 0 ? 1 : 0,
            };
          });
          break;

        default:
          break;
      }
    },
    [currentData]
  );

  const fastBannerHandler = useCallback(() => {
    dispatch({
      type: BANNER_FAST_CREATE_REQUEST,
    });
  }, []);

  const deleteBanner = useCallback((data) => {
    dispatch({
      type: BANNER_DELETE_REQUEST,
      data: {
        id: data.id,
        title: data.title,
      },
    });
  }, []);

  const setDataHandler = useCallback(
    (data) => {
      setCurrentData(data);

      infoForm.setFieldsValue({
        title: data.title,
        content: data.content,
        link: data.link,
        updator: data.username,
        updatedAt: data.updatedAt,
        createdAt: data.viewCreatedAt,
      });
    },
    [currentData, dataIssueModal, uploadBannerPath]
  );

  const updateButtonHandler = useCallback(
    (data) => {
      dispatch({
        type: BANNER_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          title: data.title || "",
          content: data.content || "",
          link: data.link || "",
        },
      });
    },
    [currentData]
  );

  const sortUpdateHandler = useCallback((data, type) => {
    if (type === 1) {
      if (data["sort"] === 1) {
        return message.error("더 이상 우선순위를 높게 할 수 없습니다.");
      }

      dispatch({
        type: BANNER_SORT_UPDATE_REQUEST,
        data: {
          id: data.id,
          nextFlag: parseInt(data.sort) - 1,
          title: data.title,
        },
      });
    } else {
      dispatch({
        type: BANNER_SORT_UPDATE_REQUEST,
        data: {
          id: data.id,
          nextFlag: parseInt(data.sort) + 1,
          title: data.title,
        },
      });
    }
  }, []);

  const clickImageUpload = useCallback(() => {
    bannerInageRef.current.click();
  }, [bannerInageRef.current]);

  const onChangeImages = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: BANNER_UPLOAD_REQUEST,
      data: formData,
    });
  });

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////
  const col = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "이미지 명칭",
      dataIndex: "title",
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
          title="정말 삭제하시겠습니까?"
          onConfirm={() => deleteBanner(data)}
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
            슬라이드 형식의 메인페이지 최상단 베너이미지를 관리할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            이미지는 화면 디자인 크기에 알맞게 자동으로 조정됩니다. 비율이
            상이할 경우 이미지가 늘어나 보일 수 있습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 50px" al="flex-start">
        <Wrapper
          width="50%"
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper margin={`10px 0px`} al={`flex-end`}>
            <Button size="small" type="primary" onClick={fastBannerHandler}>
              배너생성
            </Button>
          </Wrapper>
          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={col}
            dataSource={banners ? banners : []}
            size="small"
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          />
        </Wrapper>
        <Wrapper
          width="50%"
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          {currentData ? (
            <>
              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  사용여부 제어
                </InfoTitle>
                <Wrapper dr={`row`} ju={`flex-start`} padding={`10px`}>
                  <FlagText>이미지 명칭 뷰</FlagText>
                  <Switch
                    onChange={() => useYnUpdateHandler(1)}
                    checked={currentData && currentData.titleUseYn}
                  />
                </Wrapper>

                <Wrapper dr={`row`} ju={`flex-start`} padding={`10px`}>
                  <FlagText>텍스트 뷰</FlagText>
                  <Switch
                    onChange={() => useYnUpdateHandler(2)}
                    checked={currentData && currentData.contentUseYn}
                  />
                </Wrapper>

                <Wrapper dr={`row`} ju={`flex-start`} padding={`10px`}>
                  <FlagText>링크사용여부</FlagText>
                  <Switch
                    onChange={() => useYnUpdateHandler(3)}
                    checked={currentData && currentData.linkUseYn}
                  />
                </Wrapper>
              </Wrapper>

              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey_C}
                margin={`30px 0px`}
              ></Wrapper>

              <InfoTitle>
                <CheckOutlined />
                베너이미지 제어
              </InfoTitle>
              <Wrapper margin={`0px 0px 5px 0px`}>
                <BannerImage
                  src={
                    uploadBannerPath
                      ? uploadBannerPath
                      : currentData && currentData.imageURL
                  }
                />
              </Wrapper>

              <Wrapper margin={`0px 0px 10px 0px`} al={`flex-end`}>
                <input
                  type="file"
                  name="image"
                  accept=".png, .jpg"
                  // multiple
                  hidden
                  ref={bannerInageRef}
                  onChange={onChangeImages}
                />
                <Button
                  type="primary"
                  size="small"
                  onClick={clickImageUpload}
                  loading={st_bannerUploadLoading}
                >
                  이미지 업로드
                </Button>

                {uploadBannerPath && (
                  <Button
                    size="small"
                    type="danger"
                    style={{ margin: `5px 0px 0px 0px` }}
                    onClick={applyImageUpdate}
                  >
                    적용하기
                  </Button>
                )}
              </Wrapper>

              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey_C}
                margin={`30px 0px`}
              ></Wrapper>

              <InfoTitle>
                <CheckOutlined />
                기본정보 제어
              </InfoTitle>
              <Wrapper>
                <Form
                  style={{ width: "100%" }}
                  form={infoForm}
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  onFinish={updateButtonHandler}
                >
                  <Form.Item label="이미지 명칭" name="title">
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Form.Item label="텍스트 뷰" name="content">
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Form.Item label="연결링크" name="link">
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Form.Item label="최근 작업자" name="updator">
                    <Input size="small" allowClear readOnly />
                  </Form.Item>

                  <Form.Item label="최근 작업일" name="updatedAt">
                    <Input size="small" allowClear readOnly />
                  </Form.Item>

                  <Form.Item label="생성일" name="createdAt">
                    <Input size="small" allowClear readOnly />
                  </Form.Item>

                  <Wrapper al="flex-end" margin="0px 0px 20px 0px">
                    <Button type="primary" size="small" htmlType="submit">
                      데이터 수정
                    </Button>
                  </Wrapper>
                </Form>
              </Wrapper>
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
        width="300px"
        footer={null}
        visible={dataIssueModal}
        title="DATA ISSUE"
        closable={false}
      ></Modal>
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
      type: MAIN_BANNER_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(MainBanner);
