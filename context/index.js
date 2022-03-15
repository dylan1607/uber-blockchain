import axios from 'axios';
import { createContext, useState, useEffect, useRef } from 'react';
import { createUser } from '../pages/api/data';

export const UberContext = createContext();

export const UberProvider = ({ children }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [pickupCordinates, setPickupCordinates] = useState();
  const [dropoffCordinates, setDropoffCordinates] = useState();
  const [currentAccount, setCurrentAccount] = useState('');
  const timeout = useRef();

  let metamask;
  if (typeof window !== 'undefined') {
    metamask = window.ethereum;
  }

  const checkWalletConnect = async () => {
    if (!window.ethereum) return;
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
        requestCreateUser(addressArray[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return;
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
        requestCreateUser(addressArray[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createLocationCordinatesPromise = (locationName, locationType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const respsonse = await axios.post('api/location', {
          location: locationName,
        });
        if (respsonse.data.message == 'success') {
          switch (locationType) {
            case 'pickup':
              setPickupCordinates(respsonse.data.data.features[0].center);
              break;
            case 'dropoff':
              setDropoffCordinates(respsonse.data.data.features[0].center);
              break;
          }
          resolve();
        } else {
          reject();
        }
      } catch (error) {
        console.log(error);
        reject();
      }
    });
  };

  useEffect(() => {
    if (pickup && dropoff) {
      (() => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(async () => {
          await Promise.all([
            createLocationCordinatesPromise(pickup, 'pickup'),
            createLocationCordinatesPromise(dropoff, 'dropoff'),
          ]);
        }, 1000);
      })();
    } else return;
  }, [pickup, dropoff]);

  useEffect(() => {
    checkWalletConnect();
  });

  const requestCreateUser = async (address) => {
    if (!window.ethereum) return;
    try {
      await createUser({
        body: {
          name: 'Dylan',
          userWalletAddress: address,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UberContext.Provider
      value={{
        pickup,
        setPickup,
        dropoff,
        setDropoff,
        pickupCordinates,
        setPickupCordinates,
        dropoffCordinates,
        setDropoffCordinates,
        connectWallet,
        currentAccount,
      }}
    >
      {children}
    </UberContext.Provider>
  );
};
