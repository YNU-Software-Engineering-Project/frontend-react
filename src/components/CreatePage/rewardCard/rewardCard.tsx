import { useState } from 'react';
import styles from 'styles/CreatePage/rewardCard.module.css';

interface Reward {
  id: number; // 리워드 ID
  amount: string;
  name: string;
  description: string;
  quantity: string;
}

// RewardCard 컴포넌트
const RewardCard = ({ reward, onDelete, onSave, onClose }: {
  reward?: Reward; // Optional로 설정하여 모달에서도 사용할 수 있게 함
  onDelete?: (id: number) => void;
  onSave?: (name: string, amount: string, description: string, quantity: string) => void;
  onClose?: () => void;
}) => {
  // 모달에서 사용하기 위한 상태
  const [name, setName] = useState(reward ? reward.name : '');
  const [amount, setAmount] = useState(reward ? reward.amount : '');
  const [description, setDescription] = useState(reward ? reward.description : '');
  const [quantity, setQuantity] = useState(reward ? reward.quantity : '');


  const handleSubmit = () => {
    if (onSave && name && amount && description) {
      onSave(name, amount, description,quantity); // 입력한 리워드를 저장
      setName(''); // 입력 필드 초기화
      setAmount('');
      setDescription('');
      setQuantity('');
      if (onClose) onClose(); // 모달 닫기
    }
  };

  // 글자 수 조정
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 30) {
      setName(event.target.value);
    }
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= 300) {
      setDescription(event.target.value);
    }
  };

  return (
    <div className={styles.rewardCard}>
      {reward ? (
        <>
          {/* 리워드 정보 표시 */}
          <div className={styles.card}>
            <div className={styles.blackTop}/>
            <div className={styles.rewardText}>
              <div className={styles.rewardInfo}>{reward.amount}원</div>
              <div className={styles.rewardInfo}>리워드 이름:&nbsp;         {reward.name}</div>
              <div className={styles.rewardInfo}>리워드 설명<br />{reward.description}</div>
              <div className={styles.rewardInfo}>리워드 수량:&nbsp;        {reward.quantity}</div>
              <button className={styles.rewardDeleteBtn} onClick={() => onDelete?.(reward.id)}>삭제</button>
            </div>
          </div>
        </>
      ) : (
        // 모달 내용 표시
        <div className={styles.rewardContainer}>
          <h3 style={{fontSize:'24px'}}>리워드 정보 입력</h3>
          <div className={styles.content}>
            <label>리워드 이름</label>
            <input className={styles.inputBox} type="text" value={name} onChange={handleNameChange}/>
            <div style={{alignSelf:'end'}}>{name.length}/30자</div>
          </div>
          <div className={styles.content}>
            <label>리워드 금액</label>
            <input className={styles.inputBox} type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className={styles.content}>
            <label>리워드 설명</label>
            <textarea className={styles.inputBox} value={description} onChange={(e) => handleDescriptionChange(e)} style={{resize:'none', height:'100px'}}/>
            <div style={{alignSelf:'end'}}>{description.length}/300자</div>
          </div>
          <div className={styles.content}>
            <label>리워드 수량</label>
            <input className={styles.inputBox} type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.btn} onClick={handleSubmit}>저장</button>
            <button className={styles.btn} style={{backgroundColor:'black', color:'white', border:'none'}} onClick={onClose}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardCard;
