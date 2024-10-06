import React, { useState } from 'react';
import styles from 'styles/CreatePage/section/reward.module.css';
import Modal from 'components/modals/Modal'; // Modal 컴포넌트 import
import RewardCard from 'components/rewardCard/rewardCard'; // 리워드 카드 import
import rewardImage from 'assets/rewardCard.png'; // 리워드 입력 전 표시할 이미지

interface Reward {
  id: number; // 리워드 ID
  amount: string;
  name: string;
  description: string;
  quantity: string;
}
const Reward = () => {
  const [rewards, setRewards] = useState<{ name: string; amount: string; description: string; quantity: string}[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [isImageVisible, setIsImageVisible] = useState(true); // 이미지를 표시할지 여부

  // 리워드 추가
  const addReward = (reward: { name: string; amount: string; description: string; quantity:string}) => {
    setRewards([...rewards, reward]);
    setIsImageVisible(false); // 리워드 추가되면 이미지 감춤
  };

  // 모달 열기
  const openModal = () => { setIsModalOpen(true); };

  // 모달 닫기
  const closeModal = () => { setIsModalOpen(false); };

  // 리워드 저장 (리스트에 추가)
  const saveReward = (name: string, amount: string, description: string, quantity:string) => {
    const newReward = { name, amount, description, quantity};
    addReward(newReward);
    closeModal(); // 모달 닫기
  };

  // 리워드 삭제
  const removeReward = (index: number) => {
    const updatedRewards = rewards.filter((_, i) => i !== index);
    setRewards(updatedRewards);
    if (updatedRewards.length === 0) {
      setIsImageVisible(true); // 리워드가 없으면 이미지를 다시 표시
    }
  };

  return (
    <div className={styles.rewardContainer}>
      <p style={{fontSize:'18px', margin:'0'}}>리워드 설계</p>
      <p style={{fontSize:'18px', fontWeight:'lighter', margin:'0'}}>후원자를 위한 리워드를 설계하세요.</p>
      <div className={styles.grayBox}>
      반드시 지킬 수 있는 리워드를 설계하셔야 합니다.<br/>지켜지지 않는 리워드로 인한 SparkSeed와는 관계가 없습니다.
      </div>
      <div className={styles.rewardAdd}>
        {isImageVisible ? (
          <div className={styles.rewardPlaceholder} onClick={openModal}>
            <img src={rewardImage} alt="Add Reward" style={{ cursor: 'pointer' }} />
          </div>
        ): (
          <button className={styles.addButton} onClick={openModal}>리워드 추가</button>
        )}
      </div>
      
      <div className={styles.rewardList}>
        {rewards.map((reward, index) => (
          <RewardCard key={index} reward={{ ...reward, id: index }} onDelete={removeReward} />
        ))}
      </div>

      {/* 모달 창 */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <RewardCard onSave={saveReward} onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};
export default Reward;
