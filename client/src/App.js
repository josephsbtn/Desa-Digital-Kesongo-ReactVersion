import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./screen/SplashScreen";

function App() {
  return (
    <div className="w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={SplashScreen} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
