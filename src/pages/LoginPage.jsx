import React, { useState } from 'react';
import '../css/Login.css';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {

    setError('');
    console.log("Supabase client test:", supabase);


    if (!username || !password) {
      setError('Please fill in both fields.');
      return;
    }

    console.log("FIELDS FILLED IN");

  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  });

  console.log("loginData:", loginData);
  console.log("loginError:", loginError);

  if (!loginError) {
    alert('Login Successful!');
    navigate('/');
    return;
  }

  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email: username,
    password: password,
  });


    if (signupError) {
      setError(signupError.message);
      return;
    }

    setError(
      'Account created. Please check your email to confirm your account.'
    );
    navigate('/');

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
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;