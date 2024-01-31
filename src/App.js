import './App.css';
import Login from "./components/Login";
import Profile from "./components/Profile";
import { useEffect } from 'react';
import AuthGuard from './guards/AuthGuard';
import MyCart from './components/MyCart';


import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

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
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
