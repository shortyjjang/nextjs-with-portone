"use client";

import Section from "@/entites/Section";
import Title from "@/entites/Title";
import NpayButton from "@/widget/portone/NpayButton";
import Payment from "@/widget/portone/Payment";
import PaymentProvider from "@/widget/portone/PaymentProvider";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const product = {
    name: "경북 샤인머스켓 2kg (가정용 5~6수, 특등급 3~4수, 프리미엄 2~3수)",
    price: 17000,
    productId: "product01",
    desc: "경북 샤인머스켓 2kg (가정용 5~6수, 특등급 3~4수, 프리미엄 2~3수)",
    image:
      "https://all-to-delicious.s3.ap-northeast-2.amazonaws.com/atd/a2dcorp.co.kr/admin/product/detail/product_image/8b0c394cc3444b1cb551c5823a16c3e7.jpg",
    optionGroups: [
      {
        name: "쥬스용(멍/흠짓)",
        optionsName: "무게",
        groupId: "group01",
        options: [
          {
            name: "2kg",
            optionId: "option01",
            additionalPrice: 15000,
            quantity: 1,
          },
        ],
      },
    ],
    deliveryFee: 0,
  };
  return (
    <PaymentProvider>
      <Title title="주문하기" className="mt-8" />
      <Section title="주문 상품">
        <div className="grid grid-cols-[auto_100px] gap-x-4 gap-y-1 py-4 border-t border-black">
          <h3 className="font-bold">{product.name}</h3>
          <Image
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
          />
          <ul className="text-gray-500 text-sm">
            <li>
              옵션:{" "}
              {product.optionGroups.map((group) =>
                group.options.map(
                  (option) => `${group.name} / 
                  ${group.optionsName}: ${option.name} 
                  (+${(option.additionalPrice || 0).toLocaleString()}원)`
                )
              )}
            </li>
            <li>
              구매수량:{" "}
              {product.optionGroups
                .reduce(
                  (acc, group) =>
                    acc +
                    group.options.reduce(
                      (acc, option) => acc + option.quantity,
                      0
                    ),
                  0
                )
                .toLocaleString()}
              개
            </li>
          </ul>
        </div>
        <ul className="text-gray-500 border-y border-gray-300 py-3">
          <li className="flex justify-between">
            <label>상품금액</label>
            <span>
              {product.optionGroups
                .reduce(
                  (acc, group) =>
                    acc +
                    group.options.reduce(
                      (acc, option) =>
                        acc +
                        (product.price + option.additionalPrice) *
                          option.quantity,
                      0
                    ),
                  0
                )
                .toLocaleString()}
              원
            </span>
          </li>
          <li className="flex justify-between">
            <label>배송비</label>
            <span>{(product.deliveryFee || 0).toLocaleString()}원</span>
          </li>
          <li className="flex justify-between text-black">
            <label>총 상품금액</label>
            <span>
              {(
                product.optionGroups.reduce(
                  (acc, group) =>
                    acc +
                    group.options.reduce(
                      (acc, option) =>
                        acc +
                        (product.price + option.additionalPrice) *
                          option.quantity,
                      0
                    ),
                  0
                ) + product.deliveryFee
              ).toLocaleString()}
              원
            </span>
          </li>
        </ul>
        {!paymentMethod && (
          <div className="flex flex-col gap-2 pt-4">
            <NpayButton product={product} />
            <button
              className="bg-blue-500 text-white px-4 py-3 font-bold"
              onClick={() => setPaymentMethod("portone")}
            >
              결제하기
            </button>
          </div>
        )}
      </Section>
      {paymentMethod === "portone" && <Payment />}
    </PaymentProvider>
  );
}
