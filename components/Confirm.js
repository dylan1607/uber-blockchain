import { useContext } from 'react';
import RiderSelector from './RiderSelector';
import { UberContext } from '../context';
import request from '../utils/request';

const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between`,
  rideSelectorContainer: `h-full flex flex-col overflow-y-auto`,
  confirmButtonContainer: `border-t-2 cursor-pointer z-10`,
  confirmButton: `bg-black text-white m-4 py-3 text-center text-xl`,
};
const Confirm = () => {
  const {
    currentAccount,
    pickupCordinates,
    dropoffCordinates,
    connectWallet,
    selectedRide,
    price,
    sendTransaction,
  } = useContext(UberContext);
  const storeTripDetails = async () => {
    if (!currentAccount) return;
    try {
      await request.post('/api/trips', {
        data: {
          dropoff: dropoffCordinates,
          pickup: pickupCordinates,
          passenger: currentAccount,
          timestamp: new Date(Date.now()).toISOString(),
          price,
          tripCategory: selectedRide,
        },
      });
      sendTransaction(price);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.wrapper}>
      <div className={style.rideSelectorContainer}>
        {pickupCordinates && dropoffCordinates && <RiderSelector />}
      </div>
      <div className={style.confirmButtonContainer}>
        {currentAccount ? (
          <div
            className={style.confirmButton}
            onClick={() => storeTripDetails()}
          >
            Confirm
          </div>
        ) : (
          <div className={style.confirmButton} onClick={() => connectWallet()}>
            Connect Wallet
          </div>
        )}
      </div>
    </div>
  );
};

export default Confirm;
