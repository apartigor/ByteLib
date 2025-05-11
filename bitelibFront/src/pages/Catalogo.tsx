import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../api/api';

interface Livro {
  livroId: number;
  titulo: string;
  autor: string;
  pdf_Url: string;
  totalPaginas: number;
}

const Catalogo: React.FC = () => {
  const [books, setBooks] = useState<Livro[]>([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/livros`)
      .then((response: { data: React.SetStateAction<Livro[]>; }) => {
        setBooks(response.data);
      })
      .catch((error: any) => {
        console.error('Erro ao buscar livros:', error);
      });
  }, []);

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src="/logo.png" alt="ByteLib" style={{ height: '150px' }} />
        <button onClick={() => localStorage.removeItem('bytelib_user')} style={{ background: 'transparent', border: 'none', color: '#feca1b' }}>
          Sair
        </button>
      </header>
      <h2 style={{ margin: '1rem 0' }}>Catálogo de Livros</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
        {books.map(book => (
          <Link key={book.livroId} to={`/book/${book.livroId}`} style={{ textDecoration: 'none', color: '#fff' }}>
            <div>
              {/* Pode adicionar imagem se for um campo no backend futuramente */}
              <div style={{ height: '200px', backgroundColor: '#2a2a2a', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>📘</span>
              </div>
              <p style={{ marginTop: '0.5rem', textAlign: 'center' }}>{book.titulo}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
