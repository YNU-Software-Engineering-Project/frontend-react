import { Route, Routes } from 'react-router-dom';
import Homepage from 'pages/Homepage';
import TermsOfService from 'pages/TermsofService';
import toastUiTest from 'pages/toastUiTest';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/tos" element={<TermsOfService/>} />
      <Route path="/toastUI" element={<toastUiTest/>} />
    </Routes>
  );
}

export default App;