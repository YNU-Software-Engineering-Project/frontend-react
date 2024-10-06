import style from 'styles/PostPage/RewardOptionModal.module.css';
import RewardItem from './rewardModal/RewardItem';
import Button from 'components/common/Button';
import { CancelOutlined } from '@mui/icons-material';

type rewardOptionModalProps = {
  onClick: () => void;
};

const RewardOptionModal: React.FC<rewardOptionModalProps> = ({ onClick }) => {
  // 화인 버튼 부분
  const handleConfirmButton = () => {
    // PG모듈 연결 부분
  };

  return (
    <>
      <div className={style.cotton} onClick={onClick}></div>
      <div className={style.wrapper}>
        <header>
          <div>
            <span>리워드 옵션</span>
          </div>
          <div onClick={onClick}>
            <CancelOutlined sx={{ fontSize: '48px', cursor: 'pointer' }} />
          </div>
        </header>

        <main>
          {/* 나중에 api 연겷할 부분 */}
          <RewardItem />
          <RewardItem />
        </main>

        <footer>
          <Button
            onClick={handleConfirmButton}
            type="white"
            style={{ width: '100%' }}
          >
            확인
          </Button>
        </footer>
      </div>
    </>
  );
};

export default RewardOptionModal;
