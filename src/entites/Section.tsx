import SubTitle from "@/entites/SubTitle";
import React from "react";

export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-lg mx-auto bg-white p-4 pt-6 mt-8">
      <SubTitle>{title}</SubTitle>
      {children}
    </div>
  );
}
