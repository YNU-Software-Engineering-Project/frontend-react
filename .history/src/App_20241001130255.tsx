import { Route, Routes } from 'react-router-dom';
import Homepage from 'pages/Homepage';
import TermsOfService from 'pages/TermsofService';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/termsOfService" element={<TermsOfService />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;