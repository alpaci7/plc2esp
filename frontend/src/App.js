import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css';
import Home from "./pages/Home";
import Grafcet from "./pages/Grafcet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/grafcet" element={<Grafcet/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
