import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Image, Popover, Switch, Button, message, Form, Input } from "antd";
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
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import {
  KAKAOCH_GET_REQUEST,
  KAKAOCH_NEW_REQUEST,
  KAKAOCH_USEYN_REQUEST,
  KAKAOCH_PREVIEW_REQUEST,
  KAKAOCH_UPDATE_REQUEST,
} from "../../../reducers/company";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";

const StatusText = styled.div`
  color ${(props) =>
    props.useYn ? props.theme.adminTheme_4 : props.theme.red_C};
`;

const GBox = styled.div`
  width: 100%;
  height: 80px;

  border-radius: 5px;
  box-shadow: 3px 3px 3px ${(props) => props.theme.lightGrey_C};
`;

const ImageView = styled(Image)`
  width: 200px;
  height: 200px;
  margin-bottom: 5px;
`;

const ImageButton = styled(Button)`
  width: 200px;
  margin-bottom: 5px;
`;

const KakaoCh = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    kakaochs,
    st_kakaochNewLoading,
    st_kakaochNewDone,
    st_kakaochNewError,
    st_kakaochUseYnDone,
    st_kakaochUseYnError,
    kakaochPreviewImage,
    st_kakakochPreviewLoading,
    st_kakaochPreviewYnDone,
    st_kakaochPreviewYnError,
    st_kakaochUpdateYnDone,
    st_kakaochUpdateYnError,
  } = useSelector((state) => state.company);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("홈정보관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const previewImageRef = useRef();
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
    if (st_kakaochUpdateYnDone) {
      message.success("카카오톡 오픈톡 채널 정보가 수정되었습니다.");

      dispatch({
        type: KAKAOCH_GET_REQUEST,
      });
    }
  }, [st_kakaochUpdateYnDone]);

  useEffect(() => {
    if (st_kakaochPreviewYnDone) {
      message.success("카카오톡 오픈톡 채널 사용 아이콘이 등록되었습니다.");

      dispatch({
        type: KAKAOCH_GET_REQUEST,
      });
    }
  }, [st_kakaochPreviewYnDone]);

  useEffect(() => {
    if (st_kakaochUseYnDone) {
      message.success("카카오톡 오픈톡 채널 사용여부가 변경되었습니다.");

      dispatch({
        type: KAKAOCH_GET_REQUEST,
      });
    }
  }, [st_kakaochUseYnDone]);

  useEffect(() => {
    if (st_kakaochNewDone) {
      message.success("새로운 카카오톡 오픈톡 채널정보가 생성되었습니다.");

      dispatch({
        type: KAKAOCH_GET_REQUEST,
      });

      if (kakaochs.length > 0) {
        infoForm.setFieldsValue({
          URL: kakaochs[0].URL,
          updatedAt: kakaochs[0].updatedAt,
          updator: kakaochs[0].username,
          createdAt: kakaochs[0].createdAt,
        });
      }
    }
  }, [st_kakaochNewDone]);

  useEffect(() => {
    if (kakaochs.length > 0) {
      infoForm.setFieldsValue({
        URL: kakaochs[0].URL,
        updatedAt: kakaochs[0].updatedAt,
        updator: kakaochs[0].username,
        createdAt: kakaochs[0].createdAt,
      });
    }
  }, [kakaochs]);

  useEffect(() => {
    if (st_kakaochUpdateYnError) {
      return message.success(st_kakaochUpdateYnError);
    }
  }, [st_kakaochUpdateYnError]);

  useEffect(() => {
    if (st_kakaochNewError) {
      return message.success(st_kakaochNewError);
    }
  }, [st_kakaochNewError]);

  useEffect(() => {
    if (st_kakaochUseYnError) {
      return message.success(st_kakaochUseYnError);
    }
  }, [st_kakaochUseYnError]);

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

    if (kakaochs.length > 0) {
      infoForm.setFieldsValue({
        URL: kakaochs[0].URL,
        updatedAt: kakaochs[0].updatedAt,
        updator: kakaochs[0].username,
        createdAt: kakaochs[0].createdAt,
      });
    }
  }, []);

  ////// HANDLER //////

  const goToGuide = () => {
    window.open(`https://kakaobusiness.gitbook.io/main/`);
  };

  const newHandler = useCallback(() => {
    dispatch({
      type: KAKAOCH_NEW_REQUEST,
    });
  }, []);

  const useYnHandler = useCallback((id, useYn) => {
    dispatch({
      type: KAKAOCH_USEYN_REQUEST,
      data: {
        id: id,
        nextFlag: parseInt(useYn) === 0 ? 1 : 0,
      },
    });
  }, []);

  const imageUploadButtonClick = useCallback(() => {
    previewImageRef.current.click();
  }, [previewImageRef.current]);

  const selectImage = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: KAKAOCH_PREVIEW_REQUEST,
      data: formData,
    });
  }, []);

  const updateInfoHandler = useCallback(
    (data) => {
      dispatch({
        type: KAKAOCH_UPDATE_REQUEST,
        data: {
          id: kakaochs[0].id,
          imageURL: kakaochPreviewImage || kakaochs[0].imageURL,
          URL: data.URL,
        },
      });
    },
    [kakaochPreviewImage, kakaochs]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

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
            카카오 채널톡의 사용여부 및 URL을 등록, 변경할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            이미지는 1:1비율로 업로드해주세요. 이미지비율이 상이할 경우 화면에
            비정상적으로 보일 수 있습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper padding={`0px 50px`} dr={"row"}>
        <Wrapper width={`50%`} padding={`10px`}>
          <GBox>
            <Text>
              카카오톡 오픈채널톡 LINK를 사용하시려면 사용여부를 [사용]으로
              변경하세요.
            </Text>
            <Text>
              오픈채널톡 바로가기는 웹사이트 및 어플리케이션 우측 하단에
              배치됩니다.
            </Text>
            <Text>사용하고싶은 이미지를 등록 후 [사용] 해주세요.</Text>
          </GBox>

          {kakaochs.length === 0 ? (
            <Wrapper padding={`20px`}>
              <Button
                type="primary"
                onClick={newHandler}
                loading={st_kakaochNewLoading}
              >
                카카오 오픈톡 생성하기
              </Button>
            </Wrapper>
          ) : (
            <>
              <Wrapper padding={`10px`} dr="row">
                <Wrapper width={`50%`}>
                  {kakaochs[0].useYn ? (
                    <StatusText useYn={true}>
                      현재 카카오톡 채널을 사용하고 있습니다.
                    </StatusText>
                  ) : (
                    <StatusText useYn={false}>
                      현재 카카오톡 채널은 사용중이 아닙니다.
                    </StatusText>
                  )}
                </Wrapper>

                <Wrapper width={`50%`}>
                  <Switch
                    checked={kakaochs[0].useYn}
                    onChange={() =>
                      useYnHandler(kakaochs[0].id, kakaochs[0].useYn)
                    }
                  />
                </Wrapper>
              </Wrapper>
              <Wrapper al="flex-start" dr={`row`} padding={`10px`}>
                <Wrapper width={`200px`}>
                  <ImageView
                    src={
                      kakaochPreviewImage
                        ? kakaochPreviewImage
                        : kakaochs[0].imageURL
                    }
                  />

                  <input
                    type="file"
                    name="image"
                    accept=".png, .jpg"
                    hidden
                    ref={previewImageRef}
                    onChange={selectImage}
                  />
                  <ImageButton
                    type="primary"
                    onClick={imageUploadButtonClick}
                    loading={st_kakakochPreviewLoading}
                  >
                    채널톡 이미지 업로드
                  </ImageButton>
                </Wrapper>

                <Wrapper
                  width={`calc(100% - 300px)`}
                  padding={`10px 0px 0px 10px`}
                  al={`flex-start`}
                >
                  <Form
                    onFinish={updateInfoHandler}
                    style={{ width: "100%" }}
                    form={infoForm}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    <Form.Item
                      label="링크URL"
                      name="URL"
                      rules={[
                        {
                          required: true,
                          message: "URL은 필수입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>

                    <Form.Item label="최근수정일" name="updatedAt">
                      <Input size="small" readOnly />
                    </Form.Item>

                    <Form.Item label="최근수정관리자" name="updator">
                      <Input size="small" readOnly />
                    </Form.Item>

                    <Form.Item label="최초생성일" name="createdAt">
                      <Input size="small" readOnly />
                    </Form.Item>

                    <Wrapper al={`flex-end`}>
                      <Button size="small" type="primary" htmlType="submit">
                        정보저장
                      </Button>
                    </Wrapper>
                  </Form>
                </Wrapper>
              </Wrapper>
            </>
          )}
        </Wrapper>
        <Wrapper width={`50%`} padding={`10px`}>
          <Image
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
            src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/4LEAFSOFTWARE/assets/images/ryr.png"
          />

          <Wrapper margin={`5px 0px 0px 0px`} al="flex-end">
            <Button type="primary" size="small" onClick={goToGuide}>
              채널톡 가이드 바로가기
            </Button>
          </Wrapper>
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
      type: KAKAOCH_GET_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(KakaoCh);
