import { Route, Routes } from 'react-router-dom';
import Homepage from 'pages/Homepage';
import PostListPage from 'pages/PostListPage';
import PostPage from 'pages/PostPage';
import Story from 'components/postPage/Story';
import Community from 'components/postPage/Community';
import Refund from 'components/postPage/Refund';
import RewardInfo from 'components/postPage/RewardInfo';
import DashBoard from 'components/postPage/DashBoard';
import TermsOfService from 'pages/TermsofService';
import Admin from 'pages/adminPage/Admin';
import MemberMange from 'pages/adminPage/MemberManage';
import PostManage from 'pages/adminPage/PostManage';
import Chat from 'pages/adminPage/chat';
import NotFound from 'pages/NotFound';
import AdminPage from 'pages/AdminPage';

function App() {
  return (
    <Routes>
      <Route index element={<Homepage />} />

      <Route path="/postList" element={<PostListPage />} />

      <Route path="/post" element={<PostPage />}>
        <Route index element={<Story />} />
        <Route path="story" element={<Story />} />
        <Route path="comunity" element={<Community />} />
        <Route path="refund" element={<Refund />} />
        <Route path="rewardInfo" element={<RewardInfo />} />
        <Route path="dashboard" element={<DashBoard />} />
      </Route>

      <Route path="/termsOfService" element={<TermsOfService />} />
      {/* 여기까지 템플릿 하나 만들어야함. 메뉴 전용 */}

      <Route path="/admin" element={<AdminPage />}>
        <Route index element={<Admin />} />
        <Route path="membermange" element={<MemberMange />} />
        <Route path="postmanage" element={<PostManage />} />
        <Route path="chat" element={<Chat />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
