import React, { useState, useCallback, useEffect, useRef } from "react";
import { Menu, Switch } from "antd";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_ADMINMENU_STATUS } from "../../reducers/user";
import { Wrapper, Image } from "../commonComponents";
import Link from "next/link";

const { SubMenu } = Menu;

const MenuName = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const AdminMenu = () => {
  const { currentAdminMenu, me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const router = useRouter();

  const menuRef = useRef();

  const [mode, setMode] = useState(`dark`);

  const [curentMenu, setCurrentMenu] = useState(null);

  const openAction = useCallback(
    (e) => {
      setCurrentMenu(e[1]);
      // dispatch({
      //   type: CURRENT_ADMINMENU_STATUS,
      //   data: {
      //     key: e[1],
      //   },
      // });
    },
    [
      curentMenu,
      // currentAdminMenu
    ]
  );

  const clickAction = useCallback((e) => {
    router.replace(e.key);
  }, []);

  // console.log(menuRef);
  // const titleOnHandler = useCallback(
  //   (e) => {
  //     menuRef.current.updater.enqueueReplaceState();
  //     dispatch({
  //       type: CURRENT_ADMINMENU_STATUS,
  //       data: {
  //         key: e.key,
  //       },
  //     });
  //   },
  //   [currentAdminMenu]
  // );

  const menus = [
    {
      title: "통계관리",
      key: "sub1",

      subMenu: [
        {
          name: "접속자통계",
          link: "/admin/logs/acceptLogs",
        },
      ],
    },
    {
      title: "홈정보관리",
      key: "sub2",

      subMenu: [
        {
          name: "사업자정보관리",
          link: "/admin/info/businessInformation",
        },
        {
          name: "로고관리",
          link: "/admin/info/logo",
        },
      ],
    },

    {
      title: "배너관리",
      key: "sub3",
      subMenu: [
        {
          name: "배너관리",
          link: "/admin/banner/banner",
        },
        {
          name: "모바일 배너관리",
          link: "/admin/banner/mobileBanner",
        },
      ],
    },

    {
      title: "게시판관리",
      key: "sub4",
      subMenu: [
        {
          name: "공지사항관리",
          link: "/admin/boards/notice",
          useYn: true,
        },
        {
          name: "강의후기",
          link: "/admin/boards/review",
          useYn: true,
        },
        {
          name: "자료실",
          link: "/admin/boards/reference",
          useYn: true,
        },
      ],
    },
    {
      title: "회원관리",
      key: "sub5",
      subMenu: [
        {
          name: "전체회원관리",
          link: "/admin/user/userList",
          useYn: true,
        },
      ],
    },

    {
      title: "강의관리",
      key: "sub6",
      subMenu: [
        {
          name: "강의상품관리",
          link: "/admin/lecture/list",
        },
        {
          name: "강의영상관리",
          link: "/admin/lecture/media",
        },
        {
          name: "구매강의관리",
          link: "/admin/lecture/buyLecture",
        },
      ],
    },
  ];

  useEffect(() => {
    if (router.pathname) {
      setCurrentMenu(
        menus.find((data) =>
          data.subMenu.find((value) => value.link === router.pathname)
        ).key
      );
    }
  }, [router.pathname]);

  return (
    <>
      <Menu
        ref={menuRef}
        theme={mode}
        multiple={false}
        onOpenChange={openAction}
        // onClick={clickAction}
        style={{ width: `100%`, height: `100%`, overflow: `auto` }}
        openKeys={[curentMenu]}
        mode="inline"
        selectedKeys={router.pathname}
        disabled={false}
      >
        <Wrapper margin={`20px 0 10px`}>
          <Image
            alt="logo"
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/newEbook/original/favicon+(1).ico`}
            width={`50px`}
            height={`50px`}
            radius={`100%`}
          />
        </Wrapper>
        <Wrapper height={`30px`} fontSize={`0.8rem`}>
          {me && me.nickname}
        </Wrapper>
        <Wrapper height={`30px`} fontSize={`0.8rem`} margin={`0 0 20px`}>
          {me &&
            (parseInt(me.level) === 5
              ? `개발사`
              : parseInt(me.level) === 4
              ? `최고관리자`
              : parseInt(me.level) === 3
              ? `운영자`
              : ``)}
        </Wrapper>
        <Menu.Item key="/admin">
          <MenuName>관리자 메인</MenuName>
        </Menu.Item>

        {menus.map((data) => {
          return (
            <SubMenu
              key={data.key}
              title={data.title}
              // onTitleClick={() => clickAction(data.link)}
            >
              {data.subMenu.map((value) => {
                return (
                  <Menu.Item key={value.link}>
                    <Link href={value.link}>
                      <a>
                        <MenuName>{value.name}</MenuName>
                      </a>
                    </Link>
                  </Menu.Item>
                );
              })}
            </SubMenu>
          );
        })}
      </Menu>
    </>
  );
};

export default AdminMenu;
