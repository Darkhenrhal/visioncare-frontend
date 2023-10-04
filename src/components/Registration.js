import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Registration.css';

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
        alert('User registered successfully');
        window.location.href = '/login';
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  return (
    <div>
      <h2 className="registration-header">Registration</h2>
      <form>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="usernameInput"
          className="registration-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="passwordInput"
          className="registration-input"
        />
        <button
          type="button"
          onClick={handleRegister}
          id="registerButton"
          className="registration-button"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Registration;