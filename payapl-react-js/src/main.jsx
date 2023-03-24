import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <PayPalScriptProvider options={{'client-id': 'AbpvQYlZ1bu397dPCX9e6TPaZoBG4JYwwpM__uxoBnu4HMVsFGPdB9H_Cuq3AoB-NdwuxYkfJ9kyU9F2',}}>
    <Toaster position='top-center' reverseOrder={false} />
    <App />
  </PayPalScriptProvider>,
);