import style from 'styles/PostPage/PostPage.module.css';
import OptionList from 'components/common/OptionList';
import Button from 'components/common/Button';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import {
  ChatBubbleOutline,
  FavoriteBorder,
  Favorite,
} from '@mui/icons-material';
import RewardOptionModal from 'components/postPage/RewardOptionModal';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fundingInfoAtom } from 'atoms/fundingInfo';
import { FundingDetailsResponseDto } from 'apiTypes/data-contracts';
import { useAtomValue } from 'jotai';
import { likeToggle } from 'api/likeToggle';
import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';
import { useSetAtom } from 'jotai';
import { resetItemsAtom } from 'atoms/rewardItemsAtom';

const PostPage = () => {
  const resetItems = useSetAtom(resetItemsAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const data = useAtomValue(
    fundingInfoAtom(Number(id)),
  ) as FundingDetailsResponseDto;

  const [authentic, setAuthentic] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const api = new Api();
      if (!id) return;
      try {
        const response = (
          await api.checkPermission(parseInt(id), Token.getHeaderParms)
        ).data;
        setAuthentic(response);
      } catch (e) {
        setAuthentic(false);
      }
    };
    checkAuth();
  }, []);

  if (Object.keys(data).includes('code')) {
    navigate('*');
  }

  // 네비 버튼 부분
  let navList = [
    { label: '스토리', path: 'story' },
    { label: '커뮤니티', path: 'comunity' },
    { label: '환불 정책', path: 'refund' },
    { label: '리워드 정보', path: 'rewardInfo' },
    { label: '상황판', path: 'dashboard' },
  ];
  if (!authentic) navList = navList.slice(0, 4);
  const handleNav = (
    label: string,
    event: React.MouseEvent<HTMLLIElement> | undefined,
  ) => {
    if (event === undefined) return;
    const link = navList.find(item => item.label === label);
    if (link === undefined) return;
    navigate(`/post/${id}/${link.path}`);
  };

  // 버튼 부분
  // - 주최자와 채팅
  const handleChatButton = () => {
    //체팅 페이지와 연결하기
    // navigate();
  };

  // - 좋아요 버튼
  const [liked, setLiked] = useState<boolean>(false);
  const handleLikeButton = async () => {
    setLiked(prev => !prev);
    if (id) await likeToggle(parseInt(id));
  };

  // - 후원 버튼
  const [donateModalOpen, setDonateModalOpen] = useState<boolean>(false);
  const handleDonateModalToogle = () => {
    resetItems();
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
            <Outlet context={id} />
          </div>
          {location.pathname.split('/')[3] === 'dashboard' || (
            <div className={style.sidebar}>
              <div className={style.title}>목표 금액</div>
              <div
                className={style.price}
              >{`${data.targetAmount?.toLocaleString('ko-KR')}원`}</div>
              <div className={style.title}>모인 금액</div>
              <div
                className={style.price}
              >{`${data.currentAmount?.toLocaleString('ko-KR')}원`}</div>
              <div className={style.title}>달성률</div>
              <div
                className={style.price}
              >{`${data.achievementRate?.toPrecision(2)}%`}</div>
              <div className={style.title}>남은 시간</div>
              <div className={style.price}>{`${data.remainingDays}일`}</div>
              <div className={style.title}>후원자</div>
              <div className={style.price}>{`${data.supporterCount}명`}</div>
              <div className={style.divider}></div>
              <div className={style.buttonBox}>
                <Button variant="outlined" onClick={handleChatButton}>
                  <ChatBubbleOutline sx={{ marginRight: '5px' }} />
                  주최자와 채팅
                </Button>
                <Button variant="outlined" onClick={() => handleLikeButton()}>
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
