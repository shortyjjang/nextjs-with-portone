import React, { useContext } from 'react'
import { PaymentContext } from './PaymentProvider';

export default function PortoneButton() {
    const { payParams, onPaymentCallback } = useContext(PaymentContext);
    const handlePayment = () => {
        const { IMP } = window;
      if (IMP) {
        IMP.request_pay(payParams, onPaymentCallback);
      }
    };
  return (
    <button onClick={handlePayment} className="bg-blue-500 text-white px-4 py-3 font-bold">결제하기</button>
  )
}
