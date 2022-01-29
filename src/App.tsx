import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './config/ReactotronConfig';
import AppProvider from './providers/AppProvider';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

import GlobalStyle from './styles/global';

function App() {
  console.info(`==> 🌎  Você está no modo ${process.env.NODE_ENV}`);
  console.info(`==> 🌎  Você está no ambiente ${process.env.REACT_APP_ENVIRONMENT}`);

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <GlobalStyle />
    </AppProvider>
  );
}

export default App;
