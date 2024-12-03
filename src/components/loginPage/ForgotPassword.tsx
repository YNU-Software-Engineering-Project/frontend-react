import { useState } from 'react';
import styles from 'styles/login/ForgotPassword.module.css';
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Button from 'components/common/Button';
import { Api } from 'apiTypes/Api';
import { PasswordResetRequestDto } from 'apiTypes/data-contracts';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const api = new Api();

  const handleResetPassword = () => {
    setShowAlert(false);
    const requestData: PasswordResetRequestDto = {
      email,
      phoneNumber,
    };
    api
      .resetPassword(requestData)
      .then((response) => {
        //비밀번호 초기화 성공
        console.log(response.data);
        setResetSuccess(true);
        setShowAlert(true);
      })
      .catch(error => {
        //비밀번호 초기화 실패
        console.error('비밀번호 초기화 실패:', error);
        setResetSuccess(false);
        setShowAlert(true);
        if (error.response) {
          alert(`비밀번호 초기화 실패: ${error.response.data.message}`);
        } else {
          alert('비밀번호 초기화 실패: 네트워크 오류');
        }
      });
    
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.email_text}>Email</div>
        <div style={{ height: 8 }}></div>
        <input
          className={styles.confirm_email}
          type="text"
          placeholder="admin@naver.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        ></input>
        <div style={{ height: 24 }}></div>
        <div className={styles.phoneNumber_text}>전화번호</div>
        <div style={{ height: 8 }}></div>
        <input
          className={styles.confirm_phoneNumber}
          type="text"
          placeholder="010-3252-3131"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        ></input>
        <div style={{ height: 24 }}></div>

        <div className={styles.ForgotPasswordPage_button}>
          <button className={styles.cancel_button}>
            <Link to="/login">Cancel</Link>
          </button>
          <Button style={{  width: 166, height: 40, borderRadius: 2}}
          onClick={handleResetPassword}>Reset</Button>
        </div>

        {showAlert && (
          <div className={styles.alert}>
            <div className={styles.alert_header}>
              <MailOutlineIcon className={`${styles.mail_icon} ${resetSuccess ? styles.success : styles.fail}`} />
              <span className={`${styles.highlight} ${resetSuccess ? styles.success : styles.fail}`}>{resetSuccess ? '초기화 완료' : '초기화 실패'}</span>
              <button className={styles.alert_close} onClick={handleCloseAlert}>
                ✖
              </button>
            </div>
            <div className={styles.alert_message}>{resetSuccess ? '이메일을 확인하세요' : '이메일이나 전화번호 오류'}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
