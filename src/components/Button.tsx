import { Link } from 'react-router-dom';
import { ButtonProps } from '../types/types';

export default function Button({
  title,
  type,
  navigate,
  styling,
  action,
}: ButtonProps) {
  const linkStyle =
    'text-white font-bold text-lg border-b-[1px] p-2 md:transition-all md:duration-200 md:ease-in-out md:hover:scale-110';
  const buttonStyle =
    'px-4 py-2 md:px-6 md:py-2 text-sm xs:text-base bg-gradient-to-t from-[#ff9c19] to-[#ffdd2d]  text-gray-800 font-bold rounded-xl text-lg';

  return (
    <>
      {navigate && !action ? ( //buttons mainly used for navigation
        styling === 'link' ? ( //if styling prop is "link", add link styling
          <Link to={navigate} className={linkStyle}>
            {title}
          </Link>
        ) : (
          //if styling prop is "button",add button look to link

          <Link to={navigate} className={buttonStyle}>
            {title}
          </Link>
        )
      ) : styling === 'link' ? ( //buttons mainly used for calling functions and submiting /  if styling prop is "link", add link styling
        type === 'submit' ? ( //if type is of submit,set type="submit" on a button(used in forms)
          <button type='submit' className={linkStyle}>
            {title}
          </button>
        ) : (
          <button onClick={action} className={linkStyle}>
            {title}
          </button>
        )
      ) : type === 'submit' ? ( //if type is of submit,set type="submit" on a button(used in forms) / if styling prop is "button",add button look to button
        <button type='submit' className={buttonStyle}>
          {title}
        </button>
      ) : (
        <button onClick={action} className={buttonStyle}>
          {title}
        </button>
      )}
    </>
  );
}
