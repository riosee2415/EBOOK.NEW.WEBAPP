import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_MY_INFO_REQUEST,
  UPDATE_MODAL_CLOSE_REQUEST,
  UPDATE_MODAL_OPEN_REQUEST,
  USERLIST_REQUEST,
  USERLIST_UPDATE_REQUEST,
} from "../../../reducers/user";
import {
  Table,
  Button,
  Popover,
  message,
  Modal,
  Select,
  notification,
  Input,
  Form,
} from "antd";
import {
  HomeText,
  OtherMenu,
  GuideUl,
  GuideLi,
  SearchForm,
  SearchFormItem,
  SettingBtn,
  ModalBtn,
} from "../../../components/commonComponents";
import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import { items } from "../../../components/AdminLayout";
import axios from "axios";
import {
  Text,
  Wrapper,
  PopWrapper,
} from "../../../components/commonComponents";
import Theme from "../../../components/Theme";
import {
  HomeOutlined,
  RightOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";

const TypeButton = styled(Button)`
  margin-right: 5px;
`;

const GuideDiv = styled.div`
  width: 100%;
  color: ${(props) => (props.isImpo ? props.theme.red_C : "")};
  margin-left: 3px;
`;

const PointText = styled.div`
  color: ${(props) => props.theme.adminTheme_4};
`;

const CustomForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    width: 100%;
  }
`;

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

export const SnippetsBtn = styled(SnippetsOutlined)`
  font-size: 20px;
  color: ${(props) => props.theme.adminTheme_1};
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    transform: scale(1.3);
    color: ${(props) => props.theme.adminTheme_4};
  }
