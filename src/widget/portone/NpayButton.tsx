"use client";
import Script from "next/script";
import React, { useEffect, useId, useRef, useState } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

interface NpayParams {
  pg: string;
  pay_method: string;
  merchant_uid: string;
  name: string;
  amount: number;
  buyer_tel: string;
  naverInterface: {
    cpaInflowCode: string;
    naverInflowCode: string;
    saClickId: string;
  };
  naverProducts: {
    id: string, //선택된 옵션이 없는 상품
    name: string,
    basePrice: number,
    taxType: "TAX" | "TAX_FREE", //TAX or TAX_FREE
    quantity: number,
    infoUrl: string,
    imageUrl: string,
    shipping?: {
      baseFee: number,
      method: "DELIVERY",
      feePayType: "PREPAYED",
      feeRule: {
        repeatByQty: 1,
      },
      groupId: string,
    },
    options?:  {
      optionQuantity: number,
      optionPrice: number,
      selectionCode: string,
      selections: {
        code: string,
        label: string,
        value: string
      }[]
    }[]
  }[]
} 
interface NZzimParams {
  id: string,
  name: string,
  desc: string,
  uprice: number,
  url: string,
  thumb: string,
  image: string,
}

const initialNpayParams: NpayParams = {
  pg: "naverco", // PG사 (필수항목)
  pay_method: "card", // 결제수단 (필수항목)
  merchant_uid: "orderId", // 주문번호 (필수항목)
  name: "anonymous", // 주문명 (필수항목)
  amount: 10000, // 금액 (필수항목)
  buyer_tel: "07047638287", // 구매자 전화번호 (필수항목)
  naverInterface: {
    cpaInflowCode: "",
    naverInflowCode: "",
    saClickId: "",
  },
  naverProducts: [],
};
export default function NpayButton() {
  const naverBtn = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const id = useId();
  const [npayParams, setNpayParams] = useState<NpayParams>(initialNpayParams);
  const [nZzim, setNZzim] = useState<NZzimParams[]>([]);
  const onClickNaveZzim = () => {
    console.log("찜하기");
    const { IMP } = window;
    if(IMP){
      IMP.naver_zzim({
        naverProducts: nZzim,
      });
    }
  };
  const onPaymentCallback = (rsp: any) => {
    console.log(rsp);
  }
  const onClickPayment = () => {
    const { IMP } = window;
    //핸들러 내에서 결제창 호출 함수 호출
    if(IMP){
      IMP.request_pay(
        npayParams,
        onPaymentCallback
      );
    }
  };
  const initNpay = () => {
    const { naver } = window;

    naver.NaverPayButton.apply({
      BUTTON_KEY: `${process.env.NEXT_PUBLIC_NAVER_PAY_BUTTON_KEY}`,
      TYPE: `${/Mobile/.test(navigator.userAgent) ? "M" : ""}A`, //버튼 스타일
      COLOR: 1, //버튼 색상타입
      COUNT: 2, // 2.네이버페이버튼 + 찜하기버튼, 1.네이버페이버튼
      ENABLE: "Y", //네이버페이 활성여부(재고부족 등에는 N으로 비활성처리)
      EMBED_ID: `iamport-naverpay-product-button-${id}`, //네이버페이 버튼 UI가 부착될 HTML element의 ID
      BUY_BUTTON_HANDLER: onClickPayment,
      WISHLIST_BUTTON_HANDLER: onClickNaveZzim,
    });
    if (naverBtn.current) {
      naverBtn.current.innerHTML = "";
    }
  };
  useEffect(() => {
    setIsMobile(/Mobile/.test(navigator.userAgent));
  }, []);
  return (
    <React.Fragment>
      <Script
        src={`https://pay.naver.com/customer/js/${
          isMobile ? "mobile/" : ""
        }innerNaverPayButton.js?site_preference=normal&${Math.round(
          +new Date() / 3600000
        )}`}
        onLoad={initNpay}
      />
      <div
        id={`iamport-naverpay-product-button-${id}`}
        ref={naverBtn}
        className="w-full bg-white flex justify-center"
        style={{
          boxShadow: "inset 0 2px 0 #000",
        }}
      ></div>
    </React.Fragment>
  );
}
