import Button from "@/entites/Button";
import Input from "@/entites/Input";
import Script from "next/script";
import React, { useId } from "react";

export default function Address({
  zipcode,
  address,
  addressDetail,
  onChangeZipcode,
  onChangeAddress,
  onChangeAddressDetail,
}: {
  zipcode?: string;
  address?: string;
  addressDetail?: string;
  onChangeZipcode?: (value: string) => void;
  onChangeAddress?: (value: string) => void;
  onChangeAddressDetail?: (value: string) => void;
}) {
  const id = useId();
  const onSearchAddress = async () => {
    const result = await daumPostcode();
    if (onChangeZipcode) onChangeZipcode(result?.zipcode || "");
    if (onChangeAddress) onChangeAddress(result?.address || "");
    if (onChangeAddressDetail) onChangeAddressDetail(result?.addressDetail || "");
  };
  return (
    <>
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        async
        strategy="lazyOnload"
      />
      <div className="grid grid-cols-[100px_1fr] border border-t-0 border-gray-300 py-2">
        <label
          className="flex items text-sm px-4 py-3"
          htmlFor={`${id}-address01`}
        >
          주소
        </label>
        <div className="flex gap-2 pr-2">
          <Input
            id={`${id}-address01`}
            value={zipcode}
            className="border-x-0 border-y-0"
            readOnly
            onClick={onSearchAddress}
          />
          <Button onClick={onSearchAddress}>주소검색</Button>
        </div>
      </div>
      <Input
        id={`${id}-address02`}
        value={address}
        className="border-t-0 py-5 pl-[100px]"
        readOnly
        onClick={onSearchAddress}
      />
      <Input
        id={`${id}-address03`}
        value={addressDetail}
        className="border-t-0 py-5 pl-[100px]"
        onChange={(e) =>
          onChangeAddressDetail && onChangeAddressDetail(e.target.value)
        }
      />
    </>
  );
}

declare global {
  interface Window {
    daum: {
      Postcode: new (options: { oncomplete: (data: any) => void }) => {
        open: () => void;
      };
    };
  }
}

const daumPostcode = (): Promise<{
  zipcode: string;
  address: string;
  addressDetail: string;
//   autoRoadAddress: string;
//   autoJibunAddress: string;
}> => {
  return new Promise((resolve) => {
    const { daum } = window;
    new daum.Postcode({
      oncomplete: function (data: any) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
        const roadAddr = data.roadAddress; // 도로명 주소 변수
        let extraRoadAddr = ""; // 참고 항목 변수

        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
            //예상 도로명 주소 
          extraRoadAddr +=
            extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraRoadAddr !== "") {
            //예상 도로명 주소 
          extraRoadAddr = " (" + extraRoadAddr + ")";
        }

        resolve({
          zipcode: data.zonecode,
          address: roadAddr,
          addressDetail: extraRoadAddr !== "" ? extraRoadAddr : "",
        });
      },
    }).open();
  });
};
