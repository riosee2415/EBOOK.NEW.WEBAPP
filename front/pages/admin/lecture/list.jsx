import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  DatePicker,
  Empty,
  Form,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Popover,
  Select,
  Switch,
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
  CloseOutlined,
} from "@ant-design/icons";
import {
  LECTURE_ADMIN_LIST_REQUEST,
  LECTURE_CREATE_REQUEST,
  LECTURE_DELETE_REQUEST,
  LECTURE_IMAGE_RESET,
  LECTURE_IMAGE_UPLOAD_REQUEST,
  LECTURE_TAG_CREATE_REQUEST,
  LECTURE_TAG_DELETE_REQUEST,
  LECTURE_TAG_LIST_REQUEST,
  LECTURE_UPDATE_REQUEST,
  TAG_CREATE_REQUEST,
  TAG_DELETE_REQUEST,
  TAG_LIST_REQUEST,
} from "../../../reducers/lecture";
import moment from "moment";

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

const CustomForm = styled(Form)`
  margin: 0 0 10px;

  & .ant-form-item {
    margin: 0;
  }

  & .ant-form-item-control-input {
    min-height: 0;
  }
`;

const List = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);

  const {
    lectureAdminList,
    tagList,
    lectureTagList,
    thumbnailPath,
    //
    st_lectureImageUploadLoading,
    //
    st_lectureCreateLoading,
    st_lectureCreateDone,
    st_lectureCreateError,
    //
    st_lectureUpdateLoading,
    st_lectureUpdateDone,
    st_lectureUpdateError,
    //
    st_lectureDeleteLoading,
    st_lectureDeleteDone,
    st_lectureDeleteError,
    //
    st_tagCreateLoading,
    st_tagCreateDone,
    st_tagCreateError,
    //
    st_tagDeleteLoading,
    st_tagDeleteDone,
    st_tagDeleteError,
    //
    st_lectureTagCreateLoading,
    st_lectureTagCreateDone,
    st_lectureTagCreateError,
    //
    st_lectureTagDeleteLoading,
    st_lectureTagDeleteDone,
    st_lectureTagDeleteError,
  } = useSelector((state) => state.lecture);

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

  const [infoForm] = Form.useForm();
  const [tForm] = Form.useForm();

  const imageRef = useRef();

  const [currentData, setCurrentData] = useState(null);

  const [serachType, setSearchType] = useState(7);

  const [isHidden, setIsHidden] = useState(false);

  const [tModal, setTModal] = useState(false);

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
      type: LECTURE_ADMIN_LIST_REQUEST,
      data: {
        searchType: serachType,
      },
    });
  }, [serachType]);

  // 상품 생성 후처리
  useEffect(() => {
    if (st_lectureCreateDone) {
      dispatch({
        type: LECTURE_ADMIN_LIST_REQUEST,
        data: {
          searchType: serachType,
        },
      });

      return message.success("상품이 생성되었습니다.");
    }

    if (st_lectureCreateError) {
      return message.error(st_lectureCreateError);
    }
  }, [st_lectureCreateDone, st_lectureCreateError]);

  // 상품 수정 후처리
  useEffect(() => {
    if (st_lectureUpdateDone) {
      dispatch({
        type: LECTURE_ADMIN_LIST_REQUEST,
        data: {
          searchType: serachType,
        },
      });

      return message.success("상품이 수정되었습니다.");
    }

    if (st_lectureUpdateError) {
      return message.error(st_lectureUpdateError);
    }
  }, [st_lectureUpdateDone, st_lectureUpdateError]);

  // 상품 삭제 후처리
  useEffect(() => {
    if (st_lectureDeleteDone) {
      dispatch({
        type: LECTURE_ADMIN_LIST_REQUEST,
        data: {
          searchType: serachType,
        },
      });

      setCurrentData(null);

      return message.success("상품이 삭제되었습니다.");
    }

    if (st_lectureDeleteError) {
      return message.error(st_lectureDeleteError);
    }
  }, [st_lectureDeleteDone, st_lectureDeleteError]);

  useEffect(() => {
    if (st_tagCreateDone) {
      tForm.resetFields();

      dispatch({
        type: TAG_LIST_REQUEST,
      });

      return message.success("태그가 생성되었습니다.");
    }

    if (st_tagCreateError) {
      return message.error(st_tagCreateError);
    }
  }, [st_tagCreateDone, st_tagCreateError]);

  useEffect(() => {
    if (st_tagDeleteDone) {
      dispatch({
        type: TAG_LIST_REQUEST,
      });

      return message.success("태그가 삭제되었습니다.");
    }

    if (st_tagDeleteError) {
      return message.error(st_tagDeleteError);
    }
  }, [st_tagDeleteDone, st_tagDeleteError]);

  useEffect(() => {
    if (st_lectureTagCreateDone) {
      if (currentData) {
        dispatch({
          type: LECTURE_TAG_LIST_REQUEST,
          data: {
            id: currentData.id,
          },
        });
      }

      infoForm.setFieldsValue({
        tag: "",
      });

      return message.success("태그가 추가되었습니다.");
    }

    if (st_lectureTagCreateError) {
      return message.error(st_lectureTagCreateError);
    }
  }, [st_lectureTagCreateDone, st_lectureTagCreateError]);

  useEffect(() => {
    if (st_lectureTagDeleteDone) {
      if (currentData) {
        dispatch({
          type: LECTURE_TAG_LIST_REQUEST,
          data: {
            id: currentData.id,
          },
        });
      }

      return message.success("태그가 삭제되었습니다.");
    }

    if (st_lectureTagDeleteError) {
      return message.error(st_lectureTagDeleteError);
    }
  }, [st_lectureTagDeleteDone, st_lectureTagDeleteError]);

  ////// TOGGLE //////
  const isHiddenToggle = useCallback(() => {
    setIsHidden((prev) => !prev);
  }, [isHidden]);

  const tModalToggle = useCallback(() => {
    setTModal((prev) => !prev);
  }, [tModal]);

  ////// HANDLER //////

  // 검색
  const serachTypeHandler = useCallback(
    (type) => {
      setSearchType(type);
    },
    [serachType]
  );

  // 상품 생성
  const lectureCreateHandler = useCallback((data) => {
    dispatch({
      type: LECTURE_CREATE_REQUEST,
    });
  }, []);

  // 선택
  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);

      dispatch({
        type: LECTURE_IMAGE_RESET,
        data: {
          thumbnailPath: record.thumbnail,
        },
      });

      setIsHidden(record.isHidden);

      infoForm.setFieldsValue({
        type: record.type,
        title: record.title,
        subTitle: record.subTitle,
        installmentText: record.installmentText,
        price: record.price,
        discountPrice: record.discountPrice,
        bookPrice: record.bookPrice,
        bookDiscountPrice: record.bookDiscountPrice,
        bookEndDate: record.bookEndDate ? moment(record.bookEndDate) : null,
        viewCreatedAt: record.viewCreatedAt,
        viewUpdatedAt: record.viewUpdatedAt,
        bookNotEtc: record.bookNotEtc,
        isBookPay: record.isBookPay,
        isBookNoPay: record.isBookNoPay,
        sort: record.sort,
      });

      dispatch({
        type: LECTURE_TAG_LIST_REQUEST,
        data: {
          id: record.id,
        },
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
      type: LECTURE_IMAGE_UPLOAD_REQUEST,
      data: formData,
    });
  }, []);

  // 상품 수정
  const lectureUpdateHandler = useCallback(
    (data) => {
      dispatch({
        type: LECTURE_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          type: data.type,
          thumbnail: thumbnailPath,
          title: data.title,
          subTitle: data.subTitle,
          installmentText: data.installmentText,
          price: data.price,
          discountPrice: data.discountPrice,
          bookPrice: data.bookPrice,
          bookDiscountPrice: data.bookDiscountPrice,
          bookEndDate: data.bookEndDate
            ? data.bookEndDate.format("YYYY-MM-DD")
            : null,
          isHidden: isHidden,
          bookNotEtc: data.bookNotEtc,
          isBookPay: data.isBookPay,
          isBookNoPay: data.isBookNoPay,
          sort: data.sort,
        },
      });
    },
    [currentData, thumbnailPath, isHidden]
  );

  // 상품 삭제
  const lectureDeleteHandler = useCallback(() => {
    dispatch({
      type: LECTURE_DELETE_REQUEST,
      data: {
        id: currentData.id,
      },
    });
  }, [currentData]);

  // 태그 생성
  const tCreateHandler = useCallback((data) => {
    dispatch({
      type: TAG_CREATE_REQUEST,
      data: {
        value: data.value,
      },
    });
  }, []);

  // 태그 삭제
  const tDeleteHandler = useCallback((data) => {
    dispatch({
      type: TAG_DELETE_REQUEST,
      data: {
        id: data.id,
      },
    });
  }, []);

  // 강의 태그 추가
  const ltCreateHandler = useCallback(
    (data) => {
      dispatch({
        type: LECTURE_TAG_CREATE_REQUEST,
        data: {
          LectureId: currentData.id,
          TagId: data,
        },
      });
    },
    [currentData]
  );

  // 강의 태그 삭제
  const ltDeleteHandler = useCallback((data) => {
    dispatch({
      type: LECTURE_TAG_DELETE_REQUEST,
      data: {
        id: data.id,
      },
    });
  }, []);

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
      title: "제목",
      dataIndex: "title",
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

  const columns2 = [
    {
      width: `10%`,
      align: "center",
      title: "번호",
      dataIndex: "num",
    },
    {
      width: `40%`,
      title: "키워드이름",
      dataIndex: "value",
    },
    {
      width: `15%`,
      title: "부여강의수",
      dataIndex: "useTagCnt",
    },
    {
      width: `20%`,
      title: "생성일",
      dataIndex: "viewCreatedAt",
    },
    {
      width: `15%`,
      title: "삭제",
      render: (data) => (
        <Popconfirm
          title="정말 삭제하시겠습니까?"
          okText="삭제"
          cancelText="취소"
          onConfirm={() => tDeleteHandler(data)}
        >
          <Button size="small" type="danger" loading={st_tagDeleteLoading}>
            삭제
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const typeArr = [
    { type: 1, name: "1년" },
    { type: 2, name: "2년" },
    { type: 3, name: "3년" },
    { type: 4, name: "평생" },
    { type: 5, name: "3달" },
    // { type: 6, name: "상품" },
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
          <GuideLi>상품을 관리할 수 있습니다.</GuideLi>
          <GuideLi>상품을 유형으로 검색할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            사용여부를 체크시 회원에게 보이지 않습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            교재할인 마감일이 현재 날짜보다 지날시 할인가격이 적용되지 않습니다.
          </GuideLi>
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
              <Button
                size="small"
                type={serachType === 7 && "primary"}
                onClick={() => serachTypeHandler(7)}
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
            <Wrapper dr={`row`} width={`auto`}>
              <Button size="small" onClick={tModalToggle}>
                태그 관리
              </Button>
              <Button
                size="small"
                type="primary"
                loading={st_lectureCreateLoading}
                onClick={lectureCreateHandler}
              >
                상품 생성
              </Button>
            </Wrapper>
          </Wrapper>
          <Table
            size="small"
            dataSource={lectureAdminList}
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
                  상품 상세정보
                </InfoTitle>
              </Wrapper>

              <Image
                width={`400px`}
                height={`310px`}
                src={thumbnailPath}
                alt="imagePath"
              />

              <Wrapper width={`400px`} al={`flex-end`} margin={`0 0 20px`}>
                <input
                  type="file"
                  accept=".jpg, .png"
                  hidden
                  ref={imageRef}
                  onChange={imageUploadHandler}
                />
                <Button
                  style={{ width: `100%` }}
                  size="small"
                  type="primary"
                  onClick={imageRefClickHandler}
                  loading={st_lectureImageUploadLoading}
                >
                  썸네일 업로드
                </Button>
              </Wrapper>
              <Form
                form={infoForm}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                style={{ width: "100%", paddingRight: "20px" }}
                onFinish={lectureUpdateHandler}
              >
                <Form.Item
                  label="유형"
                  name="type"
                  rules={[{ required: true, message: "유형은 필수 입니다." }]}
                >
                  <Select size="small">
                    {typeArr.map((data) => {
                      return (
                        <Select.Option key={data.type} value={data.type}>
                          {data.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="제목"
                  name="title"
                  rules={[{ required: true, message: "제목은 필수 입니다." }]}
                >
                  <Input size="small" />
                </Form.Item>
                <Form.Item label="구매페이지 제목" name="subTitle">
                  <Input size="small" />
                </Form.Item>
                <Form.Item label="할부내용" name="installmentText">
                  <Input size="small" />
                </Form.Item>
                <Form.Item
                  label="가격"
                  name="price"
                  rules={[{ required: true, message: "가격은 필수 입니다." }]}
                >
                  <Input size="small" type="number" />
                </Form.Item>
                <Form.Item label="할인가격" name="discountPrice">
                  <Input
                    size="small"
                    type="number"
                    placeholder="상품이 할인된 가격을 입력해주세요."
                  />
                </Form.Item>
                <Form.Item
                  label="교재가격"
                  name="bookPrice"
                  rules={[
                    { required: true, message: "교재가격은 필수 입니다." },
                  ]}
                >
                  <Input size="small" type="number" />
                </Form.Item>
                <Form.Item label="교제할인가격" name="bookDiscountPrice">
                  <Input
                    size="small"
                    type="number"
                    placeholder="교제가 할인된 가격을 입력해주세요."
                  />
                </Form.Item>
                <Form.Item label="교재할인마감일" name="bookEndDate">
                  <DatePicker
                    size="small"
                    placeholder="마감일을 선택해주세요."
                    style={{ width: `100%` }}
                  />
                </Form.Item>
                <Form.Item label="교재 미구매 안내" name="bookNotEtc">
                  <Input size="small" />
                </Form.Item>

                <Form.Item
                  label="교재구매여부"
                  name="isBookPay"
                  valuePropName="checked"
                >
                  <Switch size="small" />
                </Form.Item>

                <Form.Item
                  label="교재구매안함여부"
                  name="isBookNoPay"
                  valuePropName="checked"
                >
                  <Switch size="small" />
                </Form.Item>

                <Form.Item label="생성일" name="viewCreatedAt">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item label="마지막수정일" name="viewUpdatedAt">
                  <Input size="small" readOnly />
                </Form.Item>

                <Form.Item label="사용여부">
                  <Switch
                    size="small"
                    checked={isHidden}
                    onChange={isHiddenToggle}
                  />
                </Form.Item>

                <Form.Item
                  label="순서"
                  name="sort"
                  rules={[{ required: true, message: "순서는 필수 입니다." }]}
                >
                  <Input size="small" type="number" />
                </Form.Item>

                <Wrapper dr={`row`} ju="flex-end" margin={`0 0 30px`}>
                  <Popconfirm
                    title="해당 상품을 삭제하시겠습니까?"
                    okText="삭제"
                    cancelText="취소"
                    onConfirm={lectureDeleteHandler}
                  >
                    <ModalBtn
                      size="small"
                      type="danger"
                      loading={st_lectureDeleteLoading}
                    >
                      상품 삭제
                    </ModalBtn>
                  </Popconfirm>
                  <ModalBtn
                    type="primary"
                    size="small"
                    htmlType="submit"
                    loading={st_lectureUpdateLoading}
                  >
                    정보 업데이트
                  </ModalBtn>
                </Wrapper>

                <Form.Item name="tag" label="태그">
                  <Select size="small" onChange={ltCreateHandler}>
                    {tagList.map((data, idx) => {
                      return (
                        <Select.Option key={idx} value={data.id}>
                          {data.value}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Wrapper al={`flex-end`}>
                  <Wrapper
                    width={`83.4%`}
                    margin={`0 0 30px`}
                    height={`200px`}
                    ju={`flex-start`}
                    borderBottom={`1px solid ${Theme.lightGrey_C}`}
                    overflow={`auto`}
                  >
                    <Wrapper height={`auto`}>
                      {lectureTagList &&
                        (lectureTagList.length === 0 ? (
                          <Wrapper margin={`20px 0`}>
                            <Empty description="부여된 태그가 없습니다." />
                          </Wrapper>
                        ) : (
                          lectureTagList.map((data, idx) => {
                            return (
                              <Wrapper
                                key={idx}
                                dr={`row`}
                                padding={`5px 10px`}
                                border={`1px solid ${Theme.lightGrey_C}`}
                                margin={`0 0 5px`}
                              >
                                <Text width={`calc(100% - 20px)`}>
                                  {data.value}
                                </Text>
                                <Wrapper width={`20px`}>
                                  <CloseOutlined
                                    style={{
                                      cursor: `pointer`,
                                      color: Theme.red_C,
                                    }}
                                    onClick={() => ltDeleteHandler(data)}
                                  />
                                </Wrapper>
                              </Wrapper>
                            );
                          })
                        ))}
                    </Wrapper>
                  </Wrapper>
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

      {/* TAG MODAL */}
      <Modal
        width={`1080px`}
        title="태그 관리"
        visible={tModal}
        onCancel={tModalToggle}
        footer={null}
      >
        <CustomForm layout="inline" form={tForm} onFinish={tCreateHandler}>
          <Form.Item
            name="value"
            rules={[{ required: true, message: "태그를 입력해주세요." }]}
          >
            <Input
              style={{ width: `300px` }}
              placeholder="생성할 태그를 입력해주세요."
              size="small"
            />
          </Form.Item>
          <Button
            size="small"
            type="primary"
            htmlType="submit"
            loading={st_tagCreateLoading}
          >
            생성
          </Button>
        </CustomForm>
        <Table
          size="small"
          columns={columns2}
          dataSource={tagList ? tagList : []}
        />
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
      type: LECTURE_ADMIN_LIST_REQUEST,
    });

    context.store.dispatch({
      type: TAG_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(List);
