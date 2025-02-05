import React, { useContext } from 'react'
import { PaymentContext } from './PaymentProvider';

export default function PortoneButton() {
    const { payParams, setPayResult } = useContext(PaymentContext);
    const onPayment = (response: any) => {
      console.log("결제 완료");
      setPayResult(response);
    };
    const handlePayment = () => {
        const { IMP } = window;
      if (IMP) {
        IMP.request_pay(payParams, onPayment);
      }
    };
  return (
    <button onClick={handlePayment}>PortoneButton</button>
  )
}
