import Payment from "@/widget/portone/Payment";
import PaymentProvider from "@/widget/portone/PaymentProvider";

export default function Home() {
  return (
    <PaymentProvider>
      <Payment />
    </PaymentProvider>
  );
}
