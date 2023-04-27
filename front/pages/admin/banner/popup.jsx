import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  Button,
  Table,
  Popconfirm,
  message,
  Form,
  Input,
  Image,
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
  UpBtn,
  SortView,
  DownBtn,
  DelBtn,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import {
  POPUP_GET_REQUEST,
  POPUP_SORT_UPDATE_REQUEST,
  POPUP_UPDATE_REQUEST,
  POPUP_IMAGE_UPLOAD_REQUEST,
  POPUP_IMAGE_INIT,
  POPUP_IMAGE_UPDATE_REQUEST,
  POPUP_USE_UPDATE_REQUEST,
  POPUP_DELETE_REQUEST,
  POPUP_CREATE_REQUEST,
} from "../../../reducers/popup";
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
  color: ${(props) => props.theme.subTheme_C};
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.subTheme_C : props.theme.lightGrey_C};
`;

const FlagText = styled.div`
  width: 120px;
  margin: 0px 20px 0px 0px;
`;

const Popup = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    popups,
    st_popupSortUpdateDone,
    st_popupSortUpdateError,
    st_popupUpdateDone,
    st_popupUpdateError,
    uploadImagePath,
    st_popupImageUploadLoading,
    st_popupImageUpdateDone,
    st_popupImageUpdateError,
    st_popupUseUpdateDone,
    st_popupUseUpdateError,
    st_popupDeleteDone,
    st_popupDeleteError,
    st_popupCreateDone,
    st_popupCreateError,
  } = useSelector((state) => state.popup);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("배너관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [currentData, setCurrentData] = useState(null);

  const [infoForm] = Form.useForm();
  const imageRef = useRef();

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

  ///////////////////////////////// 우선순위 변경 후처리 //////////////////////////////////
  useEffect(() => {
    if (st_popupSortUpdateDone) {
      dispatch({
        type: POPUP_GET_REQUEST,
      });

      message.success("우선순위가 변경되었습니다.");
    }
  }, [st_popupSortUpdateDone]);

  useEffect(() => {
    if (st_popupSortUpdateError) {
      return message.error(st_popupSortUpdateError);
    }
  }, [st_popupSortUpdateError]);

  ///////////////////////////////// 팝업생성 후처리 //////////////////////////////////
  useEffect(() => {
    if (st_popupCreateDone) {
      dispatch({
        type: POPUP_GET_REQUEST,
      });

      message.success("새로운 팝업이 생성되었습니다.");
    }
  }, [st_popupCreateDone]);

  useEffect(() => {
    if (st_popupCreateError) {
      return message.error(st_popupCreateError);
    }
  }, [st_popupCreateError]);

  ///////////////////////////////// 데이터 삭제 변경 후처리 //////////////////////////////////
  useEffect(() => {
    if (st_popupDeleteDone) {
      dispatch({
        type: POPUP_GET_REQUEST,
      });

      dispatch({
        type: POPUP_IMAGE_INIT,
      });

      setCurrentData(null);

      message.success("팝업 데이터가 삭제되었습니다.");
    }
  }, [st_popupDeleteDone]);

  useEffect(() => {
    if (st_popupDeleteError) {
      return message.error(st_popupDeleteError);
    }
  }, [st_popupDeleteError]);

  ///////////////////////////////// 사용여부 변경 후처리 //////////////////////////////////
  useEffect(() => {
    if (st_popupUseUpdateDone) {
      dispatch({
        type: POPUP_GET_REQUEST,
      });

      message.success("사용여부가 변경되었습니다.");
    }
  }, [st_popupUseUpdateDone]);

  useEffect(() => {
    if (st_popupUseUpdateError) {
      return message.error(st_popupUseUpdateError);
    }
  }, [st_popupUseUpdateError]);

  ///////////////////////////////// 기본정보 업데이트 후처리 //////////////////////////////////
  useEffect(() => {
    if (st_popupUpdateDone) {
      dispatch({
        type: POPUP_GET_REQUEST,
      });

      message.success("팝업 기본정보가 수정되었습니다.");
    }
  }, [st_popupUpdateDone]);

  useEffect(() => {
    if (st_popupUpdateError) {
      return message.error(st_popupUpdateError);
    }
  }, [st_popupUpdateError]);

  ///////////////////////////////// 이미지 업데이트 후처리 //////////////////////////////////
  useEffect(() => {
    if (st_popupImageUpdateDone) {
      dispatch({
        type: POPUP_GET_REQUEST,
      });

      message.success("팝업 이미지가 수정되었습니다.");
    }
  }, [st_popupImageUpdateDone]);

  useEffect(() => {
    if (st_popupImageUpdateError) {
      return message.error(st_popupImageUpdateError);
    }
  }, [st_popupImageUpdateError]);

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

  const createHandler = useCallback(() => {
    dispatch({
      type: POPUP_CREATE_REQUEST,
    });
  }, []);

  const clickImageUpload = useCallback(() => {
    imageRef.current.click();
  }, [imageRef.current]);

  const onChangeImages = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: POPUP_IMAGE_UPLOAD_REQUEST,
      data: formData,
    });
  });

  const currentDataClickHandler = useCallback(
    (data) => {
      let confirmFlag = true;

      if ((currentData && currentData.id) !== data.id) {
        if (uploadImagePath) {
          confirmFlag = confirm(
            "작업이 완료되지 않은 데이터가 있습니다. 현재 괸라할 데이터를 변경하시겠습니까?"
          );
        }
      } else {
        return null;
      }

      if (confirmFlag) {
        dispatch({
          type: POPUP_IMAGE_INIT,
        });

        setCurrentData(data);

        infoForm.setFieldsValue({
          title: data.title,
          link: data.link,
          viewCreatedAt: data.viewCreatedAt,
          viewUpdatedAt: data.viewUpdatedAt,
        });
      }
    },
    [currentData, uploadImagePath]
  );

  const sortUpdateHandler = useCallback((data, type) => {
    if (type === 1) {
      if (data["sort"] === 1) {
        return message.error("더 이상 우선순위를 높게 할 수 없습니다.");
      }

      dispatch({
        type: POPUP_SORT_UPDATE_REQUEST,
        data: {
          id: data.id,
          nextFlag: parseInt(data.sort) - 1,
          title: data.title,
        },
      });
    } else {
      dispatch({
        type: POPUP_SORT_UPDATE_REQUEST,
        data: {
          id: data.id,
          nextFlag: parseInt(data.sort) + 1,
          title: data.title,
        },
      });
    }
  }, []);

  const updateInfoHandler = useCallback(
    (data) => {
      if (data.title === currentData.title) {
        return message.warning("수정할 정보가 없습니다.");
      }

      dispatch({
        type: POPUP_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          title: data.title,
          link: data.link,
        },
      });
    },

    [currentData]
  );

  const imageSaveHandler = useCallback(() => {
    if (!uploadImagePath) {
      return message.error("이미지를 업로드해주세요.");
    }

    setCurrentData((prevData) => {
      return {
        ...prevData,
        imagePath: uploadImagePath,
      };
    });

    dispatch({
      type: POPUP_IMAGE_UPDATE_REQUEST,
      data: {
        id: currentData.id,
        title: currentData.title,
        imagePath: uploadImagePath,
      },
    });
  }, [currentData, uploadImagePath]);

  const useYnUpdateHandler = useCallback(
    (compareValue) => {
      switch (parseInt(compareValue)) {
        case 1:
          dispatch({
            type: POPUP_USE_UPDATE_REQUEST,
            data: {
              id: currentData.id,
              title: currentData.title,
              nextFlag: parseInt(currentData.useYn) === 0 ? 1 : 0,
              type: compareValue,
            },
          });
          setCurrentData(() => {
            return {
              ...currentData,
              useYn: parseInt(currentData.useYn) === 0 ? 1 : 0,
            };
          });
          break;

        case 2:
          dispatch({
            type: POPUP_USE_UPDATE_REQUEST,
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

  const popupDeleteHandler = useCallback((data) => {
    dispatch({
      type: POPUP_DELETE_REQUEST,
      data: {
        id: data.id,
        title: data.title,
      },
    });
  }, []);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const col = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "팝업제목",
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
          onConfirm={() => popupDeleteHandler(data)}
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
            팝업을 등록하고, 사용여부를 제어할 수 있는 화면 입니다. 팝업 별
            기간은 설정할 수 없습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            이미지는 2:4비율로 업로드해주세요. 이미지비율이 상이할 경우 화면에
            비정상적으로 보일 수 있습니다.
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
            <Button size="small" type="primary" onClick={createHandler}>
              팝업생성
            </Button>
          </Wrapper>

          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={col}
            dataSource={popups ? popups : []}
            size="small"
            onRow={(record, index) => {
              return {
                onClick: (e) => currentDataClickHandler(record),
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
            <Wrapper padding={`10px 0px`}>
              {/* 사용여부 */}

              <InfoTitle>
                <CheckOutlined />
                사용여부 관리
              </InfoTitle>

              <Wrapper dr={`row`} ju={`flex-start`} padding={`10px`}>
                <FlagText>팝업 사용여부</FlagText>
                <Switch
                  onChange={() => useYnUpdateHandler(1)}
                  checked={currentData && currentData.useYn}
                />
              </Wrapper>

              <Wrapper dr={`row`} ju={`flex-start`} padding={`10px`}>
                <FlagText>링크 사용여부</FlagText>
                <Switch
                  onChange={() => useYnUpdateHandler(2)}
                  checked={currentData && currentData.linkUseYn}
                />
              </Wrapper>

              {/* 이미지 */}
              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey_C}
                margin={`30px 0px`}
              ></Wrapper>

              <InfoTitle>
                <CheckOutlined />
                팝업 이미지 관리
              </InfoTitle>

              <Wrapper>
                <Image
                  style={{ width: "250px", height: "auto" }}
                  src={
                    uploadImagePath
                      ? uploadImagePath
                      : currentData && currentData.imagePath
                  }
                />

                <input
                  type="file"
                  name="image"
                  accept=".png, .jpg"
                  // multiple
                  hidden
                  ref={imageRef}
                  onChange={onChangeImages}
                />
                <Button
                  style={{ width: "250px", margin: "5px 0" }}
                  type="primary"
                  size="small"
                  onClick={clickImageUpload}
                  loading={st_popupImageUploadLoading}
                >
                  이미지 업로드
                </Button>

                {uploadImagePath && (
                  <Button
                    style={{ width: "250px" }}
                    type="danger"
                    size="small"
                    onClick={imageSaveHandler}
                  >
                    이미지 적용
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
                팝업정보 관리
              </InfoTitle>

              <Form
                style={{ width: "100%" }}
                form={infoForm}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                onFinish={updateInfoHandler}
              >
                <Form.Item
                  label="제목"
                  name="title"
                  rules={[
                    { required: true, message: "제목은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input size="small" allowClear />
                </Form.Item>

                <Form.Item
                  label="링크"
                  name="link"
                  rules={[
                    { required: true, message: "링크는 필수 입력사항 입니다." },
                  ]}
                >
                  <Input size="small" allowClear />
                </Form.Item>

                <Form.Item label="생성일" name="viewCreatedAt">
                  <Input size="small" allowClear readOnly />
                </Form.Item>

                <Form.Item label="수정일" name="viewUpdatedAt">
                  <Input size="small" allowClear readOnly />
                </Form.Item>

                <Wrapper al="flex-end">
                  <Button size="small" type="primary" htmlType="submit">
                    정보저장
                  </Button>
                </Wrapper>
              </Form>
            </Wrapper>
          ) : (
            <Wrapper dr="row" padding="50px 0px">
              <AlertOutlined
                style={{
                  fontSize: "22px",
                  color: Theme.red_C,
                  marginRight: "5px",
                }}
              />
              좌측 팝업 데이터를 선택해주세요.
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
      type: POPUP_GET_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Popup);
