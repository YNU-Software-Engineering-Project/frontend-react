// import Topbar from '../components/Topbar'; // Topbar 컴포넌트 경로에 맞게 수정
// import Footer from '../components/Footer'; // Footer 컴포넌트 경로에 맞게 수정
import { useState } from "react";
import styles from "styles/termsOfService/termsOfService.module.css";
import ServiceInfo from 'components/termsOfService/ServiceInfo';
import PolicyInfo from 'components/termsOfService/PolicyInfo';
import PaymentInfo from 'components/termsOfService/PaymentInfo';
import { useLocation } from "react-router-dom";

const TermsOfService =() => {
  const location = useLocation();
  const initialSection = location.state?.section || 'ServiceInfo';
  const [selectedSection, setSelectedSection] = useState<string>(initialSection);

  const renderSectionContent = () =>{
    switch(selectedSection){
      case 'ServiceInfo': return<ServiceInfo/>
      case 'PolicyInfo': return<PolicyInfo/>
      case 'PaymentInfo': return<PaymentInfo/>
      default: return<ServiceInfo/>
    }
  };
  return(
    <div className = {styles.wrapper}>
      {/*이후에 top bar 컴포넌트 적용*/}
      <div className={styles.topBar}></div>
      <div className={styles.body}>
        <div className={styles.topBtn}>
          <button className={`${styles.btn} ${selectedSection === 'ServiceInfo' ? styles.activeBtn : ''}`}  onClick={() => setSelectedSection('ServiceInfo')}>서비스 소개</button>
          <button className={`${styles.btn} ${selectedSection === 'PolicyInfo' ? styles.activeBtn : ''}`} onClick={() => setSelectedSection('PolicyInfo')}>심사 정책</button> 
          <button className={`${styles.btn} ${selectedSection === 'PaymentInfo' ? styles.activeBtn : ''}`} onClick={() => setSelectedSection('PaymentInfo')}>요금 안내</button>  
        </div>
        <div className={styles.element}>{renderSectionContent()}</div>
      </div>
      {/*이후에 footer 컴포넌트 적용*/}
      <div className={styles.footer}></div>
    </div>
  )
};

  export default TermsOfService ;
  