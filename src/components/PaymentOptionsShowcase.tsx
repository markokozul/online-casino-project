import { PaymentOptionsShowcaseProps } from '../types/types';

export default function PaymentOptionsShowcase({
  position,
}: PaymentOptionsShowcaseProps) {
  return (
    <div
      className={`${position} bottom-0 w-full h-20 bg-[#2a0070]/80  text-white flex flex-row gap-10 items-center justify-evenly`}
    >
      <h1>Paypal</h1>
      <h1>Paypal</h1>
      <h1>Paypal</h1>
      <h1>Paypal</h1>
    </div>
  );
}
