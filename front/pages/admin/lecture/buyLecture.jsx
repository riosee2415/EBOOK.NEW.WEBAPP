import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  DatePicker,
  Form,
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
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  CheckOutlined,
  CloseOutlined,
  HomeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  BOUGHT_ADDRESS_UPDATE_REQUEST,
  BOUGHT_ADMIN_DELETE_REQUEST,
  BOUGHT_ADMIN_LIST_REQUEST,
  BOUGHT_ISPAY_UPDATE_REQUEST,
} from "../../../reducers/boughtLecture";
import { CSVLink } from "react-csv";
import moment from "moment";

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

const BuyLecture = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    boughtAdminList,
    st_boughtAdminListLoading,
    st_boughtAdminListError,
    //

    st_boughtIsPayUpdateLoading,
    st_boughtIsPayUpdateDone,
    st_boughtIsPayUpdateError,
    //
    st_boughtAddressUpdateLoading,
    st_boughtAddressUpdateDone,
    st_boughtAddressUpdateError,
    //
    st_boughtAdminDeleteLoading,
    st_boughtAdminDeleteDone,
    st_boughtAdminDeleteError,
  } = useSelector((state) => state.boughtLecture);

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
  const [aForm] = Form.useForm();

  const [searchDate, setSearchDate] = useState(moment());
  const [searchPayType, setSearchPayType] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [isPayType, setIsPayType] = useState(null);
  const [isEndDate, setIsEndDate] = useState(3);

  const [aModal, setAModal] = useState(false);
  const [aData, setAData] = useState(null);

  const [svcData, setSvcData] = useState(null);
  const [svcData2, setSvcData2] = useState(null);

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

  // 검색
  useEffect(() => {
    dispatch({
      type: BOUGHT_ADMIN_LIST_REQUEST,
      data: {
        searchDate: searchDate ? searchDate.format("YYYY-MM") : searchDate,
        searchType: searchType,
        searchPayType: searchPayType,
        isPayType: searchPayType === "nobank" && isPayType,
        isEndDate: isEndDate,
      },
    });
  }, [searchDate, searchType, searchPayType, isPayType, isEndDate]);

  // 엑셀

  useEffect(() => {
    if (boughtAdminList) {
      const scvData = [];
      const scvData2 = [];

      boughtAdminList &&
        boughtAdminList.map((data, idx) => {
          // console.log(data.mobile);
          scvData.push({
            no: data.boughtDate,
            name: data.receiver,
            mobile: data.mobile + "'",
            zoneCode: data.zoneCode,
            address:
              (data.address === "-" ? "해외결제" : data.address) +
              " " +
              data.detailAddress,
            none: "",
            id: data.userLoginId,
            birth: data.birth,
            gender: data.gender,
            isBuyBook: data.isBuyBook ? "○" : "✕",
            type: data.payType,
            complete: data.isPay
              ? "처리 완료"
              : data.payType === "nobank"
              ? "처리"
              : "처리 완료",
          });
        });
      boughtAdminList &&
        boughtAdminList.map((data, idx) => {
          const regex = /-/gi;

          scvData2.push({
            no: data.boughtDate,
            name: data.receiver,
            mobile: data.mobile.replace(regex, "") + "ㅤ",
            zoneCode: data.zoneCode,
            address:
              (data.address === "-" ? "해외결제" : data.address) +
              " " +
              data.detailAddress,
            none: "",
            id: data.userLoginId,
            birth: data.birth,
            gender: data.gender,
            isBuyBook: data.isBuyBook ? "○" : "✕",
            type: data.viewPayType,
            complete: data.isPay
              ? "처리 완료"
              : data.payType === "nobank"
              ? "처리 필요"
              : "처리 완료",
          });
        });
      setSvcData(scvData);
      setSvcData2(scvData2);
    }
  }, [boughtAdminList]);

  // 강의리스트 후처리
  useEffect(() => {
    if (st_boughtAdminListError) {
      return message.error(st_boughtAdminListError);
    }
  }, [st_boughtAdminListError]);

  // 승인 후처리
  useEffect(() => {
    if (st_boughtIsPayUpdateDone) {
      dispatch({
        type: BOUGHT_ADMIN_LIST_REQUEST,
        data: {
          searchDate: searchDate,
          searchType: searchType,
          searchPayType: searchPayType,
          isPayType: searchPayType === "nobank" && isPayType,
          isEndDate: isEndDate,
        },
      });

      return message.success("승인되었습니다.");
    }

    if (st_boughtIsPayUpdateError) {
      return message.error(st_boughtIsPayUpdateError);
    }
  }, [st_boughtIsPayUpdateDone, st_boughtIsPayUpdateError]);

  // 정보확인 후처리
  useEffect(() => {
    if (st_boughtAddressUpdateDone) {
      dispatch({
        type: BOUGHT_ADMIN_LIST_REQUEST,
        data: {
          searchDate: searchDate,
          searchType: searchType,
          searchPayType: searchPayType,
          isPayType: searchPayType === "nobank" && isPayType,
          isEndDate: isEndDate,
        },
      });

      aModalToggle(null);

      return message.success("주소가 변경되었습니다.");
    }
    if (st_boughtAddressUpdateError) {
      return message.error(st_boughtAddressUpdateError);
    }
  }, [st_boughtAddressUpdateDone, st_boughtAddressUpdateError]);

  // 삭제 후처리
  useEffect(() => {
    if (st_boughtAdminDeleteDone) {
      dispatch({
        type: BOUGHT_ADMIN_LIST_REQUEST,
        data: {
          searchDate: searchDate,
          searchType: searchType,
          searchPayType: searchPayType,
          isPayType: searchPayType === "nobank" && isPayType,
          isEndDate: isEndDate,
        },
      });

      return message.success("이용권이 삭제되었습니디.");
    }
    if (st_boughtAdminDeleteError) {
      return message.error(st_boughtAdminDeleteError);
    }
  }, [st_boughtAdminDeleteDone, st_boughtAdminDeleteError]);

  ////// TOGGLE //////
  // 정보확인
  const aModalToggle = useCallback(
    (data) => {
      if (data) {
        setAData(data);
        aForm.setFieldsValue({
          payType: data.payType,
          mobile: data.mobile,
          receiver: data.receiver,
          address: data.address,
          detailAddress: data.detailAddress,
          etc: data.etc,
        });
      } else {
        setAData(null);
        aForm.resetFields();
      }
      setAModal((prev) => !prev);
    },
    [aModal, aData]
  );

  ////// HANDLER //////

  // 검색
  const searchDateHandler = useCallback(
    (data) => {
      setSearchDate(data ? data : null);
    },
    [searchDate]
  );

  const searchPayTypeChangeHandler = useCallback(
    (data) => {
      setSearchPayType(data);
    },
    [searchPayType]
  );

  const searchTypeChangeHandler = useCallback(
    (data) => {
      setSearchType(data);
    },
    [searchType]
  );

  const isPayTypeChangeHandler = useCallback(
    (data) => {
      setIsPayType(data);
    },
    [isPayType]
  );

  // 정보확인
  const aUpdateHandler = useCallback(
    (data) => {
      dispatch({
        type: BOUGHT_ADDRESS_UPDATE_REQUEST,
        data: {
          id: aData.id,
          payType: data.payType,
          mobile: data.mobile,
          receiver: data.receiver,
          address: data.address,
          detailAddress: data.detailAddress,
          etc: data.etc,
        },
      });
    },
    [aData]
  );

  // 승인하기
  const isPayUpdateHandler = useCallback(
    (data) => {
      dispatch({
        type: BOUGHT_ISPAY_UPDATE_REQUEST,
        data: {
          id: data.id,
          lectureType: data.lectureType,
        },
      });
    },
    [aData]
  );

  // 삭제하기
  const deleteHandler = useCallback(
    (data) => {
      dispatch({
        type: BOUGHT_ADMIN_DELETE_REQUEST,
        data: {
          id: data.id,
        },
      });
    },
    [aData]
  );

  const isEndDateChangeHandler = useCallback(
    (data) => {
      setIsEndDate(data);
    },
    [isEndDate]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const columns = [
    {
      width: "5%",
      align: "center",
      title: "번호",
      dataIndex: "num",
    },
    {
      width: "10%",
      title: "구매자",
      dataIndex: "username",
    },
    {
      width: "10%",
      title: "구매자 ID",
      dataIndex: "userLoginId",
    },
    {
      width: "10%",
      title: "배송자",
      dataIndex: "receiver",
    },
    {
      width: "10%",
      title: "연락처",
      dataIndex: "mobile",
    },
    {
      width: "6%",
      align: "center",
      title: "구매 유형",
      dataIndex: "viewLectureType",
    },
    {
      width: "6%",
      align: "center",
      title: "결제 유형",
      dataIndex: "viewPayType",
    },
    {
      width: "6%",
      align: "center",
      title: "교재여부",
      render: (data) =>
        data.isBuyBook ? (
          <CheckOutlined style={{ color: Theme.naver_C }} />
        ) : (
          <CloseOutlined style={{ color: Theme.red_C }} />
        ),
    },
    {
      width: "12%",
      title: "입금자명",
      dataIndex: "name",
    },
    {
      width: "10%",
      title: "강의 구매일",
      dataIndex: "viewBoughtDate",
    },
    {
      width: "5%",
      align: "center",
      title: "정보확인",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          onClick={() => aModalToggle(data)}
          loading={st_boughtAddressUpdateLoading}
        >
          정보변경
        </Button>
      ),
    },
    {
      width: "5%",
      align: "center",
      title: "승인",
      render: (data) =>
        data.isPay ? (
          <CheckOutlined style={{ color: Theme.naver_C }} />
        ) : (
          <Popconfirm
            title="승인하시겠습니까?"
            okText="승인"
            cancelText="취소"
            onConfirm={() => isPayUpdateHandler(data)}
          >
            <Button
              size="small"
              type="primary"
              loading={st_boughtAdminDeleteLoading}
            >
              승인
            </Button>
          </Popconfirm>
        ),
    },
    {
      width: "5%",
      align: "center",
      title: "삭제",
      render: (data) => (
        <Popconfirm
          title="삭제하시겠습니까?"
          okText="삭제"
          cancelText="취소"
          onConfirm={() => deleteHandler(data)}
        >
          <Button
            size="small"
            type="danger"
            loading={st_boughtIsPayUpdateLoading}
          >
            삭제
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const searchTypeArr = [
    {
      type: null,
      title: "전체",
    },
    {
      type: 1,
      title: "1년",
    },
    {
      type: 2,
      title: "2년",
    },
    {
      type: 3,
      title: "3년",
    },
    {
      type: 4,
      title: "평생",
    },
    {
      type: 5,
      title: "3달",
    },
    {
      type: 6,
      title: "태블릿(신규)",
    },
    {
      type: 7,
      title: "태블릿(기존)",
    },
  ];

  const searchPayTypeArr = [
    {
      type: null,
      title: "전체",
    },
    {
      type: "card",
      title: "카드",
    },
    {
      type: "nobank",
      title: "무통장입금",
    },
    {
      type: "admin",
      title: "관리자제어",
    },
  ];

  const headers = [
    { label: "신청일자", key: "no" },
    { label: "성함", key: "name" },
    { label: "연락처", key: "mobile" },
    { label: "우편번호", key: "zoneCode" },
    { label: "배송지", key: "address" },
    { label: "배송지", key: "detailAddress" },
    { label: "배송여부", key: "none" },
    { label: "아이디", key: "id" },
    { label: "생년월일", key: "birth" },
    { label: "성별", key: "gender" },
    { label: "교제 여부", key: "isBuyBook" },
    { label: "결제 유형", key: "type" },
    { label: "처리 유무", key: "complete" },
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
          <GuideLi>회원이 구매한 구매강의를 관리할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            엑셀은 현재 검색된 리스트까지 출력합니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            정보확인또는 승인시 바로 반영이 되니 신중한 작업을 필요로 합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 20px" al="flex-start">
        <Wrapper margin="5px">
          <Wrapper dr={`row`} ju={`space-between`}>
            <Wrapper width={`auto`} dr={`row`} margin={`0 0 10px`}>
              <DatePicker
                size="small"
                picker="month"
                // locale={{ lang: { locale: "ko",  } }}
                style={{ width: `150px` }}
                placeholder="검색하실 결제일을 선택해주세요."
                onChange={searchDateHandler}
                value={searchDate}
              />
              <Select
                style={{ width: `280px` }}
                size="small"
                placeholder="검색하실 결제 유형을 선택해주세요."
                onChange={searchPayTypeChangeHandler}
              >
                {searchPayTypeArr &&
                  searchPayTypeArr.map((data, idx) => {
                    return (
                      <Select.Option value={data.type} key={idx}>
                        {data.title}
                      </Select.Option>
                    );
                  })}
              </Select>
              {searchPayType === "nobank" && (
                <Select
                  style={{ width: `280px` }}
                  size="small"
                  placeholder="승인여부를 선택해주세요."
                  onChange={isPayTypeChangeHandler}
                >
                  <Select.Option value={3}>전체</Select.Option>
                  <Select.Option value={1}>승인</Select.Option>
                  <Select.Option value={2}>미승인</Select.Option>
                </Select>
              )}
              <Select
                style={{ width: `280px` }}
                size="small"
                placeholder="검색하실 구매 유형을 선택해주세요."
                onChange={searchTypeChangeHandler}
              >
                {searchTypeArr &&
                  searchTypeArr.map((data, idx) => {
                    return (
                      <Select.Option value={data.type} key={idx}>
                        {data.title}
                      </Select.Option>
                    );
                  })}
              </Select>
              <Select
                style={{ width: `280px` }}
                size="small"
                placeholder="검색하실 진행 유형을 선택해주세요."
                onChange={isEndDateChangeHandler}
              >
                <Select.Option value={3}>전체</Select.Option>
                <Select.Option value={1}>진행</Select.Option>
                <Select.Option value={2}>만료</Select.Option>
              </Select>
            </Wrapper>
            <Wrapper width={`auto`} dr={`row`}>
              {svcData && (
                <DownloadBtn
                  filename={`결제내역`}
                  headers={headers}
                  data={svcData}
                >
                  엑셀 다운로드{" "}
                </DownloadBtn>
              )}
              {svcData2 && (
                <DownloadBtn
                  filename={`결제내역(공백제거)`}
                  headers={headers}
                  data={svcData2}
                >
                  엑셀 다운로드(공백제거){" "}
                </DownloadBtn>
              )}
            </Wrapper>
          </Wrapper>
          <Table
            size="small"
            loading={st_boughtAdminListLoading}
            dataSource={boughtAdminList}
            columns={columns}
            rowKey="num"
            style={{ width: "100%" }}
            pagination={{
              total: boughtAdminList ? boughtAdminList.length : 0,
              pageSize: boughtAdminList ? boughtAdminList.length : 0,
              hideOnSinglePage: true,
            }}
          ></Table>
        </Wrapper>
      </Wrapper>

      {/* ADDRESS MODAL */}
      <Modal
        width={`700px`}
        title="정보확인"
        visible={aModal}
        onCancel={() => aModalToggle(null)}
        footer={null}
      >
        <Form
          form={aForm}
          onFinish={aUpdateHandler}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
        >
          <Form.Item
            name="payType"
            label="결제유형"
            rules={[{ required: true, message: "결제유형을 선택해주세요." }]}
          >
            <Select size="small">
              <Select.Option value="card">신용카드</Select.Option>
              <Select.Option value="nobank">무통장입금</Select.Option>
              <Select.Option value="admin">관리자제어</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="mobile"
            label="전화번호"
            rules={[{ required: true, message: "전화번호를 입력해주세요." }]}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            name="receiver"
            label="수령인"
            rules={[{ required: true, message: "수령인을 입력해주세요." }]}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            name="address"
            label="주소"
            rules={[{ required: true, message: "주소를 선택해주세요." }]}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            name="detailAddress"
            label="상세주소"
            rules={[{ required: true, message: "상세주소를 선택해주세요." }]}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item name="etc" label="비고">
            <Input.TextArea
              size="small"
              autoSize={{ minRows: 5, maxRows: 15 }}
            />
          </Form.Item>

          <Wrapper dr={`row`} ju={`flex-end`}>
            <ModalBtn size="small" onClick={() => aModalToggle(null)}>
              취소
            </ModalBtn>
            <ModalBtn
              size="small"
              type="primary"
              htmlType="submit"
              loading={st_boughtAddressUpdateLoading}
            >
              수정
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(BuyLecture);
