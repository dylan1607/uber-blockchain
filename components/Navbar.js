import Image from 'next/image';
import { useContext } from 'react';
import avatar from '../assets/images/avatar.svg';
import { BsPerson } from 'react-icons/bs';
import { UberContext } from '../context';
import URL from '../constants/url';

const style = {
  wrapper: `h-16 w-full bg-black text-white flex items-center px-60 fixed z-20 md:justify-around`,
  leftMenu: `flex gap-3`,
  logo: `text-3xl flex cursor-pointer mr-16`,
  menuItem: `text-lg font-medium flex items-center mx-4 cursor-pointer`,
  rightMenu: `flex gap-3 items-center`,
  userImageContainer: `mr-1`,
  userImage: `h-10 w-10 rounded-full object-cover cursor-pointer`,
  loginBtn: `flex items-center cursor-pointer rounded-full hover:bg-[#333333] px-4 py-1 cursor-pointer`,
  loginText: `ml-2`,
};

// const currentAccount = '0x9D5fF810A20e184958306DB91220123d6605188d';

const Navbar = () => {
  const { currentAccount, connectWallet, infoNode } = useContext(UberContext);
  // console.log(infoNode);
  return (
    <div className={style.wrapper}>
      <div className={style.leftMenu}>
        <div className={style.logo}>Uber</div>
        <div className={style.menuItem}>Ride</div>
        <div className={style.menuItem}>Drive</div>
        <div className={style.menuItem}>More</div>
      </div>
      <div className={style.rightMenu}>
        <div className={style.menuItem}>Help</div>
        <div className={style.menuItem}>{infoNode?.attributes.name}</div>
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
            <div className={style.loginText}>Log in</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
