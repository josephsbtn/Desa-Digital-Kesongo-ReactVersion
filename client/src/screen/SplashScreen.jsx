import React from "react";
import Logo from "../component/Logo/logo";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 2000);
  //   });
  return (
    <>
      <section className="w-full flex items-center justify-center h-screen bg-primary relative overflow-hidden">
        <div className="absolute w-[100vw] h-[100vw] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full border-2 border-[#ff9028] flex items-center justify-center">
          <div className="absolute w-[140vw] h-[140vw] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full border-2 border-[#ff9028] flex items-center justify-center">
            <div className="absolute w-[180vw] h-[180vw] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full border-2 border-[#ff9028] flex items-center justify-center">
              <div className="absolute w-[210vw] h-[210vw] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full border-2 border-[#ff9028]"></div>
            </div>
          </div>
        </div>

        <div className="absolute w-[0.8vw] h-[0.8vw] left-[28vw] top-[18vw] bg-transparent rounded-full border-2 border-[#ff9028]"></div>
        <div className="absolute w-[0.8vw] h-[0.8vw] left-[10vw] top-[12vw] bg-transparent rounded-full border-2 border-[#ff9028]"></div>
        <div className="absolute w-[0.8vw] h-[0.8vw] left-[31vw] top-[8vw] bg-transparent rounded-full border-2 border-[#ff9028]"></div>
        <div className="absolute w-[0.8vw] h-[0.8vw] left-[5vw] top-[60vw] bg-transparent rounded-full border-2 border-[#ff9028]"></div>
        <div className="absolute w-[0.8vw] h-[0.8vw] left-[22vw] top-[72vw] bg-transparent rounded-full border-2 border-[#ff9028]"></div>

        <div className="relative z-10">
          <Logo />
        </div>
      </section>
    </>
  );
}

export default SplashScreen;
