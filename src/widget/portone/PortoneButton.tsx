import React, { useContext } from "react";
import { PaymentContext } from "./PaymentProvider";
import * as PortOne from "@portone/browser-sdk/v2";

export default function PortoneButton() {
  const { payParams } = useContext(PaymentContext);
  const handlePayment = async () => {
    if (!PortOne) return;
    const paymentInfo = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/payment/request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payParams),
      }
    ).then((res) => res.json());

    const { paymentId, customerId } = paymentInfo;
    let params = payParams;
    params = {
      ...params,
      paymentId: paymentId,
      customer: {
        ...params.customer,
        customerId: customerId || "",
      },
    };
    const response = await PortOne.requestPayment(params);

    if (response?.code !== undefined) {
      // 오류 발생
      return alert(response.message);
    }
  };
  return (
    <button
      onClick={handlePayment}
      className="bg-blue-500 text-white px-4 py-3 font-bold"
    >
      결제하기
    </button>
  );
}
