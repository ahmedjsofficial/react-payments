import React from "react";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const onStripeShot = async () => {
  return await loadStripe('pk_test_51KwwPXCfQa2WnrXMa5MGQMJlC8m0kOGSVUt4fOZF8C1dvBiVt109CO3tD0cJ49ESAZCwjeTOzXPwR55XydlemTHI00RSvQ34UB'); // Public-Key
};



const Product = ({ data }) => {
  const { image, title, price } = data;

  const handleCheckOut = async () => {
    const stripe = onStripeShot();
    const checkoutSession = await axios.post('http://localhost:5000/api/checkout_sessions', data);

    const redirect = await stripe.then((res) => {
      res.redirectToCheckout({sessionId: checkoutSession.data.id});
    });

    if(redirect.error) return console.log(redirect.error.message);
    console.log('Redirecting...');
  }
  return (
    <>
      <div className="product">
        <div className="product-img">
          <img src={image} alt="img/nft" />
        </div>
        <div className="product-body">
          <h1>{title}</h1>
          <h1>${price}</h1>
        </div>
        <button type="button" onClick={handleCheckOut} className="button">
          Shop Now
        </button>
      </div>
    </>
  );
};

export default Product;
