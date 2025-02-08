import { ProductProps } from "@/store/selectedItem";

const getOrderId = async ({
  item,
  token,
}: {
  item: ProductProps;
  token: string;
}) => {
  const request = await fetch(`/api/payment/orderId`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ item }),
  });

  const { orderId } = await request.json();

  return orderId;
};

export default getOrderId;
