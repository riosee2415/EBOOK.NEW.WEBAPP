import React, { useState, useEffect, useContext, useRef } from "react";
import styled, { keyframes } from "styled-components";
// import { translate10 } from "../components/AnimationCommon";
import { Wrapper, ATag, Image } from "../components/commonComponents";
import Theme from "../components/Theme";
import { useRouter } from "next/router";

const translate10 = keyframes`
0%{
  transform:translateY(0);
}
50%{
  transform:translateY(10px);
}
100%{
  transform:translateY(0px);
}
`;

const FixedWrapper = styled.div`
  position: fixed;
  bottom: 70px;
  right: 10px;
  z-index: 10000;
  border-radius: 100%;
  width: auto;
  height: auto;
  animation: ${translate10} 1.5s infinite;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 700px) {
    bottom: 60px;
    right: 10px;
  }
`;

const FixedContents = styled.div`
  height: 60px;
  width: 100%;
  margin: ${(props) => props.margin};
  font-size: ${(props) => props.fontSize};
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 2;

  &:hover {
    .kakao {
      display: flex;
    }
  }

  @media (max-width: 700px) {
    margin: 0px 0px 10px;
  }
`;

const FixedNav = ({}) => {
  const router = useRouter();
  const moveLinkHandler = (link) => {
    router.push(link);
  };

  if (
    router.pathname === "/join" ||
    router.pathname === "/user/login" ||
    router.pathname === "/user/signup" ||
    router.pathname === "/enrolment" ||
    router.pathname === "/order" ||
    router.pathname === "/orderOverseas" ||
    router.pathname === "/mypage" ||
    router.pathname === "/mypage/[id]" ||
    router.pathname === "/mypage/update" ||
    router.pathname === "/enrolment/buy/[id]"
  ) {
    return null;
  }

  return (
    <FixedWrapper>
      <Image
        onClick={() => {
          moveLinkHandler("/enrolment");
        }}
        width={`100px`}
        src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fassets%2Fimages%2FMM13%2F%EB%B3%B4%EB%9D%BC%EC%83%89.png?alt=media&token=c352c176-3ed7-46d2-bf4f-eae6d87b272d`}
      />

      <ATag target="_blank" href="http://pf.kakao.com/_zxhxaxdb/chat">
        <Image
          width={`100px`}
          src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fassets%2Fimages%2FMM13%2F%E1%84%8F%E1%85%A1%E1%84%8F%E1%85%A1%E1%84%8B%E1%85%A9%E1%84%90%E1%85%A9%E1%86%A82.png?alt=media&token=a505efd4-9648-4a49-a1c2-b608da60dc20`}
        />
      </ATag>
    </FixedWrapper>
  );
};

export default FixedNav;
