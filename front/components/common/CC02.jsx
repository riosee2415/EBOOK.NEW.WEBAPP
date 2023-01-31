import React from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import { useEffect } from "react";

const appear = keyframes`
    0% {
        opacity : 0;
    } 100% {
        opacity : 1;
    }
`;

const CustomArrowUpOutlined = styled(ArrowUpOutlined)`
  font-size: 37px;
  color: #999;
  margin-bottom: 30px;
  cursor: pointer;

  transition: 0.3s;

  &:hover {
    transform: scale(1.2);
  }
`;

const CustomArrowDownOutlined = styled(ArrowDownOutlined)`
  font-size: 37px;
  color: #999;
  margin-top: 30px;
  cursor: pointer;

  transition: 0.3s;

  &:hover {
    transform: scale(1.2);
  }
`;

const turnAny = keyframes`
    0% {
        transform : rotate(0deg);
    } 100% {
        transform : rotate(360deg);
    }
`;

const Whole = styled.section`
  width: 100%;

  display: Flex;
  flex-direction: row;
`;

const SubjectTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin: 40px 40px 155px 40px;
  width: 90%;
  padding: 5px;
  border-bottom: 1px dashed #bdc3c7;

  animation: ${appear} 1s forwards;
`;

const LeftBox = styled.div`
  width: 70%;
  height: 800px;
  position: relative;
`;

const LeftBoxDeco = styled.div`
  width: 100px;
  height: 100px;

  background-color: #999;
  opacity: 0.4;
  position: absolute;

  top: 160px;
  right: 350px;
`;

const LeftBoxDeco2 = styled.div`
  width: 100px;
  height: 100px;

  background-color: #95a5a6;
  opacity: 0.4;
  position: absolute;

  top: 180px;
  right: 370px;
`;

const RightBox = styled.div`
  width: 30%;
  height: 800px;
  background-color: #ecf0f1;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InImageWrap = styled.div`
  width: 400px;
  height: 400px;

  background-image: url(${(props) => props.url});
  background-size: cover;

  position: absolute;
  background-color: #fff;
  top: 200px;
  left: -200px;
  transition: 0.5s;

  animation: ${turnAny} 0.5s forwards;
  z-index: 5;
`;

const InImageWrap2 = styled.div`
  width: 400px;
  height: 400px;

  position: absolute;
  background-color: #cdcdcd;
  top: 220px;
  left: -220px;
  transition: 0.5s;
  opacity: 0.5;

  animation: ${turnAny} 0.7s forwards;
`;

const CenTitle = styled.h4`
  color: #999;
  font-size: 20px;
  transition: 0.6s;
`;

const CenBox = styled.div`
  width: 80%;
  padding: 20px 20px 20px 50px;

  transition: 0.6s;
  border-radius: 5px;

  &:hover {
    background: #ecf0f1;

    & ${CenTitle} {
      color: #999;
    }
  }
