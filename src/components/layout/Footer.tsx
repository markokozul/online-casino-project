import PaymentOptionsShowcase from '../PaymentOptionsShowcase';
import logo from '../../assets/logowhite.png';

export default function Footer() {
  return (
    <div className='bg-backgr3 bg-center bg-cover relative text-white flex flex-col '>
      <PaymentOptionsShowcase />
      <div className='flex flex-col xs:flex-row px-5 py-12 lg:px-16'>
        <div className='flex flex-col flex-[70] items-start  gap-6'>
          <img src={logo} className='w-[150px]' alt='logo' />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique,
            quo ipsam. Dolorum accusamus illo animi laudantium doloremque
            similique voluptas. Laboriosam nostrum eius laborum ut facilis,
            neque ipsam sint eveniet fugiat.
          </p>
        </div>
        <div className='flex flex-col flex-[30] items-end justify-center gap-6'>
          <h1>lmao</h1>
          <h1>lmao</h1>
        </div>
      </div>
    </div>
  );
}
