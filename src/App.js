import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useStateValue } from "./StateProvider";

import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Checkout from "./Checkout";
import Payment from "./Payment";

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    onAuthStateChanged(auth, authUser => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/payment" element={<Payment />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
