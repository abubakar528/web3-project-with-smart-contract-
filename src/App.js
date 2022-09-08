import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Mint from './Components/Mint';
import Burn from './Components/Burn';
import Transfer from './Components/Transfer';
import WidthDraw from './Components/WidthDraw';
import Sell from './Components/SellToken';
import Buy from './Components/BuyToken';
import Home from './Components/Home';


function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
      <Route path="/"  element={<Home/>} />
      <Route path="/mint" exact element={<Mint />} />
      <Route path="/burn" exact element={<Burn />} />
      <Route path="/transfer"  exact element={<Transfer />} />
      <Route path="/buytoken" exact element={<Buy />} />
      <Route path="/selltoken"  exact element={<Sell />} />
      <Route path="/withdraw" exact element={<WidthDraw />} />
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
