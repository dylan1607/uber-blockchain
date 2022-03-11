import Image from 'next/image';
import React from 'react';
import avatar from '../assets/images/avatar.png';
import { BsPerson } from 'react-icons/bs';

const style = {
  wrapper: `h-16 w-full bg-black text-white flex items-center px-60 fixed z-20 md:justify-around`,
  leftMenu: `flex gap-3`,
  logo: `text-3xl flex cursor-pointer mr-16`,
  menuItem: `text-lg font-medium flex items-center mx-4 cursor-pointer`,
  rightMenu: `flex gap-3 items-center`,
  userImageContainer: `mr-2`,
  userImage: `h-10 w-10 mr-4 rounded-full p-px object-cover cursor-pointer`,
  loginBtn: `flex items-center cursor-pointer rounded-full hover:bg-[#333333] px-4 py-1`,
  loginText: `ml-2`,
};

const currentAccount = '0x9D5fF810A20e184958306DB91220123d6605188d';

const Navbar = () => {
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
        <div className={style.menuItem}>Dylan</div>
        <div className={style.userImageContainer}>
          <Image
            className={style.userImage}
            alt='avatar'
            src={avatar}
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
          <div className={style.loginBtn}>
            <BsPerson />
            <div className={style.loginText}>Log in</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;