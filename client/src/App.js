import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./screen/SplashScreen";
import Register from "./screen/auth/Registerscreen";
import Login from "./screen/auth/loginScreen";
import OTPscreen from "./screen/auth/OTPscreen";

function App() {
  return (
    <div className="w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={SplashScreen} />
          <Route path="/login" exact Component={Login} />
          <Route path="/OTPscreen" exact Component={OTPscreen} />
          <Route path="/register" exact Component={Register} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
