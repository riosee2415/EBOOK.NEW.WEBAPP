import React, { useState, useEffect, useCallback } from "react";
import {
  RowWrapper,
  ColWrapper,
  Image,
  ATag,
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
} from "./commonComponents";
import styled from "styled-components";
import Theme from "./Theme";
import { AlignRightOutlined } from "@ant-design/icons";
import { Drawer, message } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { LOGO_GET_REQUEST } from "../reducers/logo";
import { useRouter } from "next/router";
import useWidth from "../hooks/useWidth";
import { LOAD_MY_INFO_REQUEST, LOGOUT_REQUEST } from "../reducers/user";

const MobileRow = styled(RowWrapper)`
  display: none;

  background: transparent;
  top: 0;
  left: 0;
  z-index: 10000;
  transition: 0.5s;
  padding: 10px 0;

  &.background {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
  }

  @media (max-width: 1100px) {
    display: flex;
  }
`;

const Menu = styled.h2`
  height: 90px;
  line-height: 90px;
  font-size: 23px;
  font-weight: 600;
  /* color: ${Theme.white_C}; */
  text-align: center;
  position: relative;
  margin: 0 42px;

  color: ${(props) => props.isActive && Theme.basicTheme_C};

  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.basicTheme_C};
    /* border-bottom: 3px solid ${Theme.white_C};
    transition: 0.4s; */
  }
`;

const HoverText = styled(Text)`
  padding: 6px 14px;
  color: ${(props) => props.theme.grey3_C};
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.basicTheme_C};
  }
`;

const HoverText2 = styled(Text)`
  background: ${(props) => props.theme.basicTheme_C};
  border: 1px solid ${(props) => props.theme.basicTheme_C};
  padding: 3px 14px;
  color: ${(props) => props.theme.white_C};
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: ${(props) => props.theme.basicTheme_C};
    background: ${(props) => props.theme.white_C};
  }
`;

const AppHeader = ({}) => {
  ////////////// - USE STATE- ///////////////
  const router = useRouter();
  const dispatch = useDispatch();
  const width = useWidth();

  const [headerScroll, setHeaderScroll] = useState(false);
  const [pageY, setPageY] = useState(0);
  // const documentRef = useRef(document);

  const [drawar, setDrawar] = useState(false);
  const [subMenu, setSubMenu] = useState(``);

  const { logos } = useSelector((state) => state.logo);
  const { me, st_logoutDone, st_logoutError } = useSelector(
    (state) => state.user
  );

  ///////////// - EVENT HANDLER- ////////////

  const drawarToggle = useCallback(() => {
    setDrawar(!drawar);
  });

  const handleScroll = useCallback(() => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const headerScroll = pageY && pageYOffset !== 0 && pageYOffset !== pageY;
    setHeaderScroll(headerScroll);
    setPageY(pageYOffset);
  });

  const logoutHandler = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, []);

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  useEffect(() => {
    dispatch({
      type: LOGO_GET_REQUEST,
    });
  }, [router.query]);

  useEffect(() => {
    if (st_logoutDone) {
      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      return message.success("로그아웃 되었습니다.");
    }

    if (st_logoutError) {
      return message.error(st_logoutError);
    }
  }, [st_logoutDone, st_logoutError]);

  return (
    <>
      <WholeWrapper
        display={width < 1100 && "none"}
        // position={`fixed`}
        top={`0`}
        left={`0`}
        zIndex={`99`}
        // bgColor={headerScroll === true && Theme.black_C}
      >
        <RsWrapper dr={`row`} ju={`space-between`}>
          <ATag href="/" width={`210px`}>
            {logos && logos.find((data) => data.typeOf === "H") && (
              <Image
                width={`100%`}
                src={logos.find((data) => data.typeOf === "H").imageURL}
                alt="logo"
              />
            )}
          </ATag>
          <Wrapper dr={`row`} width={`auto`}>
            <Link href={`/enrolment`}>
              <a>
                <Menu isActive={router.pathname === `/enrolment`}>
                  수강신청
                </Menu>
              </a>
            </Link>
            <Link href={`/lecture`}>
              <a>
                <Menu isActive={router.pathname === `/lecture`}>커리큘럼</Menu>
              </a>
            </Link>
            <Link href={`/review`}>
              <a>
                <Menu isActive={router.pathname === `/review`}>수강후기</Menu>
              </a>
            </Link>
            <Link href={`/center`}>
              <a>
                <Menu isActive={router.pathname === `/center`}>고객센터</Menu>
              </a>
            </Link>
          </Wrapper>
          {me ? (
            <Wrapper width={`auto`} dr={`row`}>
              <Link href={`/mypage`}>
                <a>
                  <HoverText2>나의 강의실</HoverText2>
                </a>
              </Link>

              <HoverText onClick={logoutHandler}>로그아웃</HoverText>
            </Wrapper>
          ) : (
            <Wrapper width={`auto`} dr={`row`}>
              <Link href={`/user/login`}>
                <a>
                  <HoverText>로그인</HoverText>
                </a>
              </Link>
              <Link href={`/user/signup`}>
                <a>
                  <HoverText>회원가입</HoverText>
                </a>
              </Link>
            </Wrapper>
          )}
        </RsWrapper>
      </WholeWrapper>

      {/* mobile */}
      <MobileRow justify={`center`} className={headerScroll && "background"}>
        <ColWrapper span={11} al={`flex-start`}>
          <ATag href="/" width={`155px`}>
            {logos && logos.find((data) => data.typeOf === "H") && (
              <Image
                width={`155px`}
                src={logos.find((data) => data.typeOf === "H").imageURL}
                alt="logo"
              />
            )}
          </ATag>
        </ColWrapper>
        <ColWrapper span={11} al={`flex-end`} fontSize={`2rem`}>
          <AlignRightOutlined onClick={drawarToggle} />
        </ColWrapper>

        {drawar && (
          <Drawer
            placement="right"
            closable={true}
            onClose={drawarToggle}
            visible={drawarToggle}
            getContainer={false}
          >
            {me ? (
              <Wrapper width={`auto`} dr={`row`} margin={`20px 0 0`}>
                <Link href={`/mypage`}>
                  <a>
                    <HoverText>나의 강의실</HoverText>
                  </a>
                </Link>

                <HoverText onClick={logoutHandler}>로그아웃</HoverText>
              </Wrapper>
            ) : (
              <Wrapper width={`auto`} dr={`row`} margin={`20px 0 0`}>
                <Link href={`/user/login`}>
                  <a>
                    <HoverText>로그인</HoverText>
                  </a>
                </Link>
                <Link href={`/user/signup`}>
                  <a>
                    <HoverText>회원가입</HoverText>
                  </a>
                </Link>
              </Wrapper>
            )}

            <Link href={`/enrolment`}>
              <a>
                <Menu isActive={router.pathname === `/enrolment`}>
                  수강신청
                </Menu>
              </a>
            </Link>
            <Link href={`/lecture`}>
              <a>
                <Menu isActive={router.pathname === `/lecture`}>커리큘럼</Menu>
              </a>
            </Link>
            <Link href={`/review`}>
              <a>
                <Menu isActive={router.pathname === `/review`}>수강후기</Menu>
              </a>
            </Link>
            <Link href={`/center`}>
              <a>
                <Menu isActive={router.pathname === `/center`}>고객센터</Menu>
              </a>
            </Link>
          </Drawer>
        )}
      </MobileRow>
    </>
  );
};

export default AppHeader;
