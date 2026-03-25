import React from 'react';
import { PdfBuilderProvider } from './context/PdfBuilderContext';
import { BuilderPage } from './pages/BuilderPage';

function App() {
  return (
    <PdfBuilderProvider>
      <BuilderPage />
    </PdfBuilderProvider>
  );
}

export default App;
