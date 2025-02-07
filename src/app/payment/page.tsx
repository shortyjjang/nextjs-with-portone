import Section from '@/entites/Section';
import Title from '@/entites/Title';
import Payment from '@/widget/portone/Payment';
import PaymentProvider from '@/widget/portone/PaymentProvider';
import React from 'react'

export default function PaymentPage() {
    return (
      <PaymentProvider>
        <Title title="주문하기" className="mt-8" />
        {/* <Section title="주문 상품">
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
        </Section> */}
        <Payment />
      </PaymentProvider>
    );
}

