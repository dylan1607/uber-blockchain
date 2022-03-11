import React, { useState } from 'react';
import {
  VscDebugBreakpointLogUnverified,
  VscDebugBreakpointFunctionUnverified,
} from 'react-icons/vsc';

const style = {
  wrapper: `pt-2`,
  searchHeader: `w-full font-bold text-left flex items-center text-3xl p-4 overflow-hidden`,
  inputBoxes: `flex flex-col mb-4 relative`,
  inputBox: `h-10 mx-4 my-1 bg-[#eeeeee] flex items-center py-1 px-2`,
  focusedInputBox: `border-2 border-black`,
  svgContainer: `mx-1`,
  input: `my-2 rounded-2 p-2, outline-none border-none bg-transparent h-full w-full`,
  verticalLine: `w-0 h-[2rem] border-black border bg-black absolute z-10 left-[2.3rem] top-[2rem]`,
};

const LocationSelector = () => {
  const [inFocus, setInFocus] = useState('from');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  return (
    <div className={style.wrapper}>
      <div className={style.searchHeader}>
        {inFocus === 'from' ? 'Where can we pick you up?' : 'Where to?'}
      </div>
      <div className={style.inputBoxes}>
        <div
          className={`${style.inputBox} ${
            inFocus === 'from' ? style.focusedInputBox : ''
          }`}
        >
          <div className={style.svgContainer}>
            <VscDebugBreakpointLogUnverified />
          </div>
          <input
            className={style.input}
            placeholder='Enter pickup location'
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            onFocus={(e) => setInFocus('from')}
          />
        </div>
        <div className={style.verticalLine} />
        <div
          className={`${style.inputBox} ${
            inFocus === 'to' ? style.focusedInputBox : ''
          }`}
        >
          <div className={style.svgContainer}>
            <VscDebugBreakpointFunctionUnverified />
          </div>
          <input
            className={style.input}
            placeholder='Where to go?'
            value={pickup}
            onChange={(e) => setDropoff(e.target.value)}
            onFocus={(e) => setInFocus('to')}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
