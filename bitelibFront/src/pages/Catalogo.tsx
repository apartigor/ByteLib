import React from 'react';
import { Link } from 'react-router-dom';

//TODO: BACK DEVE ENVIAR ESSES DADOS E ARMAZENAR O LIVRO
const books = [
  { id: '1', title: 'Livro A', cover: '../../public/41--5-gbIhL._SY445_SX342_.jpg' },
  { id: '2', title: 'Livro B', cover: '../../public/61owA5ey3iL._SY445_SX342_.jpg' },
  { id: '3', title: 'Livro C', cover: '../../public/shopping.webp' },
];

const Catalogo: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src="../../public/logo.png" alt="ByteLib" style={{ height: '150px' }} />
        <button onClick={() => localStorage.removeItem('bytelib_user')} style={{ background: 'transparent', border: 'none', color: '#feca1b' }}>
          Sair
        </button>
      </header>
      <h2 style={{ margin: '1rem 0' }}>Catálogo de Livros</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
        {books.map(book => (
          <Link key={book.id} to={`/book/${book.id}`} style={{ textDecoration: 'none', color: '#fff' }}>
            <div>
              <img src={book.cover} alt={book.title} style={{ width: '100%', borderRadius: '4px' }} />
              <p style={{ marginTop: '0.5rem', textAlign: 'center' }}>{book.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;