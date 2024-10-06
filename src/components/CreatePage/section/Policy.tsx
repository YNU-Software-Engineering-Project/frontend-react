import React, { useRef, useState } from "react";
import styles from "styles/CreatePage/section/policy.module.css";

const Policy = () => {
  const [refundText, setRefundText] = useState('');
  const [rewardText, setRewardText] = useState('');
  const refundTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const rewardTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // 공통된 textarea 높이 자동 조절 함수
  const textReSize = (
    e: React.ChangeEvent<HTMLTextAreaElement>, 
    setText: React.Dispatch<React.SetStateAction<string>>, 
    textareaRef: React.RefObject<HTMLTextAreaElement>
  ) => {
    setText(e.currentTarget.value);
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "81px"; // 기본 높이 설정
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px"; // 자동 높이 조절
    }
  };

  // API로 데이터를 저장하는 함수
  const saveToDB = async (content: string) => {
    console.log(content, '가 저장되었습니다.')
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>환불 정책 작성하기</div>
        <div className={styles.light}>위 환불 불가 유형 외 리워드 특성 상 환불이 불가한 사유를 적어주세요.</div>
        <textarea
          className={styles.textBox}
          ref={refundTextareaRef}
          value={refundText}
          onChange={(e) => textReSize(e, setRefundText, refundTextareaRef)}
          placeholder="환불 정책 작성하기"
        />
        <div className={styles.light}>{refundText.length} / 1000자 </div>
        <button className={styles.saveButton} onClick={() => saveToDB(refundText)}> 저장하기 </button>
      </div>
      <div className={styles.card}>
        <div className={styles.header}>리워드 정보 작성하기</div>
        <div className={styles.light}>리워드 정보를 작성합니다. 예) 원산지/대한민국, 전자기기인증/KC인증 등등...</div>
        <textarea
          className={styles.textBox}
          ref={rewardTextareaRef}
          value={rewardText}
          onChange={(e) => textReSize(e, setRewardText, rewardTextareaRef)}
          placeholder="리워드 정보 작성하기"
        />
        <div className={styles.light}>{rewardText.length} / 1000자 </div>
        <button className={styles.saveButton} onClick={() => saveToDB(rewardText)}> 저장하기 </button>
      </div>
    </div>
  );
};

export default Policy;
