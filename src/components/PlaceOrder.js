import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/PlaceOrder.css';

function PlaceOrder() {  

  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/customers');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCustomerData(data.customers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };  

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);

    if (selectedCustomer !== null) {
      const updatedOrderData = {
        customerID: selectedCustomer.customerID,
        customerName: selectedCustomer.customerName,
        address: selectedCustomer.address,
        pNumber: selectedCustomer.pNumber,
        orderID: '',
        orderDescription: '',
      };
      setOrderData(updatedOrderData);
    }
  };

  const handleSearch = async () => {
    // Filter data based on searchText and update the state
    const filteredData = customerData.filter((customer) =>
      customer.customerID.includes(searchText)
    );
    if (searchText == ""){
      fetchDataFromAPI();
    } else{
    setCustomerData(filteredData);
    }
  };

  // Function to delete a customer by their ID
  const handleDeleteCustomer = async (customerID) => {
    try {
      const response = await fetch(`http://localhost:4000/api/customers/${customerID}`, {
        method: 'DELETE',
      });
      console.log(customerID);
      fetchDataFromAPI();

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Remove the deleted customer from the state
      setCustomerData((prevData) => prevData.filter((customer) => customer.customerID !== customerID));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer({ ...selectedCustomer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your API endpoint
      const response = await axios.post('http://localhost:4000/api/orders/create', selectedCustomer);

      // Check if the request was successful
      if (response.status === 200) {
        console.log('Order added successfully:', response.data);
        // Reset the form after successful submission
        setSelectedCustomer({
          customerID: '',
          customerName: '',
          address: '',
          pNumber: '',
          orderID: '',
          orderDescription: '',
        });
      } else {
        console.error('Error adding order:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2 className="place-order-title">Place Order</h2>
      <Link to="/add-customer">
        <button className="add-customer-button">Add Customer</button>
      </Link>

      <div>
        <div>
          <input
            type="text"
            placeholder="Search by Customer ID"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
        {customerData.length > 0 ? (
          <table className="customer-table">
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customerData.map((customer) => (
                <tr
                  key={customer.customerID}
                  onClick={() => handleRowClick(customer)}
                  className="customer-row"
                >
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
                  <td>
                    <button
                      onClick={() => handleDeleteCustomer(customer._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
        <div>
          {selectedCustomer && (
            <div>
              <h2 className="place-order-title">Place Order</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="customerID">Customer ID:</label>
                  <input
                    type="text"
                    name="customerID"
                    value={selectedCustomer.address !== null ? selectedCustomer.address : ''}
                    onChange={handleChange}
                    required
                    className="order-input"
                  />
                </div>
                <div>
                  <label htmlFor="customerName">Customer Name:</label>
                  <input
                    type="text"
                    name="customerName"
                    value={selectedCustomer.customerName}
                    onChange={handleChange}
                    required
                    className="order-input"
                  />
                </div>
                <div>
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={selectedCustomer.address}
                    onChange={handleChange}
                    required
                    className="order-input"
                  />
                </div>
                <div>
                  <label htmlFor="pNumber">Phone Number:</label>
                  <input
                    type="text"
                    name="pNumber"
                    value={selectedCustomer.pNumber}
                    onChange={handleChange}
                    required
                    className="order-input"
                  />
                </div>
                <div>
                  <label htmlFor="orderID">Order ID:</label>
                  <input
                    type="text"
                    name="orderID"
                    onChange={handleChange}
                    required
                    className="order-input"
                  />
                </div>
                <div>
                  <label htmlFor="orderDescription">Order Description:</label>
                  <input
                    type="text"
                    name="orderDescription"
                    onChange={handleChange}
                    required
                    className="order-input"
                  />
                </div>
                <button type="submit" className="place-order-button">
                  Place Order
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
