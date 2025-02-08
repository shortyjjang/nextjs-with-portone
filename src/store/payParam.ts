import { PaymentRequest } from "@portone/browser-sdk/v2";
import { create } from "zustand";

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
    redirectUrl: process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/order/complete",
    //products: {
      //     id: string;
      //     name: string;
      //     code?: string;
      //     amount: number;
      //     quantity: number;
      //     tag?: string;
      //     link?: string;
      // }[],
    currency: "CURRENCY_KRW",
    payMethod: "CARD", // 'CARD' | 'VIRTUAL_ACCOUNT' | 'TRANSFER' | 'MOBILE' | 'GIFT_CERTIFICATE' | 'EASY_PAY' | 'PAYPAL' | 'ALIPAY';
  };
  

const usePayment = create<{
  payParam: ExtendedPaymentRequest;
  setPayParam: (payParam: ExtendedPaymentRequest) => void;
}>((set) => ({
  payParam: initialState,
  setPayParam: (payParam) => set({ payParam }),
}));
export default usePayment;