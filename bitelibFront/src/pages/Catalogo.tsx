import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../api/api';

interface Livro {
  livroId: number;
  titulo: string;
  autor: string;
  descricao: string;
  capa_URL: string;
  pdF_Url: string;
  totalPaginas: number;
}

const Catalogo: React.FC = () => {
  const [books, setBooks] = useState<Livro[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/livros`)
      .then(response => setBooks(response.data))
      .catch(error => console.error('Erro ao buscar livros:', error));
  }, []);

  const filteredBooks = books.filter(book =>
    book.titulo.toLowerCase().includes(search.toLowerCase()) ||
    book.autor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-zinc-900 text-white min-h-screen p-6">
      <header className="flex items-center justify-between mb-8">
        <img src="/logo.png" alt="ByteLib" className="h-20" />
        <button
          onClick={() => localStorage.removeItem('bytelib_user')}
          className="text-yellow-400 hover:text-yellow-300 font-semibold transition"
        >
          Sair
        </button>
      </header>

      <h2 className="text-3xl font-bold mb-4">📚 Catálogo de Livros</h2>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar por título ou autor..."
          className="w-full md:w-1/2 p-3 rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 xl:grid-cols-6 gap-6">
        {filteredBooks.map(book => (
          <div
            key={book.livroId}
            className="bg-zinc-800 rounded-xl p-4 shadow-md hover:shadow-yellow-500/30 transition-all flex flex-col justify-between"
          >
            <img
              src={`http://localhost:5276/${book.capa_URL}`}
              alt={book.titulo}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{book.titulo}</h3>
            <p className="text-yellow-400 font-medium mb-1">Autor: {book.autor}</p>
            <p className="text-sm text-gray-300 mb-2 line-clamp-3">{book.descricao}</p>
            <p className="text-sm text-gray-400">Páginas: {book.totalPaginas}</p>

            <div className="mt-4 flex justify-between items-center">
              <Link
                to={`/livros/${book.livroId}`}
                className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-500 transition"
              >
                📖 Ler
              </Link>

              <a
                href={`http://localhost:5276/${book.pdF_Url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-yellow-300 hover:underline"
              >
                Baixar
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <p className="text-gray-400 mt-10 text-center">Nenhum livro encontrado com esse termo.</p>
      )}
    </div>
  );
};

export default Catalogo;
