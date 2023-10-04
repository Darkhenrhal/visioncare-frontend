import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PlaceOrder() {  

  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
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
  };

  const handleSearch = async () => {
    // Filter data based on searchText and update the state
    const filteredData = customerData.filter((customer) =>
      customer.customerID.includes(searchText)
    );
    if (searchText == ""){
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
    } else{
    setCustomerData(filteredData);
    }
  };

  // // Function to delete a customer by their ID
  // const handleDeleteCustomer = async (customerID) => {
  //   try {
  //     const response = await fetch(`http://localhost:4000/api/customers/${customerID}`, {
  //       method: 'DELETE',
  //     });
  //     console.log(customerID);

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     // Remove the deleted customer from the state
  //     setCustomerData((prevData) => prevData.filter((customer) => customer.customerID !== customerID));
  //   } catch (error) {
  //     console.error('Error deleting customer:', error);
  //   }
  // };

  // Function to navigate to the edit-customer page with the selected customer's ID
  // const handleEditCustomer = (customerID) => {
  //   // history.push(`/edit-customer/${customerID}`);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer({ ...selectedCustomer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your API endpoint
      const response = await axios.post('http://localhost:4000/api/customers/create', selectedCustomer);

      // Check if the request was successful
      if (response.status === 200) {
        console.log('Order added successfully:', response.data);
        // Reset the form after successful submission
        setSelectedCustomer({
          customerID: '',
          customerName: '',
          address: '',
          pNumber: '',
          birthDate: '',
          gender: '',
          nic: '',
          orders: '',
          channelling: '',
          surgery: '',
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
              {/* <th>Action</th> */}
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
                {/* <td>
                  
                  <button onClick={() => handleDeleteCustomer(customer._id)}>Delete</button>
                 
                  <button onClick={() => handleEditCustomer(customer.customerID)}>Edit</button>
                </td> */}
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
            {/* <h2>Selected Customer</h2>
            <p>Customer ID: {selectedCustomer.customerID}</p>
            <p>Customer Name: {selectedCustomer.customerName}</p>
            <p>Address: {selectedCustomer.address}</p>
            <p>Phone Number: {selectedCustomer.pNumber}</p>
            <p>Birth Date: {selectedCustomer.birthDate}</p>
            <p>Gender: {selectedCustomer.gender}</p>
            <p>NIC: {selectedCustomer.nic}</p>
            <p>Orders: {selectedCustomer.orders}</p>
            <p>Channelling: {selectedCustomer.channelling}</p>
            <p>Surgery: {selectedCustomer.surgery}</p> */}

            <h2>Place Order</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Customer ID:</label>
                  <input
                    type="text"
                    name="customerID"
                    value={selectedCustomer.customerID}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Customer Name:</label>
                  <input
                    type="text"
                    name="customerName"
                    value={selectedCustomer.customerName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={selectedCustomer.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Phone Number:</label>
                  <input
                    type="text"
                    name="pNumber"
                    value={selectedCustomer.pNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Birth Date:</label>
                  <input
                    type="text"
                    name="birthDate"
                    value={selectedCustomer.birthDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Gender:</label>
                  <input
                    type="text"
                    name="gender"
                    value={selectedCustomer.gender}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>NIC:</label>
                  <input
                    type="text"
                    name="nic"
                    value={selectedCustomer.nic}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Orders:</label>
                  <input
                    type="text"
                    name="orders"
                    value={selectedCustomer.orders}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Channelling:</label>
                  <input
                    type="text"
                    name="channelling"
                    value={selectedCustomer.channelling}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Surgery:</label>
                  <input
                    type="text"
                    name="surgery"
                    value={selectedCustomer.surgery}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit">Place Order</button>
              </form>
          </div>
          
        )}
      </div>
    </div>
    </div>
  );
}

export default PlaceOrder;
