import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./screen/SplashScreen";
import Register from "./screen/auth/Registerscreen";
import OTPscreen from "./screen/auth/OTPscreen";
import Login from "./screen/auth/loginScreen";
import Home from "./screen/Home";

function App() {
  return (
    <div className="w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={SplashScreen} />
          <Route path="/login" exact Component={Login} />
          <Route path="/OTPscreen" exact Component={OTPscreen} />
          <Route path="/register" exact Component={Register} />
          <Route path="/home" exact Component={Home} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
