const fs = require("fs");

const pathArray = [];
let basepath = "./pages/admin/";
let filename = "";

process.argv.forEach((data, idx) => {
  if (idx < 2) return;

  pathArray.push(data);
});

pathArray.forEach((data, idx) => {
  if (parseInt(idx) === parseInt(pathArray.length - 1)) {
    filename = `${data}.jsx`;
  } else {
    basepath += `${data}/`;
  }
});

basepath += filename;

///////////////////////////////////////////////////////////////////////////////
// CONTENT SECTION START //////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const className = filename.split(".")[0];
const firstChar = className[0].toUpperCase();

let _className = firstChar;

[].forEach.call(className, (char, idx) => {
  if (idx === 0) return;
  _className += char;
});

const content = `
import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "antd";
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

const ${_className} = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("대 메뉴를 입력하세요.");
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
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(\`/admin\`);
      }

      if (!(me && me.menuRight99999999)) {
        message.error("접근권한이 없는 페이지 입니다.");
        moveLinkHandler(\`/admin\`);
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
        height={\`30px\`}
        bgColor={Theme.lightGrey_C}
        dr={\`row\`}
        ju={\`flex-start\`}
        al={\`center\`}
        padding={\`0px 15px\`}
        color={Theme.grey_C}
      >
        <HomeText
          margin={\`3px 20px 0px 20px\`}
          onClick={() => moveLinkHandler("/admin")}
        >
          <HomeOutlined style={{ fontSize: "15px", marginRight: "5px" }} />
          메인
        </HomeText>
        <RightOutlined />
        <Text margin={\`3px 20px 0px 20px\`}>{level1} </Text>
        <RightOutlined />
        <Popover content={content}>
          <HomeText cur={true} margin={\`3px 20px 0px 20px\`}>{level2} </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={\`10px 0px 0px 0px\`}>
        <GuideUl>
          <GuideLi>
            화면 가이드안내 문구를 입력하세요.
          </GuideLi>
          <GuideLi isImpo={true}>
            화면 가이드안내 문구를 입력하세요. (RED COLOR)
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(${_className});

`;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

console.log("------------------------------------------------------------");
console.log("------------------------------------------------------------");
console.log("------------------------------------------------------------");
console.log(
  "🍀 All Clear File System that Create Jsx file will use to Admin Section! 🍀"
);

fs.readFile(basepath, "utf8", (error, description) => {
  if (error) {
    fs.writeFile(basepath, content, (error) => {
      const thisPath = basepath.split("/");

      const _thisPath = thisPath.filter(
        (data, idx) => idx !== thisPath.length - 1
      );

      const __thisPath = _thisPath.filter((data, idx) => idx !== 0);

      let originPath = "./";

      __thisPath.forEach((data) => {
        originPath += `${data}/`;

        fs.mkdir(originPath, { recursive: true }, (error) => {
          fs.writeFile(basepath, content, (error) => {});
        });
      });
    });
  }
  console.log();
  console.log("------------------------------------------------------------");
  console.log();
  console.log("🍀 Aleady Exist File. Please Write other filename.! 🍀");
});

console.log();
console.log("------------------------------------------------------------");
console.log("🍀 Create File Success. Try Happy Coding! 🍀");
console.log();
console.log();
console.log(`🍀 File Path is ${basepath}🍀`);
console.log("------------------------------------------------------------");
