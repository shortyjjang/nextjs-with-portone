const paymentCallback = async (result: any, orderId: string) => {
  const request = await fetch(`/api/payment/callback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ result, orderId }),
  });
  return request.ok;
};

export default paymentCallback;
