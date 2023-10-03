// import logo from './logo.svg';
// import RoutesConfig from './Routes'; // Import your routes component
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
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <RoutesConfig /> */}
      <h1>Hello</h1>
      <Router>
      <Routes>
        {/* <Route path="/register" component={Registration} />
        <Route path="/login" component={Login} /> */}
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        {/* <Route path="/home" render={() => (isLoggedIn ? <Home /> : <Login />)} /> */}
        {/* <Redirect from="/" to="/home" /> */}
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
