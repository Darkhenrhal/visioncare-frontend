import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';
import PlaceOrder from './components/PlaceOrder';
import AddCustomer from './components/AddCustomer';
import './App.css';

function App() {
  const isLoggedIn = (localStorage.getItem('isLoggedIn')) ? true: false;
  return (
    <div className="App">
      <h1>Hello</h1>
      <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/add-customer" element={<AddCustomer />} />
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;