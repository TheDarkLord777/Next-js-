import React, { useState, useEffect } from "react";

// Foydalanuvchi sovrinlarini saqlash
const prizes = ["10% Off", "20% Off", "Free Shipping", "5% Off", "25% Off", "30% Off"];

const SpinWheel = ({ isLoggedIn }) => {
  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState("");
  const [hasSpinned, setHasSpinned] = useState(false);

  useEffect(() => {
    // 24 soat ichida faqat bitta marta aylantirishga ruxsat berish
    const lastSpinTime = localStorage.getItem("lastSpinTime");

    if (lastSpinTime) {
      const timeDifference = Date.now() - parseInt(lastSpinTime);
      if (timeDifference < 86400000) { // 86400000 millisekund = 24 soat
        setHasSpinned(true);
      }
    }
  }, []);

  const spin = () => {
    if (hasSpinned) {
      alert("You have already spun the wheel today!");
      return;
    }

    setSpinning(true);
    const randomDeg = Math.floor(Math.random() * 360) + 3600;
    const wheel = document.getElementById("wheel");
    wheel.style.transition = "transform 4s ease-out";
    wheel.style.transform = `rotate(${randomDeg}deg)`;

    setTimeout(() => {
      const index = Math.floor((randomDeg % 360) / (360 / prizes.length));
      setPrize(prizes[index]);
      setSpinning(false);

      // Aylantirish vaqtini localStorage-ga saqlash
      localStorage.setItem("lastSpinTime", Date.now().toString());
      setHasSpinned(true);
    }, 4000); // 4 soniya davomida aylanish
  };

  if (!isLoggedIn) {
    return <p>Please log in to spin the wheel.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div id="wheel" className={`w-72 h-72 border-4 border-black rounded-full overflow-hidden relative ${spinning ? "transition-transform" : ""}`}>
        {prizes.map((prize, index) => (
          <div key={index} className="w-1/2 h-1/2 flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer">
            {prize}
          </div>
        ))}
      </div>
      <button
        onClick={spin}
        disabled={spinning || hasSpinned}
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 disabled:bg-gray-300"
      >
        Spin
      </button>
      {prize && !spinning && <p className="mt-2 text-xl">You won: {prize}</p>}
    </div>
  );
};

export default SpinWheel;
