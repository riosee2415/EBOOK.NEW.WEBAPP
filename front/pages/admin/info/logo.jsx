import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Image, Button, message } from "antd";
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
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import {
  LOGO_GET_REQUEST,
  LOGO_HEADER_IMAGE_REQUEST,
  LOGO_FOOTER_IMAGE_REQUEST,
} from "../../../reducers/logo";

const HFView = styled.div`
  font-size: 13px;
  position: relative;
  margin-bottom: 10px;

  &:before {
    content: "";
    position: absolute;
    bottom: -2px;
    left: -3px;
    width: 120px;
    height: 14px;
    background: ${(props) => props.theme.adminTheme_4};
    opacity: 0.3;
    border-radius: 10px;
    z-index: -1;
  }
`;

const VImage = styled(Image)`
  width: 500px;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;

  border: 1px solid ${(props) => props.theme.lightGrey_C};
  box-shadow: 3px 3px 9px ${(props) => props.theme.lightGrey_C};
`;

const NotExText = styled.div`
  color: ${(props) => props.theme.red_C};
  font-size: 13px;
  border-bottom: 3px solid ${(props) => props.theme.red_C};
`;

// 데이터가 있을 때!
const UpsertBox = ({ data, type, imageURL, dispatch }) => {
  const imageInputHeader = useRef();
  const imageInputFooter = useRef();

  /////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////HEADER IMAGE/////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////
  const clickImageUploadHeader = useCallback(() => {
    imageInputHeader.current.click();
  }, [imageInputHeader.current]);

  const onChangeImagesHeader = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: LOGO_HEADER_IMAGE_REQUEST,
      data: formData,
    });
  });
  /////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////FOOTER IMAGE/////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////
  const clickImageUploadFooter = useCallback(() => {
    imageInputFooter.current.click();
  }, [imageInputFooter.current]);

  const onChangeImagesFooter = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: LOGO_FOOTER_IMAGE_REQUEST,
      data: formData,
    });
  });
  /////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////

  return (
    <Wrapper height={`100%`} ju={`flex-start`} al={`flex-start`}>
      <HFView>{type} 영역의 로고 입니다.</HFView>

      {type === "HEADER" ? (
        data.filter((v) => v.typeOf === "H").length === 0 ? (
          <>
            <NotExText>{type}로고가 등록되지 않았습니다.</NotExText>
            <VImage src={null} />
          </>
        ) : (
          <VImage
            src={
              data.filter((v) => v.typeOf === "H").length > 0
                ? data.filter((v) => v.typeOf === "H")[0].imageURL
                : null
            }
          />
        )
      ) : data.filter((v) => v.typeOf === "F").length === 0 ? (
        <>
          <NotExText>{type}로고가 등록되지 않았습니다.</NotExText>
          <VImage src={null} />
        </>
      ) : (
        <VImage
          src={
            data.filter((v) => v.typeOf === "F").length > 0
              ? data.filter((v) => v.typeOf === "F")[0].imageURL
              : null
          }
        />
      )}

      <Wrapper height={`10px`}></Wrapper>

      <input
        type="file"
        name="image"
        accept=".png, .jpg"
        // multiple
        hidden
        ref={type === "HEADER" ? imageInputHeader : imageInputFooter}
        onChange={
          type === "HEADER" ? onChangeImagesHeader : onChangeImagesFooter
        }
      />
      <Button
        size="small"
        type="primary"
        onClick={
          type === "HEADER" ? clickImageUploadHeader : clickImageUploadFooter
        }
      >
        로고이미지 업로드
      </Button>

      <Wrapper>
        <GuideUl>
          <GuideLi>이미지는 jpeg, jpg, png 이미지 파일을 선택해주세요.</GuideLi>
          <GuideLi isImpo={true}>
            비트맵 방식의 이미지나 PDF 파일은 정상적으로 보이지 않을 수
            있습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>
    </Wrapper>
  );
};

const Logo = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    logos,
    st_logoHeaderImageGetDone,
    st_logoHeaderImageGetError,
    st_logoFooterImageGetDone,
    st_logoFooterImageGetError,
  } = useSelector((state) => state.logo);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("기초정보관리");
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

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_logoHeaderImageGetDone) {
      message.success("해더 로고이미지가 변경되었습니다.");
      dispatch({
        type: LOGO_GET_REQUEST,
      });
    }
  }, [st_logoHeaderImageGetDone]);

  useEffect(() => {
    if (st_logoHeaderImageGetError) {
      message.error("해더 이미지 변경에 실패했습니다. 다시 시도해주세요.");
      dispatch({
        type: LOGO_GET_REQUEST,
      });
    }
  }, [st_logoHeaderImageGetError]);

  useEffect(() => {
    if (st_logoFooterImageGetDone) {
      message.success("푸터 로고이미지가 변경되었습니다.");
      dispatch({
        type: LOGO_GET_REQUEST,
      });
    }
  }, [st_logoFooterImageGetDone]);

  useEffect(() => {
    if (st_logoFooterImageGetError) {
      message.error("푸터 이미지 변경에 실패했습니다. 다시 시도해주세요.");
      dispatch({
        type: LOGO_GET_REQUEST,
      });
    }
  }, [st_logoFooterImageGetError]);

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
            로고 이미지는 [해더]로고와 [푸터]로고를 관리할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            이미지는 3:2비율로 업로드해주세요. 이미지비율이 상이할 경우 화면에
            비정상적으로 보일 수 있습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr={`row`} ju={`space-around`}>
        <Wrapper
          width={`45%`}
          height={`100%`}
          padding={`30px`}
          radius={`8px`}
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <UpsertBox data={logos} type="HEADER" dispatch={dispatch} />
        </Wrapper>
        <Wrapper
          width={`45%`}
          height={`100%`}
          padding={`30px`}
          radius={`8px`}
          shadow={`2px 2px 4px ${Theme.lightGrey_C}`}
        >
          <UpsertBox data={logos} type="FOOTER" dispatch={dispatch} />
        </Wrapper>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`30px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>
            해당 로고 이미지는 홈페이지 및 어플리케이션에 즉시 적용됩니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            과도한 이미지 업로드 및 대용량 이미지업로드는 홈페이지 및
            어플리케이션을 느려지게 합니다. (이미지 크기는 1MB 미만 사용을
            권장합니다.)
          </GuideLi>
        </GuideUl>
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
      type: LOGO_GET_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Logo);
