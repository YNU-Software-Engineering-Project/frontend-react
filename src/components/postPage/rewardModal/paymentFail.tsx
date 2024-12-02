import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from 'styles/PostPage/rewardModal/FailPage.moudle.css';

const FailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <div id="info" className={styles.boxSection}>
      <img
        className={styles.image}
        src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
        alt="에러 이미지"
      />
      <h2>결제를 실패했어요</h2>
      <div className={styles.grid}>
        <div className={styles.textLeft}>에러메시지</div>
        <div className={styles.textRight} id="message">
          {`${searchParams.get('message')}`}
        </div>
      </div>
      <div className={styles.gridSmall}>
        <div className={styles.textLeft}>에러코드</div>
        <div className={styles.textRight} id="code">
          {`${searchParams.get('code')}`}
        </div>
      </div>
      <button onClick={() => navigate(-1)}>돌아가기</button>
    </div>
  );
};

export default FailPage;
