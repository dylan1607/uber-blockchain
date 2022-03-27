import Image from 'next/image';
import { useContext } from 'react';
import avatar from '../assets/images/avatar.svg';
import { BsPerson } from 'react-icons/bs';
import { UberContext } from '../context';
import URL from '../constants/url';

const style = {
  wrapper: `h-16 w-full bg-black text-white px-6 flex items-center fixed z-20 justify-between`,
  leftMenu: ` gap-2 hidden md:flex`,
  logo: `text-3xl flex cursor-pointer mr-10`,
  menuItem: `text-lg font-medium flex items-center mx-4 cursor-pointer`,
  rightMenu: `flex gap-2 items-center`,
  userImage: `rounded-full object-cover cursor-pointer`,
  loginBtn: `flex items-center bg-white text-black font-semibold cursor-pointer rounded-full hover:bg-gray-200 px-4 py-2`,
  loginText: ``,
};

const Navbar = () => {
  const { currentAccount, connectWallet, infoNode } = useContext(UberContext);
  // console.log(infoNode);
  return (
    <div className={style.wrapper}>
      <div className={style.logo}>Uber</div>
      <div className={style.leftMenu}>
        <div className={style.menuItem}>Ride</div>
        <div className={style.menuItem}>Drive</div>
        <div className={style.menuItem}>More</div>
      </div>
      <div className={style.rightMenu}>
        <div className={style.menuItem}>Help</div>
        <div className={style.menuItem}>
          {infoNode?.attributes.name ? infoNode?.attributes.name : 'Guest'}
        </div>
        <div className={style.userImageContainer}>
          <Image
            className={style.userImage}
            alt='avatar'
            src={
              infoNode
                ? `${URL.BASE_URL}${infoNode?.attributes.profileImage.data.attributes.url}`
                : avatar
            }
            width={40}
            height={40}
          />
        </div>
        {currentAccount ? (
          <div>
            {currentAccount.slice(0, 6)}
            ...
            {currentAccount.slice(currentAccount.length - 3)}
          </div>
        ) : (
          <div className={style.loginBtn} onClick={connectWallet}>
            <BsPerson />
            <p className={style.loginText}>Login</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
