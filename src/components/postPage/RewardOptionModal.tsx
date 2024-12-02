import style from 'styles/PostPage/RewardOptionModal.module.css';
import RewardItem from './rewardModal/RewardItem';
import Button from 'components/common/Button';
import { CancelOutlined } from '@mui/icons-material';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  rewardsListAtom,
  fetchRewardsListAtom,
} from 'atoms/rewardOptionsListAtom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PaymentModal from './rewardModal/PaymentModal';
import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';
import { useNavigate } from 'react-router-dom';

type rewardOptionModalProps = {
  onClick: () => void;
};

const RewardOptionModal: React.FC<rewardOptionModalProps> = ({ onClick }) => {
  const { id: fundingId } = useParams();
  const rewardList = useAtomValue(rewardsListAtom);
  const fetchRewardList = useSetAtom(fetchRewardsListAtom);
  const nav = useNavigate();

  useEffect(() => {
    if (fundingId) fetchRewardList(parseInt(fundingId));
    console.log(rewardList);
  }, [fundingId, fetchRewardList]);

  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  // 화인 버튼 부분
  const handleConfirmButton = async () => {
    Token.getToken;
    const api = new Api();
    try {
      const data = await api.checkBeforePayment(Token.getHeaderParms);
      setOpenPaymentModal(!openPaymentModal);
    } catch (e) {
      if (Token.getToken) {
        alert('회원 정보가 없습니다. 회원 정보를 입력해주세요.');
        nav('/mypage');
      } else {
        alert('로그인되어 있지 않습니다.');
        nav('/login');
      }
    }
  };
  return (
    <>
      <div className={style.cotton} onClick={onClick}></div>
      <div className={style.wrapper}>
        {openPaymentModal ? (
          <PaymentModal setOpenPaymentModal={setOpenPaymentModal} />
        ) : (
          <>
            <header>
              <div>
                <span>리워드 옵션</span>
              </div>
              <div onClick={onClick}>
                <CancelOutlined sx={{ fontSize: '48px', cursor: 'pointer' }} />
              </div>
            </header>

            <main>
              {rewardList.map(info => (
                <RewardItem key={info.rewardId} {...info} />
              ))}
            </main>

            <footer>
              <Button
                onClick={() => handleConfirmButton()}
                type="white"
                style={{ width: '100%' }}
              >
                확인
              </Button>
            </footer>
          </>
        )}
      </div>
    </>
  );
};

export default RewardOptionModal;
