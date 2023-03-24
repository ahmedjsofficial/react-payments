import React from 'react';
import Product from './Product.jsx';

import nft1 from './assets/nft.jpg';
import nft2 from './assets/nft-hand.jpg';

const productApi = [
  {
    id: '0x01',
    title: 'Ancient NFT',
    price: '15',
    image: nft1
  },
  {
    id: '0x02',
    title: 'Ancient Hand NFT',
    price: '15',
    image: nft2
  }
];

const App = () => {
  return (
    <>
      <div className='product-grid'>
        {productApi?.map((val, i) => (
          <Product data={val} key={i} />
        ))}
      </div>
    </>
  )
};

export default App