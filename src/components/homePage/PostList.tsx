import Button from 'components/common/Button';
import OptionList from 'components/common/OptionList';
import PostCard from 'components/common/PostCard';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { FundingSortResponseDto } from 'apiTypes/data-contracts';
import { fetchTop3PopularFundings } from 'atoms/getTop3PopularFundings';
import { fetchHighAchievementFundings } from 'atoms/getHighAchievementFundingsData';
import { fetchNewFundings } from 'atoms/getNewFundingsData';
import { fetchSmallFundings } from 'atoms/getSmallFundingsData';
import { useEffect, useState } from 'react';

const PostList = () => {
  const optionsItems = [
    '신생 펀딩',
    '인기 펀딩 Top3',
    '소액 펀딩',
    '목표달성률',
  ];
  const [option, setOption] = useState<number>(0);
  const onClick = (label: string) => {
    const idx = optionsItems.findIndex(x => x == label);
    setOption(idx);
  };

  const [cardInfo, setCardInfo] = useState<FundingSortResponseDto[]>();

  const [highAchievementFundings] = useAtom(fetchHighAchievementFundings);
  const [smallFundings] = useAtom(fetchSmallFundings);
  const [top3PopularFundings] = useAtom(fetchTop3PopularFundings);
  const [newFundings] = useAtom(fetchNewFundings);
  useEffect(() => {
    switch (option) {
      case 0:
        setCardInfo(newFundings);
        break;
      case 1:
        setCardInfo(top3PopularFundings);
        break;
      case 2:
        setCardInfo(smallFundings);
        break;
      case 3:
        setCardInfo(highAchievementFundings);
        break;
    }
  }, [option, cardInfo]);

  return (
    <>
      <div style={{ width: '1160px', margin: ' 128px auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <OptionList items={optionsItems} onClick={onClick} />
          <Link to="/postList">
            <Button variant="contained" type="black">
              더보기
            </Button>
          </Link>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '20px',
          }}
        >
          {cardInfo &&
            cardInfo.map(info => <PostCard key={info.fundingId} {...info} />)}
        </div>
      </div>
    </>
  );
};

export default PostList;
