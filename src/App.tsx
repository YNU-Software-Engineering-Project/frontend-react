import { Route, Routes } from 'react-router-dom';
import DefaultPage from 'pages/DefaultPage';
import TermsOfService from 'pages/TermsofService';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultPage />} />
      <Route path="/termsOfService" element={<TermsOfService />} />
    </Routes>
  );
}

export default App;