`;
const UserList = ({}) => {
  // LOAD CURRENT INFO AREA /////////////////////////////////////////////
  const { me, st_loadMyInfoDone } = useSelector((state) => state.user);

  const router = useRouter();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight5)) {
        message.error("접근권한이 없는 페이지 입니다.");
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);
  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////
  const dispatch = useDispatch();

  const {
    users,
    updateModal,
    st_userListError,
    st_userListUpdateDone,
    st_userListUpdateError,
  } = useSelector((state) => state.user);

  console.log(users);

  const [sameDepth, setSameDepth] = useState([]);

  const [updateData, setUpdateData] = useState(null);

  const [sData, setSData] = useState("");

  const [levelForm] = Form.useForm();
  const [sForm] = Form.useForm();

  const [currentTab, setCurrentTab] = useState(0);

  const [level1, setLevel1] = useState("회원관리");
  const [level2, setLevel2] = useState("");

  const [dModal, setDModal] = useState(false);
  const [dData, setDData] = useState(null);

  ////// USEEFFECT //////

  useEffect(() => {
    const currentMenus = items[level1];

    setSameDepth(currentMenus);

    currentMenus.map((data) => {
      if (data.link === router.pathname) {
        setLevel2(data.name);
      }
    });
  }, []);

  // 권한 수정 후처리
  useEffect(() => {
    if (st_userListUpdateDone) {
      dispatch({
        type: UPDATE_MODAL_CLOSE_REQUEST,
      });

      dispatch({
        type: USERLIST_REQUEST,
      });

      return message.success("유저정보가 수정되었습니다.");
    }
  }, [st_userListUpdateDone]);

  // 사용자 리스트 조회 에러처리
  useEffect(() => {
    if (st_userListError) {
      return message.error(st_userListError);
    }
  }, [st_userListError]);

  // 권한 수정 에러 메세지
  useEffect(() => {
    if (st_userListUpdateError) {
      return message.error(st_userListUpdateError);
    }
  }, [st_userListUpdateError]);

  useEffect(() => {
    dispatch({
      type: USERLIST_REQUEST,
      data: {
        searchData: sData,
        searchLevel: currentTab,
      },
    });
  }, [currentTab, sData]);

  ////// TOGGLE //////
  const updateModalOpen = useCallback(
    (data) => {
      dispatch({
        type: UPDATE_MODAL_OPEN_REQUEST,
      });

      setUpdateData(data);
      levelForm.setFieldsValue({ level: data.level });
    },
    [updateModal]
  );

  const updateModalClose = useCallback(() => {
    dispatch({
      type: UPDATE_MODAL_CLOSE_REQUEST,
    });
  }, [updateModal]);

  // 상세 모달
  const dModalToggle = useCallback(
    (data) => {
      if (data) {
        setDData(data);
      } else {
        setDData(null);
      }

      setDModal((prev) => !prev);
    },
    [dModal, dData]
  );
  ////// HANDLER //////

  const tabClickHandler = useCallback(
    (tab) => {
      setCurrentTab(tab);
    },
    [currentTab]
  );

  const searchHandler = useCallback(
    (data) => {
      setSData(data.sData);
    },
    [sForm, sData]
  );

  const levelFormClick = useCallback(() => {
    levelForm.submit();
  }, []);

  const onSubmitUpdate = useCallback(
    (data) => {
      if (updateData.level === data.level) {
        return LoadNotification(
          "ADMIN SYSTEM ERRLR",
          "현재 사용자와 같은 레벨로 수정할 수 없습니다."
        );
      }

      dispatch({
        type: USERLIST_UPDATE_REQUEST,
        data: {
          selectUserId: updateData.id,
          changeLevel: data.level,
        },
      });
    },
    [updateData]
  );

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

  ////// DATAVIEW //////

  const levelArr = [
    {
      id: 1,
      name: "일반회원",
      disabled: false,
    },
    // {
    //   id: 2,
    //   name: "비어있음",
    //   disabled: true,
    // },
    {
      id: 3,
      name: "운영자",
      disabled: false,
    },
    {
      id: 4,
      name: "최고관리자",
      disabled: false,
    },
    {
      id: 5,
      name: "개발사",
      disabled: true,
    },
  ];

  const columns = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "회원이름",
      dataIndex: "username",
    },
    {
      title: "이메일",
      dataIndex: "email",
    },
    {
      title: "전화번호",
      dataIndex: "mobile",
    },
    {
      title: "가입일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "권한",
      dataIndex: "viewLevel",
    },
    {
      title: "권한수정",
      render: (data) => (
        <SettingBtn
          size="small"
          type="primary"
          onClick={() => updateModalOpen(data)}
        >
          수정
        </SettingBtn>
      ),
    },
    {
      title: "상세정보",
      render: (data) => <SnippetsBtn onClick={() => dModalToggle(data)} />,
    },
  ];

  const columns2 = [
    {
      width: `15%`,
      align: "center",
      title: "번호",
      dataIndex: "num",
    },
    {
      width: `55%`,
      title: "영상이름",
      dataIndex: "title",
    },
    {
      width: `30%`,
      title: "날짜",
      dataIndex: "createdAt",
    },
  ];

  const testData = [
    {
      num: 1,
      title: "영상 테스트 01",
      createdAt: "YYYY-MM-DD",
    },
    {
      num: 2,
      title: "영상 테스트 02",
      createdAt: "YYYY-MM-DD",
    },
    {
      num: 3,
      title: "영상 테스트 03",
      createdAt: "YYYY-MM-DD",
    },
    {
      num: 4,
      title: "영상 테스트 04",
      createdAt: "YYYY-MM-DD",
    },
    {
      num: 5,
      title: "영상 테스트 05",
      createdAt: "YYYY-MM-DD",
    },
    {
      num: 6,
      title: "영상 테스트 06",
      createdAt: "YYYY-MM-DD",
    },
    {
      num: 7,
      title: "영상 테스트 07",
      createdAt: "YYYY-MM-DD",
    },
    {
      num: 8,
      title: "영상 테스트 08",
      createdAt: "YYYY-MM-DD",
    },
    {
      num: 9,
      title: "영상 테스트 09",
      createdAt: "YYYY-MM-DD",
    },
    {
      num: 10,
      title: "영상 테스트 10",
      createdAt: "YYYY-MM-DD",
    },
    {
      num: 11,
      title: "영상 테스트 11",
      createdAt: "YYYY-MM-DD",
    },
    {
      num: 12,
      title: "영상 테스트 12",
      createdAt: "YYYY-MM-DD",
    },
    {
      num: 13,
      title: "영상 테스트 13'",
      createdAt: "YYYY-MM-DD",
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
            {level2}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 10px`}>
        <GuideUl>
          <GuideLi isImpo={true}>
            해당 메뉴에서 홈페이지에 가입된 회원의 정보를 확인할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            이름 및 이메일로 사용자를 검색할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            변경된 정보는 홈페이지에 즉시 적용되기 때문에, 신중한 처리를 필요로
            합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper padding="0px 20px">
        {/* SEARCH FORM */}
        <SearchForm
          layout="inline"
          style={{ width: "100%" }}
          form={sForm}
          onFinish={searchHandler}
        >
          <SearchFormItem name="sData" style={{ margin: `0px 0px 0px 5px` }}>
            <Input
              size="small"
              style={{ width: "320px" }}
              placeholder={`회원을 검색할 정보를 입력해주세요.`}
            />
          </SearchFormItem>

          <SearchFormItem>
            <Button size="small" type="primary" htmlType="submit">
              검색
            </Button>
          </SearchFormItem>
        </SearchForm>
      </Wrapper>

      <Wrapper
        padding="0px 20px"
        dr="row"
        ju="flex-start"
        margin="0px 0px 5px 0px"
      >
        <TypeButton
          type={currentTab === 0 ? "primary" : "default"}
          size="small"
          onClick={() => tabClickHandler(0)}
        >
          전체
        </TypeButton>

        {levelArr.map((data) => (
          <TypeButton
            key={data.id}
            type={currentTab === data.id ? "primary" : "default"}
            size="small"
            onClick={() => tabClickHandler(data.id)}
          >
            {data.name}
          </TypeButton>
        ))}
      </Wrapper>

      <Wrapper padding={`0px 20px`}>
        <Table
          style={{ width: "100%" }}
          rowKey="id"
          columns={columns}
          dataSource={users ? users : []}
          size="small"
        />
      </Wrapper>

      {/* MODAL AREA */}
      <Modal
        width={`600px`}
        title={`사용자 권한 수정`}
        //
        visible={updateModal}
        //
        cancelText="취소"
        onCancel={updateModalClose}
        cancelButtonProps={{ size: "small" }}
        //
        okText="수정"
        onOk={levelFormClick}
        okButtonProps={{ size: "small" }}
      >
        <Wrapper
          radius="5px"
          bgColor={Theme.lightGrey_C}
          padding="5px"
          fontSize="12px"
          al="flex-start"
        >
          <GuideDiv isImpo={true}>
            권한수정은 수정 시 사이트 및 어플리케이션에 즉시 적용되기 때문에
            신중한 처리를 필요로 합니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            개발사로는 권한을 수정하실수 없습니다.
          </GuideDiv>
        </Wrapper>
        <Form form={levelForm} onFinish={onSubmitUpdate}>
          <Form.Item label="권한" name="level">
            <Select size="small">
              {levelArr.map((data) => (
                <Select.Option
                  key={data.id}
                  value={data.id}
                  disabled={data.disabled}
                >
                  {data.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* DMODAL TOGGLE */}
      <Modal
        width={`1300px`}
        title="상세정보"
        visible={dModal}
        onCancel={() => dModalToggle(null)}
        footer={null}
      >
        <Wrapper dr={`row`} ju={`space-between`} al={`flex-start`}>
          <Wrapper width={`calc(50% - 20px)`}>
            <CustomForm labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
              <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                <Text fontSize={`20px`}>회원 정보</Text>
              </Wrapper>
              <Form.Item name="userId" label="아이디">
                <Input size="small" readOnly />
              </Form.Item>
              <Form.Item name="username" label="사용자명">
                <Input size="small" readOnly />
              </Form.Item>
              <Form.Item name="username" label="연락처">
                <Input size="small" readOnly />
              </Form.Item>
              <Form.Item name="username" label="모바일">
                <Input size="small" readOnly />
              </Form.Item>
              <Form.Item name="username" label="이메일">
                <Input size="small" readOnly />
              </Form.Item>
              <Form.Item name="username" label="가입일">
                <Input size="small" readOnly />
              </Form.Item>
              <Form.Item name="username" label="권한">
                <Input size="small" readOnly />
              </Form.Item>
              <Form.Item name="username" label="키워드">
                <Input size="small" readOnly />
              </Form.Item>
              <Form.Item name="username" label="우편번호">
                <Input size="small" readOnly />
              </Form.Item>
              <Form.Item name="username" label="기본주소">
                <Input size="small" readOnly />
              </Form.Item>
              <Form.Item name="username" label="상세주소">
                <Input size="small" readOnly />
              </Form.Item>

              <Wrapper dr={`row`} ju={`flex-end`}>
                {/* <ModalBtn size="small" type="danger">
                  삭제
                </ModalBtn> */}
                <ModalBtn size="small" type="primary">
                  수정
                </ModalBtn>
              </Wrapper>
            </CustomForm>
          </Wrapper>
          <Wrapper width={`1px`} height={`800px`} bgColor={Theme.lightGrey_C} />
          <Wrapper width={`calc(50% - 20px)`}>
            <Wrapper margin={`0 0 30px`}>
              <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                <Text fontSize={`20px`}>이용권정보</Text>
              </Wrapper>

              <CustomForm>
                <Form.Item name="username" label="이용권">
                  <Input size="small" />
                </Form.Item>

                <Wrapper dr={`row`} ju={`flex-end`}>
                  <ModalBtn size="small" type="danger">
                    삭제
                  </ModalBtn>
                  <ModalBtn size="small" type="primary">
                    추가
                  </ModalBtn>
                </Wrapper>
              </CustomForm>
            </Wrapper>
            <Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                <Text fontSize={`20px`}>수강 기록</Text>
              </Wrapper>

              <Table
                style={{ width: `100%` }}
                size="small"
                columns={columns2}
                dataSource={testData}
              />
            </Wrapper>
          </Wrapper>
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
      type: USERLIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(UserList);
