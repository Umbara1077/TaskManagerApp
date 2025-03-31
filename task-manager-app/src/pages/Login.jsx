import { useState } from 'react';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  // Handle email/password login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };
  
  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };
  
  return (
    <div className="login">
      <img src={logo} alt="App Logo" className="page-logo" />
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      
      <div className="or-divider">
        <span>OR</span>
      </div>
      
      <button 
        onClick={handleGoogleLogin} 
        className="google-login-button"
      >
        <img 
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" 
          alt="Google" 
          className="google-icon" 
        />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default Login;