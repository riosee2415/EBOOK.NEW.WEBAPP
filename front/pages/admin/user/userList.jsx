import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  ADMIN_UPDATE_REQUEST,
  INSERT_XLSX_REQUEST,
  KEYWORD_CREATE_REQUEST,
  KEYWORD_DELETE_REQUEST,
  KEYWORD_LIST_REQUEST,
  LOAD_MY_INFO_REQUEST,
  UPDATE_MODAL_CLOSE_REQUEST,
  UPDATE_MODAL_OPEN_REQUEST,
  USERLIST_REQUEST,
  USERLIST_UPDATE_REQUEST,
  USER_ADMIN_DELETE_REQUEST,
  USER_ADMIN_ISBLACK_REQUEST,
  USER_ALL_LIST_REQUEST,
  USER_KEYWORD_CREATE_REQUEST,
  USER_KEYWORD_DELETE_REQUEST,
  USER_KEYWORD_LIST_REQUEST,
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
  DatePicker,
  Empty,
  Popconfirm,
  Checkbox,
  Switch,
  Slider,
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
  DelBtn,
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
  CheckOutlined,
  CloseOutlined,
  HomeOutlined,
  RightOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import {
  BOUGHT_ADMIN_CREATE_REQUEST,
  BOUGHT_ADMIN_DELETE_REQUEST,
  BOUGHT_ADMIN_ID_REQUEST,
  BOUGHT_ADMIN_UPDATE_REQUEST,
} from "../../../reducers/boughtLecture";
import moment from "moment";
import { LECTURE_LIST_REQUEST } from "../../../reducers/lecture";
import { ADMIN_USER_ENJOY_REQUEST } from "../../../reducers/enjoy";
import { MEDIA_CREATE_REQUEST } from "../../../reducers/media";

import { CSVLink } from "react-csv";

