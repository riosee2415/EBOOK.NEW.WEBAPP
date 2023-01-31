import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const Whole = styled.div`
  width: 100%;
  margin: 10px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 100%;
  margin: 20px 0px;

  display: flex;
  flex-direction: ${(props) => props.dr || "column"};
  align-items: center;
  justify-content: ${(props) => props.ju || "center"};
`;

const Box2 = styled.div`
  width: 100%;
  margin: 20px 0px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => props.ju || "center"};

  @media screen and (max-width: 1055px) {
    flex-direction: column;
  }
`;

const Img = styled.img`
  width: 320px;
  min-width: 320px;
  height: 450px;
  object-fit: cover;
  border-radius: 3px;
  transition: 0.3s;
  position: absolute;
  top: 0px;
  left: 0px;
`;

const ImageCover = styled.div`
  width: 320px;
  min-width: 320px;
  height: 450px;
  border-radius: 3px;

  position: relative;

  transition: 0.5s;

  &:hover {
    background-color: ${(props) => props.theme.basicTheme_C};

    & ${Img} {
      top: -20px;
      left: -20px;
      box-shadow: 3px 3px 5px ${(props) => props.theme.lightGrey_C};
    }
  }
`;

const ViewTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
`;

const ViewDesc = styled.article`
  font-size: 14px;
  color: ${(props) => props.theme.grey_C};
`;

const InfoBox = styled.section`
  width: 340px;
  height: 450px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0px 50px;

  border: 0.5px solid ${(props) => props.theme.lightGrey_C};
  border-radius: 3px;

  padding: 20px;

  position: relative;

  @media screen and (max-width: 1055px) {
    margin-bottom: 100px;
  }
`;

const InfoTitle = styled.h4`
  font-size: 21px;
  font-weight: bold;

  border-bottom: 6.5px solid ${(props) => props.theme.basicTheme_C};

  margin-bottom: 25px;
`;

const InfoDesc = styled.article`
  padding: 10px;
  margin-bottom: 10px;

  font-size: 14px;
  color: #c5c5c5;
  word-break: break-all;
`;

const InfoLink = styled.div`
  position: absolute;

  bottom: 15px;
  right: 15px;
`;

const ProcessBox = styled.section`
  width: 340px;
  height: 450px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0px 50px;

  padding: 20px;

  position: relative;

  @media screen and (max-width: 1055px) {
    margin-top: 100px;
  }
`;

const ProcessWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  margin-bottom: 20px;
`;

const Number = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.subTheme_C};

  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 15px;
  font-size: 22px;
`;

const TextBox = styled.div`
  word-break: break-all;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
`;

const Arrow = styled.img`
  transition: 0.7s;

  padding: 10px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const CC01 = ({
  title = "Title Of CC01 Component",
  desc = "Description Of CC01 Component",
  imgURL = "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/4leaf/original/marissa-grootes-flRm0z3MEoA-unsplash.jpg",
  //
  infoTitle = "Title Of CC01 InfoBox",
  infoDesc = "Description Contents Of CC01 InfoBox",
  link = "/",
  //
  process = [
    "First Of all In Process",
    "Second Of all In Process",
    "... ... Of all In Process",
    "... ... Of all In Process",
    "... ... Of all In Process",
  ],
}) => {
  const rt = useRouter();

  return (
    <Whole>
      <Box>
        <ViewTitle>{title}</ViewTitle>
        <ViewDesc>{desc}</ViewDesc>
      </Box>
      <Box2>
        <InfoBox>
          <InfoTitle>{infoTitle}</InfoTitle>
          <InfoDesc>{infoDesc}</InfoDesc>
          <InfoLink onClick={() => rt.push(link)}>
            <Arrow src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/4leaf/original/KakaoTalk_Photo_2022-11-03-21-13-30.png" />
          </InfoLink>
        </InfoBox>
        <ImageCover>
          <Img src={imgURL} />
        </ImageCover>

        <ProcessBox>
          {process.map((data, idx) => (
            <ProcessWrap>
              <Number>{idx + 1}</Number>
              <TextBox>{data}</TextBox>
            </ProcessWrap>
          ))}
        </ProcessBox>
      </Box2>
    </Whole>
  );
};

export default CC01;
