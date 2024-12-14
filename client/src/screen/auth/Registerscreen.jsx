import React, { useState, useEffect } from "react";
import LogoHitamPng from "../../component/Logo/LogoHitamPng.png";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nomorHP, setNomorHP] = useState("");
  const [accept, setAccept] = useState(false);
  const [error, setError] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const { parsePhoneNumberFromString } = require("libphonenumber-js");

  function formatPhoneNumber(phoneNumber) {
    try {
      const parsed = parsePhoneNumberFromString(phoneNumber, "ID");
      if (parsed && parsed.isValid()) {
        setNomorHP(parsed.format("E.164"));
      }
      throw new Error("Invalid phone number");
    } catch (error) {
      console.error("Phone number formatting error:", error.message);
      return null;
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsKeyboardVisible(
        window.innerHeight < document.documentElement.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!nama || !email || !password || !nomorHP) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!accept) {
      setError("Please accept the terms and conditions.");
      return;
    }

    try {
      const res = await axios.post("api/users/register", {
        nama,
        email,
        password,
        nomorHP,
      });
      console.log("Registration Response:", res.data);
      alert(res.data.message);

      const sendOtp = await axios.post("api/users/send-code", {
        phone_number: nomorHP,
      });
      console.log("OTP Sent:", sendOtp.data);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
    } catch (error) {
      console.error("Registration Error:", error);
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <section
      className={`w-full h-auto flex flex-col items-center justify-center ${
        isKeyboardVisible ? "pb-32" : ""
      }`}>
      <div className="w-[90vw] flex flex-col items-start justify-start h-full">
        <img src={LogoHitamPng} alt="Logo" className="w-16 h-auto mt-10" />
        <h1 className="w-full text-end font-nunito text-2xl font-extrabold text-primary mt-8">
          Selamat Datang
        </h1>
        <p className="text-sm font-medium text-grey3 font-nunito text-end w-full">
          Nikmati kemudahan, transparansi, dan pelayanan terbaik untuk kemajuan
          desa kita bersama.
        </p>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form
          onSubmit={handleRegister}
          className="w-[90vw] flex flex-col space-y-4 mt-4">
          <InputField
            id="nama"
            label="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <InputField
            id="email"
            type="email"
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            id="nomorHP"
            label="Nomor Telepon (Whatsapp)"
            value={nomorHP}
            onChange={(e) => formatPhoneNumber(e.target.value)}
          />
          <InputField
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            id="confirmPass"
            type="password"
            label="Konfirmasi Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="flex w-full items-start justify-center space-x-2">
            <input
              type="checkbox"
              id="checkbox"
              className="
    w-4 h-4 appearance-none border border-gray-300 flex justify-center items-center
    checked:bg-primary checked:border-primary
    checked:before:content-['✓'] checked:before:text-white 
    checked:before:block checked:before:text-center checked:before:font-medium checked:before:text-xs
    focus:outline-none
  "
              onChange={(e) => setAccept(e.target.checked)}
            />
            <p className="text-xs text-disableText font-nunito w-[90%] font-medium tracking-tight">
              Saya setuju dan telah membaca{" "}
              <span className="text-primary">Syarat</span> dan{" "}
              <span className="text-primary">Ketentuan</span> dari pihak Desa
              Digital.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-primary rounded-full py-2 font-nunito text-center text-sm font-medium text-white">
            Buat Akun
          </button>
        </form>
        <h1 className="text-disableText font-nunito text-xs w-full text-center mt-4">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-primary">
            Masuk
          </Link>{" "}
        </h1>
      </div>
      <div>
        <div className="fixed border-2 border-white opacity-50  border-b-secondPrime w-[160vw] h-[160vw] rounded-full left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] -z-10">
          <div className="w-6 h-6 border-secondPrime border-2 absolute left-[30%] top-[96%] bg-white translate-x-[-50%] translate-y-[-50%] rounded-full"></div>
        </div>
        <div className="fixed border-2 border-white opacity-50 border-b-secondPrime w-[190vw] h-[190vw] rounded-full left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] -z-10">
          <div className="w-6 h-6 border-secondPrime border-2 absolute left-[60%] top-[99%] bg-white translate-x-[-50%] translate-y-[-50%] rounded-full"></div>
        </div>
      </div>
    </section>
  );
}

const InputField = ({ id, type = "text", label, value, onChange }) => (
  <div className="relative">
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="block rounded-t-lg pb-1 pt-5 w-full text-sm text-textColor bg-transparent border-0 border-b-2 border-disableLine appearance-none focus:outline-none focus:ring-0 focus:border-grey3 peer"
      placeholder=" "
    />
    <label
      htmlFor={id}
      className="
        absolute text-base text-disableText font-medium font-nunito 
        transition-all duration-200 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-disableText
      ">
      {label}
    </label>
  </div>
);

export default Register;
