import { Route, Routes } from 'react-router-dom';
import Homepage from 'pages/Homepage';
import Admin from 'pages/adminPage/Admin';
import MemberMange from 'pages/adminPage/MemberManage';
import PostManage from 'pages/adminPage/PostManage';
import Chat from 'pages/adminPage/chat';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route path='/admin' element={<Admin />} />
        <Route index element={<Admin />} />
        <Route path='membermange' element={<MemberMange />} />
        <Route path='postmanage' element={<PostManage />} />
        <Route path='chat' element={<Chat />} />

    </Routes>
  );
}

export default App;