import './App.css';
import Login from "./components/Login";
import Profile from "./components/Profile";
import { useEffect } from 'react';
import AuthGuard from './guards/AuthGuard';
import MyCart from './components/MyCart';
import Checkout from "./components/Checkout";
import MyOrders from './components/MyOrders';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AdminPanel from './components/AdminPanel';

function App() {

  useEffect(() => {
    document.title = "Ecommerce App";
  }, []);

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
          <Route path="myCart" element = {<AuthGuard><MyCart/></AuthGuard>} />
          <Route path="/checkoutPage" element={<AuthGuard><Checkout/></AuthGuard>}></Route>
          <Route path="/admin" element={<AuthGuard><AdminPanel/></AuthGuard>}></Route>
          <Route path="/myOrders" element={<AuthGuard><MyOrders/></AuthGuard>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
