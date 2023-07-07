import { PaymentOptionsShowcaseProps } from '../types/types';

export default function PaymentOptionsShowcase({
  position,
}: PaymentOptionsShowcaseProps) {
  return (
    <div
      className={`${position} bottom-0 w-full h-20 bg-[#2a0070]/80  text-white flex flex-row gap-10 items-center justify-evenly`}
    >
      <a href='Paypal.com'>
        <img
          className='w-16 md:w-36'
          src='https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/de/pay_paypal_white.svg'
          alt=''
        ></img>
      </a>
      <img
        className='w-16 md:w-36'
        src='https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/en/pay_paylado-short-white.svg'
        alt=''
      ></img>
      <img
        className='hidden xxs:block xxs:w-16 md:w-36'
        src='https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/de/03_pay_sofort-white.svg'
        alt=''
      ></img>
      <img
        className='hidden xs:block xs:w-12 md:w-24'
        src='https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/de/pay_visa-white.svg'
        alt=''
      ></img>
    </div>
  );
}
