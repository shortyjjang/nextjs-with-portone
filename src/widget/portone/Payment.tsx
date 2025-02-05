"use client";
import React, { useContext, useId } from "react";
import Title from "@/entites/Title";
import Section from "@/entites/Section";
import PortoneButton from "./PortoneButton";
import Input from "@/entites/Input";
import { PaymentContext } from "./PaymentProvider";

export default function Payment() {
  const id = useId();
  const { payParams, setPayParams } = useContext(PaymentContext);
  return (
    <>
      <Title title="주문하기" className="mt-8" />
      <Section title="배송지">
        <div className="grid grid-cols-[100px_1fr] border border-t-0 border-gray-300">
          <label className="flex items-center text-sm px-4 py-5" htmlFor={`${id}-address01`}>받는사람</label>
          <Input
            id={`${id}-address01`}
            minLength={1}
            maxLength={10}
            value={payParams.name}
            className="border-x-0 border-y-0"
            onChange={(e) =>{
                console.log(e.target.value)
              setPayParams((prev) => ({ ...prev, name: e.target.value || '' }))
            }}
          />
        </div>
      </Section>
      <PortoneButton />
    </>
  );
}
