import React from 'react';
import RiderSelector from './RiderSelector';

const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between`,
  rideSelectorContainer: `h-full flex flex-col overflow-scroll`,
  confirmButtonContainer: `border-t-2 cursor-pointer z-10`,
  confirmButton: `bg-black text-white m-4 py-3 text-center text-xl`,
};
const Confirm = () => {
  const storeTripDetails = async () => {};
  return (
    <div className={style.wrapper}>
      <div className={style.rideSelectorContainer}>
        <RiderSelector />
      </div>
      <div className={style.confirmButtonContainer}>
        <div className={style.confirmButton} onClick={() => storeTripDetails()}>
          Confirm Uber
        </div>
      </div>
    </div>
  );
};

export default Confirm;
