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
      <Route path="/admin" element={<Admin />} />
      <Route path="/membermange" element={<MemberMange />} />
      <Route path="/postmanage" element={<PostManage />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
