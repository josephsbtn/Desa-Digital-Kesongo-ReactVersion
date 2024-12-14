import React, { useState, useRef } from "react";
import ArrowLeft from "../../component/button/arrowLeft";

function OTPscreen() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputRefs = useRef([]);
  const phone_number = user ? user.nomorHP : "";

  let storedOTP = "";

  const verifyOTP = (userInputOTP) => {
    if (storedOTP === userInputOTP) {
      console.log("OTP Verified Successfully");
      return true;
    } else {
      console.log("Incorrect OTP");
      return false;
    }
  };

  const handleKeyDown = (e) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const index = inputRefs.current.indexOf(e.target);
      if (index > 0) {
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index - 1),
          "",
          ...prevOtp.slice(index),
        ]);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleInput = (e) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
    if (target.value) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    setOtp(digits);
  };

  return (
    <section className="bg-white py-10 dark:bg-dark flex flex-col items-center space-y-8">
      <header className="flex bg-white w-full h-fit p-2 justify-center items-center">
        <button class="bg-transparent border-none absolute left-5">
          <ArrowLeft />
        </button>
        <h6 class="text-center font-nunito font-semibold text-lg text-textColor w-full justify-center">
          Verifikasi
        </h6>
      </header>
      <p className="text-sm font-medium font-nunito text-textColor w-[70%] text-center">
        Kode verifikasi telah kami kirim ke nomor Whatsapp{" "}
        <span className="text-primary">+62056789965{phone_number}</span>
      </p>
      <div className="container flex flex-col items-center">
        <form id="otp-form" className="flex flex-col gap-3 ">
          <div className="flex gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onPaste={handlePaste}
                ref={(el) => (inputRefs.current[index] = el)}
                className="shadow-xs flex w-16 h-16 items-center justify-center rounded-lg border border-stroke bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl dark:border-dark-3 dark:bg-white/5"
              />
            ))}
          </div>

          <div className="my-8">
            <p className="text-center text-disableText text-xs font-medium font-nunito">
              Saya tidak menerima kode
            </p>
            <button className="text-sm  w-full text-center font-semibold font-nunito text-primary">
              Kirim Ulang
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-primary font-semibold p-2 text-white rounded-full">
            Lanjutkan
          </button>
        </form>
      </div>
    </section>
  );
}

export default OTPscreen;
