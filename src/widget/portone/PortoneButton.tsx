import React from "react";
import * as PortOne from "@portone/browser-sdk/v2";
import usePayment from "@/store/payParam";
import useSelectedItem from "@/store/selectedItem";
import getOrderId from "@/lib/payment/getOrderId";
import useUser from "@/store/auth";

export default function PortoneButton() {
  const { payParam } = usePayment()
  const { selectedItem } = useSelectedItem();
  const { user } = useUser();
  const handlePayment = async () => {
    if (!PortOne) return;
    if (!selectedItem) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    const orderId = await getOrderId({
      item: selectedItem,
      token: token,
    });

    let Param = payParam;
    Param = {
      ...Param,
      paymentId: orderId,
      customer: {
        ...Param.customer,
        customerId: user?.id || "",
      },
    };
    const response = await PortOne.requestPayment(Param);

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
