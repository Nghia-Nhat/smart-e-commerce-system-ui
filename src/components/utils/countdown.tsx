"use client"
import { Separator } from '@radix-ui/react-separator';
import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = (): void => {
      const today = new Date(); // Get the current date and time
      const targetDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0); // Set target to midnight of tomorrow

      const difference = targetDate.getTime() - Date.now();

      if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((difference % (1000 * 60)) / 1000));
      } else {
        // Reset the countdown if target is reached or passed (midnight)
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    };

    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center mr-2 rounded-lg p-2 border shadow-md">
        <span className="text-xs md:text-sm font-bold text-destructive">{hours.toString().padStart(2, '0')}</span>
      </div>
      <div className="flex flex-col items-center mr-2">
        <span className='text-sm'>:</span>
      </div>
      <div className="flex flex-col items-center mr-2 rounded-lg p-2 border shadow-md">
        <span className="text-xs md:text-sm font-bold text-destructive">{minutes.toString().padStart(2, '0')}</span>
      </div>
      <div className="flex flex-col items-center mr-2">
        <span className='text-sm'>:</span>
      </div>
      <div className="flex flex-col items-center rounded-lg p-2 border shadow-md">
        <span className="text-xs md:text-sm font-bold text-destructive">{seconds.toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default Countdown;
