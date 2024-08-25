import React, { useEffect, useState } from 'react';

const Offer = () => {
  const calculateTimeLeft = () => {
    const today = new Date();
    const targetDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 22, 15, 0);
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
        minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    } else {
      timeLeft = {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    
    <section className="max-padd-container bg-banner bg-center bg-cover h-[555px] p-4 sm:p-8 rounded-xl my-8 flex flex-col sm:flex-row justify-start items-center">
      <div className="text-center sm:text-left text-black">
        <h3 className="text-base sm:text-lg font-medium uppercase tracking-wide">Sales Fever</h3>
        <h2 className="text-4xl sm:text-5xl font-extrabold uppercase mt-2">20% Off Everything</h2>
        <p className="italic font-light mt-4">Offer ends in</p>
        <div className="flex justify-center sm:justify-start gap-4 sm:gap-6 mt-4">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, index) => (
            <div key={index} className="bg-white bg-opacity-80 p-2 sm:p-4 rounded-lg flex flex-col items-center">
              <span className="text-xl sm:text-2xl font-semibold">{item.value}</span>
              <span className="text-xs sm:text-sm font-light">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
    
  );
};

export default Offer;
