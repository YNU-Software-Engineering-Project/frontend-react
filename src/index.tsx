import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <Suspense fallback={<div>로딩 중...</div>}>
      <App />
    </Suspense>
  </BrowserRouter>
);
