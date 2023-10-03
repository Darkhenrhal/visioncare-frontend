// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {  

  return (
    <div>
      <h2>Home</h2>
      {/* <button>Place Order</button>
      <button>Stock Check</button>
      <button>Customer Report</button> */}
      <Link to="/place-order">
        <button>Place Order</button>
      </Link>
      {/* <Link to="/stock-check">
        <button>Stock Check</button>
      </Link>
      <Link to="/customer-report">
        <button>Customer Report</button>
      </Link> */}
    </div>
  );
}

export default Home;
