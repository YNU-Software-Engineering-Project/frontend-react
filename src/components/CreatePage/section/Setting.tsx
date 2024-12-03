import Modal from "components/CreatePage/modals/Modal";
import { useEffect, useState } from "react";
import styles from "styles/CreatePage/section/setting.module.css";
import { useAtom } from 'jotai';
import { fundingIdAtom } from 'components/CreatePage/atoms';
import { Api } from "apiTypes/Api";
import { useNavigate } from 'react-router-dom';

const Setting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'submit' | 'cancel' | null>(null);
  const [fundingId] = useAtom(fundingIdAtom);
  const navigate = useNavigate();
  const api = new Api();

  // 모달 열기 (제출 또는 포기)
  const openModal = (type: 'submit' | 'cancel') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  // 제출하기 버튼의 처리 함수
  const handleSubmit = async () => {
    if (fundingId != null) {
      api.submitFunding(fundingId)
      .then((response) => {
        alert("저장 성공: 펀딩이 저장되었습니다.");
        console.log("응답 데이터:", response.data);
        navigate('/');
      })
      .catch(error => {
        console.error("저장 실패:", error);
        if (error.response) {
          alert(`저장 실패: ${error.response.data.message || "서버 오류"}`);
        } else {
          alert("저장 실패: 네트워크 오류");
        }
      });
      } else {
        alert("펀딩 ID가 없습니다.");
    }
    closeModal();
  };

  const handleCancel = async () => {
    if (fundingId != null) {
      api.giveupFunding(fundingId)
      .then((response) => {
        alert("삭제 성공: 펀딩이 삭제되었습니다.");
        console.log("응답 데이터:", response.data);
        navigate('/');
      })
      .catch(error => {
        console.error("삭제 실패:", error);
        if (error.response) {
          alert(`삭제 실패: ${error.response.data.message || "서버 오류"}`);
        } else {
          alert("삭제 실패: 네트워크 오류");
        }
      });
      } else {
        alert("펀딩 ID가 없습니다.");
    }
    closeModal();
  };
  
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          제출하기 버튼을 누르면 심사단계로 이동합니다.<br/> 심사중에는 수정이 불가능합니다.
          <button className={styles.btn} onClick={() => openModal('submit')}>제출하기</button>
        </div>
        <div className={styles.card}>
          펀딩 게시물 작성을 포기합니다.<br /> 지금까지의 입력 내용들이 모두 사라집니다.
          <button className={styles.btn} onClick={() => openModal('cancel')}>게시물 작성 포기하기</button>
        </div>
      </div>

      {/* 모달 창 */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {modalType === 'submit' ? (
            <>
            <div className={styles.modal}>
                <div className={styles.header}>제출하시겠습니까?</div>
                <p>제출 후에는 수정이 불가능합니다.<br/>수정 사항은 문의 주십시오.</p>
                <div className={styles.buttonGroup}>
                  <button className={styles.confirmButton} onClick={handleSubmit}>제출하기</button>
                  <button className={styles.cancelButton} onClick={closeModal}>취소</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.modal}>
                <div className={styles.header}>정말로 작성을 포기하시겠습니까?</div>
                <p>모든 입력 내용이 삭제됩니다.</p>
                <div className={styles.buttonGroup}>
                  <button className={styles.confirmButton} onClick={handleCancel}>포기하기</button>
                  <button className={styles.cancelButton} onClick={closeModal}>취소</button>
                </div>
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default Setting;
