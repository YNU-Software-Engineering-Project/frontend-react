import Header from 'components/common/Header';
import Footer from "components/common/Footer"
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

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
  };

  const renderSectionContent = () =>{
    switch(selectedSection){
      case 'ServiceInfo': return<ServiceInfo onSectionChange={handleSectionChange} />
      case 'PolicyInfo': return<PolicyInfo/>
      case 'PaymentInfo': return<PaymentInfo/>
    }
  };
  return(
    <div className = {styles.wrapper}>
      <Header/>
      <div className={styles.body}>
        <div className={styles.topBtn}>
          <button className={`${styles.btn} ${selectedSection === 'ServiceInfo' ? styles.activeBtn : ''}`}  onClick={() => setSelectedSection('ServiceInfo')}>서비스 소개</button>
          <button className={`${styles.btn} ${selectedSection === 'PolicyInfo' ? styles.activeBtn : ''}`} onClick={() => setSelectedSection('PolicyInfo')}>심사 정책</button> 
          <button className={`${styles.btn} ${selectedSection === 'PaymentInfo' ? styles.activeBtn : ''}`} onClick={() => setSelectedSection('PaymentInfo')}>요금 안내</button>  
        </div>
        <div className={styles.element}>{renderSectionContent()}</div>
      </div>
      <Footer/>
    </div>
  )
};

  export default TermsOfService ;
  