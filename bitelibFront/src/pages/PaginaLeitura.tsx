import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../api/api';

interface Livro {
  livroId: number;
  titulo: string;
  autor: string;
  pdf_Url: string;
  totalPaginas: number;
}

const PaginaLeitura: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [livro, setLivro] = useState<Livro | null>(null);

  useEffect(() => {
    axios.get(`${API_URL}/livros/${id}`)
      .then(response => {
        setLivro(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar o livro:', error);
      });
  }, [id]);

  if (!livro) {
    return <div style={{ color: '#fff', padding: '2rem' }}>Carregando...</div>;
  }

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Leitura: {livro.titulo}</h1>
      </header>
      <div style={{ marginTop: '1rem' }}>
        <embed src={livro.pdf_Url} type="application/pdf" width="100%" height="600px" />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <a href={livro.pdf_Url} download style={{ marginLeft: '1rem', color: '#feca1b' }}>Baixar PDF</a>
      </div>
    </div>
  );
};

export default PaginaLeitura;
