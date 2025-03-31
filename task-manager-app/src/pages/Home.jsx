import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-box">
        <img src={logo} alt="App Logo" className="page-logo" />
        <h1>Task Manager App</h1>
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
