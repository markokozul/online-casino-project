export default function Button(props: { title: string }) {
  return (
    <button className='px-3 py-[5px] bg-primary-btn text-white rounded-full text-sm'>
      {props.title}
    </button>
  );
}