const DownloadBtn = styled(CSVLink)`
  width: 200px;
  height: 25px;
  margin: 0 0 0 10px;
  border-radius: 3px;

  background: ${(props) => props.theme.basicTheme_C};
  color: ${(props) => props.theme.white_C};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  transition: 0.4s;

  &:hover {
    color: ${(props) => props.theme.basicTheme_C};
    background: ${(props) => props.theme.white_C};
    border: 1px solid ${(props) => props.theme.basicTheme_C};
  }
`;

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
const CustomSlider = styled(Slider)`
  width: 200px;

  & .ant-slider-handle {
    display: none;
    width: 13px;
    height: 13px;
    margin-top: -1px;
  }

  & .ant-slider-step,
  & .ant-slider-track,
  & .ant-slider-rail {
    height: 10px;
  }

  @media (max-width: 700px) {
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

const CustomForm2 = styled(Form)`
  margin: 0 0 10px;

  & .ant-form-item {
    margin: 0;
  }

  & .ant-form-item-control-input {
    min-height: 0;
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
    lastPages,
    updateModal,
    userAllList,
    st_userAllListLoading,
    keywordList,
    userKeywordList,
    //
    st_userListLoading,
    st_userListError,
    //
    st_userListUpdateDone,
    st_userListUpdateError,
    //
    st_adminUpdateLoading,
    st_adminUpdateDone,
    st_adminUpdateError,
    //
    st_userAdminDeleteLoading,
    st_userAdminDeleteDone,
    st_userAdminDeleteError,
    //
    st_userAdminIsBlackLoading,
    st_userAdminIsBlackDone,
    st_userAdminIsBlackError,
    //
    st_keywordCreateLoading,
    st_keywordCreateDone,
    st_keywordCreateError,
    //
    st_keywordDeleteLoading,
    st_keywordDeleteDone,
    st_keywordDeleteError,
    //
    st_userKeywordCreateLoading,
    st_userKeywordCreateDone,
    st_userKeywordCreateError,
    //
    st_userKeywordDeleteLoading,
    st_userKeywordDeleteDone,
    st_userKeywordDeleteError,
  } = useSelector((state) => state.user);

  const {
    boughtAdminId,
    existingLecture,
    //
    st_boughtAdminCreateLoading,
    st_boughtAdminCreateDone,
    st_boughtAdminCreateError,
    //
    st_boughtAdminUpdateLoading,
    st_boughtAdminUpdateDone,
    st_boughtAdminUpdateError,
    //
    st_boughtAdminDeleteLoading,
    st_boughtAdminDeleteDone,
    st_boughtAdminDeleteError,
  } = useSelector((state) => state.boughtLecture);

  const { lectureList } = useSelector((state) => state.lecture);

  const { adminUserEnjoyList, maxLen } = useSelector((state) => state.enjoy);

  const [sameDepth, setSameDepth] = useState([]);

  const [updateData, setUpdateData] = useState(null);

  const [sData, setSData] = useState("");
  const [sKeyword, setSKeyword] = useState(null);

  const [levelForm] = Form.useForm();
  const [sForm] = Form.useForm();
  const [dForm] = Form.useForm();
  const [bForm] = Form.useForm();
  const [eForm] = Form.useForm();
  const [kForm] = Form.useForm();

  const [currentTab, setCurrentTab] = useState(0);

  const [level1, setLevel1] = useState("회원관리");
  const [level2, setLevel2] = useState("");

  const [dModal, setDModal] = useState(false);
  const [dData, setDData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [reviewWriteType, setReviewWriteType] = useState(3);

  const [kModal, setKModal] = useState(false);

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

  const keywordArr = [
    "수강권변경(1년->2년)",
    "수강권변경(1년->3년)",
    "수강권변경(1년->평생)",
    "수강권연장(1년)",
    "수강권연장(평생)",
    "교재900원",
    "네이버스토어구매",
    "블로그체험단",
    "평생교육바우처",
    "마케팅제공",
    "교재무료증정",
    "무통장환불",
    "카드취소",
    "기타(상담참고)",
    "수강권변경(2년->3년)",
    "수강권변경(2년->1년)",
    "수강권변경(2년->평생)",
    "수강권변경(3년->1년)",
    "수강권변경(3년->2년)",
    "수강권변경(3년->평생)",
    "수강권변경(3달->1년)",
    "수강권변경(3달->2년)",
    "수강권변경(3달->3년)",
    "취소",
    "부분취소",
    "테블릿신규",
    "테블릿기존",
  ];

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
        data: {
          searchData: sData,
          searchLevel: currentTab,
          searchReviewType: reviewWriteType,
          page: currentPage,
          keyword: sKeyword,
        },
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

  // 리스트
  useEffect(() => {
    dispatch({
      type: USERLIST_REQUEST,
      data: {
        searchData: sData,
        searchLevel: currentTab,
        searchReviewType: reviewWriteType,
        page: currentPage,
        keyword: sKeyword,
      },
    });
  }, [currentTab, sData, currentPage, reviewWriteType, sKeyword]);

  // 회원정보 수정
  useEffect(() => {
    if (st_adminUpdateDone) {
      dispatch({
        type: USERLIST_REQUEST,
        data: {
          searchData: sData,
          searchLevel: currentTab,
          searchReviewType: reviewWriteType,
          page: currentPage,
          keyword: sKeyword,
        },
      });

      return message.success("회원 정보가 수정되었습니다.");
    }

    if (st_adminUpdateError) {
      return message.error(st_adminUpdateError);
    }
  }, [st_adminUpdateDone, st_adminUpdateError]);

  useEffect(() => {
    if (boughtAdminId) {
      bForm.setFieldsValue({
        payWay: boughtAdminId.payType,
        lectureType: boughtAdminId.lectureType,
        startDate: moment(boughtAdminId.startDate),
        endDate: moment(boughtAdminId.endDate),
        boughtDate: moment(boughtAdminId.boughtDate),
        pauseDate: boughtAdminId.pauseDate
          ? moment(boughtAdminId.pauseDate)
          : null,
      });
    }
  }, [boughtAdminId]);

  useEffect(() => {
    if (existingLecture) {
      eForm.setFieldsValue({
        payWay: existingLecture.payType,
        lectureType: existingLecture.lectureType,
        startDate: moment(existingLecture.startDate),
        endDate: moment(existingLecture.endDate),
        boughtDate: moment(existingLecture.boughtDate),
        pauseDate: existingLecture.pauseDate
          ? moment(existingLecture.pauseDate)
          : null,
      });
    }
  }, [existingLecture]);

  // 회원정보 삭제
  useEffect(() => {
    if (st_userAdminDeleteDone) {
      dispatch({
        type: USERLIST_REQUEST,
        data: {
          searchData: sData,
          searchLevel: currentTab,
          searchReviewType: reviewWriteType,
          page: currentPage,
          keyword: sKeyword,
        },
      });

      return message.success("회원 정보가 삭제되었습니다.");
    }

    if (st_userAdminDeleteError) {
      return message.error(st_userAdminDeleteError);
    }
  }, [st_userAdminDeleteDone, st_userAdminDeleteError]);

  // 회원정보 삭제
  useEffect(() => {
    if (st_userAdminIsBlackDone) {
      dispatch({
        type: USERLIST_REQUEST,
        data: {
          searchData: sData,
          searchLevel: currentTab,
          searchReviewType: reviewWriteType,
          page: currentPage,
          keyword: sKeyword,
        },
      });

      return message.success("블랙리스트가 수정되었습니다.");
    }

    if (st_userAdminIsBlackError) {
      return message.error(st_userAdminIsBlackError);
    }
  }, [st_userAdminIsBlackDone, st_userAdminIsBlackError]);

  // 수강권 생성
  useEffect(() => {
    if (st_boughtAdminCreateDone) {
      if (dData) {
        dispatch({
          type: BOUGHT_ADMIN_ID_REQUEST,
          data: {
            id: dData.id,
          },
        });
      }

      return message.success("수강권이 생성되었습니다.");
    }

    if (st_boughtAdminCreateError) {
      return message.error(st_boughtAdminCreateError);
    }
  }, [st_boughtAdminCreateDone, st_boughtAdminCreateError]);
  // 수강권 수정
  useEffect(() => {
    if (st_boughtAdminUpdateDone) {
      if (dData) {
        dispatch({
          type: BOUGHT_ADMIN_ID_REQUEST,
          data: {
            id: dData.id,
          },
        });
      }

      return message.success("수강권이 수정되었습니다.");
    }

    if (st_boughtAdminUpdateError) {
      return message.error(st_boughtAdminUpdateError);
    }
  }, [st_boughtAdminUpdateDone, st_boughtAdminUpdateError]);
  // 수강권 삭제
  useEffect(() => {
    if (st_boughtAdminDeleteDone) {
      if (dData) {
        dispatch({
          type: BOUGHT_ADMIN_ID_REQUEST,
          data: {
            id: dData.id,
          },
        });
      }

      return message.success("수강권이 삭제되었습니다.");
    }

    if (st_boughtAdminDeleteError) {
      return message.error(st_boughtAdminDeleteError);
    }
  }, [st_boughtAdminDeleteDone, st_boughtAdminDeleteError]);

  // 키워드 생성
  useEffect(() => {
    if (st_keywordCreateDone) {
      kForm.resetFields();

      dispatch({
        type: KEYWORD_LIST_REQUEST,
      });

      return message.success("키워드가 생성되었습니다.");
    }
    if (st_keywordCreateError) {
      return message.error(st_keywordCreateError);
    }
  }, [st_keywordCreateDone, st_keywordCreateError]);
  // 키워드 삭제
  useEffect(() => {
    if (st_keywordDeleteDone) {
      dispatch({
        type: KEYWORD_LIST_REQUEST,
      });

      return message.success("키워드가 삭제되었습니다.");
    }
    if (st_keywordDeleteError) {
      return message.error(st_keywordDeleteError);
    }
  }, [st_keywordDeleteDone, st_keywordDeleteError]);

  // 회원 키워드 생성
  useEffect(() => {
    if (st_userKeywordCreateDone) {
      dForm.setFieldsValue({
        keyword: "",
      });

      if (dData) {
        dispatch({
          type: USER_KEYWORD_LIST_REQUEST,
          data: {
            id: dData.id,
          },
        });
      }

      return message.success("키워드가 추가되었습니다.");
    }
    if (st_userKeywordCreateError) {
      return message.error(st_userKeywordCreateError);
    }
  }, [st_userKeywordCreateDone, st_userKeywordCreateError]);
  // 회원 키워드 삭제
  useEffect(() => {
    if (st_userKeywordDeleteDone) {
      if (dData) {
        dispatch({
          type: USER_KEYWORD_LIST_REQUEST,
          data: {
            id: dData.id,
          },
        });
      }

      return message.success("키워드가 삭제되었습니다.");
    }
    if (st_userKeywordDeleteError) {
      return message.error(st_userKeywordDeleteError);
    }
  }, [st_userKeywordDeleteDone, st_userKeywordDeleteError]);

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

        dForm.setFieldsValue({
          userId: data.userId,
          username: data.username,
          mobile: data.mobile,
          email: data.email,
          viewCreatedAt: data.viewCreatedAt,
          level: levelArr.find((value) => value.id === data.level).name,
          gender: data.gender,
          birth: data.birth,
          consulting: data.consulting,
          zoneCode: data.zoneCode,
          address: data.address,
          detailAddress: data.detailAddress,
          isBlack: data.isBlack,
        });

        dispatch({
          type: BOUGHT_ADMIN_ID_REQUEST,
          data: {
            id: data.id,
          },
        });

        dispatch({
          type: ADMIN_USER_ENJOY_REQUEST,
          data: {
            id: data.id,
          },
        });

        dispatch({
          type: USER_KEYWORD_LIST_REQUEST,
          data: {
            id: data.id,
          },
        });
      } else {
        setDData(null);
      }

      setDModal((prev) => !prev);
    },
    [dModal, dData, levelArr]
  );

  const kModalToggle = useCallback(
    (data) => {
      dispatch({
        type: KEYWORD_LIST_REQUEST,
      });

      setKModal((prev) => !prev);
    },
    [kModal]
  );

  ////// HANDLER //////

  // 페이지 변경
  const otherPageCall = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [currentPage]
  );

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

  const sKeywordHandlr = useCallback(
    (data) => {
      setSKeyword(data);
    },
    [sKeyword]
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

  // 후기 작성 검색
  const reviewWriteTypeChangeHandler = useCallback(
    (type) => {
      setReviewWriteType(type);
    },
    [reviewWriteType]
  );

  // 관리자 회원 정보 수정
  const adminUpdateHandler = useCallback(
    (type) => {
      const detailData = dForm.getFieldsValue();

      dispatch({
        type: ADMIN_UPDATE_REQUEST,
        data: {
          id: dData.id,
          type: type,
          userId: detailData.userId,
          username: detailData.username,
          password: detailData.password,
          mobile: detailData.mobile,
          keyword: detailData.keyword,
          consulting: detailData.consulting,
          zoneCode: detailData.zoneCode,
          address: detailData.address,
          detailAddress: detailData.detailAddress,
        },
      });
    },
    [dData]
  );

  // 수강권 수정
  const boughtUpdateHandler = useCallback(
    (data) => {
      dispatch({
        type: BOUGHT_ADMIN_UPDATE_REQUEST,
        data: {
          id: boughtAdminId.id,
          startDate: data.startDate.format("YYYY-MM-DD"),
          endDate: data.endDate.format("YYYY-MM-DD"),
          lectureType: data.lectureType,
          pauseDate: data.pauseDate
            ? data.pauseDate.format("YYYY-MM-DD")
            : null,
        },
      });
    },
    [boughtAdminId]
  );

  // 수강권 생성
  const boughtCreateHandler = useCallback(
    (data) => {
      dispatch({
        type: BOUGHT_ADMIN_CREATE_REQUEST,
        data: {
          id: dData.id,
          lectureId: data.lectureId,
          mobile: dData.mobile,
          username: dData.username,
          lectureType: lectureList.find((value) => value.id === data.lectureId)
            .type,
        },
      });
    },
    [dData]
  );

  // 수강권 삭제
  const boughtDeleteHandler = useCallback(() => {
    dispatch({
      type: BOUGHT_ADMIN_DELETE_REQUEST,
      data: {
        id: boughtAdminId.id,
      },
    });
  }, [boughtAdminId]);

  // 기존 태블릿 삭제
  const existingDeleteHandler = useCallback(() => {
    dispatch({
      type: BOUGHT_ADMIN_DELETE_REQUEST,
      data: {
        id: existingLecture.id,
      },
    });
  }, [existingLecture]);

  // 상담자 추가
  const consultingAddHandler = useCallback(() => {
    const infoData = dForm.getFieldsValue();

    dForm.setFieldsValue({
      consulting:
        (infoData.consulting ? infoData.consulting + `\n\n` : "") +
        `${moment().format("YYYY.MM.DD/HH:mm")}(${me.username})`,
    });
  }, [me]);

  // 관리자 회원 삭제
  const userAdminDeleteHandler = useCallback(
    (data) => {
      if (st_userAdminDeleteLoading) {
        return message.info("실행중입니다.");
      }

      dispatch({
        type: USER_ADMIN_DELETE_REQUEST,
        data: {
          id: data.id,
        },
      });
    },
    [st_userAdminDeleteLoading]
  );

  // 관리자 블랙리스트 수정
  const isBlackChangeHandler = useCallback(() => {
    if (!dData) {
      return message.info("잠시 후 다시 시도해주세요.");
    }

    dispatch({
      type: USER_ADMIN_ISBLACK_REQUEST,
      data: {
        id: dData.id,
        isBlack: !dData.isBlack,
      },
    });
  }, [dData]);

  // 키워드 생성
  const kCreateHandler = useCallback((data) => {
    dispatch({
      type: KEYWORD_CREATE_REQUEST,
      data: {
        value: data.value,
      },
    });
  }, []);

  // 키워드 삭제
  const kDeleteHandler = useCallback((data) => {
    dispatch({
      type: KEYWORD_DELETE_REQUEST,
      data: {
        id: data.id,
      },
    });
  }, []);

  // 회원 키워드 추가
  const uKCreateHandler = useCallback(
    (data) => {
      if (!dData) {
        return message.error("잠시 후 다시 시도해주세요.");
      }

      dispatch({
        type: USER_KEYWORD_CREATE_REQUEST,
        data: {
          UserId: dData.id,
          KeywordId: data,
        },
      });
    },
    [dData]
  );

  // 회원 키워드 삭제
  const ukDeleteHandler = useCallback((data) => {
    dispatch({
      type: USER_KEYWORD_DELETE_REQUEST,
      data: {
        id: data.id,
      },
    });
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

  const headers = [
    { label: "아이디", key: "userId" },
    { label: "이름", key: "username" },
    { label: "이메일", key: "email" },
    { label: "일반전화", key: "tel" },
    { label: "핸드폰번호", key: "mobile" },
    { label: "주소", key: "address" },
    { label: "상세주소", key: "detailAddress" },
    { label: "우편변호", key: "zoneCode" },
    { label: "결제여부", key: "boughtLecture" },
    { label: "유입", key: "adType" },
    { label: "키워드", key: "keyword" },
    { label: "가입일", key: "createdAt" },
  ];

  // console.log(xlsxData);

  ////// DATAVIEW //////

  const columns = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "아이디",
      dataIndex: "userId",
    },
    {
      title: "회원이름",
      dataIndex: "username",
    },
    {
      title: "전화번호",
      dataIndex: "viewMobile",
    },
    {
      title: "가입일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "결제여부",
      render: (data) => {
        return data.boughtList.length === 0 ? (
          <Text color={Theme.red2_C}>
            <CloseOutlined /> 0건
          </Text>
        ) : (
          <Text color={Theme.naver_C}>
            <CheckOutlined /> {data.boughtList.length}건
          </Text>
        );
      },
    },
    {
      title: "키워드",
      render: (data) => `${data.keyword}개`,
    },
    {
      align: `center`,
      title: "권한",
      dataIndex: "viewLevel",
    },
    {
      align: `center`,
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
      align: `center`,
      title: "상세정보",
      render: (data) => <SnippetsBtn onClick={() => dModalToggle(data)} />,
    },
    {
      align: `center`,
      title: "삭제하기",
      render: (data) => (
        <Popconfirm
          placement="topRight"
          title={
            <Wrapper al={`flex-start`}>
              <Text>정말 삭제하시겠습니까?</Text>
              <Text>삭제 후 되돌릴 수 없습니다.</Text>
            </Wrapper>
          }
          onConfirm={() => userAdminDeleteHandler(data)}
          okText="삭제"
          cancelText="취소"
        >
          <DelBtn />
        </Popconfirm>
      ),
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
      dataIndex: "viewCreatedAt",
    },
  ];

  const columns3 = [
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
      title: "부여회원수",
      dataIndex: "useKeywordCnt",
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
          onConfirm={() => kDeleteHandler(data)}
        >
          <Button size="small" type="danger" loading={st_keywordDeleteLoading}>
            삭제
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const userAllListHandler = useCallback(() => {
    dispatch({
      type: USER_ALL_LIST_REQUEST,
    });
  }, []);

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
      <Wrapper margin={`10px 0px 0px 0`}>
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

          <SearchFormItem>
            <Select
              size="small"
              style={{ width: `250px` }}
              placeholder="검색하실 키워드를 선택해주세요."
              onChange={sKeywordHandlr}
              allowClear
            >
              {keywordList &&
                keywordList.map((data, idx) => {
                  return (
                    <Select.Option key={idx} value={data.value}>
                      {data.value}
                    </Select.Option>
                  );
                })}
            </Select>
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

      <Wrapper
        dr={`row`}
        ju={`space-between`}
        padding="0px 20px"
        margin="0px 0px 5px 0px"
      >
        <Wrapper width={`auto`} dr="row" ju="flex-start">
          <TypeButton
            size="small"
            onClick={() => reviewWriteTypeChangeHandler(3)}
            type={reviewWriteType === 3 && "primary"}
          >
            전체
          </TypeButton>
          <TypeButton
            size="small"
            onClick={() => reviewWriteTypeChangeHandler(1)}
            type={reviewWriteType === 1 && "primary"}
          >
            후기 작성
          </TypeButton>
          <TypeButton
            size="small"
            onClick={() => reviewWriteTypeChangeHandler(2)}
            type={reviewWriteType === 2 && "primary"}
          >
            후기 미작성
          </TypeButton>
        </Wrapper>

        <Wrapper width={`auto`} dr={`row`}>
          <Button size="small" onClick={kModalToggle}>
            키워드 관리
          </Button>
          {userAllList ? (
            <DownloadBtn
              filename={`회원 정보`}
              headers={headers}
              data={userAllList}
            >
              회원정보출력
            </DownloadBtn>
          ) : (
            <Button
              size="small"
              type="primary"
              onClick={userAllListHandler}
              loading={st_userAllListLoading}
            >
              엑셀 데이터 조회
            </Button>
          )}
        </Wrapper>
      </Wrapper>

      <Wrapper padding={`0px 20px`}>
        <Table
          style={{ width: "100%" }}
          rowKey="id"
          columns={columns}
          dataSource={users ? users : []}
          size="small"
          loading={st_userListLoading}
          pagination={{
            defaultCurrent: 1,
            current: parseInt(currentPage),
            onChange: (page) => otherPageCall(page),
            pageSize: 20,
            total: lastPages * 20,
          }}
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
          {/* LIFT AREA */}
          <Wrapper width={`calc(50% - 20px)`}>
            <CustomForm
              form={dForm}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
            >
              <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                <Text fontSize={`20px`}>회원 정보</Text>
              </Wrapper>
              <Wrapper dr={`row`}>
                <Form.Item
                  name="userId"
                  label="아이디"
                  style={{ width: `calc(100% - 50px)` }}
                >
                  <Input size="small" />
                </Form.Item>
                <Button
                  style={{ width: `50px`, margin: `0 0 24px` }}
                  size="small"
                  type="primary"
                  loading={st_adminUpdateLoading}
                  onClick={() => adminUpdateHandler(1)}
                >
                  수정
                </Button>
              </Wrapper>
              <Wrapper dr={`row`}>
                <Form.Item
                  name="username"
                  label="사용자명"
                  style={{ width: `calc(100% - 50px)` }}
                >
                  <Input size="small" />
                </Form.Item>
                <Button
                  style={{ width: `50px`, margin: `0 0 24px` }}
                  size="small"
                  type="primary"
                  loading={st_adminUpdateLoading}
                  onClick={() => adminUpdateHandler(2)}
                >
                  수정
                </Button>
              </Wrapper>

              <Wrapper dr={`row`}>
                <Form.Item
                  name="mobile"
                  label="연락처"
                  style={{ width: `calc(100% - 50px)` }}
                >
                  <Input size="small" />
                </Form.Item>
                <Button
                  style={{ width: `50px`, margin: `0 0 24px` }}
                  size="small"
                  type="primary"
                  loading={st_adminUpdateLoading}
                  onClick={() => adminUpdateHandler(3)}
                >
                  수정
                </Button>
              </Wrapper>
              <Wrapper dr={`row`}>
                <Form.Item
                  name="password"
                  label="비밀번호"
                  style={{ width: `calc(100% - 50px)` }}
                >
                  <Input size="small" type="password" />
                </Form.Item>
                <Button
                  style={{ width: `50px`, margin: `0 0 24px` }}
                  size="small"
                  type="primary"
                  loading={st_adminUpdateLoading}
                  onClick={() => adminUpdateHandler(4)}
                >
                  수정
                </Button>
              </Wrapper>
              <Form.Item name="viewCreatedAt" label="가입일">
                <Input size="small" readOnly />
              </Form.Item>
              <Form.Item name="level" label="권한">
                <Input size="small" readOnly />
              </Form.Item>
              <Form.Item name="gender" label="성별">
                <Input size="small" readOnly />
              </Form.Item>
              <Form.Item name="birth" label="생년">
                <Input size="small" readOnly />
              </Form.Item>
              <Wrapper dr={`row`}>
                <Form.Item
                  name="zoneCode"
                  label="우편번호"
                  style={{ width: `calc(100% - 50px)` }}
                >
                  <Input size="small" />
                </Form.Item>
                <Button
                  style={{ width: `50px`, margin: `0 0 24px` }}
                  size="small"
                  type="primary"
                  loading={st_adminUpdateLoading}
                  onClick={() => adminUpdateHandler(6)}
                >
                  수정
                </Button>
              </Wrapper>
              <Wrapper dr={`row`}>
                <Form.Item
                  name="address"
                  label="기본주소"
                  style={{ width: `calc(100% - 50px)` }}
                >
                  <Input size="small" />
                </Form.Item>
                <Button
                  style={{ width: `50px`, margin: `0 0 24px` }}
                  size="small"
                  type="primary"
                  loading={st_adminUpdateLoading}
                  onClick={() => adminUpdateHandler(7)}
                >
                  수정
                </Button>
              </Wrapper>
              <Wrapper dr={`row`}>
                <Form.Item
                  name="detailAddress"
                  label="상세주소"
                  style={{ width: `calc(100% - 50px)` }}
                >
                  <Input size="small" />
                </Form.Item>
                <Button
                  style={{ width: `50px`, margin: `0 0 24px` }}
                  size="small"
                  type="primary"
                  loading={st_adminUpdateLoading}
                  onClick={() => adminUpdateHandler(8)}
                >
                  수정
                </Button>
              </Wrapper>
              <Form.Item label="후기작성여부">
                {dData &&
                  (dData.isWriteReview ? (
                    <CheckOutlined style={{ color: Theme.naver_C }} />
                  ) : (
                    <CloseOutlined style={{ color: Theme.red_C }} />
                  ))}
              </Form.Item>

              <Form.Item name="keyword" label="키워드">
                <Select size="small" onChange={uKCreateHandler}>
                  {keywordList.map((data, idx) => {
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
                    {userKeywordList &&
                      (userKeywordList.length === 0 ? (
                        <Wrapper margin={`20px 0`}>
                          <Empty description="부여된 키워드가 없습니다." />
                        </Wrapper>
                      ) : (
                        userKeywordList.map((data, idx) => {
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
                                  onClick={() => ukDeleteHandler(data)}
                                />
                              </Wrapper>
                            </Wrapper>
                          );
                        })
                      ))}
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Form.Item
                name="consulting"
                label={
                  <Text color={Theme.basicTheme_C} fontWeight={`700`}>
                    상담
                  </Text>
                }
              >
                <Input.TextArea
                  style={{
                    backgroundColor: Theme.lightBasicTheme_c,
                    border: `1px solid ${Theme.basicTheme_C}`,
                  }}
                  size="small"
                  autoSize={{ minRows: 5, maxRows: 15 }}
                />
              </Form.Item>

              <Wrapper al={`flex-end`} margin={`0 0 10px`}>
                <Button size="small" onClick={consultingAddHandler}>
                  상담자 추가
                </Button>
              </Wrapper>

              <Wrapper dr={`row`} ju={`flex-end`} margin={`0 0 23px`}>
                {/* <ModalBtn size="small" type="danger">
                  삭제
                </ModalBtn> */}
                <ModalBtn
                  size="small"
                  type="primary"
                  loading={st_adminUpdateLoading}
                  onClick={() => adminUpdateHandler(5)}
                >
                  상담 저장
                </ModalBtn>
              </Wrapper>

              <Form.Item
                name="isBlack"
                label={"블랙리스트"}
                valuePropName="checked"
              >
                <Switch
                  size="small"
                  onChange={isBlackChangeHandler}
                  loading={st_userAdminIsBlackLoading}
                />
              </Form.Item>
            </CustomForm>
          </Wrapper>
          <Wrapper width={`1px`} height={`800px`} bgColor={Theme.lightGrey_C} />

          {/* RIGHT AREA */}
          <Wrapper width={`calc(50% - 20px)`}>
            <Wrapper margin={`0 0 30px`}>
              <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                <Text fontSize={`20px`}>수강권정보</Text>
              </Wrapper>

              <CustomForm
                form={bForm}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                onFinish={
                  boughtAdminId ? boughtUpdateHandler : boughtCreateHandler
                }
              >
                {boughtAdminId ? (
                  <>
                    <Form.Item
                      name="payWay"
                      label="구매유형"
                      rules={[
                        { required: true, message: "구매유형은 필수입니다." },
                      ]}
                    >
                      <Select size="small" style={{ width: `100%` }} disabled>
                        <Select.Option value={"admin"}>관리자</Select.Option>
                        <Select.Option value={"card"}>카드</Select.Option>
                        <Select.Option value={"nobank"}>
                          무통장입금
                        </Select.Option>
                        <Select.Option value={"paypal"}>페이팔</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="lectureType"
                      label="수강권유형"
                      rules={[
                        { required: true, message: "수강권유형은 필수입니다." },
                      ]}
                    >
                      <Select size="small" style={{ width: `100%` }}>
                        <Select.Option value={1}>1년</Select.Option>
                        <Select.Option value={2}>2년</Select.Option>
                        <Select.Option value={3}>3년</Select.Option>
                        <Select.Option value={4}>평생</Select.Option>
                        <Select.Option value={5}>3달</Select.Option>
                        <Select.Option value={6}>태블릿(신규)</Select.Option>
                        <Select.Option value={7}>태블릿(기존)</Select.Option>
                      </Select>
                    </Form.Item>
                    {boughtAdminId.isPay ? (
                      <>
                        <Form.Item
                          name="startDate"
                          label="시작일"
                          rules={[
                            { required: true, message: "시작일은 필수입니다." },
                          ]}
                        >
                          <DatePicker size="small" style={{ width: `100%` }} />
                        </Form.Item>
                        <Form.Item
                          name="endDate"
                          label="종료일"
                          rules={[
                            { required: true, message: "종료일은 필수입니다." },
                          ]}
                        >
                          <DatePicker size="small" style={{ width: `100%` }} />
                        </Form.Item>
                        <Form.Item name="pauseDate" label="일시정지">
                          <DatePicker size="small" style={{ width: `100%` }} />
                        </Form.Item>
                      </>
                    ) : (
                      <Wrapper margin={`0 0 23px`}>
                        <Text>승인되지 않았습니다.</Text>
                      </Wrapper>
                    )}
                    <Form.Item name="boughtDate" label="구매일">
                      <DatePicker
                        size="small"
                        style={{ width: `100%` }}
                        disabled
                      />
                    </Form.Item>
                  </>
                ) : (
                  <Form.Item
                    name="lectureId"
                    label="이용권 선택"
                    rules={[
                      { required: true, message: "종료일은 필수입니다." },
                    ]}
                  >
                    <Select size="small">
                      {lectureList &&
                        lectureList.map((data, idx) => {
                          return (
                            <Select.Option key={idx} value={data.id}>
                              {data.title}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                )}

                <Wrapper dr={`row`} ju={`flex-end`}>
                  {boughtAdminId && (
                    <Popconfirm
                      title="정말로 삭제하시겠습니까?"
                      okText="삭제"
                      cancelText="취소"
                      onConfirm={boughtDeleteHandler}
                    >
                      <ModalBtn
                        size="small"
                        type="danger"
                        loading={st_boughtAdminDeleteLoading}
                      >
                        삭제
                      </ModalBtn>
                    </Popconfirm>
                  )}

                  {boughtAdminId ? (
                    boughtAdminId.isPay ? (
                      <ModalBtn
                        size="small"
                        type="primary"
                        htmlType="submit"
                        loading={
                          st_boughtAdminCreateLoading ||
                          st_boughtAdminUpdateLoading
                        }
                      >
                        {boughtAdminId ? "수정" : "추가"}
                      </ModalBtn>
                    ) : (
                      ""
                    )
                  ) : (
                    <ModalBtn
                      size="small"
                      type="primary"
                      htmlType="submit"
                      loading={
                        st_boughtAdminCreateLoading ||
                        st_boughtAdminUpdateLoading
                      }
                    >
                      {boughtAdminId ? "수정" : "추가"}
                    </ModalBtn>
                  )}
                </Wrapper>
              </CustomForm>
            </Wrapper>
            <Wrapper margin={`0 0 30px`}>
              <Wrapper al={`flex-start`} margin={`0 0 20px`}>
                <Text fontSize={`20px`}>기존태블릿구매여부</Text>
              </Wrapper>

              <CustomForm
                form={eForm}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                onFinish={
                  existingLecture ? boughtUpdateHandler : boughtCreateHandler
                }
              >
                {existingLecture ? (
                  <>
                    <Form.Item name="lectureType" label="수강권유형">
                      <Select size="small" style={{ width: `100%` }} disabled>
                        <Select.Option value={1}>1년</Select.Option>
                        <Select.Option value={2}>2년</Select.Option>
                        <Select.Option value={3}>3년</Select.Option>
                        <Select.Option value={4}>평생</Select.Option>
                        <Select.Option value={5}>3달</Select.Option>
                        <Select.Option value={6}>태블릿(신규)</Select.Option>
                        <Select.Option value={7}>태블릿(기존)</Select.Option>
                      </Select>
                    </Form.Item>
                    {/* {existingLecture.isPay ? (
                      <>
                        <Form.Item
                          name="startDate"
                          label="시작일"
                          rules={[
                            { required: true, message: "시작일은 필수입니다." },
                          ]}
                        >
                          <DatePicker size="small" style={{ width: `100%` }} />
                        </Form.Item>
                        <Form.Item
                          name="endDate"
                          label="종료일"
                          rules={[
                            { required: true, message: "종료일은 필수입니다." },
                          ]}
                        >
                          <DatePicker size="small" style={{ width: `100%` }} />
                        </Form.Item>
                        <Form.Item name="pauseDate" label="일시정지">
                          <DatePicker size="small" style={{ width: `100%` }} />
                        </Form.Item>
                      </>
                    ) : (
                      <Wrapper margin={`0 0 23px`}>
                        <Text>승인되지 않았습니다.</Text>
                      </Wrapper>
                    )} */}
                    <Form.Item name="boughtDate" label="구매일">
                      <DatePicker
                        size="small"
                        style={{ width: `100%` }}
                        disabled
                      />
                    </Form.Item>
                  </>
                ) : (
                  <Form.Item
                    name="lectureId"
                    label="이용권 선택"
                    rules={[
                      { required: true, message: "종료일은 필수입니다." },
                    ]}
                  >
                    <Select size="small">
                      {lectureList &&
                        lectureList
                          .filter((data) => data.type === 7)
                          .map((data, idx) => {
                            return (
                              <Select.Option key={idx} value={data.id}>
                                {data.title}
                              </Select.Option>
                            );
                          })}
                    </Select>
                  </Form.Item>
                )}

                <Wrapper dr={`row`} ju={`flex-end`}>
                  {existingLecture && (
                    <Popconfirm
                      title="정말로 삭제하시겠습니까?"
                      okText="삭제"
                      cancelText="취소"
                      onConfirm={existingDeleteHandler}
                    >
                      <ModalBtn
                        size="small"
                        type="danger"
                        loading={st_boughtAdminDeleteLoading}
                      >
                        삭제
                      </ModalBtn>
                    </Popconfirm>
                  )}

                  {!existingLecture && (
                    <ModalBtn
                      size="small"
                      type="primary"
                      htmlType="submit"
                      loading={
                        st_boughtAdminCreateLoading ||
                        st_boughtAdminUpdateLoading
                      }
                    >
                      추가
                    </ModalBtn>
                  )}
                </Wrapper>
              </CustomForm>
            </Wrapper>
            <Wrapper>
              <Wrapper al={`flex-start`}>
                <Text fontSize={`20px`}>수강 기록</Text>
              </Wrapper>

              {boughtAdminId && (
                <Wrapper dr={`row`} ju={`flex-end`} margin={`10px 0`}>
                  <CustomSlider
                    disabled
                    min={0}
                    max={boughtAdminId.lectureType === 5 ? 118 : maxLen}
                    value={
                      boughtAdminId.lectureType === 5
                        ? [
                            ...new Set(
                              adminUserEnjoyList.map((data) => data.MediumId)
                            ),
                          ].length > 118
                          ? 118
                          : [
                              ...new Set(
                                adminUserEnjoyList.map((data) => data.MediumId)
                              ),
                            ].length
                        : [
                            ...new Set(
                              adminUserEnjoyList.map((data) => data.MediumId)
                            ),
                          ].length
                    }
                  />
                  <Wrapper fontSize={`14px`} width={`auto`}>
                    {boughtAdminId.lectureType === 5
                      ? 118
                      : [
                          ...new Set(
                            adminUserEnjoyList.map((data) => data.MediumId)
                          ),
                        ].length}
                    강
                  </Wrapper>
                </Wrapper>
              )}
              <Table
                style={{ width: `100%` }}
                size="small"
                columns={columns2}
                dataSource={adminUserEnjoyList}
              />
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Modal>

      {/* KEYWORD MODAL */}
      <Modal
        title="키워드 관리"
        visible={kModal}
        onCancel={kModalToggle}
        footer={null}
        width={`1080px`}
      >
        <CustomForm2 layout="inline" from={kForm} onFinish={kCreateHandler}>
          <Form.Item
            name="value"
            rules={[{ required: true, message: "키워드를 입력해주세요." }]}
          >
            <Input
              style={{ width: `300px` }}
              placeholder="생성할 키워드를 입력해주세요."
              size="small"
            />
          </Form.Item>
          <Button
            size="small"
            type="primary"
            htmlType="submit"
            loading={st_keywordCreateLoading}
          >
            생성
          </Button>
        </CustomForm2>
        <Table
          size="small"
          columns={columns3}
          dataSource={keywordList ? keywordList : []}
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
      type: USERLIST_REQUEST,
    });

    context.store.dispatch({
      type: LECTURE_LIST_REQUEST,
      data: {
        searchType: [1, 2, 3, 4, 5, 6, 7],
      },
    });

    context.store.dispatch({
      type: KEYWORD_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(UserList);
