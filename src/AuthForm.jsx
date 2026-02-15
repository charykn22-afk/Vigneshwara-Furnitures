import React, { useState } from 'react';
import { logIn, signUp } from './authService';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (type) => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    try {
      if (type === 'login') {
        await logIn(email, password);
        alert('Logged in successfully!');
      } else {
        await signUp(email, password);
        alert('Check your email for the confirmation link!');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Vigneshwara Login</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        style={{ display: 'block', width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => handleAuth('login')} 
          disabled={loading}
          style={{ flex: 1, padding: '10px', backgroundColor: '#3ecf8e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {loading ? '...' : 'Login'}
        </button>
        <button 
          onClick={() => handleAuth('signup')} 
          disabled={loading}
          style={{ flex: 1, padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default AuthForm;