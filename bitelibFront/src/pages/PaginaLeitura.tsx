import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const PaginaLeitura: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [livro, setLivro] = useState<Livro | null>(null);
  const [zoom, setZoom] = useState(100);
  const [darkMode, setDarkMode] = useState(true);
  const [carregandoArquivo, setCarregandoArquivo] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/livros/${id}`)
      .then(response => {
        setLivro(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar o livro:', error);
      });
  }, [id]);

  const toggleTema = () => setDarkMode(prev => !prev);
  const aumentarZoom = () => setZoom(prev => Math.min(prev + 10, 200));
  const diminuirZoom = () => setZoom(prev => Math.max(prev - 10, 50));
  const onArquivoLoad = () => setCarregandoArquivo(false);

  if (!livro) {
    return (
      <div className="text-center p-8 text-white dark:text-gray-900">
        Carregando...
      </div>
    );
  }

  const isPDF = livro.pdF_Url.toLowerCase().endsWith('.pdf');
  const temaClasses = darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-gray-900';

  return (
    <div className={`${temaClasses} min-h-screen transition-all duration-300 p-6 relative`}>
      {/* Botões */}
      <div className="fixed right-4 top-1/4 flex flex-col gap-4 z-50">
        <button onClick={aumentarZoom} className="bg-yellow-400 text-black p-3 rounded-full shadow-md hover:bg-yellow-500 transition-all">
          🔍+
        </button>
        <button onClick={diminuirZoom} className="bg-yellow-400 text-black p-3 rounded-full shadow-md hover:bg-yellow-500 transition-all">
          🔍−
        </button>
        <button onClick={toggleTema} className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-500 transition-all">
          {darkMode ? '🌞' : '🌙'}
        </button>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-500"
        >
          ← Voltar
        </button>
      </div>

      <header className="mb-6">
        <h1 className="text-3xl font-bold">{livro.titulo}</h1>
        <p className="text-yellow-500 font-medium">por {livro.autor}</p>
        <p className="mt-2 italic">{livro.descricao}</p>
        <p className="mt-1 text-sm">Total de páginas: {livro.totalPaginas}</p>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4 w-full">
          <img src={livro.capa_URL} alt="Capa" className="rounded shadow-lg" />
        </div>

        {/* livro */}
        <div className="flex-1 relative">
          {carregandoArquivo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-yellow-300 font-semibold z-10">
              Carregando livro...
            </div>
          )}
          {isPDF ? (
            <embed
              src={livro.pdF_Url}
              type="application/pdf"
              width="100%"
              height="600px"
              onLoad={onArquivoLoad}
              style={{ zoom: `${zoom}%` }}
              className={`rounded shadow-xl ${carregandoArquivo ? 'hidden' : 'block'}`}
            />
          ) : (
            <img
              src={livro.pdF_Url}
              onLoad={onArquivoLoad}
              alt="Livro"
              style={{ width: `${zoom}%`, height: 'auto' }}
              className={`rounded shadow-xl ${carregandoArquivo ? 'hidden' : 'block'}`}
            />
          )}

          <a
            href={livro.pdF_Url}
            download
            className="inline-block mt-6 bg-yellow-400 text-black font-semibold px-6 py-3 rounded shadow-md hover:bg-yellow-500 transition-all"
          >
            ⬇️ Baixar livro
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaginaLeitura;
