import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddCustomer.css';

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

        window.location.href = '/place-order';
      } else {
        console.error('Error adding customer:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id="add-customer-form">
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerID">Customer ID:</label>
          <input
            type="text"
            id="customerID"
            name="customerID"
            value={formData.customerID}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pNumber">Phone Number:</label>
          <input
            type="text"
            id="pNumber"
            name="pNumber"
            value={formData.pNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            type="text"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nic">NIC:</label>
          <input
            type="text"
            id="nic"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="orders">Orders:</label>
          <input
            type="text"
            id="orders"
            name="orders"
            value={formData.orders}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="channelling">Channelling:</label>
          <input
            type="text"
            id="channelling"
            name="channelling"
            value={formData.channelling}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="surgery">Surgery:</label>
          <input
            type="text"
            id="surgery"
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