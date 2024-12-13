import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nomorHP, setNomorHP] = useState("");

  const handleRegister = async () => {
    const data = {
      nama,
      email,
      password,
      nomorHP,
    };
    try {
      const res = (await axios.post("api/users/register", data)).data;
      console.log(res);
      alert(res.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <section></section>
    </>
  );
}

export default Register;
