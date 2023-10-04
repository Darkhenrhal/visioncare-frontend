import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {  

  return (
    <div>
      <h2 id="home-heading" className="home-heading">Home</h2>
      <Link to="/place-order">
        <button id="place-order-button" className="place-order-button">Place Order</button>
      </Link>
    </div>
  );
}

export default Home;