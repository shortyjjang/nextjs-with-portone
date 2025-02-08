"use client";
import React from "react";
import NpayButton from "../portone/NpayButton";
import Input from "@/entites/Input";
import usePayment from "@/store/payParam";
import useSelectedItem from "@/store/selectedItem";

export default function PaymentModal() {
  const { selectedItem, setSelectedItem, increaseQuantity, decreaseQuantity } = useSelectedItem();
  const { setPayParam, payParam } = usePayment();

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-10"
        onClick={() => setSelectedItem(null)}
      ></div>
      <div className="fixed bottom-0 left-0 right-0 bg-white z-10 ">
        <div className="flex flex-col p-4">
          <div className="text-gray-500 text-sm flex justify-between">
            <div>{selectedItem?.brandName}</div>
            <div>
              <b className="text-red-500 font-bold">
                ★ {(selectedItem?.reviewScore || 0).toLocaleString()}
              </b>
              ({(selectedItem?.reviewCount || 0).toLocaleString()})
            </div>
          </div>
          <div className="text-black font-bold line-clamp-2">
            {selectedItem?.goodsName}
          </div>
          <div className="text-gray-500 text-sm">
            {(selectedItem?.price || 0).toLocaleString()}{" "}
            {selectedItem?.price !== selectedItem?.normalPrice && (
              <span className="text-gray-500 line-through">
                {selectedItem?.normalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex justify-between mt-2">
            <div className="w-40 relative">
              <Input
                className="w-full text-center"
                value={(selectedItem?.quantity || 0).toString()}
                onKeyDown={(e) => {
                  //정규식을 사용한 숫자입력방지
                  if (!/^[0-9]*$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  if (!selectedItem) return;
                  setSelectedItem({
                    ...selectedItem,
                    quantity: Number(e?.target?.value || 0),
                  });
                }}
              />
              <button className="absolute bottom-0 left-0 h-full aspect-square bg-transparent" onClick={() => decreaseQuantity()}>
                -
              </button>
              <button className="absolute bottom-0 right-0 h-full aspect-square bg-transparent" onClick={() => increaseQuantity()}>
                +
              </button>
            </div>
            <div className="text-lg font-bold">
              {(
                (selectedItem?.price || 0) * (selectedItem?.quantity || 0)
              ).toLocaleString()}
              원
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 border-t border-gray-200">
          <NpayButton />
          <button
            className="bg-blue-500 text-white px-4 py-3 font-bold"
            onClick={() => {
              if (!selectedItem) return;
              setPayParam({
                ...payParam,
                paymentId:
                  selectedItem?.goodsNo.toString() +
                  new Date().getTime().toString(),
                orderName: selectedItem?.goodsName,
                totalAmount:
                  (selectedItem?.price || 0) * selectedItem?.quantity,
              });
            }}
          >
            결제하기
          </button>
        </div>
      </div>
    </>
  );
}
