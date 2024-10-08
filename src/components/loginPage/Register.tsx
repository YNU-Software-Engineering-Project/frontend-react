import React, { useState } from 'react';
import styles from 'styles/login/Register.module.css';
import { useNavigate } from 'react-router-dom';
import Button from 'components/common/Button';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (code === 'XJ7dH9kL3tZ2') {
      setRole('admin');
    } else {
      setRole('user');
    }

    console.log(code);
    console.log(`Registered as: ${role}`);
    navigate('/login');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.register_container}>
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
        <div className={styles.password_text}>Password</div>
        <div style={{ height: 8 }}></div>
        <input
          className={styles.confirm_password}
          type="text"
          placeholder="value"
          value={password}
          onChange={e => setPassword(e.target.value)}
        ></input>
        <div style={{ height: 24 }}></div>
        <div className={styles.confirmPassword_text}>Confirm Password</div>
        <div style={{ height: 8 }}></div>
        <input
          className={styles.confirm_confirmPassword}
          type="text"
          placeholder="value"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
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
        <div className={styles.code_text}>초대 코드</div>
        <div style={{ height: 8 }}></div>
        <input
          className={styles.confirm_code}
          type="text"
          placeholder="value"
          value={code}
          onChange={e => setCode(e.target.value)}
        ></input>
        <div style={{ height: 24 }}></div>

        <Button style={{  width: 272, height: 40, borderRadius: 2}}
          onClick={handleRegister}>Register</Button>
        <div style={{ height: 24 }}></div>

        <div className={styles.api_login}>
          <button>
            <img src="/naver.png"></img>
          </button>
          <button>
            <img src="/google.png"></img>
          </button>
          <button>
            <img src="/kakao.png"></img>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
