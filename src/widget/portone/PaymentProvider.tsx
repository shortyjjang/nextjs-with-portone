"use client";
import { PaymentRequest } from "@portone/browser-sdk/v2";
import React, { createContext, useContext, useState } from "react";

// const IMP_UID = process.env.NEXT_PUBLIC_IAMPORT_MALL_KEY || "";

declare global {
  interface Window {
    IMP: any;
  }
}

// 기존 PaymentRequest 타입을 확장하여 delivery_message를 추가
export type ExtendedPaymentRequest = PaymentRequest & {
  delivery_message: string;
};

const initialState: ExtendedPaymentRequest = {
  delivery_message: "",
  storeId: process.env.NEXT_PUBLIC_IAMPORT_MALL_KEY || "",
  paymentId: "",
  orderName: "",
  totalAmount: 0,
  pgProvider: "PG_PROVIDER_INICIS",
  isTestChannel: process.env.NODE_ENV === "development",
  customer: {
    customerId: "",
    fullName: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: {
      addressLine1: "",
      addressLine2: "",
    },
    zipcode: "",
  },
  redirectUrl: "",
  products: [], // {
  //     id: string;
  //     name: string;
  //     code?: string;
  //     amount: number;
  //     quantity: number;
  //     tag?: string;
  //     link?: string;
  // };
  currency: "CURRENCY_KRW",
  payMethod: "CARD", // 'CARD' | 'VIRTUAL_ACCOUNT' | 'TRANSFER' | 'MOBILE' | 'GIFT_CERTIFICATE' | 'EASY_PAY' | 'PAYPAL' | 'ALIPAY';
};

type PaymentContextType = {
  payParams: ExtendedPaymentRequest;
  setPayParams: React.Dispatch<React.SetStateAction<ExtendedPaymentRequest>>;
  payResult: any;
  setPayResult: React.Dispatch<React.SetStateAction<any>>;
  onPaymentCallback: (rsp: any) => void;
};

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

export default function PaymentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [payParams, setPayParams] =
    useState<ExtendedPaymentRequest>(initialState);
  const [payResult, setPayResult] = useState<any>(null);
  const onPaymentCallback = (rsp: any) => {
    console.log(rsp);
  };
  return (
    <PaymentContext.Provider
      value={{
        payParams,
        setPayParams,
        payResult,
        setPayResult,
        onPaymentCallback,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export interface ProductProps {
  name: string;
  price: number;
  productId: string;
  desc: string;
  image: string;
  optionGroups: {
    name: string;
    optionsName: string;
    groupId: string;
    options: {
      name: string;
      optionId: string;
      additionalPrice: number;
      quantity: number;
    }[];
  }[];
  deliveryFee: number;
}
