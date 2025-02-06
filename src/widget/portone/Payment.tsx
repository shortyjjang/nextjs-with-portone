"use client";
import React, { useContext, useId } from "react";
import Section from "@/entites/Section";
import PortoneButton from "./PortoneButton";
import Input from "@/entites/Input";
import { PaymentContext } from "./PaymentProvider";
import Address from "../address/Address";

export default function Payment() {
  const id = useId();
  const { payParams, setPayParams } = useContext(PaymentContext);
  return (
    <>
      <Section title="배송지">
        <div className="grid grid-cols-[100px_1fr] border border-t-0 border-gray-300">
          <label
            className="flex items-center text-sm px-4 py-5"
            htmlFor={`${id}-name`}
          >
            받는사람
          </label>
          <Input
            id={`${id}-name`}
            minLength={1}
            maxLength={10}
            value={payParams.name}
            className="border-x-0 border-y-0"
            onChange={(e) =>
              setPayParams((prev) => ({
                ...prev,
                name: e.target.value || "",
              }))
            }
          />
        </div>
        <div className="grid grid-cols-[100px_1fr] border border-t-0 border-gray-300 py-2">
          <label
            className="flex items text-sm px-4 py-3"
            htmlFor={`${id}-address01`}
          >
            주소검색
          </label>
          <Address
            zipcode={payParams.buyer_postcode}
            address={payParams.buyer_addr1}
            addressDetail={payParams.buyer_addr2}
            onChangeZipcode={(value) =>
              setPayParams((prev) => ({ ...prev, buyer_postcode: value }))
            }
            onChangeAddress={(value) =>
              setPayParams((prev) => ({ ...prev, buyer_addr1: value }))
            }
            onChangeAddressDetail={(value) =>
              setPayParams((prev) => ({ ...prev, buyer_addr2: value }))
            }
          />
        </div>
      </Section>
      <Section title="결제정보">
        <h3 className="text-lg font-bold pb-3">
          결제 수단 <span className="font-normal">/ 신용카드</span>
        </h3>
        <ul>
          <PaymentSummary
            label="총 주문 금액"
            className="border-black"
            value={29000}
          />
          <PaymentSummary label="상품금액" value={29000} />
          <PaymentSummary label="쿠폰할인" value={0} />
          <PaymentSummary label="적립금사용" value={0} />
          <PaymentSummary label="기본 배송비" value={0} />
          <PaymentSummary label="제주/도서산간비" value={0} />
          <PaymentSummary
            label="최종 결제 금액"
            value={29000}
            className="border-black font-bold bg-blue-100"
          />
        </ul>
        {/* <div>
                    <label>
                        <input type="checkbox" name="agreement_usable" id="agreement_usable" value="credit_card" aria-required="true" data-parsley-multiple="agreement_usable">
                        <span><b>[필수]</b> 쇼핑몰 이용약관 동의</span>
                        <a href="https://yes-us.co.kr/terms/agreement" target="_blank">약관보기 &gt;</a><!-- 텍스트 수정 -->
                    </label>
                    <label class="frm-check">
                        <input type="checkbox" name="agreement_privacy" id="agreement_privacy" value="tosspay" aria-required="true" data-parsley-multiple="agreement_privacy">
                        <span><b>[필수]</b> 개인정보 수집 이용 동의</span>
                        <a href="https://yes-us.co.kr/terms/privacy" target="_blank">약관보기 &gt;</a><!-- 텍스트 수정 -->
                    </label>
                </div> */}
        <ul className="list-disc list-outside ml-4 text-gray-500 text-sm">
          <li>
            무이자할부가 적용되지 않은 상품과 무이자할부가 가능한 상품을 동시에
            구매할 경우 전체 주문 상품 금액에 대해 무이자할부가 적용되지
            않습니다. 무이자할부를 원하시는 경우 장바구니에서 무이자할부 상품만
            선택하여 주문하여 주시기 바랍니다.
          </li>
          <li>
            최소 결제 가능 금액은 결제금액에서 배송비를 제외한 금액입니다.
          </li>
        </ul>
      </Section>
      <div className="sticky bg-[#f5f5f5] bottom-0 left-0 right-0 flex flex-col gap-4 p-4 border-t border-gray-300">
        <PortoneButton />
      </div>
    </>
  );
}

function PaymentSummary({
  label,
  value,
  className = "border-gray-300",
}: {
  label: string;
  value: number;
  className?: string;
}) {
  return (
    <li className={`grid grid-cols-2 border-t text-center py-5 ${className}`}>
      <label>{label}</label>
      <span className="text-blue-500">{value.toLocaleString()}원</span>
    </li>
  );
}
