import { Route, Routes } from 'react-router-dom';
import Homepage from 'pages/Homepage';
import PostListPage from 'pages/PostListPage';
import PostPage from 'pages/PostPage';
import Admin from 'pages/adminPage/Admin';
import MemberMange from 'pages/adminPage/MemberManage';
import PostManage from 'pages/adminPage/PostManage';
import Chat from 'pages/adminPage/chat';
import NotFoundPage from 'pages/NotFoundPage';
import AdminPage from 'pages/AdminPage';
import Template from 'pages/Template';
import TermsOfServicePage from 'pages/TermsOfServicePage';
import CreatePage from 'pages/CreatePage';
import Login from 'pages/login/Login';
import ForgotPassword from 'pages/login/ForgotPassword';
import Register from 'pages/login/Register';
import LoginPage from 'pages/LoginPage';

import ServiceInfo from 'components/termsOfService/ServiceInfo';
import PolicyInfo from 'components/termsOfService/PolicyInfo';
import PaymentInfo from 'components/termsOfService/PaymentInfo';
import Community from 'components/postPage/Community';
import Refund from 'components/postPage/Refund';
import RewardInfo from 'components/postPage/RewardInfo';
import DashBoard from 'components/postPage/DashBoard';
import Story from 'components/postPage/Story';

import Schedule from 'components/CreatePage/section/Schedule';
import ProjectInfo from 'components/CreatePage/section/ProjectInfo';
import SectionStory from 'components/CreatePage/section/Story';
import Reward from 'components/CreatePage/section/Reward';
import Policy from 'components/CreatePage/section/Policy';
import Setting from 'components/CreatePage/section/Setting';

import MyPageTemplate from 'pages/MyPageTemplate';
import Mypage from 'pages/myPage/mypage';
import Alarm from 'pages/myPage/alarm';
import Joined from 'pages/myPage/joined';
import Myfunding from 'pages/myPage/myfunding';
import WishList from 'pages/myPage/wishList';
import Chatting from 'pages/myPage/chatting';

function App() {
  return (
    <Routes>
      <Route element={<Template />}>
        <Route index element={<Homepage />} />

        <Route path="/postList" element={<PostListPage />} />

        <Route path="/login" element={<LoginPage />}>
          <Route index element={<Login />} />
          <Route path="register" element={<ForgotPassword />} />
          <Route path="forgotpassword" element={<Register />} />
        </Route>

        <Route path="/mypage" element={<MyPageTemplate />}>
          <Route index element={<Mypage />} />
          <Route path="alarm" element={<Alarm />} />
          <Route path="joined" element={<Joined />} />
          <Route path="myfunding" element={<Myfunding />} />
          <Route path="wishList" element={<WishList />} />
          <Route path="chatting" element={<Chatting />} />
        </Route>

        <Route path="/post" element={<PostPage />}>
          <Route index element={<Story />} />
          <Route path="story" element={<Story />} />
          <Route path="comunity" element={<Community />} />
          <Route path="refund" element={<Refund />} />
          <Route path="rewardInfo" element={<RewardInfo />} />
          <Route path="dashboard" element={<DashBoard />} />
        </Route>

        <Route path="/termsOfService" element={<TermsOfServicePage />}>
          <Route index element={<ServiceInfo />} />
          <Route path="ServiceInfo" element={<ServiceInfo />} />
          <Route path="PolicyInfo" element={<PolicyInfo />} />
          <Route path="PaymentInfo" element={<PaymentInfo />} />
        </Route>

        <Route path="/CreatePage" element={<CreatePage />}>
          <Route index element={<Schedule />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="projectInfo" element={<ProjectInfo />} />
          <Route path="story" element={<SectionStory />} />
          <Route path="reward" element={<Reward />} />
          <Route path="policy" element={<Policy />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />

      {/* admin 페이지는 나중에 분리할 예정임. template에 맞춰서 디자인 수정 및 페이지 link 작업 */}
      <Route element={<Template />}>
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<Admin />} />
          <Route path="membermange" element={<MemberMange />} />
          <Route path="postmanage" element={<PostManage />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
