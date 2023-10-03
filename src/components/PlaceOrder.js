// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PlaceOrder() {  

  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Fetch data from your API and set it in the state
    // Replace 'fetchDataFromAPI' with your actual API call
    // fetchDataFromAPI().then((data) => {
    //   setCustomerData(data);
    // });
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/customers');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCustomerData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleSearch = () => {
    // Filter data based on searchText and update the state
    const filteredData = customerData.filter((customer) =>
      customer.customerID.includes(searchText)
    );
    setCustomerData(filteredData);
  };

  return (
    <div>
      <h2>Place Order</h2>
      {/* <button>Place Order</button>
      <button>Stock Check</button>
      <button>Customer Report</button> */}
      <Link to="/add-customer">
        <button>Add Customer</button>
      </Link>

      <div>
      <div>
        <input
          type="text"
          placeholder="Search by Customer ID"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {customerData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Birth Date</th>
              <th>Gender</th>
              <th>NIC</th>
              <th>Orders</th>
              <th>Channelling</th>
              <th>Surgery</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((customer) => (
              <tr key={customer.customerID} onClick={() => handleRowClick(customer)}>
                <td>{customer.customerID}</td>
                <td>{customer.customerName}</td>
                <td>{customer.address}</td>
                <td>{customer.pNumber}</td>
                <td>{customer.birthDate}</td>
                <td>{customer.gender}</td>
                <td>{customer.nic}</td>
                <td>{customer.orders}</td>
                <td>{customer.channelling}</td>
                <td>{customer.surgery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
      <div>
        {/* Render your form here using the selectedCustomer state */}
        {selectedCustomer && (
          <div>
            <h2>Selected Customer</h2>
            <p>Customer ID: {selectedCustomer.customerID}</p>
            <p>Customer Name: {selectedCustomer.customerName}</p>
            <p>Address: {selectedCustomer.address}</p>
            <p>Phone Number: {selectedCustomer.pNumber}</p>
            <p>Birth Date: {selectedCustomer.birthDate}</p>
            <p>Gender: {selectedCustomer.gender}</p>
            <p>NIC: {selectedCustomer.nic}</p>
            <p>Orders: {selectedCustomer.orders}</p>
            <p>Channelling: {selectedCustomer.channelling}</p>
            <p>Surgery: {selectedCustomer.surgery}</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default PlaceOrder;
