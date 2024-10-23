"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showWaveform, setShowWaveform] = useState(false);

  useEffect(() => {
    let timer;
    if (isRecording && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setShowWaveform(true);
    }
    return () => clearTimeout(timer);
  }, [isRecording, countdown]);

  const handleBabbleClick = () => {
    if (!isRecording) {
      setIsRecording(true);
      setCountdown(3);
    } else {
      setIsRecording(false);
      setShowWaveform(false);
      setCountdown(3);
    }
  };

  return (
    <main className="min-h-screen bg-[#2F4858] relative overflow-hidden">
      <div className="stars absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="star absolute w-[2px] h-[2px] bg-yellow-200/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 1}s infinite`,
            }}
          />
        ))}
      </div>

      <div
        className={`absolute top-8 left-1/2 transform -translate-x-1/2 text-white text-2xl font-light transition-opacity duration-500 ${
          showWaveform ? "opacity-0" : "opacity-100"
        }`}
      >
        babble
      </div>

      {showWaveform && (
        <div className="fixed bottom-0 left-0 right-0 h-[65vh] animate-slideUp">
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
          >
            <defs>
              <path
                id="wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="wave-parallax">
              <use href="#wave" x="48" y="0" fill="rgba(255, 197, 154, 0.7)" />
              <use href="#wave" x="48" y="3" fill="rgba(255, 197, 154, 0.5)" />
              <use href="#wave" x="48" y="5" fill="rgba(255, 197, 154, 0.3)" />
              <use href="#wave" x="48" y="7" fill="rgba(255, 197, 154, 1)" />
            </g>
          </svg>
        </div>
      )}

      {/* Main Container with Border */}
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1152px] h-[560px] ${
          !showWaveform ? "border border-white/10 rounded-lg" : ""
        }`}
      >
        {/* Main Circle Button */}
        <button
          onClick={handleBabbleClick}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <div
            className={`w-[202px] h-[202px] rounded-full border flex items-center justify-center transition-all duration-300 
            ${
              showWaveform
                ? "bg-white border-white text-[#2F4858]"
                : "border-[#FFB684] text-[#FFB684] hover:shadow-[0_0_20px_#FFE9D4]"
            }`}
          >
            <span className="text-xl">{showWaveform ? "Stop" : "Babble"}</span>
          </div>
        </button>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-10 mt-11">
          <button className="w-[58px] h-[58px] rounded-full border border-[#FFB684] flex items-center justify-center bg-[#2F4858]">
            <svg className="w-6 h-6 text-[#FFB684]" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"
              />
              <path
                fill="currentColor"
                d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
              />
            </svg>
          </button>

          <button className="w-[58px] h-[58px] rounded-full border border-[#FFB684] flex items-center justify-center bg-[#2F4858]">
            <svg className="w-6 h-6 text-[#FFB684]" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"
              />
            </svg>
          </button>
        </div>

        {isRecording && countdown > 0 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white z-20">
            {countdown}
          </div>
        )}
      </div>
    </main>
  );
}
