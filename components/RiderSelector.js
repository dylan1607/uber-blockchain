import { FaEthereum } from 'react-icons/fa';
import { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import url from '../constants/url';
import request from '../utils/request';
import { UberContext } from '../context';

const style = {
  wrapper: `h-full flex flex-col`,
  title: `text-gray-500 text-center text-xs py-2 border-b`,
  carList: `flex flex-col flex-1 overflow-y-auto`,
  car: `flex p-3 m-2 items-center border-2 border-white`,
  selectedCar: `border-2 border-black bg-[#eeeeee] flex p-3 m-2 items-center`,
  carImage: `h-14`,
  carDetails: `ml-2 flex-1`,
  service: `font-medium`,
  time: `text-xs text-blue-500`,
  priceContainer: `flex items-center`,
  price: `mr-[0.2rem]`,
};

const RiderSelector = () => {
  const { selectedRide, setSelectedRide, setPrice, basePrice } =
    useContext(UberContext);
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await request.get('/api/car-lists?populate=*');
        setCarList(res.data.data);
        setSelectedRide(res.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Choose a ride, or swipe up for more</div>
      <div className={style.carList}>
        {carList.map((car, index) => (
          <div
            className={`${
              selectedRide == car.attributes.title
                ? style.selectedCar
                : style.car
            }`}
            key={index}
            onClick={() => {
              {
                /* round value 5 digit */
              }
              setPrice(
                (
                  (basePrice / 10 ** 5) *
                  car.attributes.priceMultiplier
                ).toFixed(5)
              );
              setSelectedRide(car.attributes.title);
            }}
          >
            <Image
              className={style.carImage}
              src={
                `${url.BASE_URL}` +
                car.attributes.icon.data.attributes.formats.thumbnail.url
              }
              width={50}
              height={50}
              alt='iconCar'
            />
            <div className={style.carDetails}>
              <div className={style.service}>{car.attributes.title}</div>
              <div className={style.time}>5 min away</div>
            </div>
            <div className={style.priceContainer}>
              <div className={style.price}>
                {/* round value 5 digit */}
                {(
                  (basePrice / 10 ** 5) *
                  car.attributes.priceMultiplier
                ).toFixed(5)}
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
