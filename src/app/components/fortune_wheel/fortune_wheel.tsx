import React, { useState, useEffect } from "react";
import { ArrowDownCircle } from "lucide-react";

const prizes = [
  { text: "10% Off", color: "bg-blue-500" },
  { text: "20% Off", color: "bg-green-500" },
  { text: "Free Shipping", color: "bg-yellow-500" },
  { text: "5% Off", color: "bg-purple-500" },
  { text: "25% Off", color: "bg-pink-500" },
  { text: "30% Off", color: "bg-orange-500" }
];

const SpinWheel = ({ isLoggedIn, onComplete }) => {
  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState("");
  const [hasSpinned, setHasSpinned] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    checkSpinAvailability();
    const timer = setInterval(checkSpinAvailability, 1000);
    return () => clearInterval(timer);
  }, []);

  const checkSpinAvailability = () => {
    const lastSpinTime = localStorage.getItem("lastSpinTime");
    if (lastSpinTime) {
      const timeDifference = Date.now() - parseInt(lastSpinTime);
      const timeRemaining = 86400000 - timeDifference; // 24 hours in milliseconds

      if (timeRemaining > 0) {
        setHasSpinned(true);
        // Convert milliseconds to hours, minutes, seconds
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setHasSpinned(false);
        setTimeLeft("");
        localStorage.removeItem("lastSpinTime");
      }
    }
  };

  const spin = () => {
    if (!isLoggedIn || hasSpinned) return;

    setSpinning(true);
    const randomDeg = Math.floor(Math.random() * 360) + 3600; // Spin at least 10 times
    const wheel = document.getElementById("wheel");
    wheel.style.transform = `rotate(${randomDeg}deg)`;

    setTimeout(() => {
      const normalizedDeg = randomDeg % 360;
      const prizeIndex = Math.floor((360 - normalizedDeg) / (360 / prizes.length));
      setPrize(prizes[prizeIndex].text);
      setSpinning(false);
      setHasSpinned(true);
      localStorage.setItem("lastSpinTime", Date.now().toString());
      
      if (onComplete) {
        onComplete(prizes[prizeIndex].text);
      }
    }, 4000);
  };

  if (!isLoggedIn) {
    return (
      <div className="text-center p-4 bg-gray-100 rounded-lg">
        Please log in to spin the wheel
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
      <div className="relative">
        {/* Arrow indicator */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
          <ArrowDownCircle className="w-8 h-8 text-red-500" />
        </div>
        
        {/* Wheel container */}
        <div className="relative w-72 h-72 border-8 border-gray-800 rounded-full overflow-hidden">
          {/* Spinning wheel */}
          <div
            id="wheel"
            className="absolute w-full h-full transition-transform duration-[4000ms] ease-out"
            style={{ transformOrigin: "center center" }}
          >
            {prizes.map((prize, index) => {
              const rotation = (index * 360) / prizes.length;
              return (
                <div
                  key={index}
                  className={`absolute w-full h-full ${prize.color} flex items-center justify-center`}
                  style={{
                    transform: `rotate(${rotation}deg) skew(${90 - 360 / prizes.length}deg)`,
                    transformOrigin: "50% 50%",
                  }}
                >
                  <span
                    className="absolute text-white font-bold -mt-16 transform -rotate-90"
                    style={{ transform: `rotate(${-rotation}deg) skew(${-(90 - 360 / prizes.length)}deg)` }}
                  >
                    {prize.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button
        onClick={spin}
        disabled={spinning || hasSpinned}
        className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold 
                 hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed
                 transform transition hover:scale-105 active:scale-95"
      >
        {spinning ? "Spinning..." : "Spin the Wheel!"}
      </button>

      {hasSpinned && timeLeft && (
        <p className="mt-4 text-gray-600">
          Next spin available in: {timeLeft}
        </p>
      )}

      {prize && !spinning && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center">
          <p className="text-xl font-bold">Congratulations!</p>
          <p className="text-lg">You won: {prize}</p>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;