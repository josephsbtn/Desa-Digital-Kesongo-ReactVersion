import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./screen/SplashScreen";
import OTPscreen from "./screen/auth/OTPscreen";

function App() {
  return (
    <div className="w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={OTPscreen} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
