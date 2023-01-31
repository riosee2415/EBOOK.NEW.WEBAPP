import React, { useEffect } from "react";
import {
  Wrapper,
  Text,
  Image,
  WholeWrapper,
  RsWrapper,
  SpanText,
} from "./commonComponents";
import Theme from "./Theme";
import useWidth from "../hooks/useWidth";
import { useDispatch, useSelector } from "react-redux";
import { COMPANY_GET_REQUEST } from "../reducers/company";
import { LOGO_GET_REQUEST } from "../reducers/logo";

const AppFooter = () => {
  const width = useWidth();
  const dispatch = useDispatch();

  const { logos } = useSelector((state) => state.logo);
  const {
    companys,
    //
    st_companyError,
  } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch({
      type: COMPANY_GET_REQUEST,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: LOGO_GET_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_companyError) {
      return message.error(st_companyError);
    }
  }, [st_companyError]);

  return (
    <WholeWrapper
      bgColor={Theme.black_C}
      color={Theme.white_C}
      padding={`55px 0`}
    >
      <RsWrapper dr={`row`} ju={`space-between`} al={`flex-end`}>
        <Wrapper width={`auto`} al={`flex-start`}>
          {companys && (
            <Wrapper al={`flex-start`}>
              <Wrapper
                width={`auto`}
                dr={`row`}
                ju={`flex-start`}
                margin={`0 0 15px`}
              >
                {companys[0] && (
                  <Text
                    lineHeight={width < 900 && `2`}
                  >{`${companys[0].name} ${companys[0].value}`}</Text>
                )}
                <SpanText
                  margin={width < 900 ? `0 10px` : `0 16px`}
                  fontSize={`12px`}
                >
                  |
                </SpanText>

                {companys[1] && (
                  <Text fontWeight={`300`} lineHeight={width < 900 && `2`}>
                    {`${companys[1].name} ${companys[1].value}`}
                  </Text>
                )}
                <SpanText
                  margin={width < 900 ? `0 10px` : `0 16px`}
                  fontSize={`12px`}
                >
                  |
                </SpanText>
                {companys[2] && (
                  <Text
                    fontWeight={`300`}
                    lineHeight={width < 900 && `2`}
                  >{`${companys[2].name} ${companys[2].value}`}</Text>
                )}
              </Wrapper>
              <Wrapper dr={`row`} ju={`flex-start`} color={Theme.subTheme5_C}>
                {companys[3] && (
                  <Text
                    fontWeight={`300`}
                    lineHeight={width < 900 && `2`}
                  >{`${companys[3].name} ${companys[3].value}`}</Text>
                )}
                <SpanText
                  margin={width < 900 ? `0 10px` : `0 16px`}
                  fontSize={`12px`}
                >
                  |
                </SpanText>
                {companys[4] && (
                  <Text
                    fontWeight={`300`}
                    lineHeight={width < 900 && `2`}
                  >{`${companys[4].name} ${companys[4].value}`}</Text>
                )}
              </Wrapper>
              <Text
                fontWeight={`300`}
                color={Theme.subTheme5_C}
                margin={`15px 0 50px`}
              >
                통신판매업신고번호 제2014-서울강남02724 [사업자정보확인]
              </Text>
              <Text fontWeight={`300`} color={Theme.subTheme6_C}>
                Copyright © SKIN1004. All rights reserved.
              </Text>
            </Wrapper>
          )}
        </Wrapper>

        {logos &&
          logos.length === 0 &&
          logos.find((data) => data.typeOf === "F") && (
            <Image
              width={width < 800 ? `100px` : `170px`}
              src={logos.find((data) => data.typeOf === "F").imageURL}
              alt="logo"
            />
          )}
      </RsWrapper>
    </WholeWrapper>
  );
};

export default AppFooter;
