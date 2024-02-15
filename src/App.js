import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Traveller from "./components/Traveller";
import Farmer from "./components/Farmer";
import Header from "./components/Header";
import { useLocation } from "react-router-dom";
import CurrentWeather from "./components/CurrentWeather";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        {/* <MultiCarousel></MultiCarousel> */}
        <Routes>
          <Route path="/" element={<CurrentWeather />}></Route>
          <Route path="/traveller" element={<Traveller />}></Route>
          <Route path="/farmer" element={<Farmer />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
