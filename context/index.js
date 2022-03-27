import { createContext, useState, useEffect, useRef } from 'react';
import request from '../utils/request';
import { ethers } from 'ethers';

export const UberContext = createContext();

export const UberProvider = ({ children }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [pickupCordinates, setPickupCordinates] = useState();
  const [dropoffCordinates, setDropoffCordinates] = useState();
  const [currentAccount, setCurrentAccount] = useState('');
  const [infoNode, setInfoNode] = useState();
  const [price, setPrice] = useState(0);
  const [selectedRide, setSelectedRide] = useState();
  const [basePrice, setBasePrice] = useState();
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
        checkExistingNode(addressArray[0]);
      } else {
        setCurrentAccount('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask');
      return;
    }
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
        checkExistingNode(addressArray[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    const isConnected = window.ethereum.isConnected();
    if (!isConnected) {
      return;
    } else {
      window.ethereum.on('disconnect', () => {
        console.log('Metamask disconeccted');
      });
    }
  };

  const sendTransaction = async (price) => {
    await metamask.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: currentAccount,
          to: currentAccount,
          gas: '0x7EF40', // 520000 Gwei
          value: ethers.utils.parseEther(price)._hex,
        },
      ],
    });
  };

  const createLocationCordinatesPromise = (locationName, locationType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const respsonse = await request.post('api/location', {
          location: locationName,
        });
        if (respsonse.data.message == 'success') {
          switch (locationType) {
            case 'pickup':
              setPickupCordinates(respsonse.data.data?.features[0]?.center);
              break;
            case 'dropoff':
              setDropoffCordinates(respsonse.data.data?.features[0]?.center);
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

  const requestCreateUser = async (address) => {
    if (!window.ethereum) return;
    try {
      await request.post(`api/nodes`, {
        data: {
          walletAddress: address,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkExistingNode = async (address) => {
    try {
      const res = await request.get(
        `api/nodes?filters[walletAddress][$eq]=${address}&populate=*`
      );
      const result = res.data.data;
      // console.log(result);
      if (result.length > 0) {
        setInfoNode(result[0]);
        return result[0];
      }
      requestCreateUser(address);
    } catch (error) {
      console.log(error);
    }
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
  }, []);

  useEffect(() => {
    if (!currentAccount) return;
    checkExistingNode(currentAccount);
  }, [currentAccount]);

  // Get distance, duration and price between two locations
  useEffect(() => {
    if (!pickupCordinates || !dropoffCordinates) return;
    (async () => {
      try {
        const response = await request.post('api/matrix', {
          pickupCordinates: `${pickupCordinates.toString()}`,
          dropoffCordinates: `${dropoffCordinates.toString()}`,
        });
        if (response.data.message == 'success') {
          setBasePrice(response.data.data.routes[0].duration);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [pickupCordinates, dropoffCordinates]);

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
        disconnectWallet,
        currentAccount,
        checkExistingNode,
        infoNode,
        selectedRide,
        setSelectedRide,
        price,
        setPrice,
        basePrice,
        sendTransaction,
      }}
    >
      {children}
    </UberContext.Provider>
  );
};
