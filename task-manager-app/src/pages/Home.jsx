import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Home = () => {
  return (
    <div className="home">
      <img src={logo} alt="App Logo" className="page-logo" />
      <h1>Welcome to Task Manager App</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Home;
