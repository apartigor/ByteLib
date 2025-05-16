import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { API_URL } from '../api/api';

const Login: React.FC = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nomeUsuario, senhaHash: senha }),
      });

      const result = await response.text();

      if (response.ok) {
        login(nomeUsuario);
        navigate('/');
      } else {
        setErro(result);
      }
    } catch (error) {
      setErro('Erro ao tentar conectar-se. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="bg-zinc-900 text-white min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-8 rounded-xl shadow-lg w-full max-w-sm flex flex-col gap-4"
      >
        <img
          src="/logo.png"
          alt="ByteLib"
          className="w-20 mx-auto mb-4"
        />
        <h1 className="text-center text-2xl font-bold text-yellow-400">Acesso à Biblioteca</h1>

        {erro && (
          <div className="bg-red-500 text-white p-2 rounded text-center text-sm">
            {erro}
          </div>
        )}

        <input
          type="text"
          placeholder="Nome de usuário"
          value={nomeUsuario}
          onChange={(e) => setNomeUsuario(e.target.value)}
          required
          className="p-3 rounded bg-zinc-700 border border-zinc-600 placeholder-zinc-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="p-3 rounded bg-zinc-700 border border-zinc-600 placeholder-zinc-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <button
          type="submit"
          disabled={carregando}
          className={`p-3 rounded font-bold text-zinc-900 bg-yellow-400 hover:bg-yellow-300 transition ${
            carregando ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="text-center text-sm">
          Não tem conta?{' '}
          <Link to="/cadastro" className="text-yellow-400 hover:underline">
            Cadastre-se
          </Link>
        </p>

        <p className="text-center text-xs text-zinc-400">
          Ou entre como{' '}
          <span
            className="text-yellow-400 hover:underline cursor-pointer"
            onClick={() => {
              login('convidado');
              navigate('/');
            }}
          >
            convidado
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
