import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [authentication, setAuthentication] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async () => {
    const data = {
      authentication,
      password,
    };
    try {
      const res = (await axios.post("api/users/login", data)).data;
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

export default Login;
