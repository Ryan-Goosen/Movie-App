import React, { useState } from 'react';
import '../css/Login.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setError('Please fill in both fields.');
      return;
    }

    if (username === 'user' && password === 'password') {
      setError('');
      alert('Login Successful!');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <div className="form-group">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="form-group">
        <div className="password-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          type="button" 
          className="eye-button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'HIDE' : 'SHOW'}
        </button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;