import React, { JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadatro';
import Catalogo from './pages/Catalogo';
import PaginaLeitura from './pages/PaginaLeitura';
import { AuthProvider, useAuth } from './auth/AuthContext';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Catalogo />
            </PrivateRoute>
          }
        />
        <Route
          path="/book/:id"
          element={
            <PrivateRoute>
              <PaginaLeitura />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;