"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const IMP_UID = process.env.NEXT_PUBLIC_IAMPORT_MALL_KEY || "";

declare global {
  interface Window {
    IMP: any;
  }
}
export interface RequestPayParams {
  pay_method: string;
  name: string;
  merchant_uid: string;
  amount: number;
  buyer_tel: string;
  buyer_postcode: string;
  buyer_addr1: string;
  buyer_email: string;
  buyer_addr2: string;
  delivery_message: string;
}

const initialState: RequestPayParams = {
  pay_method: "card", // 결제수단
  name: "테스트 주문", // 주문명
  merchant_uid: "", // 주문번호
  amount: 1000, // 결제금액
  buyer_tel: "000-0000-0000", // 구매자 전화번호
  buyer_postcode: "", // 구매자 우편번호
  buyer_addr1: "", // 구매자 주소
  buyer_addr2: "", // 구매자 상세주소
  buyer_email: "", // 구매자 이메일
  delivery_message: "", // 배송메시지
};

type PaymentContextType = {
    payParams: RequestPayParams;
    setPayParams: React.Dispatch<React.SetStateAction<RequestPayParams>>;
    payResult: any;
    setPayResult: React.Dispatch<React.SetStateAction<any>>;
    onPaymentCallback: (rsp: any) => void;
}

export const PaymentContext = createContext<PaymentContextType>({
    payParams: initialState,
    setPayParams: () => {},
    payResult: null,
    setPayResult: () => {},
    onPaymentCallback: () => {},
});

export const usePayment = () => {
  return useContext(PaymentContext);
};

export default function PaymentProvider({children}: {children: React.ReactNode}) {
  const [payParams, setPayParams] = useState<RequestPayParams>(initialState);
  const [payResult, setPayResult] = useState<any>(null);
  const onPaymentCallback = (rsp: any) => {
    console.log(rsp);
  }
  const initPortOne = () => {
    const { IMP } = window;
    if (IMP) {
      IMP.init(IMP_UID);
    }
  };
  useEffect(() => {
    initPortOne();
  }, []);
  return (
    <PaymentContext.Provider value={{ payParams, setPayParams, payResult, setPayResult, onPaymentCallback }}>
      {children}
    </PaymentContext.Provider>
  );
}
