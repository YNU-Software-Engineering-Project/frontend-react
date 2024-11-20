import React, { useEffect, useRef, useState } from "react";
import styles from "styles/CreatePage/section/policy.module.css";
import { atom } from "jotai";
import { PolicyRefundRequestDto, PolicyRewardRequestDto } from "apiTypes/data-contracts";
import { Api } from "apiTypes/Api";
import { useAtom } from 'jotai';
import { fundingIdAtom } from 'components/CreatePage/atoms';

const Policy = () => {
  const [refundText, setRefundText] = useState('');
  const [rewardText, setRewardText] = useState('');
  const refundTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const rewardTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const api = new Api();
  const [fundingId, setFundingId] = useAtom(fundingIdAtom);
  
  useEffect(() => {
    handleProjectStory();
  }, []);

  const handleProjectStory =()=>{
    if (fundingId) {
        // `fundingId`가 있을 때만 프로젝트 정보 불러오기
      api.getPolicy(fundingId)
          .then((response) => {
            const projectData = response.data;
            // 받아온 데이터로 상태 업데이트
            setRefundText(projectData.refund_policy || "");
            setRewardText(projectData.reward_info || "");
          })
          .catch((error) => {
            console.error("프로젝트 정보를 불러오는 중 오류 발생:", error);
            alert("프로젝트 정보를 불러오는 중 오류가 발생했습니다.");
      });
    }
  }

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
  const rewardSubmit = async (content: string) => {
    const requestData: PolicyRewardRequestDto = {
      reward_info: content,
    };

    if(fundingId!=null){
      api.insertRewardIInfo(fundingId,requestData)
    .then((response)=>{
      alert("저장 성공: 펀딩 리워드 정보가 저장되었습니다.");
      console.log("응답 데이터:", response.data);
    })
    .catch(error => {
      console.error("저장 실패:", error);
      if (error.response) {
        alert(`저장 실패: ${error.response.data.message || "서버 오류"}`);
      } else {
        alert("저장 실패: 네트워크 오류");
      }
    })
    }
  };

    // API로 데이터를 저장하는 함수
    const refundSubmit = async (content: string) => {
      const requestData: PolicyRefundRequestDto = {
        refund_policy: content,
      };
  
      if(fundingId!=null){
        api.insertRefundPolicy(fundingId,requestData)
        .then((response)=>{
          alert("저장 성공: 펀딩 환불 정보가 저장되었습니다.");
          console.log("응답 데이터:", response.data);
        })
        .catch(error => {
          console.error("저장 실패:", error);
          if (error.response) {
            alert(`저장 실패: ${error.response.data.message || "서버 오류"}`);
          } else {
            alert("저장 실패: 네트워크 오류");
          }
        })
      }
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
        <button className={styles.saveButton} onClick={() => refundSubmit(refundText)}> 저장하기 </button>
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
        <button className={styles.saveButton} onClick={() => rewardSubmit(rewardText)}> 저장하기 </button>
      </div>
    </div>
  );
};

export default Policy;
