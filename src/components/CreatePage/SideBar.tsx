import React from "react";
import styles from "styles/CreatePage/sideBar.module.css"

interface SideBarProps {
  setSelectedSection: (section: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ setSelectedSection }) => {
    return (
      <div className={styles.sideBar}>
        <div className={styles.sideBarTop}>
          <div className={styles.productImg} style={{width:'150px', height:'150px', backgroundColor:'#d9d9d9',}}/>
          <div className={styles.productName} style={{fontSize:'16px',height:'57px', alignContent:'center', padding:'35px 0'}}>상품명</div>
        </div>
        <div className={styles.sideBarBottom}>
          <button onClick={() => setSelectedSection('Schedule')}>일정</button>
          <button onClick={() => setSelectedSection('PolicyAndInfo')}>심사 정책 및 요금 안내</button>
          <button onClick={() => setSelectedSection('ProjectInfo')}>프로젝트 정보 작성</button>
          <button onClick={() => setSelectedSection('Story')}>스토리 작성</button>
          <button onClick={() => setSelectedSection('Reward')}>리워드 설계</button>
          <button onClick={() => setSelectedSection('Policy')}>정책</button>
          <button onClick={() => setSelectedSection('Setting')}>설정</button>
        </div>
      </div>
    );
  };
  
export default SideBar;