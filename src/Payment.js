import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";

// Firestore
import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

// Imported Files
import "./css/Payment.css";
import axios from "./axios";
import CheckoutProduct from "./CheckoutProduct";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeed, setSucceed] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      // Generating Stripe secret in order to charge customer.
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  const handleSubmit = async e => {
    e.preventDefault();
    // state.processing
    setProcessing(true);
    // Disable submit if Stripe has not loaded
    if (!stripe || !elements) {
      return;
    }

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      })
      .then(async ({ paymentIntent }) => {
        await setDoc(doc(db, "users", user?.uid, "orders", paymentIntent.id), {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        });

        // paymentIntent = payment confirmation
        // setState successful payment, no errors, processing complete, push to orders page
        setSucceed(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET"
        });

        navigate("/orders", { replace: true });
      });
  };

  const handleChange = e => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket?.map(item => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={value => <h3>Order Total: {value} </h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandsSeperator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeed}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"} </span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
