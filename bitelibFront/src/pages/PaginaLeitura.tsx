import React from 'react';
import { useParams } from 'react-router-dom';

const PaginaLeitura: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Leitura do Livro {id}</h1>
      </header>
      <div style={{ marginTop: '1rem' }}>
        <embed src={`/pdfs/${id}.pdf`} type="application/pdf" width="100%" height="600px" />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <a href={`/pdfs/${id}.pdf`} download style={{ marginLeft: '1rem', color: '#feca1b' }}>Baixar PDF</a>
      </div>
    </div>
  );
};

export default PaginaLeitura;