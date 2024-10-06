import style from 'styles/PostPage/PostPage.module.css';
import OptionList from 'components/common/OptionList';
import Button from 'components/common/Button';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  ChatBubbleOutline,
  FavoriteBorder,
  Favorite,
} from '@mui/icons-material';
import RewardOptionModal from 'components/postPage/RewardOptionModal';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 네비 버튼 부분
  const navList = [
    { label: '스토리', path: 'story' },
    { label: '커뮤니티', path: 'comunity' },
    { label: '환불 정책', path: 'refund' },
    { label: '리워드 정보', path: 'rewardInfo' },
    { label: '상황판', path: 'dashboard' },
  ];
  const handleNav = (
    label: string,
    event: React.MouseEvent<HTMLLIElement> | undefined,
  ) => {
    if (event === undefined) return;
    const link = navList.find(item => item.label === label);
    if (link === undefined) return;
    navigate(`/post/${link.path}`);
  };

  // 버튼 부분
  // - 주최자와 채팅
  const handleChatButton = () => {
    //체팅 페이지와 연결하기
    // navigate();
  };

  // - 좋아요 버튼
  const [liked, setLiked] = useState<boolean>(false);
  const handleLikeButton = () => {
    setLiked(prev => !prev);
  };

  // - 후원 버튼
  const [donateModalOpen, setDonateModalOpen] = useState<boolean>(false);
  const handleDonateModalToogle = () => {
    setDonateModalOpen(!donateModalOpen);
  };

  return (
    <>
      <div className={style.wrapper}>
        <header>
          <OptionList
            items={navList.map(item => item['label'])}
            onClick={handleNav}
          />
        </header>
        <div className={style.main}>
          <div className={style.content}>
            <Outlet />
          </div>
          {location.pathname === '/post/dashboard' || (
            <div className={style.sidebar}>
              <div className={style.title}>목표 금액</div>
              <div className={style.price}>500,000원</div>
              <div className={style.title}>모인 금액</div>
              <div className={style.price}>90,686,700원</div>
              <div className={style.title}>달성률</div>
              <div className={style.price}>1000%</div>
              <div className={style.title}>남은 시간</div>
              <div className={style.price}>17일</div>
              <div className={style.title}>후원자</div>
              <div className={style.price}>1,264</div>
              <div className={style.divider}></div>
              <div className={style.buttonBox}>
                <Button variant="outlined" onClick={handleChatButton}>
                  <ChatBubbleOutline sx={{ marginRight: '5px' }} />
                  주최자와 채팅
                </Button>
                <Button variant="outlined" onClick={handleLikeButton}>
                  {liked && (
                    <Favorite color="error" sx={{ fontSize: '32px' }} />
                  )}
                  {liked || <FavoriteBorder sx={{ fontSize: '32px' }} />}
                  하트
                </Button>
                <Button onClick={handleDonateModalToogle}>후원하기</Button>
              </div>
            </div>
          )}
        </div>
        {donateModalOpen && (
          <RewardOptionModal onClick={handleDonateModalToogle} />
        )}
      </div>
    </>
  );
};

export default PostPage;
