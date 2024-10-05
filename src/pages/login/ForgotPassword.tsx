import React, { useState } from 'react';
import styles from 'styles/login/ForgotPassword.module.css';
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function ForgotPassword() {
  const[email, setEmail]=useState('');
  const[phoneNumber, setPhoneNumber]=useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleResetPassword = () => {
    setShowAlert(true);
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.email_text}>Email</div>
      <div style={{height:8}}></div>
      <input className={styles.confirm_email} type='text' placeholder='admin@naver.com' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
      <div style={{height:24}}></div>
      <div className={styles.phoneNumber_text}>전화번호</div>
      <div style={{height:8}}></div>
      <input className={styles.confirm_phoneNumber} type='text' placeholder='010-3252-3131' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}></input>
      <div style={{height:24}}></div>

      <div className={styles.ForgotPasswordPage_button}>
        <button className={styles.cancel_button}><Link to="/login">Cancel</Link></button>
        <button className={styles.reset_button} onClick={handleResetPassword}>Reset Password</button>
      </div>

      {showAlert && (
        <div className={styles.alert}>
          <div className={styles.alert_header}>
            <MailOutlineIcon className={styles.mail_icon} /> 
            <span className={styles.highlight}>초기화 완료</span>
            {/* 이메일과 전화번호 에러날시 "초기화 실패"  #FF0101*/}
            <button className={styles.alert_close} onClick={handleCloseAlert}>✖</button>
          </div>
          <div className={styles.alert_message}>
            이메일을 확인하세요
          </div>
        </div>
      )}

    </div>
  );
}

export default ForgotPassword;
