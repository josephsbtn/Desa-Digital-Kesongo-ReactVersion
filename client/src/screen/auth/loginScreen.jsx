import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoHitamPng from "../../component/Logo/LogoHitamPng.png";

function Login() {
  const [authentication, setAuthentication] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

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

  const submitLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (!authentication || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = (await axios.post("api/users/login", { authentication, password })).data;
      console.log("Login Response:", res);
      alert(res.message);
      localStorage.setItem("currentUser", JSON.stringify(res));
    } catch (error) {
      console.error("Login Error:", error);
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
          Nikmati kemudahan transparansi, dan pelayanan terbaik untuk kemajuan desa kita bersama.
        </p>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form
          onSubmit={submitLogin}
          className="w-[90vw] flex flex-col space-y-4 mt-4">
          <InputField
            id="authentication"
            label="Email / No. Whatsapp"
            value={authentication}
            onChange={(e) => setAuthentication(e.target.value)}
          />
          <InputField
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <a href="/OTPscreen" className="text-primary text-sm font-nunito text-right">Lupa kata sandi?</a>

          <button
            type="submit"
            className="w-full bg-primary rounded-full py-2 font-nunito text-center text-sm font-medium text-white">
            Masuk
          </button>
        </form>
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

export default Login;