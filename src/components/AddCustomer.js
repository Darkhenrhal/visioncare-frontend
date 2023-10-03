import React, { useState } from 'react';
import axios from 'axios';

const AddCustomer = () => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your API endpoint
      const response = await axios.post('http://localhost:4000/api/customers/create', formData);

      // Check if the request was successful
      if (response.status === 200) {
        console.log('Customer added successfully:', response.data);
        // Reset the form after successful submission
        setFormData({
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
        console.error('Error adding customer:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer ID:</label>
          <input
            type="text"
            name="customerID"
            value={formData.customerID}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="pNumber"
            value={formData.pNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Birth Date:</label>
          <input
            type="text"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>NIC:</label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Orders:</label>
          <input
            type="text"
            name="orders"
            value={formData.orders}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Channelling:</label>
          <input
            type="text"
            name="channelling"
            value={formData.channelling}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Surgery:</label>
          <input
            type="text"
            name="surgery"
            value={formData.surgery}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default AddCustomer;
