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

function App() {
  return (
    <Routes>
      <Route element={<Template />}>
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

      {/* admin 페이지는 나중에 분리할 예정임. */}
      <Route element={<Template />}>
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<Admin />} />
          <Route path="membermange" element={<MemberMange />} />
          <Route path="postmanage" element={<PostManage />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
