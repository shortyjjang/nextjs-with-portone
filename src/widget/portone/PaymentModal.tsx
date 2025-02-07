import React from "react";
import NpayButton from "./NpayButton";
import { useRouter } from "next/navigation";

export default function PaymentModal({ product }: { product: any }) {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col gap-2 pt-4">
        <NpayButton product={product} />
        <button
          className="bg-blue-500 text-white px-4 py-3 font-bold"
          onClick={() => router.push("/payment")}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}
