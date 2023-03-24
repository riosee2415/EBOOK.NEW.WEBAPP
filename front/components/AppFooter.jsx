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
import { message } from "antd";
import { useRouter } from "next/router";

const AppFooter = () => {
  const width = useWidth();
  const router = useRouter();
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
  }, [router.query]);

  useEffect(() => {
    dispatch({
      type: LOGO_GET_REQUEST,
    });
  }, [router.query]);

  useEffect(() => {
    if (st_companyError) {
      return message.error(st_companyError);
    }
  }, [st_companyError]);
  console.log(companys);
  return (
    <WholeWrapper bgColor={Theme.lightGrey2_C} padding={`55px 0`}>
      <RsWrapper dr={`row`} ju={`space-between`} al={`flex-end`}>
        <Wrapper width={width < 700 ? `100%` : `50%`} al={`flex-start`}>
          {companys && (
            <Wrapper al={`flex-start`}>
              <Wrapper
                width={`auto`}
                dr={`row`}
                ju={`flex-start`}
                margin={`0 0 15px`}
              >
                {console.log(logos)}
                {logos &&
                  logos.length > 0 &&
                  logos.find((data) => data.typeOf === "F") && (
                    <Image
                      width={width < 800 ? `140px` : `170px`}
                      src={logos.find((data) => data.typeOf === "F").imageURL}
                      alt="logo"
                      margin={`0 0 40px`}
                    />
                  )}
                {companys.map((data) => {
                  return (
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      fontSize={width < 700 ? `14px` : `16px`}
                    >
                      <Text
                        width={width < 700 ? `120px` : `150px`}
                        fontWeight={`600`}
                        color={Theme.grey2_C}
                      >
                        {data.name}
                      </Text>
                      <Text color={Theme.grey3_C}>{data.value}</Text>
                    </Wrapper>
                  );
                })}
              </Wrapper>
            </Wrapper>
          )}
        </Wrapper>
        <Wrapper
          width={width < 700 ? `100%` : `50%`}
          al={width < 700 ? `flex-start` : `flex-end`}
          ju={`space-between`}
        >
          <Wrapper
            dr={width < 700 ? `column` : `rows`}
            ju={width < 700 ? `flex-start` : `flex-end`}
            margin={width < 700 ? `20px 0` : `0 0 190px`}
            al={width < 700 && `flex-start`}
          >
            <Text
              fontSize={width < 700 ? `14px` : `18px`}
              color={Theme.grey2_C}
              isHover
            >
              개인정보처리방침
            </Text>
            <Text
              fontSize={width < 700 ? `14px` : `18px`}
              color={Theme.grey2_C}
              isHover
              margin={width < 700 ? `0` : `0 42px`}
            >
              이용약관
            </Text>
            <Text
              fontSize={width < 700 ? `14px` : `18px`}
              color={Theme.grey2_C}
              isHover
            >
              취소 및 환불정책
            </Text>
          </Wrapper>
          <Text
            fontSize={width < 700 ? `14px` : `16px`}
            color={Theme.lightGrey4_C}
          >
            Copyright ⓒ 2021 친절한대학 주식회사 All rights reserved
          </Text>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default AppFooter;
