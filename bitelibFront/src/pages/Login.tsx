import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

//TODO: AJUSTAR LOGICA DE LOGIN E CADASTRO COM O BACKEND

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <h1>Entrar</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#1e1e1e', color: '#fff' }}
        />
        <button type="submit" style={{ padding: '0.75rem', border: 'none', borderRadius: '4px', background: '#feca1b', color: '#121212', fontWeight: 'bold' }}>
          Entrar
        </button>
        <p>
          Não tem conta? <Link to="/register" style={{ color: '#feca1b' }}>Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;