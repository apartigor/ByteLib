import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { API_URL } from '../api/api';

const Cadastro: React.FC = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  const response = await fetch(`${API_URL}/cadastro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nomeUsuario, email, senhaHash: senha })
  });

    const result = await response.text();

    if (response.ok) {
      login(nomeUsuario);
      navigate('/');
    } else {
      alert(result); 
    }
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <h1>Cadastro</h1>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={nomeUsuario}
          onChange={e => setNomeUsuario(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#1e1e1e', color: '#fff' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#1e1e1e', color: '#fff' }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#1e1e1e', color: '#fff' }}
        />
        <button type="submit" style={{ padding: '0.75rem', border: 'none', borderRadius: '4px', background: '#feca1b', color: '#121212', fontWeight: 'bold' }}>
          Cadastrar
        </button>
        <p>
          Já tem conta? <Link to="/login" style={{ color: '#feca1b' }}>Entrar</Link>
        </p>
      </form>
    </div>
  );
};

export default Cadastro;
