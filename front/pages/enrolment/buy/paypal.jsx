import { message } from "antd";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClientLayout from "../../../components/ClientLayout";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import { BOUGHT_CREATE_REQUEST } from "../../../reducers/boughtLecture";

const Paypal = () => {
  const { st_boughtCreateDone, st_boughtCreateError } = useSelector(
    (state) => state.boughtLecture
  );

  const router = useRouter();
  const dispatch = useDispatch();

  const paypalHandler = useCallback(async () => {
    dispatch({
      type: BOUGHT_CREATE_REQUEST,
      data: {
        mobile: router.query.mobile,
        receiver: router.query.receiver,
        zoneCode: router.query.zoneCode,
        address: router.query.address,
        detailAddress: "-",
        payType: router.query.payType,
        pay: router.query.pay,
        lectureType: router.query.type,
        name: "-",
        impUid: router.query.imp_uid,
        merchantUid: router.query.merchant_uid,
        isBuyBook: router.query.isBuyBook === "1" ? 1 : 0,
        bookPrice: router.query.bookPrice,
      },
    });
  }, [router.query]);

  useEffect(() => {
    if (router.query) {
      if (router.query.imp_success === "true") {
        paypalHandler();
      } else {
        message.error("결제가 정상적으로 진행되지 않았습니다.");
        return router.push("/");
      }
    }
  }, [router.query]);

  // 결제 후처리
  useEffect(() => {
    if (st_boughtCreateDone) {
      message.success("결제되었습니다.");
      return router.push("/mypage");
    }

    if (st_boughtCreateError) {
      return message.error(st_boughtCreateError);
    }
  }, [st_boughtCreateDone, st_boughtCreateError]);

  return (
    <ClientLayout>
      <WholeWrapper>
        <RsWrapper>
          <Wrapper height={`100vh`}>결제중입니다.</Wrapper>
        </RsWrapper>
      </WholeWrapper>
    </ClientLayout>
  );
};

export default Paypal;
