import { FC, useState } from 'react';
import style from 'styles/PostPage/rewardModal/RewardItem.module.css';
import { Add, Remove } from '@mui/icons-material';
import { RewardListResponseDto } from 'apiTypes/data-contracts';
import { updateItemsAtom } from 'atoms/rewardItemsAtom';
import { useSetAtom } from 'jotai';

const RewardItem: FC<RewardListResponseDto> = ({
  rewardId,
  amount = 0,
  rewardName,
  rewardDescription,
  quantity = 0,
}) => {
  const updateItems = useSetAtom(updateItemsAtom);
  // 수량 부분
  const [counter, setCounter] = useState<number>(0);
  const handleCountUp = () => {
    if (counter + 1 > 10) return;
    setCounter(counter + 1);
    updateItems({ id: rewardId!, amount: counter + 1, price: amount });
  };
  const handleCountDown = () => {
    if (counter - 1 < 0) return;
    updateItems({ id: rewardId!, amount: counter - 1, price: amount });
    setCounter(counter - 1);
  };

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.card}>
          <div>{rewardName}</div>
          <div className={style.divider} />
          <div>{rewardDescription}</div>
          <div className={style.divider} />
          <div className={style.flexSpaceBetween}>
            <span>가격</span>
            <span>{`${amount?.toLocaleString('KO-kr')}원`}</span>
          </div>
          <div className={style.flexSpaceBetween}>
            <span>제한 수량</span>
            <span>
              {quantity
                ? `${quantity?.toLocaleString('KO-kr')}개 남음`
                : '현재 수량이 없습니다.'}
            </span>
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
