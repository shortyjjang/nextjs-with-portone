import Button from "@/entites/Button";
import Input from "@/entites/Input";
import Script from "next/script";
import React, { useId } from "react";

export default function Address({
  zipcode,
  address,
  addressDetail,
  autoRoadAddress,
  autoJibunAddress,
  onChangeZipcode,
  onChangeAddress,
  onChangeAddressDetail,
  onChangeAutoRoadAddress,
  onChangeAutoJibunAddress,
}: {
  zipcode?: string;
  address?: string;
  addressDetail?: string;
  autoRoadAddress?: string;
  autoJibunAddress?: string;
  onChangeZipcode?: (value: string) => void;
  onChangeAddress?: (value: string) => void;
  onChangeAddressDetail?: (value: string) => void;
  onChangeAutoRoadAddress?: (value: string) => void;
  onChangeAutoJibunAddress?: (value: string) => void;
}) {
  const id = useId();
  return (
    <div>
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        async
        strategy="lazyOnload"
      />
      <div className="flex gap-2 pr-2">
        <Input
            id={`${id}-address01`}
            value={zipcode}
            className="border-x-0 border-y-0"
            readOnly
            onClick={async () => {
            const result = await daumPostcode();
            onChangeZipcode && onChangeZipcode(result?.zipcode || '');
            onChangeAddress && onChangeAddress(result?.address || '');
            onChangeAddressDetail && onChangeAddressDetail(result?.addressDetail || '');
            onChangeAutoRoadAddress && onChangeAutoRoadAddress(result?.autoRoadAddress || '');
            onChangeAutoJibunAddress && onChangeAutoJibunAddress(result?.autoJibunAddress || '');
            }}
        />
        <Button onClick={daumPostcode}>주소검색</Button>
      </div>
      <Input
        id={`${id}-address02`}
        value={address}
        className="border-x-0 border-y-0"
        readOnly
      />
      <Input
        id={`${id}-address03`}
        value={addressDetail}
        className="border-x-0 border-y-0"
        onChange={(e) => onChangeAddressDetail && onChangeAddressDetail(e.target.value)}
      />
    </div>
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
    autoRoadAddress: string;
    autoJibunAddress: string;
  }> => {
    return new Promise((resolve, reject) => {
      const { daum } = window;
      new daum.Postcode({
        oncomplete: function (data: any) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
          var roadAddr = data.roadAddress; // 도로명 주소 변수
          var extraRoadAddr = ""; // 참고 항목 변수
  
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraRoadAddr +=
              extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          if (extraRoadAddr !== "") {
            extraRoadAddr = " (" + extraRoadAddr + ")";
          }
  
          resolve({
            zipcode: data.zonecode,
            address: roadAddr,
            addressDetail: extraRoadAddr !== "" ? extraRoadAddr : "",
            autoRoadAddress: `(예상 도로명 주소 : ${
              data.autoRoadAddress + extraRoadAddr
            })`,
            autoJibunAddress: `(예상 지번 주소 : ${data.autoJibunAddress})`,
          });
        },
      }).open();
    });
  };
