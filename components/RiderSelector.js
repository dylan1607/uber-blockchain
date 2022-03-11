import React from 'react';
import uberX from '../assets/images/UberX.png';
import uberXL from '../assets/images/UberXL.png';
import uberSelect from '../assets/images/Select.png';
import uberBlackSuv from '../assets/images/BlackSuv.png';
import uberLux from '../assets/images/Lux.png';
import Image from 'next/image';
import { FaEthereum } from 'react-icons/fa';

const style = {
  wrapper: `h-full flex flex-col`,
  title: `text-gray-500 text-center text-xs py-2 border-b`,
  carList: `flex flex-col flex-1 overflow-scroll`,
  car: `flex p-3 m-2 items-center border-2 border-white`,
  selectedCar: `border-2 border-black flex p-3 m-2 items-center`,
  carImage: `h-14`,
  carDetails: `ml-2 flex-1`,
  service: `font-medium`,
  time: `text-xs text-blue-500`,
  priceContainer: `flex items-center`,
  price: `mr-[0.2rem]`,
};

const carList = [
  {
    service: 'UberX',
    iconUrl: uberX,
    priceMultiplier: 1,
  },
  {
    service: 'UberXL',
    iconUrl: uberXL,
    priceMultiplier: 1.9,
  },
  {
    service: 'Select',
    iconUrl: uberSelect,
    priceMultiplier: 1.5,
  },
  {
    service: 'Black SUV',
    iconUrl: uberBlackSuv,
    priceMultiplier: 1.5,
  },
  {
    service: 'Lux',
    iconUrl: uberLux,
    priceMultiplier: 1.5,
  },
];

const basePrice = 1542;

const RiderSelector = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Choose a ride, or swipe up for more</div>
      <div className={style.carList}>
        {carList.map((car, index) => (
          <div className={style.car} key={index}>
            <Image
              className={style.carImage}
              src={car.iconUrl}
              width={50}
              height={50}
              alt='iconCar'
            />
            <div className={style.carDetails}>
              <div className={style.service}>{car.service}</div>
              <div className={style.time}>5 min away</div>
            </div>
            <div className={style.priceContainer}>
              <div className={style.price}>
                {/* round value 5 digit */}
                {((basePrice / 10 ** 5) * car.priceMultiplier).toFixed(5)}
              </div>
              <FaEthereum />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiderSelector;
