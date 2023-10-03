// Registration.js
import React, { useState } from 'react';
import axios from 'axios';

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
        const response = await axios.post('http://localhost:4000/api/users/create', {
          username,
          password,
        });
  
        if (response.status === 200) {
          console.log('User registered successfully');
          // You can redirect the user to the login page or display a success message.
          alert('User registered successfully')
        } else {
          console.error('Registration failed');
          // Handle registration failure, display an error message, etc.
        }
      } catch (error) {
        console.error('Registration error:', error.message);
        // Handle network or other errors
      }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Registration;
