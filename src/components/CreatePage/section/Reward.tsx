import { useEffect, useState } from 'react';
import styles from 'styles/CreatePage/section/reward.module.css';
import Modal from 'components/CreatePage/modals/Modal'; // Modal 컴포넌트 import
import RewardCard from 'components/CreatePage/rewardCard/rewardCard'; // 리워드 카드 import
import rewardImage from 'assets/rewardCard.png'; // 리워드 입력 전 표시할 이미지
import { GetRewardData, MakeRewardRequestDto } from 'apiTypes/data-contracts';
import { Api } from 'apiTypes/Api';
import { useAtom } from 'jotai';
import { fundingIdAtom } from 'components/CreatePage/atoms';

interface Reward {
  id: number; // 리워드 ID
  amount: string;
  name: string;
  description: string;
  quantity: string;
}

const Reward = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [isImageVisible, setIsImageVisible] = useState(true); // 이미지를 표시할지 여부

  // const fundingId = 1;
  const [fundingId] = useAtom(fundingIdAtom);

  const api = new Api();

  // `fundingId`가 유효한지 확인
  useEffect(()=>{
    if(fundingId)
      fetchRewards();
    console.log(fundingId);
  },[fundingId]);

  //리워드 목록 가져오기
  const fetchRewards = async () => {
    if (fundingId) {
      try {
        const response = await api.getReward(fundingId);
        const responseData: GetRewardData = response.data;
  
        // 모든 리워드 배열의 길이가 같은지 확인합니다.
        const { reward_name, amount, reward_description, quantity, reward_id } = responseData;
  
        if (
          reward_name &&
          amount &&
          reward_description &&
          quantity &&
          reward_id &&
          reward_name.length === amount.length &&
          amount.length === reward_description.length &&
          reward_description.length === quantity.length &&
          quantity.length === reward_id.length
        ) {
          // 모든 리워드 데이터 배열을 순회하며 Reward 객체로 변환
          const fetchedRewards: Reward[] = reward_name.map((name, index) => ({
            id: reward_id[index],
            name: name,
            amount: amount[index],
            description: reward_description[index],
            quantity: quantity[index],
          }));
  
          // 리워드 상태 업데이트
          setRewards(fetchedRewards);
          setIsImageVisible(fetchedRewards.length === 0); // 리워드가 없는 경우 이미지를 표시
        } else {
          console.warn('리워드 데이터의 형식이 일치하지 않습니다:', responseData);
        }
      } catch (error) {
        console.error("리워드 정보를 불러오는 중 오류 발생:", error);
        alert("리워드 정보를 불러오는 중 오류가 발생했습니다.");
      }
    }
  };
  
  // 리워드 추가
  const addReward = (reward: Reward) => {
    setRewards([...rewards, reward]);
    setIsImageVisible(false); // 리워드 추가 시 이미지 숨김
  };

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 리워드 저장
  const saveReward = async (name: string, amount: string, description: string, quantity: string) => {
    const requestData: MakeRewardRequestDto = {
      amount: amount,
      reward_name: name,
      reward_description:description,
      quantity: quantity,
    };

    if(fundingId!=null){
      try{
        const response = await api.insertReward(fundingId, requestData);
        if (response.status === 200) {
            alert('리워드가 성공적으로 추가되었습니다.');
            if (response.data.reward_id !== undefined) {
                const newReward: Reward = {
                  id: response.data.reward_id,
                  name: name,
                  amount: amount,
                  description: description,
                  quantity: quantity
                };
    addReward(newReward);
            } else {
                console.error('서버에서 유효한 reward_id를 반환하지 않았습니다.');
            }
        }
      } catch (error: any) {
        console.error("리워드 추가 실패:", error);
        if (error.response) {
          alert(`리워드 추가 실패: ${error.response.data.message}`);
        } else {
          alert('리워드 추가 실패: 네트워크 오류');
        }
      }
    }
    else alert("펀딩 id 없음");
  };

  // 리워드 삭제
  const removeReward = async (id:number) => {
    if(fundingId!=null){
      try{
        api
          const response = await api.deleteReward(id); // id로 삭제 요청
          if (response.status === 200) {
            // 상태에서 해당 태그를 제거
            setRewards(prevRewards => {
              const updatedRewards = prevRewards.filter(reward => reward.id !== id);
    if (updatedRewards.length === 0) {
      setIsImageVisible(true); // 리워드가 없으면 이미지를 다시 표시
    }
              return updatedRewards;
            });    
            alert("리워드가 삭제되었습니다.");
          } else {
            alert("리워드 삭제에 실패했습니다.");
          }
        } catch (error: any) {
          console.error("리워드 삭제 중 오류 발생:", error);
          alert("리워드 삭제에 실패했습니다.");
        }
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
        {rewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} onDelete={() => removeReward(reward.id)} />
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
