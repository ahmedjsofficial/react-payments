import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <div className='container'>
        <div className='product-card'>
          <div className='card-img'>
            <img src={`https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209?wid=340&hei=264&fmt=p-jpg&qlt=95&.v=1663611329492`} alt="product/img" />
          </div>
          <div className='product-title'>
            <h1>iPhone 14 Pro & Max</h1>
            <h1>$1</h1>
          </div>
        </div>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  amount: {
                    value: '1.0',
                  },
                  payee: {
                    email_address: 'sb-f4qbu23427856@business.example.com',
                  },
                },
              ],
            })
          }}
          onApprove={async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order)
            const name = order.payer.name.given_name;
            toast.success(`Transcation Complete by: ${name}`);
          }}
          onError={(err) => {
            console.log(err);
          }}
        />
      </div>
    </>
  )
}

export default App;