`;

const CC02 = ({
  array = [
    {
      imageURL:
        "https://cdn.pixabay.com/photo/2017/01/26/18/09/length-landscape-2011238__480.jpg",
      title: "Subject Title1",
      cenTitle1: "Center Title Description1",
      cenDesc1:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur modi, quasi ipsam reprehenderit, tempora assumenda molestiae ratione in quaerat, mollitia explicabo perspiciatis fuga soluta eius aut ducimus! Aliquid, dolore.",
      cenTitle2: "Center Title Description2",
      cenDesc2:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur modi, quasi ipsam reprehenderit, tempora assumenda molestiae ratione in quaerat, mollitia explicabo perspiciatis fuga soluta eius aut ducimus! Aliquid, dolore.",

      cenTitle3: "Center Title Description3",
      cenDesc3:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur modi, quasi ipsam reprehenderit, tempora assumenda molestiae ratione in quaerat, mollitia explicabo perspiciatis fuga soluta eius aut ducimus! Aliquid, dolore.",
    },
    {
      imageURL:
        "https://a.cdn-hotels.com/gdcs/production180/d1159/18b35d95-6e59-4858-9647-998561811c63.jpg",
      title: "Subject Title2",
      cenTitle1: "Version 2 Center Title Description1",
      cenDesc1:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur modi, quasi ipsam reprehenderit, tempora assumenda molestiae ratione in quaerat, mollitia explicabo perspiciatis fuga soluta eius aut ducimus! Aliquid, dolore.",
      cenTitle2: "Version 2 Center Title Description2",
      cenDesc2:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur modi, quasi ipsam reprehenderit, tempora assumenda molestiae ratione in quaerat, mollitia explicabo perspiciatis fuga soluta eius aut ducimus! Aliquid, dolore.",

      cenTitle3: "Version 2 Center Title Description3",
      cenDesc3:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur modi, quasi ipsam reprehenderit, tempora assumenda molestiae ratione in quaerat, mollitia explicabo perspiciatis fuga soluta eius aut ducimus! Aliquid, dolore.",
    },
    {
      imageURL: "https://t1.daumcdn.net/cfile/tistory/996333405A8280FC23",
      title: "Subject Title3",
      cenTitle1: "Version 3 Center Title Description1",
      cenDesc1:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur modi, quasi ipsam reprehenderit, tempora assumenda molestiae ratione in quaerat, mollitia explicabo perspiciatis fuga soluta eius aut ducimus! Aliquid, dolore.",
      cenTitle2: "Version 3 Center Title Description2",
      cenDesc2:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur modi, quasi ipsam reprehenderit, tempora assumenda molestiae ratione in quaerat, mollitia explicabo perspiciatis fuga soluta eius aut ducimus! Aliquid, dolore.",

      cenTitle3: "Version 3 Center Title Description3",
      cenDesc3:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur modi, quasi ipsam reprehenderit, tempora assumenda molestiae ratione in quaerat, mollitia explicabo perspiciatis fuga soluta eius aut ducimus! Aliquid, dolore.",
    },
    {
      imageURL: "https://t1.daumcdn.net/cfile/tistory/9946A4505F5817A60D",
      title: "Subject Title4",
      cenTitle1: "Version 4 Center Title Description1",
      cenDesc1:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur modi, quasi ipsam reprehenderit, tempora assumenda molestiae ratione in quaerat, mollitia explicabo perspiciatis fuga soluta eius aut ducimus! Aliquid, dolore.",
      cenTitle2: "Version 4 Center Title Description2",
      cenDesc2:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur modi, quasi ipsam reprehenderit, tempora assumenda molestiae ratione in quaerat, mollitia explicabo perspiciatis fuga soluta eius aut ducimus! Aliquid, dolore.",

      cenTitle3: "Version 4 Center Title Description3",
      cenDesc3:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur modi, quasi ipsam reprehenderit, tempora assumenda molestiae ratione in quaerat, mollitia explicabo perspiciatis fuga soluta eius aut ducimus! Aliquid, dolore.",
    },
  ],
}) => {
  const [status, setStatus] = useState(0);

  const statusChangeHandler = useCallback(
    (statement) => {
      if (statement === 0) {
        setStatus((prev) => {
          if (prev === 0) {
            return array.length - 1;
          } else {
            return prev - 1;
          }
        });
      }

      if (statement === 1) {
        setStatus((prev) => {
          if (prev === array.length - 1) {
            return 0;
          } else {
            return prev + 1;
          }
        });
      }
    },
    [status, array]
  );

  return (
    <Whole>
      <LeftBox>
        <SubjectTitle>{array[status].title}</SubjectTitle>

        <CenBox>
          <CenTitle>{array[status].cenTitle1}</CenTitle>
          <article>{array[status].cenDesc1}</article>
        </CenBox>

        <CenBox>
          <CenTitle>{array[status].cenTitle2}</CenTitle>
          <article>{array[status].cenDesc2}</article>
        </CenBox>

        <CenBox>
          <CenTitle>{array[status].cenTitle3}</CenTitle>
          <article>{array[status].cenDesc3}</article>
        </CenBox>
      </LeftBox>
      <RightBox>
        <CustomArrowUpOutlined onClick={() => statusChangeHandler(0)} />
        <CustomArrowDownOutlined onClick={() => statusChangeHandler(1)} />

        <InImageWrap url={array[status].imageURL}></InImageWrap>
        <InImageWrap2 />
      </RightBox>
    </Whole>
  );
};

export default CC02;
