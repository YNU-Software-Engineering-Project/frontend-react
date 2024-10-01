import { Route, Routes } from 'react-router-dom';
import Homepage from 'pages/Homepage';
import TermsOfService from 'pages/TermsofService';
import ToastUiTest from 'pages/toastUiTest';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/tos" element={<TermsOfService/>} />
      <Route path="/toastUiTest" element={<ToastUiTest/>} />
    </Routes>
  );
}

export default App;