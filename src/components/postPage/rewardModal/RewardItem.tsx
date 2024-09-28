import { useState } from 'react';
import style from 'styles/PostPage/rewardModal/RewardItem.module.css';
import { Add, Remove } from '@mui/icons-material';

const RewardItem = () => {
  //페이지 text
  const price = 100000;
  const maxAmount = 300;

  // 수량 부분
  const [counter, setCounter] = useState<number>(0);
  const handleCountUp = () => {
    if (counter > maxAmount) return;
    setCounter(counter + 1);
  };
  const handleCountDown = () => {
    if (counter - 1 < 0) return;
    setCounter(counter - 1);
  };

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.card}>
          <div>리워드</div>
          <div className={style.divider} />
          <div>리워드 설명</div>
          <div className={style.divider} />
          <div className={style.flexSpaceBetween}>
            <span>가격</span>
            <span>{`${price}원`}</span>
          </div>
          <div className={style.flexSpaceBetween}>
            <span>제한 수량</span>
            <span>{`${maxAmount}개`}</span>
          </div>
        </div>
        <div className={style.checkBox}>
          <div>{`수량: ${counter}`}</div>
          <div className={style.flexSpaceBetween}>
            <Add
              onClick={handleCountUp}
              sx={{ cursor: 'pointer', fontSize: '32px' }}
            />
            <Remove
              onClick={handleCountDown}
              sx={{ cursor: 'pointer', fontSize: '32px' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RewardItem;
