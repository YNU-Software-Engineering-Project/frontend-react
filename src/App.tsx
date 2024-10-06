import { Route, Routes } from 'react-router-dom';
import Homepage from 'pages/Homepage';
import CreatePage from 'pages/CreatePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/CreatePage" element={<CreatePage />} />
    </Routes>
  );
}

export default App;