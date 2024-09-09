import React, { useState } from 'react';
import './ForgotPassword.css';
import { Link } from 'react-router-dom';
import { CiMail } from "react-icons/ci";

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
    <div className="container">
      <div className='email_text'>Email</div>
      <div style={{height:8}}></div>
      <input className='confirm_email' type='text' placeholder='admin@naver.com' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
      <div style={{height:24}}></div>
      <div className='phoneNumber_text'>전화번호</div>
      <div style={{height:8}}></div>
      <input className='confirm_phoneNumber' type='text' placeholder='010-3252-3131' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}></input>
      <div style={{height:24}}></div>

      <div className='ForgotPasswordPage_button'>
        <button className='cancel_button'><Link to="/login">Cancel</Link></button>
        <button className='reset_button' onClick={handleResetPassword}>Reset Password</button>
      </div>

      {showAlert && (
        <div className="alert">
          <div className="alert_header">
            <CiMail className="mail_icon" /> 
            <span className="highlight">초기화 완료</span>
            {/* 이메일과 전화번호 에러날시 "초기화 실패"  #FF0101*/}
            <button className="alert_close" onClick={handleCloseAlert}>✖</button>
          </div>
          <div className="alert_message">
            이메일을 확인하세요
          </div>
        </div>
      )}

    </div>
  );
}

export default ForgotPassword;
