import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch
} from "react-router-dom";

// Firebase Imports
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
// Redux Imports
import { useStateValue } from "./StateProvider";
// Stripe Payment Imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Checkout from "./Checkout";
import Payment from "./Payment";
import Orders from "./Orders";

// Stripe Public Key
const stripePromise = loadStripe(
  "pk_test_51KrDcdBq2cj2s22lEnxRJ08Uae8pfGSEdLuNx9i38sZhDDDAn9KAzQ3Fu6JnU9AcEGnJBfcUJ5qMlBaWvhrGTcZo00FSLyUPb0"
);

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
                  <Route path="/orders" element={<Orders />} />
                  <Route
                    path="/payment"
                    element={
                      <Elements stripe={stripePromise}>
                        <Payment />
                      </Elements>
                    }
                  />
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
