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
}

const initialState: RequestPayParams = {
  pay_method: "card", // 결제수단
  name: "테스트 주문", // 주문명
  merchant_uid: "", // 주문번호
  amount: 1000, // 결제금액
  buyer_tel: "000-0000-0000", // 구매자 전화번호
};

type PaymentContextType = {
    payParams: RequestPayParams;
    setPayParams: React.Dispatch<React.SetStateAction<RequestPayParams>>;
    payResult: any;
    setPayResult: React.Dispatch<React.SetStateAction<any>>;
}

export const PaymentContext = createContext<PaymentContextType>({
    payParams: initialState,
    setPayParams: () => {},
    payResult: null,
    setPayResult: () => {},
});

export const usePayment = () => {
  return useContext(PaymentContext);
};

export default function PaymentProvider({children}: {children: React.ReactNode}) {
  const [payParams, setPayParams] = useState<RequestPayParams>(initialState);
  const [payResult, setPayResult] = useState<any>(null);
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
    <PaymentContext.Provider value={{ payParams, setPayParams, payResult, setPayResult }}>
      {children}
    </PaymentContext.Provider>
  );
}
