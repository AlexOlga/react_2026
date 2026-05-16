import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './components/errorBoundary.tsx';
import { BrowserRouter } from 'react-router';
import { SearchProvider } from './context/SearchContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <SearchProvider>
          <App />
        </SearchProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
